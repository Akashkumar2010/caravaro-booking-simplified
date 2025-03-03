
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/database";
import { BookingDialog } from "@/components/BookingDialog";
import { ChevronLeft, Users, Clock, Bus, MapPin } from "lucide-react";

export default function BusService() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { data: service, isLoading } = useQuery({
    queryKey: ["busService"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("type", "bus_service")
        .single();
      
      if (error) {
        // If no bus service exists yet, create a fallback object
        return {
          id: "bus-service",
          name: "Bus Charter Service",
          description: "Comfortable and reliable bus charter service for groups of all sizes.",
          type: "bus_service",
          price: 250,
          duration: 480,
          image_url: "/placeholder.svg",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Service;
      }
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
                  <p className="text-white/90 text-lg">Starting at ${service.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Bus className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Modern Fleet</CardTitle>
                      <CardDescription>Comfortable vehicles</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Group Sizes</CardTitle>
                      <CardDescription>From 20 to 50+ passengers</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <MapPin className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Any Destination</CardTitle>
                      <CardDescription>Local and long-distance</CardDescription>
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
                    `Our bus charter service provides comfortable and reliable transportation for groups of all sizes. 
                    Whether you're planning a corporate event, school trip, wedding, or tour group, our modern fleet 
                    of buses ensures your group travels safely and comfortably. All our buses are equipped with 
                    amenities including air conditioning, comfortable seating, and entertainment systems.`}
                  </p>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Ideal For:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Corporate events and team building trips</li>
                      <li>School and university excursions</li>
                      <li>Wedding guest transportation</li>
                      <li>Sports team travel</li>
                      <li>Tour groups and sightseeing</li>
                      <li>Airport transfers for large groups</li>
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
                  Book Bus Service
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
