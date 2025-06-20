import React, { useState, useMemo } from 'react';
import { locations } from '../data/locations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Helper function for consistent date formatting
const formatDate = (date: Date) => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${weekday}, ${day} ${month} ${year}`;
};

const siaCourses = [
  {
    id: 1,
    title: 'SIA Door Supervisor Licence',
    duration: '45 hr',
    price: '£350',
    description: 'Comprehensive training for door supervisors covering conflict management, physical intervention, and licensing requirements.'
  },
  {
    id: 2,
    title: 'CCTV Licence – The SIA CCTV Course (OL1)',
    duration: '24 hr',
    price: '£185',
    description: 'Training for CCTV operators covering surveillance techniques, legal requirements, and operational procedures.'
  },
  {
    id: 3,
    title: 'First Aid Requirement for SIA Licence',
    duration: '6 hr',
    price: '£48.88',
    description: 'Essential first aid training required for SIA licensing, covering emergency response and life-saving techniques.'
  },
  {
    id: 4,
    title: 'SIA Close Protection Licence',
    duration: '—',
    price: '£1,299',
    description: 'Advanced training for close protection operatives, including threat assessment and protective security measures.'
  },
  {
    id: 5,
    title: 'New Mandatory SIA Refresher Training',
    duration: '—',
    price: '£150',
    description: 'Mandatory refresher training to maintain SIA licensing standards and stay updated with industry requirements.'
  },
  {
    id: 6,
    title: 'SIA Door Supervisor Course – Rochdale',
    duration: '—',
    price: '£450',
    description: 'Specialized door supervisor training program in Rochdale, covering local requirements and practical scenarios.'
  },
  {
    id: 7,
    title: 'SIA Train the Trainer Programme',
    duration: '—',
    price: '£1,500',
    description: 'Comprehensive program to become a certified SIA trainer, covering teaching methodologies and course delivery.'
  },
  {
    id: 8,
    title: 'Introductory Consultation',
    duration: '1 hr',
    price: '£19.99',
    description: 'Initial consultation to discuss your business needs and explore potential solutions.'
  },
  {
    id: 9,
    title: 'Strategic Planning Session',
    duration: '1 hr',
    price: '£19.99 / £99.99*',
    description: 'In-depth strategic planning session to develop your business roadmap and growth strategies.'
  },
  {
    id: 10,
    title: 'Branding & Positioning Analysis',
    duration: '1 hr',
    price: '£19.99',
    description: 'Comprehensive analysis of your brand positioning and recommendations for improvement.'
  },
  {
    id: 11,
    title: 'Freelancers, Sole Traders, Consultants',
    duration: '3 min',
    price: 'Free',
    description: 'Quick assessment and guidance for freelancers, sole traders, and consultants.'
  }
];

const Booking = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '09:00-17:00',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    bankAccount: '',
    sortCode: '',
    paypalEmail: '',
    qrCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Generate next 12 Monday dates for course start dates (matching home page)
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
        label: formatDate(date)
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
    return formatDate(endDate);
  }, [formData.date]);

  // UK phone number validation
  const validateUKPhone = (phone: string) => {
    const ukPhoneRegex = /^(\+44|0)[1-9]\d{1,4}\s?\d{3,4}\s?\d{3,4}$/;
    return ukPhoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const filteredLocations = locations.filter(loc =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate UK phone number
    if (!validateUKPhone(formData.phone)) {
      setSubmitMessage('Please enter a valid UK phone number (e.g., +44 20 7946 0958 or 020 7946 0958)');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedCourse,
          selectedLocation,
          paymentMethod,
          paymentDetails,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Booking submitted successfully! We will contact you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          date: '',
          time: '09:00-17:00',
          notes: ''
        });
        setSelectedCourse('');
        setSelectedLocation('');
        setPaymentMethod('');
        setPaymentDetails({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          bankAccount: '',
          sortCode: '',
          paypalEmail: '',
          qrCode: ''
        });
      } else {
        setSubmitMessage(data.message || 'Failed to submit booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Book Your Course
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Secure your place on professional security training courses
          </p>
        </div>
        </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Choose a Course</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {siaCourses.map((course) => (
                    <div
                      key={course.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedCourse === course.id.toString()
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedCourse(course.id.toString())}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm mb-2">{course.title}</h3>
                          <p className="text-gray-600 text-xs mb-2">{course.description}</p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Duration: {course.duration}</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-blue-600">{course.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
              </div>

              {/* Location Selection */}
              <div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Choose Location</h2>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search locations..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {filteredLocations.map((location) => (
                    <div
                      key={location}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedLocation === location
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">📍</span>
                        <span className="font-medium text-gray-900 text-sm">{location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Personal Information & Payment</h2>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                  
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                  
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number (UK) *
                    </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+44 20 7946 0958 or 020 7946 0958"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter a valid UK phone number</p>
                </div>
              </div>

                {/* Schedule Section */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Course Schedule</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Start Date *
                      </label>
                      <select
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      >
                        <option value="">Select a Monday start date</option>
                        {mondayDates.map((date) => (
                          <option key={date.value} value={date.value}>
                            {date.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Daily Training Hours
                      </label>
                      <div className="px-4 py-3 bg-white border border-gray-300 rounded-xl">
                        <div className="text-lg font-bold text-blue-600">9:00 AM - 5:00 PM</div>
                        <div className="text-sm text-gray-600 mt-1">Fixed Schedule</div>
                      </div>
                    </div>
                  </div>
                  
                  {courseEndDate && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-800">
                        <strong>Course End Date:</strong> {courseEndDate}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-sm text-yellow-800">
                      <strong>All SIA courses follow this standard schedule with 1-hour lunch break included.</strong>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Any special requirements or questions..."
                  />
                </div>

                {/* Payment Methods */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Method *</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'qr' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setPaymentMethod('qr')}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">📱</span>
                        <div>
                          <div className="font-semibold text-gray-900">QR Code Payment</div>
                          <div className="text-sm text-gray-600">Scan QR code with your phone</div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">🏦</span>
                        <div>
                          <div className="font-semibold text-gray-900">Bank Transfer</div>
                          <div className="text-sm text-gray-600">Direct bank transfer</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  {paymentMethod === 'qr' && (
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-4">QR Code Payment Instructions</h4>
                      <div className="space-y-3 text-sm">
                        <p>1. Scan the QR code with your phone's camera or banking app</p>
                        <p>2. Enter the amount: <span className="font-semibold">£{selectedCourse ? siaCourses.find(c => c.id.toString() === selectedCourse)?.price.replace('£', '') : '0'}</span></p>
                        <p>3. Complete the payment</p>
                        <p>4. Send a screenshot of the payment confirmation to WhatsApp: <span className="font-semibold">+44 330 175 9933</span></p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-4">Bank Transfer Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Account Name:</strong> Oaktree Academy</p>
                        <p><strong>Sort Code:</strong> 04-00-75</p>
                        <p><strong>Account Number:</strong> 12345678</p>
                        <p><strong>Reference:</strong> Your full name</p>
                        <p className="mt-4">Amount: <span className="font-semibold">£{selectedCourse ? siaCourses.find(c => c.id.toString() === selectedCourse)?.price.replace('£', '') : '0'}</span></p>
                        <p className="mt-4 text-yellow-800 bg-yellow-100 p-3 rounded-lg">
                          <strong>Important:</strong> After making the transfer, please send a screenshot of the payment confirmation to WhatsApp: <span className="font-semibold">+44 330 175 9933</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                  </button>
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-xl text-center ${
                    submitMessage.includes('successfully') 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Booking; 