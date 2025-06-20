import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ServiceLayout from '../../components/layouts/ServiceLayout';
import Navbar from '../../components/Navbar';

const slideshowImages = [
  '/assets/door-supervisor.jpg',
  '/assets/security-guard.jpg',
  '/assets/trainer.jpg',
  '/assets/first-aid.jpg',
  '/assets/cctv.jpg'
];

export default function BusinessBank() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      title: 'Quick Setup',
      description: 'Get your account in minutes',
      image: '/assets/business-bank/quick-setup.jpg'
    },
    {
      title: 'Free Transfers',
      description: '12 months of free bank transfers',
      image: '/assets/business-bank/free-transfers.jpg'
    },
    {
      title: 'Cashback Offer',
      description: 'Get £100 cashback',
      image: '/assets/business-bank/cashback.jpg'
    }
  ];

  const TIDE_URL = 'https://www.tide.co/partners/oaktree-business-support-partners/';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <ServiceLayout>
      <Navbar />
      <Head>
        <title>Free Business Bank Account | Oaktree Business Support</title>
        <meta name="description" content="Open a free business bank account online in minutes with Tide. Get £100 cashback and 12 months of free bank transfers. No credit checks required." />
      </Head>

      <div className="bg-white">
        {/* Hero Section with Background Image */}
        <div className="relative bg-[#1a365d] py-24 sm:py-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('/assets/business-bank/hero-bg.jpg')" }}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Open a Business Bank Account online today
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mx-auto mt-6 max-w-2xl text-lg text-gray-300"
              >
                FREE BUSINESS BANK ACCOUNT. APPLY ONLINE NOW
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10"
              >
                <motion.a
                  href={TIDE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-[#1a365d] bg-white hover:bg-gray-50 transition-colors duration-300"
                >
                  Get Started Now
                  <motion.svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Slideshow Section */}
        <div className="relative bg-gray-50 py-16 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative h-[400px] sm:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full">
                    <img
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-3xl font-bold mb-4">{slides[currentSlide].title}</h3>
                        <p className="text-xl">{slides[currentSlide].description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      currentSlide === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section with Interactive Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white py-12"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Active Users', value: '500,000+', icon: '👥' },
                { label: 'Free Transfers', value: '12 Months', icon: '💸' },
                { label: 'Cashback', value: '£100', icon: '💰' },
                { label: 'Setup Time', value: '5 Minutes', icon: '⚡' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 p-6 rounded-lg shadow-md text-center transform transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-[#1a365d]">{stat.value}</div>
                  <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content with Interactive Cards */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-16 lg:grid-cols-2"
          >
            {/* Left Column */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900">What does it mean to have a business account?</h2>
                <p className="mt-4 text-gray-600">
                  A business bank account is similar to a personal bank account, except that it is meant for sole proprietorships, partnerships, corporations, clubs, societies, or charities.
                </p>
                <p className="mt-4 text-gray-600">
                  It is a legal need to establish a business bank account if you want to start up a limited company in the UK or if you already have one. If you're self-employed, opening a business bank account is a straightforward way to separate your business activities from your personal finances.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900">Why choose Tide Business Bank?</h2>
                <ul className="mt-4 space-y-4">
                  {[
                    'No monthly or annual fees',
                    'Free Tide Mastercard for local and global purchases',
                    'No credit checks while opening an account',
                    'Connect to accounting software (Xero, FreeAgent, Sage)',
                    'Apply for credit up to £15,000'
                  ].map((feature, index) => (
                    <motion.li
                      key={feature}
                      variants={itemVariants}
                      className="flex items-start"
                    >
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900">Special Offer</h3>
                <p className="mt-4 text-gray-600">
                  Use our exclusive referral code: <span className="font-bold">OAKTREEBSP</span>
                </p>
                <ul className="mt-4 space-y-4">
                  {[
                    '£100 cashback',
                    '12 months of free bank transfers',
                    'No credit checks required',
                    'Instant account setup'
                  ].map((offer, index) => (
                    <motion.li
                      key={offer}
                      variants={itemVariants}
                      className="flex items-start"
                    >
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-600">{offer}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-[#1a365d] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2d3748] transition-colors duration-300"
                  onClick={() => window.open(TIDE_URL, '_blank')}
                >
                  Open Account Now
                </motion.button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900">Features</h3>
                <ul className="mt-4 space-y-4">
                  {[
                    'Quick setup - Get sort code and account number in minutes',
                    'FSCS protected - Safe and credible',
                    '24/7 in-app support',
                    'Free business Mastercard',
                    'Real-time transaction notifications',
                    'Expense tracking and categorization'
                  ].map((feature, index) => (
                    <motion.li
                      key={feature}
                      variants={itemVariants}
                      className="flex items-start"
                    >
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section with Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {[
                {
                  question: 'How long does it take to open an account?',
                  answer: 'You can open an account in as little as 5 minutes and get your sort code and account number instantly.'
                },
                {
                  question: 'Is there a minimum deposit required?',
                  answer: 'No, there is no minimum deposit required to open an account.'
                },
                {
                  question: 'Can I use the account for international transactions?',
                  answer: 'Yes, you can use your Tide Mastercard for both local and international transactions.'
                },
                {
                  question: 'How do I get the £100 cashback?',
                  answer: 'Simply use our referral code OAKTREEBSP when opening your account and make a minimum deposit of £1 within three months.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a365d] py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
            <p className="mt-4 text-lg text-gray-300">
              Open your free business bank account today and get £100 cashback.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-[#1a365d] bg-white hover:bg-gray-50 transition-colors duration-300"
            >
              Open Account Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </ServiceLayout>
  );
} 