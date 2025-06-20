import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function AboutOaktree() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-800">About Oaktree Training Academy</h1>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Who We Are</h2>
          <p className="text-lg text-gray-700 mb-2">
            Oaktree Training Academy is dedicated to empowering individuals and businesses through high-quality, career-focused education. We believe in building confidence and excellence by providing tailored training that meets the needs of today's workforce. Our team is passionate about helping learners achieve their goals and supporting employers in developing skilled, motivated staff.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Mission</h2>
          <p className="text-lg text-gray-700">
            Our mission is to inspire and enable people from all backgrounds to achieve their full potential through exceptional learning opportunities. We work closely with communities and industry partners to create pathways for personal and professional growth, driving positive change and economic success.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Vision</h2>
          <p className="text-lg text-gray-700">
            We aim to be a leading provider of education, recognized for our commitment to excellence, innovation, and collaboration. By equipping our students with essential skills and knowledge, we help shape a brighter future for individuals and the industries they serve.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Our Core Values</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 space-y-1">
            <li>Learner-first: We put our students' needs at the heart of everything we do.</li>
            <li>Innovation: We challenge the status quo to deliver creative solutions.</li>
            <li>Excellence: We strive for the highest standards in teaching and support.</li>
            <li>Diversity: We embrace and celebrate differences to fuel creativity.</li>
            <li>Empowerment: We help people and teams achieve more together.</li>
            <li>Integrity: We act ethically and transparently in all our work.</li>
            <li>Sustainability: We are committed to long-term positive impact.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
} 