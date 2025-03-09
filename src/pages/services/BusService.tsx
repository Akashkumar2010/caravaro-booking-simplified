
import { Navbar } from "@/components/Navbar";
import { BusServiceForm } from "@/components/services/bus-service/BusServiceForm";
import { Bus, Calendar, Users, MapPin, CheckCircle } from "lucide-react";

export default function BusService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Bus Charter Services</h1>
                <p className="text-lg text-gray-600 mb-6">
                  Reliable and comfortable transportation solutions for groups of all sizes. Perfect for corporate events, weddings, school trips, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-purple-700">
                    <Bus className="mr-2 h-5 w-5" />
                    <span>Modern Fleet</span>
                  </div>
                  <div className="flex items-center text-purple-700">
                    <Users className="mr-2 h-5 w-5" />
                    <span>Professional Drivers</span>
                  </div>
                  <div className="flex items-center text-purple-700">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    <span>Customizable Options</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                  <img 
                    src="/placeholder.svg" 
                    alt="Bus Charter Service" 
                    className="w-full h-64 object-cover rounded-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Bus Charter Service</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Bus className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Modern Fleet</h3>
                <p className="text-gray-600 text-center">
                  Our fleet of well-maintained buses offers a range of sizes to accommodate your group needs.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Professional Drivers</h3>
                <p className="text-gray-600 text-center">
                  Our experienced drivers ensure a safe, comfortable, and pleasant journey.
                </p>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex justify-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <MapPin className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Custom Routes</h3>
                <p className="text-gray-600 text-center">
                  We work with you to plan the perfect route for your specific needs and requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Book Your Bus Charter Service</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Fill out the form below to book our bus charter service. Our team will review your request and confirm your booking.
            </p>
            
            <BusServiceForm />
          </div>
        </section>
      </main>
    </div>
  );
}
