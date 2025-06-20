import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCreditCard, FaMobileAlt, FaChartLine, FaUsers, FaHandshake } from 'react-icons/fa';
import Image from 'next/image';

export default function BusinessBankAccount() {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: <FaShieldAlt className="text-blue-600 text-2xl" />,
      title: 'Secure Banking',
      description: 'Advanced security measures to protect your business finances'
    },
    {
      icon: <FaCreditCard className="text-blue-600 text-2xl" />,
      title: 'Business Cards',
      description: 'Dedicated business cards with spending controls and rewards'
    },
    {
      icon: <FaMobileAlt className="text-blue-600 text-2xl" />,
      title: 'Mobile Banking',
      description: 'Manage your business finances on the go with our mobile app'
    },
    {
      icon: <FaChartLine className="text-blue-600 text-2xl" />,
      title: 'Financial Insights',
      description: 'Detailed analytics and reporting for better financial decisions'
    },
    {
      icon: <FaUsers className="text-blue-600 text-2xl" />,
      title: 'Team Management',
      description: 'Add team members with controlled access and permissions'
    },
    {
      icon: <FaHandshake className="text-blue-600 text-2xl" />,
      title: 'Dedicated Support',
      description: '24/7 business banking support for your needs'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-6"
            >
              Business Bank Account
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto"
            >
              Streamline your business finances with our comprehensive banking solutions designed for modern businesses.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Business Banking?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get the tools and support you need to grow your business with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Open your business bank account today and take control of your finances.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
} 