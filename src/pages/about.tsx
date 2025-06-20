import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About Oaktree Business Support Partners
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Rooted in excellence, growing with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Expertise</h2>
                <p className="text-gray-600">
                  We understand that change is not always easy. We have been helping companies, of all sizes, 
                  to respond to industry transitions in order to stay competitive. Our years of experience have 
                  taught us to always make your business success our priority. Our team of experts are ready to 
                  assist you to develop strategies, for not only surviving, but thriving in the future.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Goals</h2>
                <p className="text-gray-600">
                  Whether you're just getting started or looking for support, Oaktree Business Support Partners 
                  can help you every step of the way. From free company formation to our diverse range of products 
                  and services, we are a one-stop shop. With years of experience, we are dedicated to making 
                  business simple - for everyone, from supporting female entrepreneurs to assisting our future 
                  young entrepreneurs.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
                <p className="text-gray-600">
                  Our values as Oaktree business support partners are about providing excellent customer service, 
                  going the extra mile, and enjoying work if we can't make and save you money. Being innovative 
                  and always challenging the norm in order to provide - and be - the best. We can help you achieve 
                  your goals if you believe in them. As part of the mission of Oaktree Business Support Partners, 
                  we empower you to follow your dreams and do what you love but better.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600">
                  Our mission statements are straightforward: we want to support entrepreneurs in starting a business 
                  and growing it into a successful enterprise. Our products and services provide a platform to maximise 
                  and accelerate your company's chances of becoming a true success.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Free Company Formation Section */}
        <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Free Company Formation with Tide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                  <li>Free companies house formation</li>
                  <li>Account formation quickly and easily</li>
                  <li>Free company registration</li>
                  <li>£100 Cashback offer</li>
                </ul>
                <p className="text-gray-600 mb-6">
                  With Oaktree, you can open an account quickly and easily and be ready to trade in a matter of hours.
                </p>
                <div className="space-y-4">
                  <Link href="https://www.tide.co/partners/oaktree-business-support-partners/?cofo" target="_blank" rel="noopener noreferrer">
                    <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors">
                      Register with Tide
                    </button>
                  </Link>
                  <Link href="https://www.tide.co/partners/oaktree-business-support-partners/?cofo" target="_blank" rel="noopener noreferrer">
                    <button className="w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-200 transition-colors">
                      Learn More About Tide
                    </button>
                  </Link>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tide Benefits</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>✓ Make bookkeeping a breeze</li>
                  <li>✓ Sync with your accounting software</li>
                  <li>✓ Simple receipt storage</li>
                  <li>✓ Send, pay and track invoices</li>
                  <li>✓ No monthly or annual fees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Started Today</h3>
          <p className="text-gray-600 mb-6">
            Want to experience the expertise of Oaktree Business Support Partners for yourself? 
            Give us a call today and let's discuss what we can do for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="tel:03301759933" className="text-blue-600 hover:text-blue-700">
              <span className="text-lg font-medium">0330 175 9933</span>
            </a>
            <a href="tel:07880080201" className="text-blue-600 hover:text-blue-700">
              <span className="text-lg font-medium">0788 0080 201</span>
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 italic">
            "It always seems impossible until it's done" - Nelson Mandela
          </p>
        </div>
      </div>
    </div>
  );
} 