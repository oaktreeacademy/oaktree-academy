import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Head from 'next/head';

export default function GrowYourBusiness() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <Head>
        <title>Grow Your Business | Oaktree B|S|P</title>
        <meta name="description" content="Grow your business with Oaktree B|S|P. Access marketing opportunities and resources to reach your goals cost-effectively." />
      </Head>
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-2xl w-full bg-white/90 rounded-2xl shadow-2xl p-10 text-center">
          <h1 className="text-4xl font-extrabold text-green-900 mb-4">Grow Your Business</h1>
          <h2 className="text-xl font-bold text-green-700 mb-6">AT B|S|P</h2>
          <p className="text-lg text-gray-800 mb-6">We believe, that it should be easy for every business, to reach their target audience, without breaking the bank or sacrificing quality. Giving you access to marketing opportunities, that change the way you approach your audience, we put the necessary resources, at your fingertips and offering you countless avenues for development. Assisting you reach your goals, in the most cost effective, fast and simple way possible.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
} 