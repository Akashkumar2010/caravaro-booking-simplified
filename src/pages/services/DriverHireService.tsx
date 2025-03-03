
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/database";
import { BookingDialog } from "@/components/BookingDialog";
import { ChevronLeft, Shield, Clock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DriverHireService() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Form state
  const [driverType, setDriverType] = useState("standard");
  const [hours, setHours] = useState("4");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");

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
                  <p className="text-white/90 text-lg">Starting at ${service.price.toFixed(2)}/hour</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <User className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Professional</CardTitle>
                      <CardDescription>Experienced drivers</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Clock className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>24/7 Service</CardTitle>
                      <CardDescription>Available anytime</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Insured</CardTitle>
                      <CardDescription>Full coverage</CardDescription>
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
                    `Our professional driver hire service provides experienced, reliable drivers for any occasion. 
                    Whether you need a chauffeur for a special event, a designated driver for a night out, or 
                    professional transportation for business meetings, our vetted drivers ensure a safe and 
                    comfortable journey. All our drivers are professionally trained, background-checked, and 
                    insured for your peace of mind.`}
                  </p>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Service Features:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Professional, uniformed drivers</li>
                      <li>24/7 availability</li>
                      <li>Point-to-point transportation</li>
                      <li>Hourly booking options</li>
                      <li>Corporate and VIP services</li>
                      <li>Wedding and event transportation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Service Details Form */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Driver Service Details</CardTitle>
                  <CardDescription>Customize your driver hire service</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="driverType">Driver Type</Label>
                      <select 
                        id="driverType" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={driverType}
                        onChange={(e) => setDriverType(e.target.value)}
                      >
                        <option value="standard">Standard Driver - $35/hour</option>
                        <option value="executive">Executive Driver - $50/hour</option>
                        <option value="vip">VIP Chauffeur - $75/hour</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="hours">Number of Hours</Label>
                      <Input 
                        id="hours"
                        type="number"
                        min="2"
                        max="24" 
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pickupLocation">Pickup Location</Label>
                      <Input 
                        id="pickupLocation"
                        placeholder="Enter your pickup address"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input 
                        id="destination"
                        placeholder="Enter your destination (if applicable)"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleBookService} 
                  className="bg-primary hover:bg-primary/90 px-8"
                >
                  Book A Driver
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
