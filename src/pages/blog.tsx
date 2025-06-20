import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Blog() {
  const [showPost1, setShowPost1] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-blue-700 transition">Some Effective Steps to Starting a Business in the UK</h3>
                  <p className="text-gray-700 mb-6 line-clamp-4">The UK is a booming market for start-ups, but only 40% of businesses make it beyond the three-year mark. Learn the key steps to building a strong foundation for your business, from SWOT analysis to branding, funding, and marketing. Get practical advice and avoid common pitfalls.</p>
                  <button
                    onClick={() => setShowPost1(true)}
                    className="mt-auto inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition group"
                  >
                    Read More <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
              {/* Add other blog posts here */}
            </div>
          </div>
        </motion.section>
      </main>

      {/* Modal for Blog Post 1 */}
      <AnimatePresence>
        {showPost1 && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.95, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 font-bold"
                onClick={() => setShowPost1(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h2 className="text-3xl font-bold text-blue-900 mb-3">Some effective steps to starting a business in the United Kingdom</h2>
                  <div className="flex items-center text-gray-500 space-x-4">
                    <span>Oaktree apprentice</span>
                    <span>&middot;</span>
                    <span>Jul 27, 2022</span>
                    <span>&middot;</span>
                    <span>15 min read</span>
                  </div>
                </div>

                <div className="prose max-w-none text-gray-800">
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <h2 className="text-3xl font-bold text-blue-900 mb-3">Some effective steps to starting a business in the United Kingdom</h2>
                      <div className="flex items-center text-gray-500 space-x-4">
                        <span>Oaktree apprentice</span>
                        <span>&middot;</span>
                        <span>Jul 27, 2022</span>
                        <span>&middot;</span>
                        <span>15 min read</span>
                      </div>
                    </div>

                    <p className="text-xl leading-relaxed">The UK is a booming market for start-ups, with approximately 672,890 new companies registered every year.</p>
                    
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                      <p className="text-blue-900 font-semibold mb-2">Key Statistics:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>42% of startup businesses fail due to no market need</li>
                        <li>29% fail due to running out of cash</li>
                        <li>23% fail due to wrong team composition</li>
                        <li>19% are outcompeted</li>
                      </ul>
                    </div>

                    <p>But while registering is an important part of getting started, it's no guarantee of success. Only 40% of businesses make it beyond the three-year mark. Why? Because starting a successful business requires resolute planning and preparation.</p>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-blue-900 mb-4">Essential Steps to Success:</h3>
                      <ol className="list-decimal list-inside space-y-3">
                        <li>Put your startup idea to the test with SWOT analysis</li>
                        <li>Learn about business laws and regulations</li>
                        <li>Create a comprehensive business plan</li>
                        <li>Choose the right business structure</li>
                        <li>Build a strong brand identity</li>
                        <li>Calculate costs and secure funding</li>
                        <li>Develop a marketing strategy</li>
                      </ol>
                    </div>

                    <p>Before you launch, you need to build a strong foundation that details your idea and unique value proposition (UVP), how you will structure and market your business and how you will set up your business finances.</p>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                      <h3 className="text-xl font-bold text-green-900 mb-3">Ready to Start?</h3>
                      <p className="mb-4">Register your company for free with Tide and get:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Free company formation</li>
                        <li>Free business bank account</li>
                        <li>£100 cashback bonus</li>
                        <li>No credit checks required</li>
                      </ul>
                    </div>

                    <div className="flex justify-center space-x-4 mt-8">
                      <a href="#" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">
                        Register Now
                        <FaArrowRight className="ml-2" />
                      </a>
                      <button
                        onClick={() => setShowPost1(false)}
                        className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
} 