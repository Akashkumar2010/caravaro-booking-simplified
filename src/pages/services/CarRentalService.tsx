
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/database";
import { BookingDialog } from "@/components/BookingDialog";
import { ChevronLeft } from "lucide-react";
import { CarRentalHero } from "@/components/services/car-rental/CarRentalHero";
import { CarRentalFeatures } from "@/components/services/car-rental/CarRentalFeatures";
import { CarRentalDetails } from "@/components/services/car-rental/CarRentalDetails";
import { CarRentalDetailForm } from "@/components/services/car-rental/CarRentalDetailForm";
import { useCarRentalForm } from "@/hooks/services/useCarRentalForm";

export default function CarRentalService() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const { calculateTotalPrice } = useCarRentalForm();

  const { data: service, isLoading } = useQuery({
    queryKey: ["carRentalService"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("type", "car_rental")
        .single();
      
      if (error) throw error;
      return data as Service;
    },
  });

  const handleBookService = () => {
    if (service) {
      // Create a modified service with the calculated price
      const serviceWithCustomPrice = {
        ...service,
        price: calculateTotalPrice()
      };
      setSelectedService(serviceWithCustomPrice);
      setIsBookingOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse h-64 bg-gray-200 rounded-xl mb-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {service && (
          <>
            <div className="max-w-4xl mx-auto">
              <CarRentalHero service={service} />
              <CarRentalFeatures />
              <CarRentalDetails service={service} />
              <CarRentalDetailForm />

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleBookService} 
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Rent A Vehicle
                </Button>
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
          </>
        )}
      </main>
    </div>
  );
}
