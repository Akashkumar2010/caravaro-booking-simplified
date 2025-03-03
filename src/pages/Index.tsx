
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { MyServices } from "@/components/MyServices";
import { Testimonials } from "@/components/Testimonials";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <MyServices />
        <Services />
        <Features />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Caravaro</h3>
              <p className="text-gray-400 text-sm">
                Premium car services tailored to your needs. Quality and convenience in one place.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Car Wash</li>
                <li>Driver Hire</li>
                <li>Car Rental</li>
                <li>Bus Services</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>info@caravaro.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Car Street, Auto City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Caravaro. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300",
          showScrollTop ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Index;
