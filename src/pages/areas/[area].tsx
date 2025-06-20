import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { locationData } from '../../data/locations';
import { motion } from 'framer-motion';
import CourseCard from '../../components/CourseCard';
import BookingModal from '../../components/BookingModal';
import Cart from '../../components/Cart';
import CourseModal from '../../components/CourseModal';
import Footer from '../../components/Footer';
import LoadingScreen from '../../components/LoadingScreen';

// Import courses array from courses page (copy here for self-containment)
const courses = [
  {
    id: 1,
    title: 'SIA Door Supervisor Licence',
    price: '£350',
    duration: '45 hr',
    description: 'Complete training for door supervisor licensing',
    image: '/assets/door-supervisor.jpg'
  },
  {
    id: 2,
    title: 'CCTV Licence',
    price: '£185',
    duration: '24 hr',
    description: 'Professional CCTV operator training',
    image: '/assets/cctv.jpg'
  },
  {
    id: 3,
    title: 'SIA Close Protection Licence',
    price: '£1,299',
    duration: '15 Days',
    description: 'Advanced security training for close protection',
    image: '/assets/close-protection.jpg'
  },
  {
    id: 4,
    title: 'SIA Train The Trainer Programme',
    price: '£1,500',
    duration: '5 Days',
    description: 'Become a certified SIA trainer',
    image: '/assets/trainer.jpg'
  },
  {
    id: 5,
    title: 'First Aid Requirement For SIA License',
    price: '£48.88',
    duration: '6 hr',
    description: 'Essential first aid training for SIA licensing',
    image: '/assets/first-aid.jpg'
  },
  {
    id: 6,
    title: 'SIA Top-Up Refresher Course',
    price: '£150',
    duration: '1 Day',
    description: 'Update your skills and knowledge with our refresher course',
    image: '/assets/refresher.jpg'
  },
  {
    id: 7,
    title: 'Security Guard Training',
    price: '£190',
    duration: '4 Days',
    description: 'Essential training for security guard licensing',
    image: '/assets/security-guard.jpg'
  },
  {
    id: 8,
    title: 'Conflict Management Training',
    price: '£150',
    duration: '1 Day',
    description: 'Learn effective conflict resolution techniques',
    image: '/assets/conflict-management.jpg'
  },
  {
    id: 9,
    title: 'Physical Intervention Training',
    price: '£200',
    duration: '2 Days',
    description: 'Safe and legal physical intervention techniques',
    image: '/assets/physical-intervention.jpg'
  },
  {
    id: 10,
    title: 'Customer Service Training',
    price: '£120',
    duration: '1 Day',
    description: 'Enhance your customer service skills',
    image: '/assets/customer-service.jpg'
  },
  {
    id: 11,
    title: 'Emergency First Aid at Work',
    price: '£85',
    duration: '1 Day',
    description: 'Essential emergency first aid training',
    image: '/assets/emergency-first-aid.jpg'
  },
  {
    id: 12,
    title: 'Fire Safety Training',
    price: '£95',
    duration: '1 Day',
    description: 'Fire safety awareness and prevention',
    image: '/assets/fire-safety.jpg'
  },
  {
    id: 13,
    title: 'Health and Safety Training',
    price: '£110',
    duration: '1 Day',
    description: 'Workplace health and safety essentials',
    image: '/assets/health-safety.jpg'
  },
  {
    id: 14,
    title: 'Risk Assessment Training',
    price: '£130',
    duration: '1 Day',
    description: 'Learn to conduct effective risk assessments',
    image: '/assets/risk-assessment.jpg'
  },
  {
    id: 15,
    title: 'Working Safely Training',
    price: '£100',
    duration: '1 Day',
    description: 'Essential workplace safety training',
    image: '/assets/working-safely.jpg'
  }
];

type Course = typeof courses[number];

const siaCourses = [
  {
    id: 1,
    title: 'SIA Door Supervisor Licence',
    duration: '45 hr',
    price: '£350',
    image: '/assets/door-supervisor.jpg',
    description: 'Comprehensive training for door supervisors covering conflict management, physical intervention, and licensing requirements.'
  },
  {
    id: 2,
    title: 'CCTV Licence – The SIA CCTV Course (OL1)',
    duration: '24 hr',
    price: '£185',
    image: '/assets/cctv.jpg',
    description: 'Training for CCTV operators covering surveillance techniques, legal requirements, and operational procedures.'
  },
  {
    id: 3,
    title: 'First Aid Requirement for SIA Licence',
    duration: '6 hr',
    price: '£48.88',
    image: '/assets/first-aid.jpg',
    description: 'Essential first aid training required for SIA licensing, covering emergency response and life-saving techniques.'
  },
  {
    id: 4,
    title: 'SIA Close Protection Licence',
    duration: '—',
    price: '£1,299',
    image: '/assets/close-protection.jpg',
    description: 'Advanced training for close protection operatives, including threat assessment and protective security measures.'
  },
  {
    id: 5,
    title: 'New Mandatory SIA Refresher Training',
    duration: '—',
    price: '£150',
    image: '/assets/refresher.jpg',
    description: 'Mandatory refresher training to maintain SIA licensing standards and stay updated with industry requirements.'
  }
];

const trainerCourses = [
  {
    id: 1,
    title: 'SIA Train the Trainer Programme',
    duration: '—',
    price: '£1,500',
    image: '/assets/trainer.jpg',
    description: 'Comprehensive program to become a certified SIA trainer, covering teaching methodologies and course delivery.'
  }
];

const businessServices = [
  {
    id: 1,
    title: 'Introductory Consultation',
    duration: '1 hr',
    price: '£19.99',
    image: '/assets/consultation.jpg',
    description: 'Initial consultation to discuss your business needs and explore potential solutions.'
  },
  {
    id: 2,
    title: 'Strategic Planning Session',
    duration: '1 hr',
    price: '£19.99 / £99.99*',
    image: '/assets/risk-assessment.jpg',
    description: 'In-depth strategic planning session to develop your business roadmap and growth strategies.'
  },
  {
    id: 3,
    title: 'Branding & Positioning Analysis',
    duration: '1 hr',
    price: '£19.99',
    image: '/assets/health-safety.jpg',
    description: 'Comprehensive analysis of your brand positioning and recommendations for improvement.'
  },
  {
    id: 4,
    title: 'Freelancers, Sole Traders, Consultants',
    duration: '3 min',
    price: 'Free',
    image: '/assets/customer-service.jpg',
    description: 'Quick assessment and guidance for freelancers, sole traders, and consultants.'
  }
];

const courseDescriptions = {
  'SIA Door Supervisor Licence': `Service Description\nLooking to fast-track your SIA Door Supervisor Licence? Oaktree B|S|P offers a comprehensive course with same-day results and job opportunities in the security industry. Our program follows the SIA specification for learning and qualifications, ensuring you are fully equipped to work as a door supervisor or security guard. Join Oaktree B|S|P and kickstart your career in security today with our industry-supported training.`,
  'New Mandatory SIA Refresher Training': `Service Description\nLooking to stay updated on the latest safety-critical refresher training for door supervisors and security guards? Oaktree B|S|P is proud to offer new mandatory training courses. In partnership with the Security Industry Authority, we are dedicated to keeping the public safe by ensuring all security personnel undergo essential training. Enrol now to meet the necessary requirements and enhance your security skills with Oaktree B|S|P.`,
  'SIA Close Protection Licence': `Service Description\nOaktree B|S|P provides expert guidance and support for individuals looking to obtain their Close Protection Licence. Our streamlined process ensures that you can get licensed quickly and easily, allowing you to start working in the private security industry as a bodyguard or close protection operative. With our professional approach and focus on excellence, we help you meet the requirements set by the Security Industry Authority (SIA) for a 3-year licence. Trust Oaktree B|S|P to help you kickstart your career in close protection with confidence and success.`
};

type CourseTitle = keyof typeof courseDescriptions;

export default function AreaPage() {
  const router = useRouter();
  const { area } = router.query;
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [bookingCourse, setBookingCourse] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ title: string; description: string } | null>(null);

  const slideshowImages = [
    '/assets/door-supervisor.jpg',
    '/assets/security-guard.jpg',
    '/assets/trainer.jpg',
    '/assets/first-aid.jpg'
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (area) {
      const foundLocation = locationData.find(loc => loc.slug === area);
      setLocation(foundLocation);
      setLoading(false);
    }
  }, [area]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
            <p className="text-gray-600 mb-6">The requested location could not be found.</p>
            <Link href="/locations">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Back to Locations
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-2 relative inline-block">
            {location.name} Training Centre
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 -bottom-2 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium mt-2">
            Professional SIA security training and certification services in {location.name}.
          </p>
        </motion.div>

        {/* Info Cards and Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Information</h2>
            <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">{location.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <a href={`tel:${location.phone}`} className="text-blue-600 hover:text-blue-700">
                      {location.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Opening Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Training?</h3>
              <p className="mb-6">Contact us today to book your course or get more information about our training programs.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${location.phone}`}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Call Now
                </a>
                <Link href="/contact">
                  <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Contact Us
                </button>
              </Link>
            </div>
          </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden relative h-64">
              <Image
                src={slideshowImages[currentSlide]}
                alt={location.name}
                fill
                className="object-cover transition-all duration-700"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                {slideshowImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full ${currentSlide === idx ? 'bg-blue-600' : 'bg-white/70'} transition-colors`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-96">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(location.name + ' Training Centre, UK')}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>

        {/* Animated Courses Section */}
        <motion.section id="sia-courses" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-heading font-bold text-[#1a365d] mb-4">🔐 Security Industry Authority (SIA) Courses</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-heading font-bold text-[#1a365d] mb-6">🛡️ SIA Training Courses in {location.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {siaCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden group h-full flex flex-col"
                  >
                    <div 
                      className="relative h-48 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedCourse({ title: course.title, description: courseDescriptions[course.title as CourseTitle] || course.description })}
                    >
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">Click to learn more</p>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-heading font-bold text-[#1a365d] mb-4">{course.title}</h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4 transform transition-transform duration-300 group-hover:scale-105">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 font-medium">Duration:</span>
                          <span className="font-bold text-[#1a365d] text-lg">{course.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Price:</span>
                          <span className="font-bold text-[#1a365d] text-lg">{course.price}</span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookingCourse(course);
                          }}
                          className="w-full bg-[#1a365d] text-white py-3 px-6 rounded-lg font-['Inter'] font-semibold hover:bg-[#2d3748] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span>Book Now</span>
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Trainer-Level Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-heading font-bold text-[#1a365d] mb-6 flex items-center">
                <span className="mr-2"> 🪪</span>
                Trainer-Level
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trainerCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden group h-full flex flex-col"
                  >
                    <div 
                      className="relative h-48 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedCourse({ title: course.title, description: course.description })}
                    >
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">Click to learn more</p>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-heading font-bold text-[#1a365d] mb-4">{course.title}</h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4 transform transition-transform duration-300 group-hover:scale-105">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 font-medium">Duration:</span>
                          <span className="font-bold text-[#1a365d] text-lg">{course.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Price:</span>
                          <span className="font-bold text-[#1a365d] text-lg">{course.price}</span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookingCourse(course);
                          }}
                          className="w-full bg-[#1a365d] text-white py-3 px-6 rounded-lg font-['Inter'] font-semibold hover:bg-[#2d3748] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span>Book Now</span>
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Business Strategy & Consultation Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-heading font-bold text-[#1a365d] mb-6">💼 Business Strategy & Consultation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {businessServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden group h-full flex flex-col"
                  >
                    <div 
                      className="relative h-48 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedCourse({ title: service.title, description: service.description })}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">Click to learn more</p>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-heading font-bold text-[#1a365d] mb-4">{service.title}</h3>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4 transform transition-transform duration-300 group-hover:scale-105">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 font-medium">Duration:</span>
                          <span className="font-bold text-[#1a365d] text-lg">{service.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Price:</span>
                          <span className="font-bold text-[#1a365d] text-lg">{service.price}</span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookingCourse(service);
                          }}
                          className="w-full bg-[#1a365d] text-white py-3 px-6 rounded-lg font-['Inter'] font-semibold hover:bg-[#2d3748] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                          <span>Book Now</span>
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <CourseModal
            isOpen={!!selectedCourse}
            onClose={() => setSelectedCourse(null)}
            title={selectedCourse?.title || ''}
            description={selectedCourse?.description || ''}
          />
          <BookingModal
            isOpen={!!bookingCourse}
            onClose={() => setBookingCourse(null)}
            course={bookingCourse}
          />
        </motion.section>
      </div>
      {/* Booking Modal and Cart */}
      {isCartOpen && <Cart courses={cartItems} onClose={() => setIsCartOpen(false)} />}
      <Footer />
    </div>
  );
} 