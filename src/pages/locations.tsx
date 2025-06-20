import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { locationData } from '../data/locations';
import { motion } from 'framer-motion';

export default function Locations() {
  const [selectedLocation, setSelectedLocation] = useState(locationData[0]);
  const [search, setSearch] = useState('');

  const filteredLocations = locationData.filter(loc =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Training Centers
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Find your nearest training center and start your journey
          </p>
          <p className="mt-2 text-lg text-gray-500">
            {locationData.length} locations across the UK
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search locations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Locations List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredLocations.length === 0 ? (
              <div className="text-center text-gray-500">No locations found.</div>
            ) : (
              filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-300 ${
                    selectedLocation.id === location.id 
                      ? 'ring-2 ring-blue-600 transform scale-[1.02]' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{location.name}</h3>
                      <p className="mt-2 text-gray-600">{location.name} Training Centre</p>
                      <a 
                        href={`tel:${location.phone}`}
                        className="mt-2 text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                      >
                        <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {location.phone}
                      </a>
                    </div>
                    <Link href={`/areas/${location.slug}`}>
                      <button className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                        View Details
                        <svg className="h-5 w-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-[600px]">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(selectedLocation.name + ' Training Centre, UK')}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 