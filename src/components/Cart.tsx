import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  price: string;
  duration: string;
  description: string;
  image: string;
}

interface CartProps {
  courses: Course[];
  onClose: () => void;
}

export default function Cart({ courses, onClose }: CartProps) {
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [deposit, setDeposit] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total and deposit (30% of total)
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + parseFloat(item.price.replace('£', ''));
    }, 0);
    setTotal(totalAmount);
    setDeposit(totalAmount * 0.3);
  }, [cartItems]);

  const removeFromCart = (courseId: number) => {
    setCartItems(cartItems.filter(item => item.id !== courseId));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Your cart is empty</p>
              <Link href="/courses">
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  Browse Courses
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900">{item.price}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-lg font-medium text-gray-900">
                  <p>Total</p>
                  <p>£{total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <p>Required Deposit (30%)</p>
                  <p>£{deposit.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/checkout">
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 