import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const reviews = [
  {
    name: "Tochukwu Agiliga",
    date: "Feb 2, 2025",
    rating: 5,
    text: "The package is designed for success. In my door supervisor course and CCTV Operator course, I met an amazing set of instructors who use field and class experiences to build your courage and bring you excellent performance.",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Joshua Oluwaseun",
    date: "Jan 11, 2025",
    rating: 5,
    text: "Quality driven. Ben Mccarthy is an efficient, quality driven, and hardworking lead trainer for the door supervision course. He made the topics easy to understand and digest. I appreciate his patience and attention to detail when teaching the course.",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "ASKANDIR IDDRISS",
    date: "Oct 11, 2024",
    rating: 5,
    text: "Get Licensed is the best. Get Licensed is indeed, the best place to take your security training. I just completed my Door Supervisor Training with them and was trained by Rob Worthington. Rob is the best trainer I have ever seen. You know why, its because he really trains from experience. He treated everyone fairly and makes the training very interesting, practical and experiential. I sincerely entreat everyone that seeks to take any security training course to do that with Get Licensed. You would enjoy it and learn a lot.",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Adeel Ahmed",
    date: "Feb 2, 2025",
    rating: 5,
    text: "Excellent service, very professional and helpful. The trainers were knowledgeable and made the course enjoyable. Highly recommended for anyone looking to get their SIA license.",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Mick Taylor",
    date: "Jan 11, 2025",
    rating: 5,
    text: "Great experience, the team was very supportive throughout the process. The course was well-structured and the practical training was excellent. Passed with confidence!",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Sajid Mahmood",
    date: "Oct 11, 2024",
    rating: 5,
    text: "Very professional and friendly staff. The course was well organized and the facilities were clean and comfortable. The trainers made complex topics easy to understand.",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Adeel Khan",
    date: "Sep 20, 2024",
    rating: 5,
    text: "Fantastic training, clear instructions, and very knowledgeable trainers. The practical sessions were particularly helpful and the support after the course was outstanding.",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Samantha Jones",
    date: "Aug 5, 2024",
    rating: 5,
    text: "I had a wonderful experience, everything was smooth and efficient. The booking process was easy and the staff answered all my questions promptly. Highly recommend!",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Imran Patel",
    date: "Jul 18, 2024",
    rating: 5,
    text: "The trainers were amazing and made the course enjoyable. The practical training was excellent and the theory was explained clearly. Would definitely recommend to friends and family.",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Sarah Williams",
    date: "Jun 30, 2024",
    rating: 5,
    text: "Booking was easy and the staff answered all my questions promptly. The course exceeded my expectations and I feel confident in my new skills. Thank you for the excellent training!",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Mohammed Ali",
    date: "May 22, 2024",
    rating: 5,
    text: "Great value for money. The facilities were clean and comfortable. The trainers were professional and the course material was comprehensive. Excellent experience overall.",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Lisa Brown",
    date: "Apr 10, 2024",
    rating: 5,
    text: "Passed my course with confidence thanks to the supportive team. The trainers were patient and the course was well-paced. I'm now working in security and loving it!",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "David Singh",
    date: "Mar 2, 2024",
    rating: 5,
    text: "Very informative and well-structured course. The practical sessions were particularly valuable and the trainers were experienced professionals. Highly recommend to anyone.",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "Emily Clark",
    date: "Feb 14, 2024",
    rating: 5,
    text: "The best training experience I've had. Friendly and professional staff throughout. The course was challenging but the support was excellent. Thank you for everything!",
    avatar: "/assets/customer-service.jpg"
  },
  {
    name: "James Robinson",
    date: "Jan 7, 2024",
    rating: 5,
    text: "Everything was explained clearly and the trainers were very approachable. The course was comprehensive and I feel well-prepared for my new career in security.",
    avatar: "/assets/customer-service.jpg"
  }
];

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.16)",
    transition: { duration: 0.5, type: "spring" as const },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
    transition: { duration: 0.1 },
  }),
};

const starVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.08, type: "spring" as const, stiffness: 400, damping: 15 },
  }),
};

export default function CustomerReviews() {
  // Use only the first 4 reviews for the grid
  const batch = reviews.slice(0, 4);

  return (
    <section className="w-full flex justify-center items-center min-h-[600px] pt-8 pb-36 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 0%, #eaf3fe 70%, #dbeafe 100%)" }}>
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-200/60 to-transparent rounded-full blur-2xl opacity-70 pointer-events-none" />
      <motion.div
        className="absolute -bottom-24 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-300/40 via-blue-100/30 to-white/0 rounded-full blur-3xl opacity-40 animate-pulse-slow pointer-events-none"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-60 h-60 bg-gradient-to-bl from-yellow-200/30 to-orange-200/20 rounded-full blur-2xl opacity-50 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="w-full max-w-5xl flex flex-col items-center relative z-10">
        <div className="flex flex-col items-center mb-8 px-4">
          <div className="flex items-center mb-4">
            <span className="inline-block mr-3"><img src="/assets/googlelogo.png" alt="Google" width={48} height={48} /></span>
            <span className="text-3xl md:text-4xl font-extrabold text-[#1a365d] tracking-tight text-center">Google Reviews</span>
          </div>
          <span className="text-gray-600 text-lg md:text-xl font-medium text-center">What our customers say</span>
        </div>
        {/* Responsive Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 w-full px-4">
          {/* A: Large card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
            className="md:col-span-2 md:row-span-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center hover:shadow-2xl transition-all"
          >
            <span className="font-bold text-lg text-blue-900 mb-1 text-center">{batch[0]?.name}</span>
            <div className="flex items-center mb-3 justify-center">{[...Array(batch[0]?.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-base" />)}</div>
            <blockquote className="text-gray-700 text-lg leading-relaxed italic text-center">"{batch[0]?.text}"</blockquote>
          </motion.div>
          {/* B: Tall card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            className="md:col-span-1 md:row-span-2 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center hover:shadow-2xl transition-all"
          >
            <span className="font-bold text-lg text-blue-900 mb-1 text-center">{batch[1]?.name}</span>
            <div className="flex items-center mb-3 justify-center">{[...Array(batch[1]?.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-base" />)}</div>
            <blockquote className="text-gray-700 text-base leading-relaxed italic text-center">"{batch[1]?.text}"</blockquote>
          </motion.div>
          {/* C: Small card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            className="md:col-span-1 md:row-span-1 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-all"
          >
            <span className="font-bold text-base text-blue-900 mb-1 text-center">{batch[2]?.name}</span>
            <div className="flex items-center mb-2 justify-center">{[...Array(batch[2]?.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-sm" />)}</div>
            <blockquote className="text-gray-700 text-sm leading-relaxed italic text-center">"{batch[2]?.text}"</blockquote>
          </motion.div>
          {/* D: Small card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
            className="md:col-span-1 md:row-span-1 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-all"
          >
            <span className="font-bold text-base text-blue-900 mb-1 text-center">{batch[3]?.name}</span>
            <div className="flex items-center mb-2 justify-center">{[...Array(batch[3]?.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-sm" />)}</div>
            <blockquote className="text-gray-700 text-sm leading-relaxed italic text-center">"{batch[3]?.text}"</blockquote>
          </motion.div>
        </div>
        {/* See more Reviews button */}
        <a
          href="https://www.google.com/maps/place/Oaktree+Business+Support+Partners/@53.6159638,-2.1636576,492m/data=!3m1!1e3!4m8!3m7!1s0x8e79490568da7799:0x8a3d7c98fbc607e3!8m2!3d53.6159606!4d-2.1610827!9m1!1b1!16s%2Fg%2F11t4x20dc3?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all text-lg"
        >
          See more Reviews
        </a>
      </div>
    </section>
  );
} 