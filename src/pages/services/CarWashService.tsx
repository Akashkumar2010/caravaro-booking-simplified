
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/database";
import { BookingDialog } from "@/components/BookingDialog";
import { ChevronLeft, Droplets, Shield, Timer, Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CarWashService() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Form state
  const [washType, setWashType] = useState("basic");
  const [specialRequests, setSpecialRequests] = useState("");

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
                  <p className="text-white/90 text-lg">${service.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Timer className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Duration</CardTitle>
                      <CardDescription>{service.duration || 60} minutes</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Droplets className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Eco-Friendly</CardTitle>
                      <CardDescription>Water-saving techniques</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Guaranteed</CardTitle>
                      <CardDescription>100% satisfaction</CardDescription>
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
                    `Our premium car wash service includes a thorough exterior wash, interior vacuuming, 
                    window cleaning, tire dressing, and hand drying. We use only high-quality, eco-friendly 
                    products that protect your vehicle's paint and finish. Whether your car needs a quick 
                    refresh or a deep clean, our professional team delivers exceptional results.`}
                  </p>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">What's Included:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Exterior hand wash with premium soap</li>
                      <li>Interior vacuuming and dusting</li>
                      <li>Window and mirror cleaning</li>
                      <li>Tire dressing and wheel cleaning</li>
                      <li>Hand drying with microfiber towels</li>
                      <li>Air freshener application</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Service Details Form */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Service Details</CardTitle>
                  <CardDescription>Select your preferred wash package and options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="washType">Wash Package</Label>
                      <select 
                        id="washType" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={washType}
                        onChange={(e) => setWashType(e.target.value)}
                      >
                        <option value="basic">Basic Wash - $20</option>
                        <option value="deluxe">Deluxe Wash - $35</option>
                        <option value="premium">Premium Wash - $50</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <textarea 
                        id="specialRequests"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        placeholder="Any special requests or instructions"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
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
