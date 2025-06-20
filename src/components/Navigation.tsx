import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import { motion } from "framer-motion";
import CustomerReviews from '../components/CustomerReviews';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState(0);
  const [reviewsToShow, setReviewsToShow] = useState(3);

  const reviews = [
    {
      name: "Adeel Ahmed",
      date: "Feb 2, 2025",
      rating: 5,
      text: "Excellent service, very professional and helpful. Highly recommended.",
    },
    {
      name: "Mick Taylor",
      date: "Jan 11, 2025",
      rating: 5,
      text: "Great experience, the team was very supportive throughout the process.",
    },
    {
      name: "Sajid Mahmood",
      date: "Oct 11, 2024",
      rating: 5,
      text: "Very professional and friendly staff. The course was well organized.",
    },
    {
      name: "Adeel Khan",
      date: "Sep 20, 2024",
      rating: 5,
      text: "Fantastic training, clear instructions, and very knowledgeable trainers.",
    },
    {
      name: "Samantha Jones",
      date: "Aug 5, 2024",
      rating: 5,
      text: "I had a wonderful experience, everything was smooth and efficient.",
    },
    {
      name: "Imran Patel",
      date: "Jul 18, 2024",
      rating: 5,
      text: "The trainers were amazing and made the course enjoyable. Would definitely recommend.",
    },
    {
      name: "Sarah Williams",
      date: "Jun 30, 2024",
      rating: 5,
      text: "Booking was easy and the staff answered all my questions promptly.",
    },
    {
      name: "Mohammed Ali",
      date: "May 22, 2024",
      rating: 5,
      text: "Great value for money. The facilities were clean and comfortable.",
    },
    {
      name: "Lisa Brown",
      date: "Apr 10, 2024",
      rating: 5,
      text: "Passed my course with confidence thanks to the supportive team.",
    },
    {
      name: "David Singh",
      date: "Mar 2, 2024",
      rating: 5,
      text: "Very informative and well-structured course. Highly recommend to anyone.",
    },
    {
      name: "Emily Clark",
      date: "Feb 14, 2024",
      rating: 5,
      text: "The best training experience I've had. Friendly and professional staff.",
    },
    {
      name: "James Robinson",
      date: "Jan 7, 2024",
      rating: 5,
      text: "Everything was explained clearly and the trainers were very approachable.",
    },
    {
      name: "Nadia Hussain",
      date: "Dec 19, 2023",
      rating: 5,
      text: "Excellent communication from start to finish. Thank you!",
    },
    {
      name: "Omar Farooq",
      date: "Nov 11, 2023",
      rating: 5,
      text: "A smooth and efficient process. Will be recommending to friends.",
    },
    {
      name: "Priya Patel",
      date: "Oct 3, 2023",
      rating: 5,
      text: "Loved the interactive sessions and practical approach.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, type: "spring" },
    }),
  };

  return (
    <nav className="bg-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/assets/business-bank/logo.png" alt="Oaktree Academy Logo" width={40} height={40} />
              <span className="text-2xl font-logo font-bold text-gray-800">Oaktree Academy</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-nav text-gray-600 hover:text-gray-900 transition-colors duration-200">Home</Link>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="font-nav text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Locations</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link href="/areas/rochdale" className="block px-4 py-2 text-sm font-nav text-gray-600 hover:bg-gray-100 hover:text-gray-900">Rochdale</Link>
                  <Link href="/areas/manchester" className="block px-4 py-2 text-sm font-nav text-gray-600 hover:bg-gray-100 hover:text-gray-900">Manchester</Link>
                  <Link href="/areas/oldham" className="block px-4 py-2 text-sm font-nav text-gray-600 hover:bg-gray-100 hover:text-gray-900">Oldham</Link>
                  <Link href="/areas/birmingham" className="block px-4 py-2 text-sm font-nav text-gray-600 hover:bg-gray-100 hover:text-gray-900">Birmingham</Link>
                  <Link href="/areas/wolverhampton" className="block px-4 py-2 text-sm font-nav text-gray-600 hover:bg-gray-100 hover:text-gray-900">Wolverhampton</Link>
                  <Link href="/areas/telford" className="block px-4 py-2 text-sm font-nav text-gray-600 hover:bg-gray-100 hover:text-gray-900">Telford</Link>
                </div>
              )}
            </div>
            <Link href="/about" className="font-nav text-gray-600 hover:text-gray-900 transition-colors duration-200">About</Link>
            <Link href="/contact" className="font-nav text-gray-600 hover:text-gray-900 transition-colors duration-200">Contact</Link>
            <a href="https://www.tide.co/partners/oaktree-business-support-partners/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200">Open Account Now</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-nav text-gray-600 hover:text-gray-900 hover:bg-gray-200">Home</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-nav text-gray-600 hover:text-gray-900 hover:bg-gray-200">About</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-nav text-gray-600 hover:text-gray-900 hover:bg-gray-200">Contact</Link>
            <a href="https://www.tide.co/partners/oaktree-business-support-partners/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-nav text-white bg-blue-600 hover:bg-blue-700">Open Account Now</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 