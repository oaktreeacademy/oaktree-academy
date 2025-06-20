import { useState } from 'react';
import BookingModal from '../components/BookingModal';

export default function TestBooking() {
  const [showModal, setShowModal] = useState(false);

  const testCourse = {
    title: 'SIA Door Supervisor Licence',
    duration: '45 hr',
    price: '£350',
    description: 'Complete training for door supervisor licensing',
    image: '/assets/door-supervisor.jpg'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Booking System Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <span className="font-medium">Course:</span> {testCourse.title}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {testCourse.duration}
            </div>
            <div>
              <span className="font-medium">Price:</span> {testCourse.price}
            </div>
          </div>
          <p className="text-gray-600 mb-6">{testCourse.description}</p>
          
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Booking
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Test Instructions:</h3>
          <ol className="text-blue-800 text-sm space-y-1">
            <li>1. Click "Test Booking" above</li>
            <li>2. Fill out the booking form (3 steps)</li>
            <li>3. Select "Bank Transfer" payment method</li>
            <li>4. Submit the booking</li>
            <li>5. Check for receipt and email notifications</li>
          </ol>
        </div>
      </div>

      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        course={testCourse}
      />
    </div>
  );
} 