import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '../data/locations';
import SimpleReceipt from './SimpleReceipt';
import DirectBankReceipt from './DirectBankReceipt';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    title: string;
    duration: string;
    price: string;
    description?: string;
    image?: string;
  } | null;
}

// Add type for formData
interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  paymentMethod: string;
  bankAccount: string;
  sortCode: string;
  paypalEmail: string;
  qrCode: string;
  accountHolderName: string;
  accountNumber: string;
  sortCodeDirect: string;
}

// Add type for errors
interface BookingErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  location?: string;
  notes?: string;
  paymentMethod?: string;
  bankAccount?: string;
  sortCode?: string;
  paypalEmail?: string;
  qrCode?: string;
  accountHolderName?: string;
  accountNumber?: string;
  sortCodeDirect?: string;
}

export default function BookingModal({ isOpen, onClose, course }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '09:00-17:00', // Set default time
    location: '',
    notes: '',
    paymentMethod: '',
    bankAccount: '',
    sortCode: '',
    paypalEmail: '',
    qrCode: '',
    accountHolderName: '',
    accountNumber: '',
    sortCodeDirect: '',
  });

  const [errors, setErrors] = useState<BookingErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<any>(null);
  const [submitError, setSubmitError] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');

  const steps = [
    { id: 1, title: 'Personal Details' },
    { id: 2, title: 'Schedule' },
    { id: 3, title: 'Payment' },
  ];

  // Generate next 12 Monday dates for course start dates
  const mondayDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    
    // Find the next Monday
    let daysUntilMonday = (8 - currentDate.getDay()) % 7;
    if (daysUntilMonday === 0) daysUntilMonday = 7;
    currentDate.setDate(currentDate.getDate() + daysUntilMonday);
    
    // Generate 12 Monday dates
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + (i * 7));
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-GB', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        })
      });
    }
    return dates;
  }, []);

  // Calculate course end date based on selected start date
  const courseEndDate = useMemo(() => {
    if (!formData.date) return null;
    const startDate = new Date(formData.date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // 7 days including start date
    return endDate.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }, [formData.date]);

  const validateForm = () => {
    const newErrors: BookingErrors = {};
    
    // Personal Details Validation
    if (currentStep === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number';
      }
    }

    // Schedule Validation
    if (currentStep === 1) {
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.time) newErrors.time = 'Time is required';
      if (!formData.location) newErrors.location = 'Location is required';
    }

    // Payment Validation
    if (currentStep === 2) {
      if (!formData.paymentMethod) {
        newErrors.paymentMethod = 'Payment method is required';
      } else {
        switch (formData.paymentMethod) {
          case 'qr':
            // No validation needed for QR code payment
            break;
          case 'bank':
            // No validation needed for bank transfer since we show static details
            break;
          default:
            newErrors.paymentMethod = 'Please select a valid payment method';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsTransitioning(false);
      }, 800); // faster transition
    }
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
      setIsTransitioning(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !course) return;

    setIsSubmitting(true);
    setSubmitError(''); // Clear any previous errors
    
    try {
      let response;
      
      if (formData.paymentMethod === 'qr') {
        // Use QR code payment API (same as bank transfer for now)
        response = await fetch('/api/process-bank-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            course: course.title,
            price: course.price,
            location: formData.location,
            date: formData.date,
            paymentMethod: formData.paymentMethod,
          }),
        });
      } else {
        // Use the regular bank payment API
        response = await fetch('/api/process-bank-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            course: course.title,
            price: course.price,
            location: formData.location,
            date: formData.date,
            paymentMethod: formData.paymentMethod,
          }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking');
      }

      // Show success and receipt
      setCompletedBooking(data.booking);
      setPaymentIntentId(data.paymentIntent || '');
      setShowSuccess(true);
      setShowReceipt(true);

      // Reset form after delay
      setTimeout(() => {
        onClose();
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          date: '',
          time: '09:00-17:00',
          location: '',
          notes: '',
          paymentMethod: '',
          bankAccount: '',
          sortCode: '',
          paypalEmail: '',
          qrCode: '',
          accountHolderName: '',
          accountNumber: '',
          sortCodeDirect: '',
        });
        setCurrentStep(0);
        setShowSuccess(false);
        setShowReceipt(false);
        setCompletedBooking(null);
        setSubmitError('');
      }, 10000); // Give more time to download receipt

    } catch (error) {
      console.error('Booking failed:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Payment methods data
  const paymentMethods = [
    {
      id: 'qr',
      name: 'QR Code Payment',
      icon: '📱',
      description: 'Scan QR code to pay',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      selectedColor: 'bg-purple-100 border-purple-400'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Manual bank transfer',
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      selectedColor: 'bg-green-100 border-green-400'
    }
  ];

  if (!course) return null;

  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title as="h3" className="text-2xl font-bold text-[#1a365d]">
                    Book {course.title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-6 mb-8">
                  {course.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg"
                    >
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 p-4 rounded-lg mb-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-medium">Duration:</span>
                        <span className="font-bold text-[#1a365d] text-lg">7 Days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Price:</span>
                        <span className="font-bold text-[#1a365d] text-lg">{course.price}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600 font-medium">Schedule:</span>
                        <span className="font-bold text-[#1a365d] text-sm">Mon-Fri, 9:00 AM - 5:00 PM</span>
                      </div>
                    </motion.div>
                    {course.description && (
                      <p className="text-gray-600 text-sm">{course.description}</p>
                    )}
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        index <= currentStep 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-gray-300 text-gray-500'
                      }`}>
                        {index < currentStep ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className="text-sm font-medium">{step.id}</span>
                        )}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className={`w-12 h-0.5 mx-4 ${
                          index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 0 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First Name *
                            </label>
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.firstName ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.firstName && (
                              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.lastName ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.lastName && (
                              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Schedule Your Training</h4>
                        
                        {/* Course Duration Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold text-blue-900">Course Schedule</span>
                          </div>
                          <p className="text-blue-800 text-sm">
                            This course runs for <strong>7 consecutive days</strong> (Monday to Sunday), 
                            from <strong>9:00 AM to 5:00 PM</strong> each day.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Course Start Date (Mondays Only) *
                            </label>
                            <select
                              value={formData.date}
                              onChange={(e) => setFormData({...formData, date: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.date ? 'border-red-500' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Select a Monday start date</option>
                              {mondayDates.map((date) => (
                                <option key={date.value} value={date.value}>
                                  {date.label}
                                </option>
                              ))}
                            </select>
                            {errors.date && (
                              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                            )}
                            {formData.date && courseEndDate && (
                              <p className="text-green-600 text-sm mt-2">
                                <strong>Course ends:</strong> {courseEndDate}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Daily Training Hours *
                            </label>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="font-medium text-gray-900">9:00 AM - 5:00 PM</span>
                                </div>
                                <span className="text-sm text-gray-500">Fixed Schedule</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-2">
                                All SIA courses follow this standard schedule with 1-hour lunch break included.
                              </p>
                            </div>
                            <input
                              type="hidden"
                              value={formData.time}
                              onChange={(e) => setFormData({...formData, time: e.target.value})}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Training Location *
                            </label>
                            <select
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.location ? 'border-red-500' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Select a location</option>
                              {locations.map((location) => (
                                <option key={location} value={location}>
                                  {location}
                                </option>
                              ))}
                            </select>
                            {errors.location && (
                              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Additional Notes
                            </label>
                            <textarea
                              value={formData.notes}
                              onChange={(e) => setFormData({...formData, notes: e.target.value})}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Any special requirements, accessibility needs, or questions..."
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h4>
                          <p className="text-gray-600">Select your preferred payment option</p>
                        </div>

                        {/* Payment Method Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {paymentMethods.map((method) => (
                            <motion.div
                              key={method.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setFormData({...formData, paymentMethod: method.id})}
                              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                formData.paymentMethod === method.id 
                                  ? method.selectedColor 
                                  : method.color
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="text-2xl">{method.icon}</div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-900">{method.name}</h5>
                                  <p className="text-sm text-gray-600">{method.description}</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 ${
                                  formData.paymentMethod === method.id 
                                    ? 'bg-blue-600 border-blue-600' 
                                    : 'border-gray-300'
                                }`}>
                                  {formData.paymentMethod === method.id && (
                                    <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center">
                                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {errors.paymentMethod && (
                          <p className="text-red-500 text-sm text-center">{errors.paymentMethod}</p>
                        )}

                        {/* Payment Details Based on Selection */}
                        {formData.paymentMethod === 'bank' && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-xl border border-gray-200"
                          >
                            <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                              <span className="text-2xl mr-2">🏦</span>
                              Bank Transfer Details
                            </h5>
                            <div className="space-y-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h6 className="font-semibold text-green-900 mb-2">Bank Account Details:</h6>
                                <div className="space-y-2 text-sm">
                                  <div><span className="font-medium">Account Name:</span> OAKTREE ACADEMY</div>
                                  <div><span className="font-medium">Account Number:</span> 2931 9203 9201</div>
                                  <div><span className="font-medium">Sort Code:</span> 12-32-42</div>
                                  <div><span className="font-medium">Bank:</span> HSBC</div>
                                  <div><span className="font-medium">Reference:</span> {formData.firstName} {formData.lastName}</div>
                                  <div><span className="font-medium">Amount:</span> {course.price}</div>
                                </div>
                              </div>
                              <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-yellow-800 text-sm">
                                  <strong>Important:</strong> After submitting your booking, you'll receive an email with payment instructions. Please complete the bank transfer and include your name as the reference.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {formData.paymentMethod === 'qr' && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-xl border border-gray-200 text-center"
                          >
                            <h5 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
                              <span className="text-2xl mr-2">📱</span>
                              QR Code Payment
                            </h5>
                            <div className="bg-gray-100 p-8 rounded-lg mb-4">
                              <div className="w-48 h-48 mx-auto bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-4xl mb-2">📱</div>
                                  <p className="text-sm text-gray-600">QR Code</p>
                                  <p className="text-xs text-gray-500">Scan to pay</p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3 text-sm">
                              <p className="text-gray-600">
                                Scan the QR code with your mobile banking app to complete payment
                              </p>
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-blue-800">
                                  <strong>Amount:</strong> {course.price}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      currentStep === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={handleNext}
                      disabled={isTransitioning}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isTransitioning ? 'Processing...' : 'Next'}
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processing...' : 'Complete Booking'}
                    </button>
                  )}
                </div>

                {/* Success Message */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center"
                    >
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Successful!</h3>
                        <p className="text-gray-600 mb-4">Your booking has been created successfully.</p>
                        
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <h4 className="font-semibold text-blue-900 mb-2">📱 WhatsApp Confirmation Required</h4>
                          <p className="text-blue-800 text-sm mb-3">
                            Please send your receipt to WhatsApp for payment confirmation:
                          </p>
                          <a 
                            href="https://wa.me/443301759933?text=Hi, I've just booked a course and need to confirm my payment. Here's my receipt:"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                          >
                            <span className="mr-2">📱</span>
                            Send to WhatsApp
                          </a>
                        </div>
                        
                        <p className="text-sm text-gray-500">
                          Download your receipt below and send it to +44 330 175 9933
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                {submitError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Booking Failed</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{submitError}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>

    {/* Receipt Modal */}
    {showReceipt && completedBooking && (
      formData.paymentMethod === 'direct-bank' ? (
        <DirectBankReceipt 
          booking={completedBooking} 
          paymentIntentId={paymentIntentId}
          onClose={() => setShowReceipt(false)} 
        />
      ) : (
        <SimpleReceipt 
          booking={completedBooking} 
          onClose={() => setShowReceipt(false)} 
        />
      )
    )}
  </>
  );
} 