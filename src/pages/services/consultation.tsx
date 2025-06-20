import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import { FaChartBar, FaPiggyBank, FaHome, FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

export default function Consultation() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen flex flex-col">
      <Head>
        <title>Free Business Consultation Advice | Oaktree B|S|P</title>
        <meta name="description" content="Exceed your expectations with free business consultation advice, exclusive offers, and expert guidance from Oaktree Business Support Partners." />
      </Head>
      <Navbar />
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full bg-gradient-to-r from-green-700 to-green-500 py-16 px-4 text-center"
      >
        <div className="max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 mb-8 flex flex-col items-center relative overflow-visible">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl select-none">🎉</div>
          <div className="text-lg font-bold text-green-800 mb-2 uppercase tracking-wide flex items-center gap-2">We're Celebrating <span className="animate-bounce">🎊</span> <span className="text-yellow-600">ONE-TIME OFFER!</span></div>
          <div className="text-3xl font-extrabold text-green-900 mb-2">FREE Business Consultation</div>
          <div className="text-green-900 mb-2 font-medium">for anyone who opens a Tide Business Account using our promo code:</div>
          <span className="inline-block bg-yellow-300 text-green-900 px-5 py-2 rounded-full font-extrabold text-lg tracking-wider mb-2 shadow-lg border-2 border-yellow-400">OAKTREEBSP</span>
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            className="text-green-900 font-extrabold mb-2 text-xl flex items-center gap-2"
          >
            <span>and get</span> <span className="text-green-700">£100 Cashback!</span> <span className="text-2xl">💸</span>
          </motion.div>
          <div className="text-green-700 italic text-sm mt-1">*Limited time only. Don't miss out!</div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-green-50 mb-8"
        >
          Oaktree exists to solve the critical issues our clients face—big or small. Our unique approach sets us apart and drives our success. We offer a wide range of services and solutions to help you facilitate change, realise your vision, and boost performance and productivity.
        </motion.p>
        <a href="#" className="inline-block mt-4 px-8 py-3 bg-white text-green-700 font-bold rounded-lg shadow hover:bg-green-100 transition">Get Your Free Consultation</a>
      </motion.section>

      {/* ANIMATED PICTURE BOXES SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image src="/assets/business-meeting.jpg" alt="Business Meeting" width={700} height={500} className="object-cover w-full h-96" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="bg-green-50 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-2">Open a Tide business account for FREE</h3>
              <p className="text-green-800">Register a Limited company For Free</p>
              <p className="text-green-800">Business Meeting</p>
              <p className="text-green-800">Strategic Planning Session</p>
              <p className="text-green-900 font-bold mt-2">
                <a href="/services/grow-your-business" className="underline hover:text-green-700 transition">GROW YOUR BUSINESS</a>
              </p>
            </div>
            <div className="bg-green-100 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-2">Branding & Positioning Analysis</h3>
              <p className="text-green-800">ACHIEVE YOUR GOALS</p>
              <p className="text-green-800">Brainstorming</p>
              <p className="text-green-800">Business Meeting</p>
              <p className="text-green-800">Introductory Consultation</p>
              <p className="text-green-900 font-bold mt-2">EXPERT GUIDANCE</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-green-100 to-green-300 py-16 px-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-4">Get started: open a Tide business bank account</h2>
        <p className="text-lg md:text-xl text-green-800 mb-6">Register a limited company and open a business bank account all in one streamlined process.</p>
        <p className="text-green-900 font-bold mb-4">Our team of experts are ready to help you develop strategies for not only surviving, but thriving in the future. Give us a call today to set up your first consultation.</p>
        <div className="flex flex-col items-center space-y-2 mb-6">
          <span className="text-2xl font-bold text-green-800">📞 0330 175 9933</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white/90 p-8 rounded-2xl shadow-xl border border-green-200 flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-4 text-green-700"
            >
              <FaChartBar size={48} />
            </motion.div>
            <div className="text-lg text-gray-900 font-semibold mb-4 text-center leading-relaxed">
              <span className="font-bold text-green-900">Expert guidance:</span> Our team is ready to help you develop strategies for not only surviving, but thriving. <br />
              <span className="font-bold">Call us:</span> <span className="text-green-700 font-bold">0330 175 9933</span>
            </div>
            <a href="https://www.tide.co/partners/world-foodie-festival-ltd/" target="_blank" rel="noopener noreferrer" className="mt-auto text-green-900 underline font-bold text-base flex items-center gap-2">
              ✅ Free business consultation
            </a>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white/90 p-8 rounded-2xl shadow-xl border border-green-200 flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="mb-4 text-green-700"
            >
              <FaPiggyBank size={48} />
            </motion.div>
            <div className="text-lg text-gray-900 font-semibold mb-4 text-center leading-relaxed">
              <span className="font-bold text-green-900">£100 cashback + 1 year free bank transfers:</span> Open a Tide business account with us and credit it with at least £1 within 3 months to claim your reward.
            </div>
            <a href="https://www.tide.co/partners/oaktree-business-support-partners/" target="_blank" rel="noopener noreferrer" className="mt-auto text-green-900 underline font-bold text-base flex items-center gap-2">
              ✅ Free business bank accounts
            </a>
          </motion.div>
          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/90 p-8 rounded-2xl shadow-xl border border-green-200 flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="mb-4 text-green-700"
            >
              <FaHome size={48} />
            </motion.div>
            <div className="text-lg text-gray-900 font-semibold mb-4 text-center leading-relaxed">
              <span className="font-bold text-green-900">Ready to be your own boss?</span> Register your limited company and open a business account all in one go for free. Get £100 cashback and 1 year free bank transfers. Open your account within 5 mins.
            </div>
            <a href="https://www.tide.co/partners/oaktree-business-support-partners/?cofo" target="_blank" rel="noopener noreferrer" className="mt-auto text-green-900 underline font-bold text-base flex items-center gap-2">
              ✅ Free Companies House formation
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* CUSTOM FOOTER SECTION */}
      <footer className="bg-green-100 text-green-900 pt-12 pb-6 mt-12 border-t border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 text-center md:text-left">
          {/* Pearson/SIA column */}
          <div className="flex-1 flex flex-col items-center md:items-start gap-4 justify-center">
            <div className="flex flex-col items-center md:items-start gap-2">
              <img src="/assets/pearson.png" alt="Pearson" className="h-14 w-auto bg-white rounded-full p-2 shadow" />
              <span className="text-base font-semibold">Pearson</span>
            </div>
            <div className="text-sm leading-relaxed max-w-xs mt-2">
              Join Oakree, an accredited provider of SIA courses approved by PEARSON. Gain essential skills for a successful security career.
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 mt-4">
              <img src="/assets/sia.png" alt="SIA" className="h-10 w-auto bg-white rounded-full p-2 shadow" />
              <span className="text-base font-semibold">Security Industry Authority</span>
            </div>
            <div className="text-sm leading-relaxed max-w-xs mt-2">
              Oaktree Training provides SIA license-linked courses to enhance your security skills. Join us to advance your with our expert training!
            </div>
          </div>
          {/* Oaktree address/contact column */}
          <div className="flex-1 flex flex-col items-center md:items-start gap-2 justify-center">
            <h4 className="text-lg font-bold mb-1">Contact</h4>
            <div className="font-semibold">HEAD OFFICE</div>
            <div className="leading-relaxed">
              Oaktree B|S|P<br />Thte Court House<br />Town Meadows<br />Rochdale<br />OL16 1AG<br />NEXT DOOR TO THE POLICE Station!
            </div>
            <div className="mt-2 font-bold text-green-800">☎️ 0330 175 9933</div>
            <div className="font-bold text-green-800">📱 0788 0080 201</div>
          </div>
          {/* London address column */}
          <div className="flex-1 flex flex-col items-center md:items-start gap-2 justify-center">
            <h4 className="text-lg font-bold mb-1">Socials</h4>
            <div className="flex gap-4 mb-3 justify-center md:justify-start">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook size={28} className="text-blue-600 hover:text-blue-800 transition" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram size={28} className="text-pink-500 hover:text-pink-700 transition" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok size={28} className="text-black hover:text-gray-700 transition" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube size={28} className="text-red-600 hover:text-red-800 transition" />
              </a>
            </div>
            <div className="font-bold text-lg mb-1 mt-2">Address</div>
            <div className="leading-relaxed">
              71–75 Shelton Street<br />Covent Garden<br />London<br /><span className="font-bold underline">WC2H 9JQ</span>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-green-800 mt-8">
          ©2021 By Oaktree Business Support Partners.<br />Registered in England number: 13886230 VAT Number :404658303
        </div>
      </footer>
    </div>
  );
} 