import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import ServiceLayout from '../../components/layouts/ServiceLayout';
import Navbar from '../../components/Navbar';

export default function Solar() {
  return (
    <ServiceLayout>
      <Navbar />
      <Head>
        <title>Solar Panels | Oaktree Academy</title>
        <meta name="description" content="Make your business more environmentally friendly with our solar panel solutions." />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-600 to-yellow-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Solar Panels
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-yellow-100">
              Make your business more environmentally friendly with our solar panel solutions.
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
              className="bg-yellow-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-yellow-900 mb-4">Eco-Friendly</h3>
              <p className="text-gray-600">Reduce your carbon footprint with sustainable energy solutions.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-yellow-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-yellow-900 mb-4">Cost Savings</h3>
              <p className="text-gray-600">Lower your energy bills with efficient solar panel installations.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-yellow-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-yellow-900 mb-4">Expert Installation</h3>
              <p className="text-gray-600">Professional installation and maintenance services for your solar panels.</p>
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
              Ready to go green?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Contact us today to learn more about our solar panel solutions and how they can benefit your business.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </ServiceLayout>
  );
} 