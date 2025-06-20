const fs = require('fs');
const path = require('path');

// Modern Trainer-Level section template
const modernTrainerSection = `
      {/* Trainer-Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-16"
      >
        <h3 className="text-2xl font-heading font-bold text-[#1a365d] mb-6 flex items-center">
          <span className="mr-2"> 🪪</span>
          Trainer-Level
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainerCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group h-full flex flex-col"
            >
              <div 
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
              <Image
                src={course.image}
                alt={course.title}
                fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">Click to learn more</p>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-heading font-bold text-[#1a365d] mb-4">{course.title}</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 transform transition-transform duration-300 group-hover:scale-105">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium">Duration:</span>
                    <span className="font-bold text-[#1a365d] text-lg">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Price:</span>
                    <span className="font-bold text-[#1a365d] text-lg">{course.price}</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                      setShowBookingModal(true);
                    }}
                    className="w-full bg-[#1a365d] text-white py-3 px-6 rounded-lg font-['Inter'] font-semibold hover:bg-[#2d3748] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Book Now</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>`;

// Modern Business Strategy section template
const modernBusinessSection = `
      {/* Business Strategy & Consultation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-2xl font-heading font-bold text-[#1a365d] mb-6">💼 Business Strategy & Consultation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group h-full flex flex-col"
            >
              <div 
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => setSelectedCourse(service)}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">Click to learn more</p>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-heading font-bold text-[#1a365d] mb-4">{service.title}</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 transform transition-transform duration-300 group-hover:scale-105">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium">Duration:</span>
                    <span className="font-bold text-[#1a365d] text-lg">{service.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Price:</span>
                    <span className="font-bold text-[#1a365d] text-lg">{service.price}</span>
                </div>
                </div>
                <div className="mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(service);
                      setShowBookingModal(true);
                    }}
                    className="w-full bg-[#1a365d] text-white py-3 px-6 rounded-lg font-['Inter'] font-semibold hover:bg-[#2d3748] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Book Now</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>`;

// Updated business services data to match home page
const updatedBusinessServices = `const businessServices = [
  {
    id: 1,
    title: 'Introductory Consultation',
    duration: '1 hr',
    price: '£19.99',
    image: '/assets/consultation.jpg',
    description: 'Initial consultation to discuss your business needs and explore potential solutions.'
  },
  {
    id: 2,
    title: 'Strategic Planning Session',
    duration: '1 hr',
    price: '£19.99 / £99.99*',
    image: '/assets/risk-assessment.jpg',
    description: 'In-depth strategic planning session to develop your business roadmap and growth strategies.'
  },
  {
    id: 3,
    title: 'Branding & Positioning Analysis',
    duration: '1 hr',
    price: '£19.99',
    image: '/assets/health-safety.jpg',
    description: 'Comprehensive analysis of your brand positioning and recommendations for improvement.'
  },
  {
    id: 4,
    title: 'Freelancers, Sole Traders, Consultants',
    duration: '3 min',
    price: 'Free',
    image: '/assets/customer-service.jpg',
    description: 'Quick assessment and guidance for freelancers, sole traders, and consultants.'
  }
];`;

// Function to update a location file
function updateLocationFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update business services data
    const businessServicesRegex = /const businessServices = \[[\s\S]*?\];/;
    content = content.replace(businessServicesRegex, updatedBusinessServices);
    
    // Find and replace the old Trainer Level section
    const oldTrainerSectionRegex = /\/\* Trainer Level Section \*\/[\s\S]*?\/\* Business Services Section \*\//;
    const trainerSectionReplacement = `/* Trainer Level Section */
      ${modernTrainerSection}

      {/* Business Services Section */}`;
    
    content = content.replace(oldTrainerSectionRegex, trainerSectionReplacement);
    
    // Find and replace the old Business Services section
    const oldBusinessSectionRegex = /\/\* Business Services Section \*\/[\s\S]*?<Footer \/>/;
    const businessSectionReplacement = `/* Business Services Section */
      ${modernBusinessSection}

      <Footer />`;
    
    content = content.replace(oldBusinessSectionRegex, businessSectionReplacement);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Get all location files
const areasDir = path.join(__dirname, 'src', 'pages', 'areas');
const files = fs.readdirSync(areasDir).filter(file => 
  file.endsWith('.tsx') && file !== '[area].tsx'
);

console.log(`🔄 Updating ${files.length} location files with modern sections...`);

// Update each file
files.forEach(file => {
  const filePath = path.join(areasDir, file);
  updateLocationFile(filePath);
});

console.log('🎉 All location files updated successfully!'); 