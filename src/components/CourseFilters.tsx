import { useState } from 'react';

interface CourseFiltersProps {
  onSort: (sortType: 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc') => void;
}

export default function CourseFilters({ onSort }: CourseFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortType, setSortType] = useState<string>('');

  const handleSort = (type: 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc') => {
    setSortType(type);
    onSort(type);
    setIsOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
          >
            <span>Sort by</span>
            <svg
              className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu">
                <button
                  onClick={() => handleSort('price-asc')}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortType === 'price-asc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  role="menuitem"
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => handleSort('price-desc')}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortType === 'price-desc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  role="menuitem"
                >
                  Price: High to Low
                </button>
                <button
                  onClick={() => handleSort('duration-asc')}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortType === 'duration-asc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  role="menuitem"
                >
                  Duration: Short to Long
                </button>
                <button
                  onClick={() => handleSort('duration-desc')}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortType === 'duration-desc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  role="menuitem"
                >
                  Duration: Long to Short
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 