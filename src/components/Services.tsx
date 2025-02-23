
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "./ServiceCard";
import { supabase } from "@/lib/supabase";
import type { Service } from "@/types/database";
import { Car, UserCircle2, Bus } from "lucide-react";
import { useState, useEffect } from "react";
import { BookingDialog } from "./BookingDialog";

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (error) throw error;
      return data as Service[];
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (services && services.length > 0) {
        setScrollPosition((prev) => {
          const container = document.querySelector('.services-container');
          if (!container) return prev;
          
          const maxScroll = container.scrollWidth - container.clientWidth;
          const newPosition = prev + 1;
          
          if (newPosition >= maxScroll) {
            return 0;
          }
          return newPosition;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [services]);

  useEffect(() => {
    const container = document.querySelector('.services-container');
    if (container) {
      container.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

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
    return <div>Loading services...</div>;
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight heading-gradient sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose from our range of premium car services
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="services-container overflow-hidden">
            <div className="flex gap-8 transition-all duration-300" 
                 style={{ transform: `translateX(-${scrollPosition}px)` }}>
              {services?.map((service) => (
                <div key={service.id} className="w-[350px] flex-shrink-0">
                  <ServiceCard
                    title={service.name}
                    description={service.description || ""}
                    icon={getIcon(service.type)}
                    onClick={() => handleBookService(service)}
                    price={service.price}
                    imageUrl={service.image_url || ""}
                  />
                </div>
              ))}
            </div>
          </div>
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
