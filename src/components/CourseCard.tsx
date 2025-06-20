import Image from 'next/image';
import { useState } from 'react';

interface Course {
  id: number;
  title: string;
  price: string;
  duration: string;
  description: string;
  image: string;
}

interface CourseCardProps {
  course: Course;
  onAddToCart: (course: Course) => void;
}

export default function CourseCard({ course, onAddToCart }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">{course.price}</span>
            <span className="text-gray-500 ml-2">/ {course.duration}</span>
          </div>
          <button
            onClick={() => onAddToCart(course)}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
            aria-label="Add to cart"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 