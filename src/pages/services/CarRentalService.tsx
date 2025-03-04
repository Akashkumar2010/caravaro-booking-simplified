
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/database";
import { BookingDialog } from "@/components/BookingDialog";
import { ChevronLeft, Shield, Clock, Car, MapPin, Calendar, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CarRentalService() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Form state
  const [carType, setCarType] = useState("economy");
  const [rentalDays, setRentalDays] = useState("1");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [insurance, setInsurance] = useState("basic");

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

  const getPriceForCarType = () => {
    switch(carType) {
      case "economy": return 45;
      case "midsize": return 65;
      case "suv": return 85;
      case "luxury": return 120;
      default: return 45;
    }
  };

  const getInsuranceCost = () => {
    switch(insurance) {
      case "basic": return 10;
      case "premium": return 25;
      case "full": return 40;
      default: return 10;
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = getPriceForCarType() * parseInt(rentalDays);
    const insurancePrice = getInsuranceCost() * parseInt(rentalDays);
    return basePrice + insurancePrice;
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
                  <p className="text-white/90 text-lg">Starting at ${service.price.toFixed(2)}/day</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                      <Car className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle>Premium Fleet</CardTitle>
                      <CardDescription>Well-maintained vehicles</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                      <MapPin className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle>Flexible Pickup</CardTitle>
                      <CardDescription>Multiple locations</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
                      <Shield className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle>Full Insurance</CardTitle>
                      <CardDescription>Comprehensive coverage</CardDescription>
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
                    `Our car rental service offers a wide range of vehicles to suit every need and budget. 
                    From compact cars for city driving to spacious SUVs for family trips and luxury models 
                    for special occasions, our well-maintained fleet ensures a comfortable and reliable 
                    driving experience. All rentals include comprehensive insurance and 24/7 roadside assistance.`}
                  </p>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3 text-lg">Available Vehicle Types:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Check className="h-4 w-4" />
                        </div>
                        Economy & Compact Cars
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Check className="h-4 w-4" />
                        </div>
                        Midsize & Full-size Sedans
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Check className="h-4 w-4" />
                        </div>
                        SUVs & Minivans
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Check className="h-4 w-4" />
                        </div>
                        Luxury Cars
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Check className="h-4 w-4" />
                        </div>
                        Electric & Hybrid Vehicles
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                          <Check className="h-4 w-4" />
                        </div>
                        Specialty Vehicles
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Service Details Form */}
              <Card className="mb-8 shadow-sm border-primary/10 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4">
                  <h2 className="text-xl font-bold text-white">Create Your Rental Package</h2>
                  <p className="text-white/80 text-sm">Customize your perfect rental experience</p>
                </div>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="carType" className="text-base font-medium">Vehicle Type</Label>
                      <select 
                        id="carType" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
                      >
                        <option value="economy">Economy Car - $45/day</option>
                        <option value="midsize">Midsize Sedan - $65/day</option>
                        <option value="suv">SUV - $85/day</option>
                        <option value="luxury">Luxury Vehicle - $120/day</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="rentalDays" className="text-base font-medium">Rental Duration (Days)</Label>
                      <Input 
                        id="rentalDays"
                        type="number"
                        min="1"
                        max="30" 
                        value={rentalDays}
                        onChange={(e) => setRentalDays(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pickupLocation" className="text-base font-medium">Pickup Location</Label>
                      <Input 
                        id="pickupLocation"
                        placeholder="Enter your preferred pickup location"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="returnLocation" className="text-base font-medium">Return Location</Label>
                      <Input 
                        id="returnLocation"
                        placeholder="Same as pickup location if left empty"
                        value={returnLocation}
                        onChange={(e) => setReturnLocation(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="insurance" className="text-base font-medium">Insurance Coverage</Label>
                      <select 
                        id="insurance" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                      >
                        <option value="basic">Basic - $10/day</option>
                        <option value="premium">Premium - $25/day</option>
                        <option value="full">Full Coverage - $40/day</option>
                      </select>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Vehicle Rental:</span>
                        <span>${getPriceForCarType().toFixed(2)} × {rentalDays} days = ${(getPriceForCarType() * parseInt(rentalDays)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                        <span>Insurance:</span>
                        <span>${getInsuranceCost().toFixed(2)} × {rentalDays} days = ${(getInsuranceCost() * parseInt(rentalDays)).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center font-bold">
                        <span>Total:</span>
                        <span className="text-primary">${calculateTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
