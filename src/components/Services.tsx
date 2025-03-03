
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "./ServiceCard";
import { supabase } from "@/lib/supabase";
import type { Service } from "@/types/database";
import { Car, UserCircle2, Bus } from "lucide-react";
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
        return <Car className="h-6 w-6" />;
      case "driver_hire":
        return <UserCircle2 className="h-6 w-6" />;
      case "car_rental":
      case "bus_service":
        return <Bus className="h-6 w-6" />;
      default:
        return <Car className="h-6 w-6" />;
    }
  };

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight heading-gradient sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Loading our premium car services...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight heading-gradient sm:text-4xl">
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md hidden md:flex"
              onClick={() => scroll('left')}
            >
              <Car className="h-4 w-4 -rotate-90" />
            </Button>
          )}
          
          {canScrollRight && (
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md hidden md:flex"
              onClick={() => scroll('right')}
            >
              <Car className="h-4 w-4 rotate-90" />
            </Button>
          )}
          
          {/* Services container */}
          <div 
            ref={containerRef}
            className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services?.map((service) => (
              <div key={service.id} className="min-w-[320px] flex-shrink-0 snap-start">
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
          {services?.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${index === Math.floor(containerRef.current?.scrollLeft || 0 / 320) ? 'bg-primary' : 'bg-gray-300'}`}
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
