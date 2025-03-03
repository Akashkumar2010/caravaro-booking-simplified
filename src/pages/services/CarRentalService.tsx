
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/database";
import { BookingDialog } from "@/components/BookingDialog";
import { ChevronLeft, Shield, Clock, Car, MapPin } from "lucide-react";

export default function CarRentalService() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
      setSelectedService(service);
      setIsBookingOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse h-64 bg-gray-200 rounded-xl mb-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-xl mb-8">
                <img
                  src={service.image_url || "/placeholder.svg"}
                  alt={service.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{service.name}</h1>
                  <p className="text-white/90 text-lg">Starting at ${service.price.toFixed(2)}/day</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Car className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Premium Fleet</CardTitle>
                      <CardDescription>Well-maintained vehicles</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <MapPin className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Flexible Pickup</CardTitle>
                      <CardDescription>Multiple locations</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Full Insurance</CardTitle>
                      <CardDescription>Comprehensive coverage</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>About This Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {service.description || 
                    `Our car rental service offers a wide range of vehicles to suit every need and budget. 
                    From compact cars for city driving to spacious SUVs for family trips and luxury models 
                    for special occasions, our well-maintained fleet ensures a comfortable and reliable 
                    driving experience. All rentals include comprehensive insurance and 24/7 roadside assistance.`}
                  </p>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Available Vehicle Types:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Economy & Compact Cars</li>
                      <li>Midsize & Full-size Sedans</li>
                      <li>SUVs & Minivans</li>
                      <li>Luxury Cars</li>
                      <li>Electric & Hybrid Vehicles</li>
                      <li>Specialty Vehicles</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleBookService} 
                  className="bg-primary hover:bg-primary/90 px-8"
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
