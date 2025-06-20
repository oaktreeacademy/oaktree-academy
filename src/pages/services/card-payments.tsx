import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCreditCard, FaMobileAlt, FaLaptop, FaLink, FaTable, FaHandHoldingUsd, FaStore, FaShieldAlt, FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';
import ServiceLayout from '../../components/layouts/ServiceLayout';
import Navbar from '../../components/Navbar';

const CardPayments = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

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
        <title>Card Payment Solutions | Oaktree Academy</title>
        <meta name="description" content="Get card payment solutions for your business. Secure, fast, and reliable payment processing." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 overflow-hidden">
          <motion.div 
            style={{ opacity, scale }}
            className="absolute inset-0 bg-[url('/assets/payment-pattern.png')] opacity-10"
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-200 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-lg"
              >
                Card Payments <span className="text-blue-100">Made Simple</span>
              </motion.h1>
              <div className="flex justify-center mb-6">
                <span className="block w-24 h-1 rounded-full bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 opacity-70" />
              </div>
              <p className="text-xl text-blue-100 mb-8 font-medium">
                FOR A NO-OBLIGATION, FREE REVIEW OF YOUR CURRENT CARD PAYMENT SOLUTIONS
              </p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col md:flex-row gap-4 justify-center items-center"
              >
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:03301759933" 
                  className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <FaPhoneAlt className="text-blue-700" />
                  0330 175 9933
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition-colors">
                    Get Started
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <div className="col-span-full mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2 tracking-tight">
                  <span className="inline-block align-middle mr-2"><FaCreditCard className="inline text-blue-600 text-3xl mb-1" /></span>
                  Our Payment Solutions
                </h2>
                <span className="block mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 opacity-70" />
                <p className="text-blue-700 mt-3 text-lg max-w-xl mx-auto">Accept payments the way you want. Explore our range of modern, secure, and flexible payment solutions for every business type.</p>
              </div>
              {[
                {
                  icon: <FaCreditCard className="text-4xl text-blue-600" />,
                  title: "Card Machine",
                  description: "Fast, secure, reliable card machines for all business types. Simplified pricing plans to suit your needs."
                },
                {
                  icon: <FaMobileAlt className="text-4xl text-blue-600" />,
                  title: "Phone Payments",
                  description: "Accept credit and debit card payments over the phone securely with minimal fuss."
                },
                {
                  icon: <FaLaptop className="text-4xl text-blue-600" />,
                  title: "Virtual Terminal",
                  description: "Take payments over the phone with a secure web interface. Quick setup, no technical knowledge required."
                },
                {
                  icon: <FaLink className="text-4xl text-blue-600" />,
                  title: "Pay by Link",
                  description: "Simple and secure payment links for invoices, bookings, and pre-delivery payments."
                },
                {
                  icon: <FaTable className="text-4xl text-blue-600" />,
                  title: "Pay At Tables",
                  description: "Let customers order and pay from their table with mobile solutions for restaurants and venues."
                },
                {
                  icon: <FaHandHoldingUsd className="text-4xl text-blue-600" />,
                  title: "Pay As You Go",
                  description: "Perfect for businesses that don't want monthly contracts. Ideal for taxi drivers and market traders."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="mb-4"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-center mb-2 text-blue-900 tracking-tight"
              >
                <span className="inline-block align-middle mr-2"><FaShieldAlt className="inline text-blue-600 text-2xl mb-1" /></span>
                Why Choose Our Payment Solutions?
              </motion.h2>
              <span className="block mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 opacity-70 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Trusted by Major Providers",
                    description: "We work with all major UK card acquirers, terminal suppliers, and payment gateways."
                  },
                  {
                    title: "Tailored Solutions",
                    description: "Custom payment solutions for businesses of all sizes and sectors."
                  },
                  {
                    title: "Expert Support",
                    description: "Dedicated support team to help you with any payment-related queries."
                  },
                  {
                    title: "Secure Transactions",
                    description: "Advanced security measures to protect your business and customers."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                    className="bg-white p-6 rounded-lg shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-blue-600 text-xl mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-blue-900 mb-3">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight"
              >
                <span className="inline-block align-middle mr-2"><FaHandHoldingUsd className="inline text-blue-200 text-2xl mb-1" /></span>
                Ready to Get Started?
              </motion.h2>
              <span className="block mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-blue-200 via-white to-blue-400 opacity-70 mb-6" />
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 mb-8 font-medium"
              >
                Let us help you find the perfect payment solution for your business
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4"
              >
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:03301759933" 
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg shadow hover:bg-blue-50 transition-colors flex items-center justify-center min-w-[180px]"
                >
                  Call Us Now
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto"
                >
                  <Link href="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow hover:bg-blue-500 transition-colors flex items-center justify-center min-w-[180px]">
                    Request a Callback
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
};

export default CardPayments; 