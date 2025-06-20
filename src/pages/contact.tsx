import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/assets/trainer.jpg',
    title: 'Our Training Center',
    description: 'State-of-the-art facilities for professional training'
  },
  {
    id: 2,
    image: '/assets/security-guard.jpg',
    title: 'Expert Instructors',
    description: 'Learn from industry professionals'
  },
  {
    id: 3,
    image: '/assets/first-aid.jpg',
    title: 'Practical Training',
    description: 'Hands-on experience in real-world scenarios'
  }
];

export default function Contact() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Get in touch with our team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-2 block w-full rounded-lg border-2 border-blue-200 bg-blue-50/60 px-4 py-3 text-base font-medium shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:bg-white transition placeholder-gray-400"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-2 block w-full rounded-lg border-2 border-blue-200 bg-blue-50/60 px-4 py-3 text-base font-medium shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:bg-white transition placeholder-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-2 block w-full rounded-lg border-2 border-blue-200 bg-blue-50/60 px-4 py-3 text-base font-medium shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:bg-white transition placeholder-gray-400"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-2 block w-full rounded-lg border-2 border-blue-200 bg-blue-50/60 px-4 py-3 text-base font-medium shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:bg-white transition placeholder-gray-400"
                    placeholder="Type your message here..."
                  />
                </div>
                  <button
                    type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                Send Message
                  </button>
              </form>
          </div>

          {/* Slideshow */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold">{slide.title}</h3>
                    <p className="mt-2">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <svg className="h-12 w-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Phone</h3>
            <p className="mt-2 text-gray-600">0330 175 9933</p>
            <p className="text-gray-600">0788 0080 201</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <svg className="h-12 w-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Email</h3>
            <p className="mt-2 text-gray-600">info@oaktreeacademy.co.uk</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <svg className="h-12 w-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Address</h3>
            <p className="mt-2 text-gray-600">THE COURT HOUSE, TOWN MEADOWS, ROCHDALE, OL16 1AG</p>
          </div>
        </div>
      </div>
    </div>
  );
} 