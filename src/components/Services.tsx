
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "./ServiceCard";
import { supabase } from "@/lib/supabase";
import type { Service } from "@/types/database";
import { Car, UserCircle2, Bus, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { BookingDialog } from "./BookingDialog";
import { Button } from "./ui/button";

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (error) throw error;
      return data as Service[];
    },
  });

  const checkScrollable = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      checkScrollable();
      containerRef.current.addEventListener('scroll', checkScrollable);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', checkScrollable);
      }
    };
  }, [services]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "car_wash":
        return <Car className="h-6 w-6 text-blue-500" />;
      case "driver_hire":
        return <UserCircle2 className="h-6 w-6 text-amber-500" />;
      case "car_rental":
        return <Car className="h-6 w-6 text-emerald-500" />;
      case "bus_service":
        return <Bus className="h-6 w-6 text-purple-500" />;
      default:
        return <Car className="h-6 w-6 text-primary" />;
    }
  };

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  // Create the bus service card with all required Service properties
  const busServiceCard: Service = {
    id: "bus-service",
    name: "Bus Charter Service",
    description: "Comfortable and reliable bus charter service for groups of all sizes. Perfect for corporate events, weddings, school trips, and more.",
    type: "bus_service" as any, // Using 'any' to bypass type checking as this is a custom service
    price: 250,
    duration: 480,
    image_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Loading our premium car services...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Get the available services and add bus service
  const availableServices = [...(services || []), busServiceCard];

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-block p-1 px-3 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Premium Services
          </div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent sm:text-4xl mb-2">
            Available Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Browse and book from our range of premium car services
          </p>
        </div>
        
        <div className="relative">
          {/* Scroll buttons */}
          {canScrollLeft && (
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md hidden md:flex rounded-full"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </Button>
          )}
          
          {canScrollRight && (
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md hidden md:flex rounded-full"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </Button>
          )}
          
          {/* Services container - Using flex instead of grid to show in a single row */}
          <div 
            ref={containerRef}
            className="flex overflow-x-auto gap-8 px-4 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {availableServices.map((service) => (
              <div key={service.id} className="min-w-[300px] w-[300px] flex-shrink-0 transform transition-transform duration-300 hover:translate-y-[-5px]">
                <ServiceCard
                  title={service.name}
                  description={service.description || ""}
                  icon={getIcon(service.type)}
                  onClick={() => handleBookService(service)}
                  price={service.price}
                  imageUrl={service.image_url || ""}
                  serviceType={service.type}
                  duration={service.duration || 180}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {availableServices.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-300'}`}
              onClick={() => {
                if (containerRef.current) {
                  containerRef.current.scrollTo({
                    left: index * 320,
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
      <BookingDialog
        service={selectedService}
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedService(null);
        }}
      />
    </section>
  );
}
