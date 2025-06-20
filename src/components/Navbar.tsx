import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaUserFriends, FaFileAlt } from 'react-icons/fa';
import { HiOutlineQuestionMarkCircle, HiOutlineSparkles, HiChevronDown, HiMenu, HiX } from 'react-icons/hi';
import Cart from './Cart';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

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

  const handleDropdownToggle = (dropdownName: string) => {
    setActiveDropdown(prev => prev === dropdownName ? null : dropdownName);
  };

  return (
    <nav className="relative bg-white text-[#232328] px-4 sm:px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50 max-w-full" ref={dropdownRef}>
      {/* Left: Logo */}
      <div className="flex items-center flex-shrink-0 min-w-0">
        <Link href="/" className="flex items-center space-x-2 min-w-0">
          <Image src="/assets/logo.png" alt="Oaktree Academy Logo" width={32} height={32} className="rounded-full h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
          <span className="font-bold text-sm sm:text-xl tracking-wide truncate">OAKTREE ACADEMY</span>
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex space-x-6 lg:space-x-8 font-medium text-base items-center">
          {Object.entries(navigationItems).map(([key, value]) => (
            <li key={key} className="relative group">
              {'items' in value ? (
                <>
                  <button
                    onClick={() => handleDropdownToggle(key)}
                    className="flex items-center hover:text-blue-600 transition"
                  >
                    {value.label}
                    <HiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === key && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 10 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border"
                      >
                        {value.items.map(item => (
                          <Link key={item.href} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link href={value.href} className="hover:text-blue-600 transition">
                  {value.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Hamburger Menu Button */}
      <div className="md:hidden flex items-center flex-shrink-0 ml-2">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none p-1">
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg z-40 md:hidden border-t"
          >
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              <ul className="flex flex-col space-y-3">
                {Object.entries(navigationItems).map(([key, value]) => (
                  <li key={key}>
                    {'items' in value ? (
                      <>
                        <button onClick={() => handleDropdownToggle(key)} className="w-full flex justify-between items-center py-2 font-semibold text-base">
                          {value.label}
                          <HiChevronDown className={`transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                        </button>
                        {activeDropdown === key && (
                          <div className="pl-4 mt-2 space-y-2">
                            {value.items.map(item => (
                              <Link key={item.href} href={item.href} className="block py-1 text-gray-600 text-sm">
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link href={value.href} className="block py-2 font-semibold text-base">
                        {value.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 