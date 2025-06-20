import { useState } from 'react';
import Navbar from '../components/Navbar';
import CourseFilters from '../components/CourseFilters';
import CourseCard from '../components/CourseCard';
import Cart from '../components/Cart';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from '../components/BookingModal';
import CourseModal from '../components/CourseModal';

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

export default function Courses() {
  const [sortedCourses, setSortedCourses] = useState(courses);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingCourse, setBookingCourse] = useState<any>(null);

  const handleSort = (sortType: 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc') => {
    const sorted = [...courses].sort((a, b) => {
      switch (sortType) {
        case 'price-asc':
          return parseFloat(a.price.replace('£', '')) - parseFloat(b.price.replace('£', ''));
        case 'price-desc':
          return parseFloat(b.price.replace('£', '')) - parseFloat(a.price.replace('£', ''));
        case 'duration-asc':
          return parseFloat(a.duration) - parseFloat(b.duration);
        case 'duration-desc':
          return parseFloat(b.duration) - parseFloat(a.duration);
        default:
          return 0;
      }
    });
    setSortedCourses(sorted);
  };

  const handleAddToCart = (course: Course) => {
    setCartItems([...cartItems, course]);
    setIsCartOpen(true);
  };

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleBooking = (course: any) => {
    setBookingCourse(course);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* SIA Training & Licensing Courses Section - copied from Home */}
        <section id="sia-courses" className="py-8 bg-gray-50 rounded-2xl shadow-lg mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-[#1a365d] mb-4">🔐 Security Industry Authority (SIA) Courses</h2>
        </div>
            {/* SIA Training Courses */}
            <div className="mb-16">
              <h3 className="text-2xl font-heading font-bold text-[#1a365d] mb-6">🛡️ SIA Training Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.slice(0, 6).map((course, index) => (
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
                      onClick={() => handleCourseClick(course)}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
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
        </div>
            {/* Trainer-Level */}
            <div className="mb-16">
              <h3 className="text-2xl font-heading font-bold text-[#1a365d] mb-6 flex items-center">
                <span className="mr-2"> 🪪</span>
                Trainer-Level
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.slice(6, 7).map((course, index) => (
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
                      onClick={() => handleCourseClick(course)}
                    >
                      <img
                  src={course.image}
                  alt={course.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
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
            </div>
            {/* Business Strategy & Consultation */}
                  <div>
              <h3 className="text-2xl font-heading font-bold text-[#1a365d] mb-6">💼 Business Strategy & Consultation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.slice(7, 10).map((course, index) => (
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
                      onClick={() => handleCourseClick(course)}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
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
            </div>
          </div>
        </section>
        <CourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedCourse?.title || ''} description={selectedCourse?.description || ''} />
        <BookingModal isOpen={!!bookingCourse} onClose={() => setBookingCourse(null)} course={bookingCourse} />
      </div>

      {isCartOpen && (
        <Cart
          courses={cartItems}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
} 