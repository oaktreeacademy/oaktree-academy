import React from 'react';

interface DirectBankReceiptProps {
  booking: {
    id: number;
    fullname: string;
    course: string;
    payment: string;
    location: string;
    email: string;
    number: string;
    date: Date;
    paymentMethod: string;
    paymentIntentId?: string;
    createdAt: Date;
  };
  paymentIntentId?: string;
  onClose: () => void;
}

export default function DirectBankReceipt({ booking, paymentIntentId, onClose }: DirectBankReceiptProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const receiptContent = `
      Oaktree Academy - Payment Confirmation
      
      Booking ID: #${booking.id}
      Transaction ID: ${paymentIntentId || 'N/A'}
      Date: ${formatDate(booking.createdAt)}
      
      Customer Details:
      Name: ${booking.fullname}
      Email: ${booking.email}
      Phone: ${booking.number}
      
      Course Details:
      Course: ${booking.course}
      Location: ${booking.location}
      Start Date: ${formatDate(booking.date)}
      
      Payment Details:
      Method: ${booking.paymentMethod}
      Status: ${booking.payment}
      Transaction ID: ${paymentIntentId || 'N/A'}
      
      Payment Status: SUCCESSFUL
      Your payment has been processed and your booking is confirmed.
      
      Thank you for choosing Oaktree Academy!
      For support: 0330 175 9933
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payment-confirmation-${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Request Submitted</h2>
            <p className="text-gray-600">Your payment request is being processed.</p>
          </div>

          {/* Receipt Content */}
          <div className="space-y-6">
            {/* Booking Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Booking Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Booking ID:</span> #{booking.id}</div>
                <div><span className="font-medium">Transaction ID:</span> {paymentIntentId || 'N/A'}</div>
                <div><span className="font-medium">Date:</span> {formatDate(booking.createdAt)}</div>
                <div><span className="font-medium">Name:</span> {booking.fullname}</div>
                <div><span className="font-medium">Email:</span> {booking.email}</div>
                <div><span className="font-medium">Phone:</span> {booking.number}</div>
                <div><span className="font-medium">Course:</span> {booking.course}</div>
                <div><span className="font-medium">Location:</span> {booking.location}</div>
                <div><span className="font-medium">Start Date:</span> {formatDate(booking.date)}</div>
                <div><span className="font-medium">Payment Method:</span> {booking.paymentMethod}</div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-2">Payment Status: Processing</h3>
              <p className="text-yellow-800 text-sm">
                Your payment request has been submitted and is being processed. 
                You will receive a confirmation email once the payment is completed.
              </p>
              <p className="text-yellow-800 text-sm mt-2">
                <strong>Expected processing time:</strong> 1-2 business days
              </p>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">What Happens Next?</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• We will process your bank transfer request</li>
                <li>• You will receive a confirmation email once payment is completed</li>
                <li>• Your booking will be confirmed automatically</li>
                <li>• We will contact you with course details within 24 hours</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center text-sm text-gray-600">
              <p>Thank you for choosing Oaktree Academy!</p>
              <p className="mt-1">For support: 0330 175 9933</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handlePrint}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Print Receipt
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Download Receipt
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 