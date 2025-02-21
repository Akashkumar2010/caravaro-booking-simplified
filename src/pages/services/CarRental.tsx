
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

export default function CarRental() {
  const [date, setDate] = useState<Date>();
  const [carType, setCarType] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!date || !carType || !duration) {
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
        service_id: "car_rental", // You'll need to get the actual service ID
        user_id: user.id,
        scheduled_time: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
        rental_duration: parseInt(duration),
        special_requests: `Car Type: ${carType}\nNotes: ${notes}`,
        status: "pending"
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Car rental booked successfully!",
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
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
            alt="Luxury Car Rental"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Luxury Car Rentals
            </h1>
          </div>
        </div>

        {/* Booking Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Rent a Car</CardTitle>
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
                  <Label>Car Type</Label>
                  <Select value={carType} onValueChange={setCarType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select car type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury_sedan">Luxury Sedan</SelectItem>
                      <SelectItem value="suv">Luxury SUV</SelectItem>
                      <SelectItem value="sports">Sports Car</SelectItem>
                      <SelectItem value="convertible">Convertible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Rental Duration (Days)</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="7">1 Week</SelectItem>
                      <SelectItem value="30">1 Month</SelectItem>
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
