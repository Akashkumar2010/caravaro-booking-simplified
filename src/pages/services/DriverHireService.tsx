
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
import { DriverHireHero } from "@/components/services/driver-hire/DriverHireHero";
import { DriverHireFeatures } from "@/components/services/driver-hire/DriverHireFeatures";
import { DriverHireDetails } from "@/components/services/driver-hire/DriverHireDetails";
import { DriverHireForm, DriverHireFormData } from "@/components/services/driver-hire/DriverHireForm";

export default function DriverHireService() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState<DriverHireFormData>({
    driverType: "standard",
    hours: "4",
    pickupLocation: "",
    destination: "",
    totalPrice: 140 // Default: $35/hour * 4 hours
  });

  const { data: service, isLoading } = useQuery({
    queryKey: ["driverHireService"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("type", "driver_hire")
        .single();
      
      if (error) throw error;
      return data as Service;
    },
  });

  const handleBookService = () => {
    if (service) {
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
              <DriverHireHero service={service} />
              <DriverHireFeatures />
              <DriverHireDetails service={service} />
              <DriverHireForm onFormChange={setFormData} />

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleBookService}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
