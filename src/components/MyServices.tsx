
import { Car, Check, Gem, Star, Shield, AlertTriangle, Clock, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const ServiceCard = ({ title, description, features, icon, popular = false }: ServiceProps) => {
  return (
    <div className={cn(
      "relative h-full rounded-2xl p-6 bg-white shadow-lg border border-gray-200 transition-all duration-300",
      "hover:shadow-xl hover:border-primary/20",
      popular && "ring-2 ring-primary/30 ring-offset-2"
    )}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-semibold py-1 px-3 rounded-full">
          Most Popular
        </div>
      )}
      
      <div className="text-center mb-4">
        <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4 text-center">{description}</p>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto">
        <Button className="w-full" variant={popular ? "default" : "outline"}>
          Learn More
        </Button>
      </div>
    </div>
  );
};

export function MyServices() {
  const services = [
    {
      title: "Premium Car Wash",
      description: "Complete cleaning inside and out",
      icon: <Car className="h-6 w-6" />,
      features: [
        "Exterior Hand Wash",
        "Interior Vacuuming",
        "Window Cleaning",
        "Tire and Rim Detailing",
        "Eco-friendly Products"
      ]
    },
    {
      title: "Professional Drivers",
      description: "Experienced and background-checked drivers",
      icon: <User className="h-6 w-6" />,
      popular: true,
      features: [
        "Professionally Trained",
        "Background Checked",
        "Multilingual Staff",
        "Punctual Service",
        "Formal Attire Available"
      ]
    },
    {
      title: "Luxury Car Rental",
      description: "Premium vehicles for any occasion",
      icon: <Gem className="h-6 w-6" />,
      features: [
        "Latest Model Vehicles",
        "Full Insurance Coverage",
        "GPS Navigation",
        "24/7 Roadside Assistance",
        "Unlimited Mileage"
      ]
    },
    {
      title: "Private Bus Charters",
      description: "Group transportation solutions",
      icon: <Calendar className="h-6 w-6" />,
      features: [
        "Various Capacities Available",
        "Corporate Events",
        "Wedding Transportation",
        "City Tours",
        "Airport Transfers"
      ]
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight heading-gradient sm:text-4xl mb-4">
            Premium Services for Every Need
          </h2>
          <p className="text-lg text-gray-600">
            From professional car washes to experienced drivers and luxury vehicle rentals,
            we provide top-quality services tailored to your requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              features={service.features}
              icon={service.icon}
              popular={service.popular}
            />
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Fully Insured</h3>
              <p className="text-gray-600">All our services and vehicles are fully insured for your complete peace of mind.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium mb-2">24/7 Availability</h3>
              <p className="text-gray-600">Our services are available round the clock to meet your schedule and requirements.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Star className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium mb-2">5-Star Rated</h3>
              <p className="text-gray-600">Consistently rated 5 stars by our satisfied customers for exceptional service quality.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
