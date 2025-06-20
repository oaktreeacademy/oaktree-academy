import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaUserFriends, FaFileAlt } from 'react-icons/fa';
import { HiOutlineQuestionMarkCircle, HiOutlineSparkles, HiChevronDown } from 'react-icons/hi';
import Cart from './Cart';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems = {
    home: { label: 'Home', href: '/' },
    location: { label: 'Location', href: '/locations' },
    services: {
      label: 'Services',
      items: [
        { label: 'SIA Security Guard Licences Training', href: '/services/security-guard-training' },
        { label: 'SIA Door Supervisor Course Licence', href: '/services/door-supervisor-course' },
        { label: 'SIA Close Protection Course', href: '/services/close-protection-course' },
        { label: 'SIA CCTV Training', href: '/services/cctv-training' },
        { label: 'SIA Top-Up Refresher Course', href: '/services/refresher-course' },
        { label: 'SIA Train the Trainer Course', href: '/services/train-the-trainer' },
        { label: 'Security Guard Courses Near Me', href: '/services/courses-near-me' },
        { label: 'Security Services', href: '/services/security-services' },
        { label: 'Commitment to Security Guard Services', href: '/services/commitment' },
        { label: 'Online Business Bank Account', href: '/services/business-bank' },
        { label: 'Self-Employed Business Bank Account', href: '/services/self-employed-bank' },
        { label: 'Free Business Consultation', href: '/services/consultation' },
        { label: 'Business Phone Service', href: '/services/phone' },
        { label: 'Card Payments', href: '/services/card-payments' },
        { label: 'Business Insurance', href: '/services/insurance' },
        { label: 'Solar Panels', href: '/services/solar' },
      ]
    },
    support: {
      label: 'Support',
      items: [
        { label: 'How to Become an SIA Trainer', href: '/support/become-trainer' },
        { label: 'Empowering Women to Join SIA Security', href: '/support/women-in-security' },
        { label: 'Employers', href: '/support/employers' },
        { label: 'Get Ahead with Oaktree', href: '/support/get-ahead' },
        { label: 'Security Experts', href: '/support/security-experts' },
        { label: 'Female Entrepreneurs', href: '/support/female-entrepreneurs' },
        { label: 'Partner With Us', href: '/support/partner' },
        { label: 'Charity Projects', href: '/support/charity' },
      ]
    },
    resources: {
      label: 'Resources',
      items: [
        { label: 'About Oaktree Training Academy', href: '/resources/about-oaktree' },
        { label: 'What is SIA', href: '/resources/what-is-sia' },
        { label: 'SIA Security Guard Licence Rochdale', href: '/resources/rochdale-licence' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact Us', href: '/contact' },
      ]
    },
    about: { label: 'About Us', href: '/about' },
  };

  const allLocations = [
    "Aylesbury","Barnsley","Basingstoke","Birmingham","Birmingham - Erdington","Birmingham-Central","Birmingham-Central-Icknield Port","Blackburn","Bournemouth","Bradford","Brighton","Bristol","Bristol-North","Burnley","Bushey","Cambridge","Cardiff","Chatham","Chelmsford","Cheltenham","Chester","Colchester","Coventry","Crawley","Derby","Durham","Edinburgh","Exeter","Exmouth","Glasgow","Gloucester","Guildford","Hemel Hempstead","Hull","Ipswich","Leeds","Leicester","Leicester-City Centre","Liverpool","London Ilford-Central","London-Acton","London-Aldgate","London-Barnet","London-Beckenham","London-Bermondsey","London-Blackheath","London-Bromley","London-Central","London-Clapham","London-Croydon","London-Ealing","London-East Ham","London-Enfield","London-ExCeL","London-Finsbury Park","London-Hanwell","London-Harrow","London-Hayes-and-Southall","London-Holborn","London-Ilford","London-Kingston Upon Thames","London-Lewisham","London-Mile-End","London-Park Royal","London-Putney","London-Ruislip","London-Russell Square","London-Tottenham Court Rd","London-Wembley","London-Westminster","London-Willesden Green","London-Wimbledon","London-Wood Green","London-Woolwich","Ludgershall","Luton","Manchester","Manchester-Central","Middlesbrough","Milton Keynes","Newcastle Upon Tyne","Newport","Northampton","Norwich","Nottingham","Nottingham-City Centre","Nottingham-Sherwood","Oban","Oldham","Peterborough","Plymouth","Portsmouth","Preston","Reading","Reading-City Centre","Rochdale","Salisbury","Sheffield","Slough","Slough-Windsor","Southampton","Stoke-on-Trent","Sunderland","Swansea","Swindon","Telford","Walsall","Watford","Wiltshire"
  ];
  const filteredLocations = allLocations.filter(loc =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleDropdownClick = (dropdownName: string) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
      setIsDropdownOpen(false);
    } else {
      setActiveDropdown(dropdownName);
      setIsDropdownOpen(true);
    }
  };

  const handleDropdownHover = (dropdownName: string) => {
    if (isDropdownOpen) {
      setActiveDropdown(dropdownName);
    }
  };

  return (
    <nav className="bg-white text-[#232328] px-8 py-2 flex items-center justify-between w-full shadow-md sticky top-0 z-50" ref={dropdownRef}>
      {/* Left: Logo */}
      <div className="flex items-center space-x-2 min-w-[220px] ml-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/assets/logo.png" alt="Oaktree Academy Logo" width={40} height={40} className="rounded-full" />
          <span className="font-bold text-xl tracking-wide">OAKTREE ACADEMY</span>
            </Link>
          </div>
      {/* Center: Menu */}
      <div className="flex-1 flex justify-center">
        <ul className="flex space-x-8 font-medium text-base items-center">
          <li>
            <Link 
              href={navigationItems.home.href} 
              className="hover:underline underline-offset-8 transition"
            >
              {navigationItems.home.label}
            </Link>
          </li>
          <li className="relative group">
            <button
              onClick={() => handleDropdownClick('location')}
              onMouseEnter={() => handleDropdownHover('location')}
              className={`flex items-center hover:underline underline-offset-8 transition ${router.pathname.startsWith('/locations') || router.pathname.startsWith('/areas') ? 'text-blue-700 font-bold underline' : ''}`}
            >
              Locations
              <HiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'location' ? 'rotate-180' : ''}`} />
              </button>
            <AnimatePresence>
              {activeDropdown === 'location' && (
                <motion.div
                  initial={{ opacity: 0, y: -16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 8, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.96 }}
                  transition={{ duration: 0.22, type: 'spring', stiffness: 220, damping: 22 }}
                  className="absolute left-0 mt-2 flex bg-white rounded-xl shadow-2xl border-t border-blue-100 overflow-hidden w-[700px] max-w-[90vw] z-50"
                  style={{ minHeight: '420px', boxShadow: '0 12px 48px 0 rgba(31,38,135,0.18)' }}
                >
                  {/* Left: All Locations */}
                  <div className="w-1/2 min-w-[280px] bg-white px-8 py-8 border-r border-gray-200 flex flex-col">
                    <h3 className="text-2xl font-extrabold mb-6 text-[#232328] tracking-tight flex items-center gap-2">All Locations</h3>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search locations..."
                        value={locationSearch}
                        onChange={e => setLocationSearch(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: '260px' }}>
                      <ul className="space-y-2">
                        {filteredLocations.map((loc, idx) => {
                          const slug = loc.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                          return (
                            <li key={loc}>
                              <a href={`/areas/${slug}`} className="font-medium w-full block px-2 py-1 hover:bg-blue-100 rounded-lg transition flex items-center gap-2">
                                <span className="text-lg">📍</span>
                                <span>{loc}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {/* Right: Quick Actions */}
                  <div className="w-1/2 min-w-[280px] bg-blue-50 px-8 py-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold mb-6 text-[#232328] tracking-tight">Quick Actions</h3>
                      <ul className="space-y-4">
                        <li>
                          <a href="/booking" className="group block hover:bg-blue-100 rounded-xl px-4 py-3 transition-all duration-300 font-medium leading-tight text-lg transform hover:scale-105 hover:shadow-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🎯</span>
                              <span className="group-hover:text-blue-700 transition-colors duration-300">Book Now</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="/locations" className="group block hover:bg-blue-100 rounded-xl px-4 py-3 transition-all duration-300 font-medium leading-tight text-lg transform hover:scale-105 hover:shadow-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📍</span>
                              <span className="group-hover:text-blue-700 transition-colors duration-300">See All Locations</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="/courses" className="group block hover:bg-blue-100 rounded-xl px-4 py-3 transition-all duration-300 font-medium leading-tight text-lg transform hover:scale-105 hover:shadow-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📚</span>
                              <span className="group-hover:text-blue-700 transition-colors duration-300">See All Courses</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li className="relative group">
            <button
              onClick={() => handleDropdownClick('services')}
              onMouseEnter={() => handleDropdownHover('services')}
              className={`flex items-center hover:underline underline-offset-8 transition ${router.pathname.startsWith('/services') ? 'text-blue-700 font-bold underline' : ''}`}
            >
              {navigationItems.services.label}
              <HiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, type: 'spring', stiffness: 200, damping: 22 }}
                  className="absolute left-0 mt-2 w-[600px] bg-gradient-to-br from-white via-blue-50 to-blue-100 text-[#232328] rounded-2xl shadow-2xl py-2 z-50 flex border border-blue-100"
                  style={{ overflow: 'hidden' }}
                >
                  {/* Left: Popular Services */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: 0.08, duration: 0.3, type: 'spring' }}
                    className="w-1/2 px-5 py-5 border-r border-blue-200/60 bg-transparent flex flex-col justify-between"
                  >
                    <h3 className="text-xl font-extrabold mb-4 text-[#232328] tracking-tight">Popular</h3>
                    <ul className="space-y-1.5">
                      <li><a href="/courses/sia-door-supervisor" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">SIA Door Supervisor Training</a></li>
                      <li><a href="/courses/sia-security-guard" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">SIA Security Guard Training</a></li>
                      <li><a href="/courses/sia-cctv" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">SIA CCTV Training</a></li>
                      <li><a href="/courses/sia-top-up-door-supervisor" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">SIA Top-Up Refresher Training for Door Supervisors</a></li>
                      <li><a href="/courses/sia-top-up-security-guard" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">SIA Top-Up Refresher Training for Security Guards</a></li>
                      <li><a href="/courses/personal-licence" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Personal Licence Training</a></li>
                      <li><a href="/courses/emergency-first-aid" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Emergency First Aid at Work (EFAW)</a></li>
                    </ul>
                  </motion.div>
                  {/* Right: Services */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.12, duration: 0.3, type: 'spring' }}
                    className="w-1/2 px-5 py-5 bg-transparent"
                  >
                    <h3 className="text-xl font-extrabold mb-4 text-[#232328] tracking-tight">Services</h3>
                    <ul className="space-y-1.5">
                      <li><a href="/services/business-bank" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Online Business Bank Account</a></li>
                      <li><a href="/services/self-employed-bank" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Self-Employed Business Bank Account</a></li>
                      <li><a href="/services/consultation" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Free Business Consultation</a></li>
                      <li><a href="/services/phone" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Business Phone Service</a></li>
                      <li><a href="/services/card-payments" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Card Payments</a></li>
                      <li><a href="/services/insurance" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Business Insurance</a></li>
                      <li><a href="/services/solar" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Solar Panels</a></li>
                    </ul>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li className="relative group">
            <button
              onClick={() => handleDropdownClick('support')}
              onMouseEnter={() => handleDropdownHover('support')}
              className={`flex items-center hover:underline underline-offset-8 transition ${router.pathname.startsWith('/support') ? 'text-blue-700 font-bold underline' : ''}`}
            >
              {navigationItems.support.label}
              <HiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'support' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'support' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, type: 'spring', stiffness: 200, damping: 22 }}
                  className="absolute left-0 mt-2 w-[400px] bg-gradient-to-br from-white via-blue-50 to-blue-100 text-[#232328] rounded-2xl shadow-2xl py-2 z-50 flex border border-blue-100"
                  style={{ overflow: 'hidden' }}
                >
                  <div className="w-full px-5 py-5 bg-transparent">
                    <h3 className="text-xl font-extrabold mb-4 text-[#232328] tracking-tight">Support</h3>
                    <ul className="space-y-1.5">
                      <li><a href="/support/become-trainer" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">How to Become an SIA Trainer</a></li>
                      <li><a href="/support/women-in-security" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Empowering Women to Join SIA Security</a></li>
                      <li><a href="/support/employers" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Employers</a></li>
                      <li><a href="/support/get-ahead" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Get Ahead with Oaktree</a></li>
                      <li><a href="/support/security-experts" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Security Experts</a></li>
                      <li><a href="/support/female-entrepreneurs" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Female Entrepreneurs</a></li>
                      <li><a href="/support/partner" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Partner With Us</a></li>
                      <li><a href="/support/charity" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Charity Projects</a></li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li className="relative group">
            <button
              onClick={() => handleDropdownClick('resources')}
              onMouseEnter={() => handleDropdownHover('resources')}
              className={`flex items-center hover:underline underline-offset-8 transition ${router.pathname.startsWith('/blog') || router.pathname.startsWith('/careers') || router.pathname.startsWith('/contact') ? 'text-blue-700 font-bold underline' : ''}`}
            >
              {navigationItems.resources.label}
              <HiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'resources' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, type: 'spring', stiffness: 200, damping: 22 }}
                  className="absolute left-0 mt-2 w-[400px] bg-gradient-to-br from-white via-blue-50 to-blue-100 text-[#232328] rounded-2xl shadow-2xl py-2 z-50 flex border border-blue-100"
                  style={{ overflow: 'hidden' }}
                >
                  <div className="w-full px-5 py-5 bg-transparent">
                    <h3 className="text-xl font-extrabold mb-4 text-[#232328] tracking-tight">Resources</h3>
                    <ul className="space-y-1.5">
                      <li><a href="/resources/about-oaktree" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">About Oaktree Training Academy</a></li>
                      <li><a href="/resources/what-is-sia" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">What is SIA</a></li>
                      <li><a href="/resources/rochdale-licence" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">SIA Security Guard Licence Rochdale</a></li>
                      <li><a href="/blog" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Blog</a></li>
                      <li><a href="/careers" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Careers</a></li>
                      <li><a href="/contact" className="block hover:bg-blue-100/80 hover:shadow-sm rounded-lg px-3 py-2 transition font-semibold text-[14px]">Contact Us</a></li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li>
            <Link 
              href={navigationItems.about.href} 
              className={`hover:underline underline-offset-8 transition ${router.pathname.startsWith('/about') ? 'text-blue-700 font-bold underline' : ''}`}
            >
              {navigationItems.about.label}
            </Link>
          </li>
        </ul>
          </div>
      {/* Right: Actions */}
      {/* Removed action icons as requested */}
    </nav>
  );
} 