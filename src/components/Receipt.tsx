import React from 'react';

interface ReceiptProps {
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

export default function Receipt({ booking, onClose }: ReceiptProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const receiptContent = `
OAKTREE ACADEMY - RECEIPT

Receipt No: ${booking.id}
Date: ${formatDate(booking.createdAt)}
Time: ${formatTime(booking.createdAt)}

CUSTOMER DETAILS:
Name: ${booking.fullname}
Email: ${booking.email}
Phone: ${booking.number}

COURSE DETAILS:
Course: ${booking.course}
Location: ${booking.location}
Start Date: ${formatDate(booking.date)}

PAYMENT DETAILS:
Payment Status: ${booking.payment}
Payment Method: ${booking.paymentMethod}
Transaction ID: ${booking.id}

Thank you for choosing Oaktree Academy!
For support, contact: 0330 175 9933
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">OAKTREE ACADEMY</h2>
            <p className="text-gray-600">Professional Training & Certification</p>
            <div className="border-t-2 border-blue-600 mt-2 pt-2">
              <h3 className="text-lg font-semibold text-blue-600">RECEIPT</h3>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Receipt No:</span>
              <span>#{booking.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{formatDate(booking.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Time:</span>
              <span>{formatTime(booking.createdAt)}</span>
            </div>

            <hr className="my-4" />

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Customer Details</h4>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Name:</span> {booking.fullname}</div>
                <div><span className="font-medium">Email:</span> {booking.email}</div>
                <div><span className="font-medium">Phone:</span> {booking.number}</div>
              </div>
            </div>

            <hr className="my-4" />

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Course Details</h4>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Course:</span> {booking.course}</div>
                <div><span className="font-medium">Location:</span> {booking.location}</div>
                <div><span className="font-medium">Start Date:</span> {formatDate(booking.date)}</div>
              </div>
            </div>

            <hr className="my-4" />

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Payment Details</h4>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Status:</span> 
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    booking.payment === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : booking.payment === 'Failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.payment}
                  </span>
                </div>
                <div><span className="font-medium">Method:</span> {booking.paymentMethod}</div>
                <div><span className="font-medium">Transaction ID:</span> #{booking.id}</div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="text-center text-sm text-gray-600">
              <p>Thank you for choosing Oaktree Academy!</p>
              <p className="mt-1">For support: 0330 175 9933</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handlePrint}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Print Receipt
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Download
            </button>
          </div>

          {/* WhatsApp Confirmation */}
          <div className="mt-4 bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">📱 WhatsApp Confirmation Required</h4>
            <p className="text-green-800 text-sm mb-3">
              Please send this receipt to WhatsApp for payment confirmation:
            </p>
            <a 
              href="https://wa.me/443301759933?text=Hi, I've just booked a course and need to confirm my payment. Here's my receipt:"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center w-full justify-center px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              <span className="mr-2">📱</span>
              Send to WhatsApp +44 330 175 9933
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-3 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 