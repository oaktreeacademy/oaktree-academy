import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaStar, FaClock, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// Sample course data - you can move this to a separate file later
const coursesData = {
  'bookkeeping': {
    title: 'Bookkeeping Course',
    description: 'Master the fundamentals of bookkeeping with our comprehensive course. Learn essential accounting principles, double-entry bookkeeping, and how to maintain accurate financial records.',
    longDescription: `Our Bookkeeping Course is designed for both beginners and those looking to enhance their accounting skills. You'll learn:
    • Double-entry bookkeeping principles
    • Financial statement preparation
    • VAT and tax calculations
    • Payroll management
    • Software proficiency (Sage, QuickBooks)
    • Best practices for record keeping`,
    duration: '8 weeks',
    level: 'Beginner to Intermediate',
    price: '£599',
    images: [
      '/assets/courses/bookkeeping-1.jpg',
      '/assets/courses/bookkeeping-2.jpg',
      '/assets/courses/bookkeeping-3.jpg',
    ],
    features: [
      'Hands-on practical exercises',
      'Industry-standard software training',
      'Certificate upon completion',
      'Job placement assistance',
    ]
  },
  'payroll': {
    title: 'Payroll Management Course',
    description: 'Become a payroll expert with our specialized course covering everything from basic payroll processing to complex tax calculations and compliance.',
    longDescription: `Our Payroll Management Course covers all aspects of payroll processing:
    • Payroll legislation and compliance
    • Tax and NI calculations
    • Statutory payments and deductions
    • Year-end procedures
    • Payroll software training
    • Real-time information (RTI) reporting`,
    duration: '6 weeks',
    level: 'Intermediate',
    price: '£499',
    images: [
      '/assets/courses/payroll-1.jpg',
      '/assets/courses/payroll-2.jpg',
      '/assets/courses/payroll-3.jpg',
    ],
    features: [
      'Latest payroll software training',
      'Regular updates on legislation',
      'Practical case studies',
      'Industry-recognized certification',
    ]
  },
  'accounting': {
    title: 'Accounting Fundamentals',
    description: 'Build a strong foundation in accounting principles and practices with our comprehensive course designed for aspiring accountants.',
    longDescription: `Our Accounting Fundamentals course provides a solid foundation in:
    • Financial accounting principles
    • Management accounting
    • Financial statement analysis
    • Budgeting and forecasting
    • Tax principles
    • Business ethics and compliance`,
    duration: '12 weeks',
    level: 'Beginner to Advanced',
    price: '£799',
    images: [
      '/assets/courses/accounting-1.jpg',
      '/assets/courses/accounting-2.jpg',
      '/assets/courses/accounting-3.jpg',
    ],
    features: [
      'Comprehensive study materials',
      'Expert-led sessions',
      'Exam preparation support',
      'Career guidance',
    ]
  }
};

export default function CoursePage() {
  const router = useRouter();
  const { courseId } = router.query;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const course = coursesData[courseId as keyof typeof coursesData];

  if (!course) {
    return <div>Course not found</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % course.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + course.images.length) % course.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src={course.images[currentImageIndex]}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl max-w-2xl mx-auto">{course.description}</p>
          </div>
        </div>
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 p-2 rounded-full"
        >
          ←
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 p-2 rounded-full"
        >
          →
        </button>
      </div>

      {/* Course Details */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6">Course Overview</h2>
              <div className="prose max-w-none">
                {course.longDescription.split('\n').map((line, index) => (
                  <p key={index} className="mb-4">{line}</p>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Course Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FaStar className="text-yellow-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <FaClock className="text-blue-600" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-blue-600" />
                  <span>Level: {course.level}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-blue-600" />
                  <span>Next Start: Contact for dates</span>
                </div>
                <div className="border-t pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    {course.price}
                  </div>
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Book {course.title}</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              </div>
              <div><span className="font-medium">Account Number:</span> [Your Account Number]</div>
              <div><span className="font-medium">Sort Code:</span> [Your Sort Code]</div>
              <div><span className="font-medium">Bank:</span> [Your Bank Name]</div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 