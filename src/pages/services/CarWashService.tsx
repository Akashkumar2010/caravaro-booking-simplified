
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/database";
import { BookingDialog } from "@/components/BookingDialog";
import { ChevronLeft, Droplets, Shield, Timer, Car, SparkleIcon, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CarWashService() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Form state
  const [washType, setWashType] = useState("basic");
  const [specialRequests, setSpecialRequests] = useState("");
  const [additionalServices, setAdditionalServices] = useState({
    interiorDetailing: false,
    waxTreatment: false,
    leatherConditioning: false
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
      setSelectedService(service);
      setIsBookingOpen(true);
    }
  };

  const getPriceForWashType = () => {
    switch(washType) {
      case "basic": return 20;
      case "deluxe": return 35;
      case "premium": return 50;
      default: return 20;
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
              <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-xl mb-8 shadow-lg">
                <img
                  src={service.image_url || "/placeholder.svg"}
                  alt={service.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{service.name}</h1>
                  <p className="text-white/90 text-lg">${service.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                      <Timer className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle>Duration</CardTitle>
                      <CardDescription>{service.duration || 60} minutes</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                      <Droplets className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle>Eco-Friendly</CardTitle>
                      <CardDescription>Water-saving techniques</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
                      <Shield className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle>Guaranteed</CardTitle>
                      <CardDescription>100% satisfaction</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              <Card className="mb-8 shadow-sm hover:shadow-md transition-all duration-300 border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl">About This Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description || 
                    `Our premium car wash service includes a thorough exterior wash, interior vacuuming, 
                    window cleaning, tire dressing, and hand drying. We use only high-quality, eco-friendly 
                    products that protect your vehicle's paint and finish. Whether your car needs a quick 
                    refresh or a deep clean, our professional team delivers exceptional results.`}
                  </p>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3 text-lg">What's Included:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Zap className="h-4 w-4" />
                        </div>
                        Exterior hand wash with premium soap
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Zap className="h-4 w-4" />
                        </div>
                        Interior vacuuming and dusting
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Zap className="h-4 w-4" />
                        </div>
                        Window and mirror cleaning
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Zap className="h-4 w-4" />
                        </div>
                        Tire dressing and wheel cleaning
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Zap className="h-4 w-4" />
                        </div>
                        Hand drying with microfiber towels
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Zap className="h-4 w-4" />
                        </div>
                        Air freshener application
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Service Details Form */}
              <Card className="mb-8 shadow-sm border-primary/10 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                  <h2 className="text-xl font-bold text-white">Customize Your Car Wash</h2>
                  <p className="text-white/80 text-sm">Select options to create your perfect service package</p>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="washType" className="text-base font-medium">Wash Package</Label>
                      <select 
                        id="washType" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
                        value={washType}
                        onChange={(e) => setWashType(e.target.value)}
                      >
                        <option value="basic">Basic Wash - $20</option>
                        <option value="deluxe">Deluxe Wash - $35</option>
                        <option value="premium">Premium Wash - $50</option>
                      </select>
                    </div>
                    
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Additional Services</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="interiorDetailing" 
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={additionalServices.interiorDetailing}
                            onChange={(e) => setAdditionalServices({...additionalServices, interiorDetailing: e.target.checked})}
                          />
                          <label htmlFor="interiorDetailing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Interior Detailing (+$25)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="waxTreatment" 
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={additionalServices.waxTreatment}
                            onChange={(e) => setAdditionalServices({...additionalServices, waxTreatment: e.target.checked})}
                          />
                          <label htmlFor="waxTreatment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Wax Treatment (+$15)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="leatherConditioning" 
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            checked={additionalServices.leatherConditioning}
                            onChange={(e) => setAdditionalServices({...additionalServices, leatherConditioning: e.target.checked})}
                          />
                          <label htmlFor="leatherConditioning" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Leather Conditioning (+$20)
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="specialRequests" className="text-base font-medium">Special Requests</Label>
                      <textarea 
                        id="specialRequests"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
                        placeholder="Any special requests or instructions"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Package Price:</span>
                        <span>${getPriceForWashType().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                        <span>Additional Services:</span>
                        <span>
                          ${(
                            (additionalServices.interiorDetailing ? 25 : 0) + 
                            (additionalServices.waxTreatment ? 15 : 0) + 
                            (additionalServices.leatherConditioning ? 20 : 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center font-bold">
                        <span>Total:</span>
                        <span className="text-primary">
                          ${(
                            getPriceForWashType() + 
                            (additionalServices.interiorDetailing ? 25 : 0) + 
                            (additionalServices.waxTreatment ? 15 : 0) + 
                            (additionalServices.leatherConditioning ? 20 : 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
