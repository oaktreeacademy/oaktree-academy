import { motion } from 'framer-motion';
import Footer from '../Footer';

interface ServiceLayoutProps {
  children: React.ReactNode;
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation removed, now handled in each page */}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ServiceLayout; 