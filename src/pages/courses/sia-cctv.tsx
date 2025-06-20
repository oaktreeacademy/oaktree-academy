import { useState } from 'react';
import BookingModal from '../../components/BookingModal';
import Image from 'next/image';

const images = [
  '/assets/cctv.jpg',
  '/assets/security-header.jpg',
  '/assets/trainer.jpg',
];

export default function SiaCctv() {
  const [showBooking, setShowBooking] = useState(false);
  const [slide, setSlide] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">SIA CCTV Training</h1>
        <div className="relative w-full h-64 mb-6">
          <Image src={images[slide]} alt="SIA CCTV" fill className="object-cover rounded-xl" />
          <button onClick={() => setSlide((slide - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">&#8592;</button>
          <button onClick={() => setSlide((slide + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">&#8594;</button>
        </div>
        <p className="mb-6 text-lg">Professional CCTV operator training covering surveillance, privacy, and operational procedures. <br/> <br/> <b>Duration:</b> 24 hr <br/> <b>Price:</b> £185</p>
        <button onClick={() => setShowBooking(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Book Now</button>
        {showBooking && <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} course={{ title: 'SIA CCTV Training', price: '£185', duration: '24 hr' }} />}
      </div>
    </div>
  );
} 