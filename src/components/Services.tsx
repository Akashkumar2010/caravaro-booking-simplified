
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "./ServiceCard";
import { supabase } from "@/lib/supabase";
import type { Service } from "@/types/database";
import { Car, UserCircle2, Bus } from "lucide-react";
import { useState } from "react";
import { BookingDialog } from "./BookingDialog";

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (error) throw error;
      return data as Service[];
    },
  });

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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.name}
              description={service.description || ""}
              icon={getIcon(service.type)}
              onClick={() => handleBookService(service)}
              price={service.price}
              imageUrl={service.image_url || ""}
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
