import { motion } from 'framer-motion';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { FaPhoneAlt, FaShieldAlt, FaUserSecret, FaMapMarkerAlt, FaRegSmile, FaRegCheckCircle, FaRegClock, FaRegBuilding, FaRegStar, FaUserTie, FaBalanceScale, FaMobileAlt, FaComments, FaSignal, FaUserCheck } from 'react-icons/fa';

export default function Phone() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white min-h-screen flex flex-col">
      <Head>
        <title>Business Phone Service | Oaktree B|S|P</title>
        <meta name="description" content="Free business phone number, call recording, dashboard, and more. Look professional and stay connected with Oaktree Business Support Partners." />
      </Head>
      <Navbar />
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full bg-gradient-to-r from-purple-700 to-purple-500 py-16 px-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Business Phone Service</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-purple-100 mb-6 tracking-wide">FREE BUSINESS NUMBER, FOR A LIMITED TIME ONLY</h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-purple-50 mb-8"
        >
          Get your new business phone number in minutes. Look more professional, keep your personal number private, and enjoy free extras like call recording and an online dashboard.
        </motion.p>
        <a href="#get-started" className="inline-block mt-4 px-8 py-3 bg-white text-purple-700 font-bold rounded-lg shadow hover:bg-purple-100 transition">Get Your Free Number</a>
      </motion.section>

      {/* FEATURE GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Unique Number */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-purple-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <FaPhoneAlt size={40} className="text-purple-700 mb-4" />
              <h3 className="text-xl font-bold text-purple-900 mb-2">New Unique Number</h3>
              <p className="text-gray-700 text-center">A brand-new phone number dedicated to your company. Keep your home or mobile number private.</p>
            </motion.div>
            {/* Free Add-ons */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-purple-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <FaRegCheckCircle size={40} className="text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-purple-900 mb-2">Free Add-ons</h3>
              <p className="text-gray-700 text-center">Call recording, professional welcome message, and an online dashboard are all complimentary.</p>
            </motion.div>
            {/* Professional Image */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-purple-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <FaRegStar size={40} className="text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-purple-900 mb-2">Professional Approach</h3>
              <p className="text-gray-700 text-center">Appear larger, more credible, and win more business with a dedicated business number.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS SECTION */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Why a Business Phone Number?</h2>
            <div className="flex items-start gap-4">
              <FaShieldAlt size={32} className="text-purple-700 mt-1" />
              <div>
                <span className="font-bold">Trust:</span> A local or national number builds trust and credibility with your clients.
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaUserSecret size={32} className="text-purple-700 mt-1" />
              <div>
                <span className="font-bold">Privacy:</span> Keep your personal number private and maintain a healthy work/life balance.
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt size={32} className="text-purple-700 mt-1" />
              <div>
                <span className="font-bold">Location:</span> Show your business is established in your chosen area, not just working from a mobile.
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaRegSmile size={32} className="text-purple-700 mt-1" />
              <div>
                <span className="font-bold">Work/Life Balance:</span> Separate business and personal calls for a healthier lifestyle.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Image src="/assets/consultation.jpg" alt="Business Phone Service" width={500} height={400} className="rounded-2xl shadow-xl object-cover" />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Why Choose Us?</h2>
            <div className="flex items-start gap-4">
              <FaUserTie size={32} className="text-purple-700 mt-1" />
              <div>
                <span className="font-bold">Cleartone Partnership:</span> We partner with Cleartone, the UK's leading provider for business phone numbers for sole traders and small businesses looking to scale.
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaBalanceScale size={32} className="text-purple-700 mt-1" />
              <div>
                <span className="font-bold">Work/Life Balance:</span> Separate business and personal calls, improve your work/life balance, and maintain privacy.
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaUserSecret size={32} className="text-purple-700 mt-1" />
              <div>
                <span className="font-bold">Professionalism & Privacy:</span> Look more professional, keep your personal number private, and never miss a call.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Image src="/assets/business-meeting.jpg" alt="Business Meeting" width={500} height={400} className="rounded-2xl shadow-xl object-cover" />
          </div>
        </div>
      </section>

      {/* WHAT YOU GET SECTION */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-8 text-center">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <FaPhoneAlt size={36} className="text-purple-700 mb-2" />
              <div className="font-bold mb-1">New unique number</div>
              <div className="text-gray-700 text-center text-sm">A dedicated business number you can take anywhere.</div>
            </div>
            <div className="flex flex-col items-center">
              <FaRegCheckCircle size={36} className="text-green-600 mb-2" />
              <div className="font-bold mb-1">Free add-ons</div>
              <div className="text-gray-700 text-center text-sm">Call recording, welcome message, and online dashboard included.</div>
            </div>
            <div className="flex flex-col items-center">
              <FaMobileAlt size={36} className="text-purple-700 mb-2" />
              <div className="font-bold mb-1">Portability</div>
              <div className="text-gray-700 text-center text-sm">Forward calls to any landline or mobile. Take your number with you if you move.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 SECONDS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaRegClock size={40} className="text-purple-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-purple-900 mb-4">You Only Have 7 Seconds</h2>
          <p className="text-lg text-gray-800 mb-4">First impressions matter. People form an opinion of your business in seconds. A professional business phone number helps you build trust and credibility instantly.</p>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-8 text-center">Benefits of a Business Phone Number</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <FaShieldAlt size={36} className="text-purple-700 mb-2" />
              <div className="font-bold mb-1">Trust</div>
              <div className="text-gray-700 text-center text-sm">A local or national number builds trust and credibility with your clients.</div>
            </div>
            <div className="flex flex-col items-center">
              <FaUserSecret size={36} className="text-purple-700 mb-2" />
              <div className="font-bold mb-1">Privacy</div>
              <div className="text-gray-700 text-center text-sm">Keep your personal number private and maintain a healthy work/life balance.</div>
            </div>
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt size={36} className="text-purple-700 mb-2" />
              <div className="font-bold mb-1">Location</div>
              <div className="text-gray-700 text-center text-sm">Show your business is established in your chosen area, not just working from a mobile.</div>
            </div>
            <div className="flex flex-col items-center">
              <FaRegStar size={36} className="text-yellow-500 mb-2" />
              <div className="font-bold mb-1">Professionalism</div>
              <div className="text-gray-700 text-center text-sm">Appear larger, more credible, and win more business with a dedicated business number.</div>
            </div>
            <div className="flex flex-col items-center">
              <FaSignal size={36} className="text-purple-700 mb-2" />
              <div className="font-bold mb-1">Stay Connected</div>
              <div className="text-gray-700 text-center text-sm">No need to worry about mobile phone signal. Stay connected anywhere.</div>
            </div>
            <div className="flex flex-col items-center">
              <FaUserCheck size={36} className="text-purple-700 mb-2" />
              <div className="font-bold mb-1">Personalized Attention</div>
              <div className="text-gray-700 text-center text-sm">Get a professional welcome message and personalized support.</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 bg-white" id="get-started">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <FaRegBuilding size={36} className="text-purple-700 mb-2" />
              <div className="font-bold mb-1">Choose your number</div>
              <div className="text-gray-700 text-center text-sm">Pick a local, national, or freephone number for your business.</div>
            </div>
            <div className="flex flex-col items-center">
              <FaRegClock size={36} className="text-purple-700 mb-2" />
              <div className="font-bold mb-1">Set up in minutes</div>
              <div className="text-gray-700 text-center text-sm">Get your number and dashboard access fast—no waiting, no hassle.</div>
            </div>
            <div className="flex flex-col items-center">
              <FaPhoneAlt size={36} className="text-purple-700 mb-2" />
              <div className="font-bold mb-1">Start taking calls</div>
              <div className="text-gray-700 text-center text-sm">Forward calls to any landline or mobile, and never miss a business call.</div>
            </div>
            <div className="flex flex-col items-center">
              <FaRegCheckCircle size={36} className="text-green-600 mb-2" />
              <div className="font-bold mb-1">Enjoy free extras</div>
              <div className="text-gray-700 text-center text-sm">Call recording, welcome message, and online dashboard included.</div>
            </div>
          </div>
          <div className="text-center mt-12">
            <a href="tel:03301759933" className="inline-block px-8 py-3 bg-purple-700 text-white font-bold rounded-lg shadow hover:bg-purple-800 transition">Call us for your free business phone number</a>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-purple-100 to-purple-200 py-16 px-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900 mb-4">Ready to get started?</h2>
        <p className="text-lg md:text-xl text-purple-800 mb-6">Get your free business phone number and start looking more professional today.</p>
        <a href="tel:03301759933" className="inline-block mt-4 px-8 py-3 bg-purple-700 text-white font-bold rounded-lg shadow hover:bg-purple-800 transition">Call 0330 175 9933</a>
      </motion.section>
      <Footer />
    </div>
  );
} 