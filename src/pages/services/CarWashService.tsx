
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/database";
import { BookingDialog } from "@/components/BookingDialog";
import { ChevronLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CarWashHero } from "@/components/services/car-wash/CarWashHero";
import { CarWashFeatures } from "@/components/services/car-wash/CarWashFeatures";
import { CarWashDetails } from "@/components/services/car-wash/CarWashDetails";
import { CarWashForm, CarWashFormData } from "@/components/services/car-wash/CarWashForm";

export default function CarWashService() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState<CarWashFormData>({
    washType: "basic",
    specialRequests: "",
    additionalServices: {
      interiorDetailing: false,
      waxTreatment: false,
      leatherConditioning: false
    },
    totalPrice: 20 // Default price for basic wash
  });
  
  const { data: service, isLoading } = useQuery({
    queryKey: ["carWashService"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("type", "car_wash")
        .single();
      
      if (error) throw error;
      return data as Service;
    },
  });

  const handleBookService = () => {
    if (service) {
      // Create a modified service object with the calculated price
      const serviceWithCustomPrice = {
        ...service,
        price: formData.totalPrice
      };
      
      setSelectedService(serviceWithCustomPrice);
      setIsBookingOpen(true);
      toast({
        title: "Service Selected",
        description: `Total: $${formData.totalPrice.toFixed(2)}`,
      });
    }
  };

  const handleFormChange = (newFormData: CarWashFormData) => {
    setFormData(newFormData);
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
              <CarWashHero service={service} />
              <CarWashFeatures duration={service.duration || 60} />
              <CarWashDetails service={service} />
              <CarWashForm onFormChange={handleFormChange} />

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleBookService} 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book This Service
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
