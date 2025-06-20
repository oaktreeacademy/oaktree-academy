import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';
import Image from 'next/image';
import Link from 'next/link';
import CourseModal from '../components/CourseModal';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from '../components/BookingModal';
import CustomerReviews from '../components/CustomerReviews';
import { FaArrowRight, FaShieldAlt, FaPhoneAlt, FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  },
  {
    id: 6,
    title: 'SIA Door Supervisor Course – Rochdale',
    duration: '—',
    price: '£450',
    image: '/assets/door-supervisor.jpg',
    description: 'Specialized door supervisor training program in Rochdale, covering local requirements and practical scenarios.'
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
  'SIA Door Supervisor Licence': `Service Description
Looking to fast-track your SIA Door Supervisor Licence? Oaktree B|S|P offers a comprehensive course with same-day results and job opportunities in the security industry. Our program follows the SIA specification for learning and qualifications, ensuring you are fully equipped to work as a door supervisor or security guard. Join Oaktree B|S|P and kickstart your career in security today with our industry-supported training.`,
  'SIA Door Supervisor Course (Rochdale)': `Service Description
Looking to fast-track your SIA Door Supervisor Licence? Oaktree B|S|P offers a comprehensive course with same-day results and job opportunities in the security industry. Our program follows the SIA specification for learning and qualifications, ensuring you are fully equipped to work as a door supervisor or security guard. Join Oaktree B|S|P and kickstart your career in security today with our industry-supported training.`,
  'New Mandatory SIA Refresher Training': `Service Description
Looking to stay updated on the latest safety-critical refresher training for door supervisors and security guards? Oaktree B|S|P is proud to offer new mandatory training courses. In partnership with the Security Industry Authority, we are dedicated to keeping the public safe by ensuring all security personnel undergo essential training. Enrol now to meet the necessary requirements and enhance your security skills with Oaktree B|S|P.`,
  'SIA Close Protection Licence': `Service Description
Oaktree B|S|P provides expert guidance and support for individuals looking to obtain their Close Protection Licence. Our streamlined process ensures that you can get licensed quickly and easily, allowing you to start working in the private security industry as a bodyguard or close protection operative. With our professional approach and focus on excellence, we help you meet the requirements set by the Security Industry Authority (SIA) for a 3-year licence. Trust Oaktree B|S|P to help you kickstart your career in close protection with confidence and success.`,
  'SIA Train The Trainer Programme': `Service Description
Looking to excel in the field of education and training? Look no further than Oaktree B|S|P. Our comprehensive course offerings include the Level 3 Award in Education and Training, Level 3 Deliverers of Conflict Management Training, and Level 3 Physical Intervention Trainer qualifications. Whether you're a seasoned professional or just starting out, our programs are designed to enhance your skills and knowledge. Join Oaktree B|S|P and take your career to new heights in the lifelong learning sector.`
} as const;

type CourseTitle = keyof typeof courseDescriptions;

const slideshowImages = [
  '/assets/door-supervisor.jpg',
  '/assets/security-guard.jpg',
  '/assets/trainer.jpg',
  '/assets/first-aid.jpg',
  '/assets/cctv.jpg'
];

// Instructor data for the carousel
const instructors = [
  { name: 'Dr. Rachel Myers', title: 'President', image: '/assets/Meet our security trainers/Dr.Rachel Myers.jpg' },
  { name: 'Shameem Akhtar', title: 'Head Off Centres', image: '/assets/Meet our security trainers/Shameem Akhtar.jpg' },
  { name: 'Chiumbo Eze', title: 'Instructor', image: '/assets/Meet our security trainers/Chiumbo Eze.jpg' },
  { name: 'Dalia Ziadeh', title: 'Instructor', image: '/assets/Meet our security trainers/Dalia Ziadeh.jpg' },
  { name: 'Frederick Gilbert', title: 'Instructor', image: '/assets/Meet our security trainers/Frederick Gilbert.jpg' },
  { name: 'Kate Hogan', title: 'Instructor', image: '/assets/Meet our security trainers/Kate Hogan.jpg' },
  { name: 'Lian Jiayi', title: 'Instructor', image: '/assets/Meet our security trainers/Lian Jiayi.jpg' },
  { name: 'Nathan Castro', title: 'Instructor', image: '/assets/Meet our security trainers/Nathan Castro.jpg' },
  { name: 'Shaid Ali', title: 'Instructor', image: '/assets/Meet our security trainers/Shaid Ali.jpg' },
  { name: 'Dr. Shakeel Ahmen', title: 'Instructor', image: '/assets/Meet our security trainers/Dr. Shakeel Ahmen.jpg' },
];

// Example static Google reviews (replace with dynamic fetch for real-time)
const googleReviews = [
  {
    name: 'Tochukwu Agiliga',
    date: 'Feb 2, 2025',
    rating: 5,
    text: 'The package is designed for success. In my door supervisor course and CCTV Operator course, I met an amazing set of instructors who use field and class experiences to build your courage and bring you excellent performance.'
  },
  {
    name: 'Joshua Oluwaseun',
    date: 'Jan 11, 2025',
    rating: 5,
    text: 'Quality driven. Ben Mccarthy is an efficient, quality driven, and hardworking lead trainer for the door supervision course. He made the topics easy to understand and digest. I appreciate his patience and attention to detail when teaching the course.'
  },
  {
    name: 'ASKANDIR IDDRISS',
    date: 'Oct 11, 2024',
    rating: 5,
    text: 'Get Licensed is the best. Get Licensed is indeed, the best place to take your security training. I just completed my Door Supervisor Training with them and was trained by Rob Worthington. Rob is the best trainer I have ever seen. You know why, its because he really trains from experience. He treated everyone fairly and makes the training very interesting, practical and experiential. I sincerely entreat everyone that seeks to take any security training course to do that with Get Licensed. You would enjoy it and learn a lot.'
  },
  // Add more reviews as needed
];

export default function Home() {
  const [currentInstructor, setCurrentInstructor] = useState(0);
  const [reviewsToShow, setReviewsToShow] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllTrainers, setShowAllTrainers] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ title: string; description: string } | null>(null);
  const [bookingCourse, setBookingCourse] = useState<{
    title: string;
    duration: string;
    price: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  // Auto-slide for trainers
  useEffect(() => {
    if (!showAllTrainers) {
      const timer = setInterval(() => {
        setCurrentInstructor((prev) => (prev + 1) % instructors.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [showAllTrainers, instructors.length]);

  const handleCourseClick = (title: string) => {
    if (title in courseDescriptions) {
      setSelectedCourse({ title, description: courseDescriptions[title as CourseTitle] });
      setIsModalOpen(true);
    }
  };

  const handleBooking = (course: {
    title: string;
    duration: string;
    price: string;
    description?: string;
  }) => {
    setBookingCourse(course);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      
      {/* HERO SECTION - Massive Background Image Style */}
      <section className="relative w-full min-h-[60vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden shadow-lg">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/security-header.jpg" 
            alt="Security Header" 
            fill 
            priority
            sizes="100vw"
            className="object-cover w-full h-full" 
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a365de6] via-[#1a365dbb] to-[#1a365d88]" />
        </div>
        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight animate-fade-in-up">
            Train, Gain, Maintain
            </h1>
          <div className="text-lg md:text-2xl text-blue-100 font-semibold mb-2 animate-fade-in-up delay-100">
            SIA Security Training & Business Services
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4 animate-fade-in-up delay-300">
            <div className="flex items-center gap-2 bg-white/90 px-5 py-2 rounded-lg shadow border border-blue-100">
              <FaPhoneAlt className="text-blue-700 text-lg" />
              <span className="text-blue-900 font-bold text-base">0330 175 9933</span>
            </div>
            <div className="flex gap-3 mt-2 md:mt-0">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:scale-110 transition-transform"><FaFacebook size={24} className="text-blue-500 hover:text-blue-700" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:scale-110 transition-transform"><FaInstagram size={24} className="text-pink-500 hover:text-pink-700" /></a>
              <a href="https://www.tiktok.com/@sia_courses" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:scale-110 transition-transform"><FaTiktok size={24} className="text-black hover:text-gray-700" /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:scale-110 transition-transform"><FaYoutube size={24} className="text-red-600 hover:text-red-800" /></a>
            </div>
          </div>
          {/* SIA tagline as a secondary block with glassmorphism and animation */}
          <div className="mt-4 bg-white/20 backdrop-blur-md rounded-xl px-6 py-3 shadow-lg border border-white/30 text-white text-base md:text-lg font-semibold animate-fade-in-up delay-400">
            <span>Rooted in Strength. Trained to Protect. Grown to Lead.</span>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN SECTION: SIA Security Training in Rochdale */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 rounded-2xl shadow-lg bg-white/90 border border-blue-100 p-8">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-heading font-bold text-midnight-blue flex items-center gap-3 mb-2">
              <FaShieldAlt className="text-blue-700 text-2xl" />
              SIA Security Training in Rochdale
            </h2>
            <p className="text-slate text-lg font-body">Oaktree provides <span className="font-semibold text-midnight-blue">professional SIA</span> security guard training and recruitment services.</p>
            <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-nav font-semibold shadow hover:bg-blue-800 transition text-lg mt-4" onClick={() => window.location.href='/contact'}>Get in touch</button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md h-64 rounded-xl overflow-hidden shadow-lg bg-white border border-blue-100">
              <Image src="/assets/security-guard.jpg" alt="Security Training" fill className="object-cover absolute inset-0" style={{ borderRadius: '0.75rem' }} />
            </div>
          </div>
        </div>
      </section>

      {/* COURSES SECTION: Our training Courses */}
      <section className="bg-blue-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-midnight-blue mb-6">Our training Courses</h2>
          <p className="text-slate font-body mb-8 max-w-2xl">Oaktree provides phorceb ell crecspi training to one un- expert led programs.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition group">
              <h3 className="text-lg font-heading font-bold text-midnight-blue mb-2">Security Guarding</h3>
              <p className="text-slate font-body mb-4">Essential skills and qualifications for professional guards.</p>
              <a href="#sia-courses" className="text-midnight-blue font-nav font-medium hover:underline">Learn More</a>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition group">
              <h3 className="text-lg font-heading font-bold text-midnight-blue mb-2">Door Supervisor</h3>
              <p className="text-slate font-body mb-4">SIA-approved training to become a license.</p>
              <a href="#sia-courses" className="text-midnight-blue font-nav font-medium hover:underline">Learn More</a>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition group">
              <h3 className="text-lg font-heading font-bold text-midnight-blue mb-2">First Aid Requirement for SIA Licence</h3>
              <p className="text-slate font-body mb-4">Essential first aid skills required for SIA licensing.</p>
              <a href="#sia-courses" className="text-midnight-blue font-nav font-medium hover:underline">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* SIA Training & Licensing Courses */}
      <section id="sia-courses" className="py-16 bg-gray-50">
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

          {/* SIA Training Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-heading font-bold text-[#1a365d] mb-6">🛡️ SIA Training Courses</h3>
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
                    onClick={() => setSelectedCourse(course)}
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
                          handleBooking(course);
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

          {/* Trainer-Level */}
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
                    onClick={() => setSelectedCourse(course)}
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
                          handleBooking(course);
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

          {/* Business Strategy & Consultation */}
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
                    onClick={() => setSelectedCourse(service)}
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
                          handleBooking(service);
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
      </section>

      {/* MEET OUR TRAINERS SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">Meet Our Security Trainers</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Our certified instructors are industry experts dedicated to providing the highest quality security training.</p>
          
          <div className="relative w-full max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentInstructor}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
                  {instructors.slice(currentInstructor, currentInstructor + 3).map((instructor, index) => (
                    <div key={index} className="text-center flex-shrink-0">
                      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                        <Image src={instructor.image} alt={instructor.name} fill sizes="128px" className="object-cover" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-800">{instructor.name}</h3>
                      <p className="text-gray-500">{instructor.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            
            <button 
              onClick={() => setCurrentInstructor(prev => (prev - 1 + instructors.length) % instructors.length)}
              className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-4 bg-white/50 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:bg-white transition shadow-md"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={() => setCurrentInstructor(prev => (prev + 1) % instructors.length)}
              className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-4 bg-white/50 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:bg-white transition shadow-md"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION */}
      <CustomerReviews />

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-blue-600 text-4xl mb-4">✓</div>
              <h3 className="text-lg font-medium text-gray-900">Expert Instructors</h3>
              <p className="mt-2 text-gray-600">Learn from industry professionals</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-4xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900">Comprehensive Training</h3>
              <p className="mt-2 text-gray-600">Complete course materials provided</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-4xl mb-4">🎓</div>
              <h3 className="text-lg font-medium text-gray-900">Certification</h3>
              <p className="mt-2 text-gray-600">Official SIA recognized qualification</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 text-4xl mb-4">💼</div>
              <h3 className="text-lg font-medium text-gray-900">Job Support</h3>
              <p className="mt-2 text-gray-600">Career guidance and placement assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get in touch with our team for more information
            </p>
            <div className="mt-8 flex justify-center space-x-6">
              <a href="tel:03301759933" className="text-blue-600 hover:text-blue-700">
                <span className="sr-only">Phone</span>
                <span className="text-lg font-medium">0330 175 9933</span>
              </a>
              <a href="tel:07880080201" className="text-blue-600 hover:text-blue-700">
                <span className="sr-only">Mobile</span>
                <span className="text-lg font-medium">0788 0080 201</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modal */}
      <CourseModal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.title || ''}
        description={selectedCourse?.description || ''}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!bookingCourse}
        onClose={() => setBookingCourse(null)}
        course={bookingCourse}
      />
    </div>
  );
} 