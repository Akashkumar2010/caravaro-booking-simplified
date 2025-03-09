
import { useState } from "react";
import { ServicesList } from "./services/ServicesList";
import { ServicesHeader } from "./services/ServicesHeader";
import { BookingDialog } from "./BookingDialog";
import { Service } from "@/types/database";
import { useServices } from "@/hooks/useServices";

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { services, isLoading } = useServices();

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  if (isLoading) {
    return (
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="mx-auto max-w-7xl">
          <ServicesHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="mx-auto max-w-7xl">
        <ServicesHeader />
        <ServicesList services={services} onBookService={handleBookService} />
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
