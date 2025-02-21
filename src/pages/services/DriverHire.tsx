
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

export default function DriverHire() {
  const [date, setDate] = useState<Date>();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!date || !pickup || !destination || !duration) {
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
        service_id: "driver_hire", // You'll need to get the actual service ID
        user_id: user.id,
        scheduled_time: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
        pickup_location: pickup,
        destination: destination,
        special_requests: `Duration: ${duration}\nNotes: ${notes}`,
        status: "pending"
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Driver hire service booked successfully!",
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
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d"
            alt="Driver Hire"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Professional Driver Services
            </h1>
          </div>
        </div>

        {/* Booking Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Book a Driver</CardTitle>
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
                  <Label>Pickup Location</Label>
                  <Input
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Destination</Label>
                  <Input
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 Hours</SelectItem>
                      <SelectItem value="8">8 Hours</SelectItem>
                      <SelectItem value="12">12 Hours</SelectItem>
                      <SelectItem value="24">24 Hours</SelectItem>
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
