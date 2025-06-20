import React from 'react';

interface SimpleReceiptProps {
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
    createdAt: Date;
  };
  onClose: () => void;
}

export default function SimpleReceipt({ booking, onClose }: SimpleReceiptProps) {
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
      Oaktree Academy - Booking Receipt
      
      Booking ID: #${booking.id}
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
      
      Bank Transfer Details:
      Account Name: OAKTREE ACADEMY
      Account Number: 2931 9203 9201
      Sort Code: 12-32-42
      Bank: HSBC
      Reference: ${booking.fullname} - ${booking.id}
      
      Thank you for choosing Oaktree Academy!
      For support: 0330 175 9933
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-receipt-${booking.id}.txt`;
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmation</h2>
            <p className="text-gray-600">Thank you for your booking!</p>
          </div>

          {/* Receipt Content */}
          <div className="space-y-6">
            {/* Booking Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Booking Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Booking ID:</span> #{booking.id}</div>
                <div><span className="font-medium">Date:</span> {formatDate(booking.createdAt)}</div>
                <div><span className="font-medium">Name:</span> {booking.fullname}</div>
                <div><span className="font-medium">Email:</span> {booking.email}</div>
                <div><span className="font-medium">Phone:</span> {booking.number}</div>
                <div><span className="font-medium">Course:</span> {booking.course}</div>
                <div><span className="font-medium">Location:</span> {booking.location}</div>
                <div><span className="font-medium">Start Date:</span> {formatDate(booking.date)}</div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Payment Instructions</h3>
              <p className="text-blue-800 mb-3">
                Please complete your payment using the following bank details:
              </p>
              <div className="bg-white p-3 rounded border border-blue-300">
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Account Name:</span> OAKTREE ACADEMY</div>
                  <div><span className="font-medium">Account Number:</span> 2931 9203 9201</div>
                  <div><span className="font-medium">Sort Code:</span> 12-32-42</div>
                  <div><span className="font-medium">Bank:</span> HSBC</div>
                  <div><span className="font-medium">Reference:</span> {booking.fullname} - {booking.id}</div>
                </div>
              </div>
              <p className="text-red-600 text-sm mt-3 font-medium">
                ⚠️ Important: Please include your name as the payment reference
              </p>
            </div>

            {/* Status */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-2">Next Steps</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Complete the bank transfer using the details above</li>
                <li>• You'll receive a confirmation email with payment instructions</li>
                <li>• We'll contact you once payment is confirmed</li>
                <li>• For urgent support, call: 0330 175 9933</li>
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