import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import ServiceLayout from '../../components/layouts/ServiceLayout';
import Navbar from '../../components/Navbar';

export default function Insurance() {
  return (
    <ServiceLayout>
      <Navbar />
      <Head>
        <title>Business Insurance | Oaktree Academy</title>
        <meta name="description" content="Get comprehensive business insurance solutions to protect your business." />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Business Insurance
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              Get comprehensive business insurance solutions to protect your business.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-indigo-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Comprehensive Coverage</h3>
              <p className="text-gray-600">Ensure your business is protected with our comprehensive insurance coverage.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-indigo-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Tailored Policies</h3>
              <p className="text-gray-600">Get insurance policies tailored to your specific business needs.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-indigo-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Expert Support</h3>
              <p className="text-gray-600">Receive expert support and guidance to help you choose the right insurance solutions.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Ready to protect your business?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Contact us today to learn more about our business insurance solutions and how they can benefit your business.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </ServiceLayout>
  );
} 