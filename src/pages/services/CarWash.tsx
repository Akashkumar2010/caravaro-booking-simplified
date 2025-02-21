
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

export default function CarWash() {
  const [date, setDate] = useState<Date>();
  const [vehicleType, setVehicleType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!date || !vehicleType || !serviceType) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("bookings").insert({
        service_id: "car_wash", // You'll need to get the actual service ID
        user_id: user.id,
        scheduled_time: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
        special_requests: `Vehicle Type: ${vehicleType}\nService Type: ${serviceType}\nNotes: ${notes}`,
        status: "pending"
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Car wash service booked successfully!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f"
            alt="Car Wash"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Professional Car Wash Services
            </h1>
          </div>
        </div>

        {/* Booking Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Book a Car Wash</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Vehicle Type</Label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="luxury">Luxury Car</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Service Type</Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Wash</SelectItem>
                      <SelectItem value="premium">Premium Wash</SelectItem>
                      <SelectItem value="deluxe">Deluxe Package</SelectItem>
                      <SelectItem value="interior">Interior Deep Clean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Special Notes</Label>
                  <Textarea
                    placeholder="Any special requirements or notes?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <Button onClick={handleSubmit} className="w-full">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
