import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStripe } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../components/Navbar';
import Receipt from '../components/Receipt';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function BookingConfirmationContent() {
  const stripe = useStripe();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!stripe) return;

    // Retrieve the "payment_intent_client_secret" query parameter
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (clientSecret) {
      stripe
        .retrievePaymentIntent(clientSecret)
        .then(async ({ paymentIntent }) => {
          if (paymentIntent) {
            switch (paymentIntent.status) {
              case 'succeeded':
                // Update booking status in database
                const response = await fetch('/api/update-payment-status', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    bookingId: paymentIntent.metadata.bookingId,
                    paymentStatus: 'Paid',
                  }),
                });

                if (response.ok) {
                  const data = await response.json();
                  setBooking(data.booking);
                  setStatus('success');
                } else {
                  throw new Error('Failed to update booking status');
                }
                break;
              case 'processing':
                setError('Your payment is processing.');
                setStatus('loading');
                break;
              case 'requires_payment_method':
                setError('Your payment was not successful, please try again.');
                setStatus('error');
                break;
              default:
                setError('Something went wrong.');
                setStatus('error');
                break;
            }
          }
        })
        .catch((err) => {
          setError('An error occurred while confirming your payment.');
          setStatus('error');
        });
    }
  }, [stripe]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Processing your payment...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Payment Failed! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
            <button
              onClick={() => router.push('/booking')}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {status === 'success' && booking && (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8">
              <strong className="font-bold">Payment Successful! </strong>
              <span className="block sm:inline">Your booking has been confirmed.</span>
            </div>
            
            <Receipt booking={booking} onClose={() => {}} />
            
            <div className="mt-8">
              <button
                onClick={() => router.push('/')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingConfirmation() {
  return (
    <Elements stripe={stripePromise}>
      <BookingConfirmationContent />
    </Elements>
  );
} 