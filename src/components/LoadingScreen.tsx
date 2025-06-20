import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/assets/logo.png"
            alt="Oaktree Academy Logo"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
} 