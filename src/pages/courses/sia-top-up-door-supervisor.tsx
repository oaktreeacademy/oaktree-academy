import { useState } from 'react';
import BookingModal from '../../components/BookingModal';
import Image from 'next/image';

const images = [
  '/assets/refresher.jpg',
  '/assets/security-header.jpg',
  '/assets/trainer.jpg',
];

export default function SiaTopUpDoorSupervisor() {
  const [showBooking, setShowBooking] = useState(false);
  const [slide, setSlide] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">SIA Top-Up Refresher Training for Door Supervisors</h1>
        <div className="relative w-full h-64 mb-6">
          <Image src={images[slide]} alt="SIA Top-Up Door Supervisor" fill className="object-cover rounded-xl" />
          <button onClick={() => setSlide((slide - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">&#8592;</button>
          <button onClick={() => setSlide((slide + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">&#8594;</button>
        </div>
        <p className="mb-6 text-lg">Refresher training for SIA Door Supervisors to update skills and knowledge as per latest SIA requirements. <br/> <br/> <b>Duration:</b> 1 day <br/> <b>Price:</b> £150</p>
        <button onClick={() => setShowBooking(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Book Now</button>
        {showBooking && <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} course={{ title: 'SIA Top-Up Refresher Training for Door Supervisors', price: '£150', duration: '1 day' }} />}
      </div>
    </div>
  );
} 