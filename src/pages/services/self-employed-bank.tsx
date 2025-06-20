import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import ServiceLayout from '../../components/layouts/ServiceLayout';
import Navbar from '../../components/Navbar';

export default function SelfEmployedBank() {
  return (
    <ServiceLayout>
      <Navbar />
      <Head>
        <title>Self-Employed Business Bank Account | Oaktree Academy</title>
        <meta name="description" content="Get a business bank account tailored for self-employed professionals. Quick setup, free transfers, and cashback offers." />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Self-Employed Business Bank Account
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Get a business bank account tailored for self-employed professionals. Quick setup, free transfers, and cashback offers.
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
              className="bg-blue-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4">Quick Setup</h3>
              <p className="text-gray-600">Get your account in minutes with our streamlined application process.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4">Free Transfers</h3>
              <p className="text-gray-600">12 months of free bank transfers to help you manage your finances.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-blue-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4">Cashback Offer</h3>
              <p className="text-gray-600">Get £100 cashback when you open your account and make your first transaction.</p>
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
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Open your self-employed business bank account today and take advantage of our exclusive offers.
            </p>
            <div className="mt-8">
              <a
                href="https://www.tide.co/partners/oaktree-business-support-partners/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Open Account Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </ServiceLayout>
  );
} 