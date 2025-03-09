
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bus, Calendar, Users, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { RentalVehicle } from "@/types/database";

const formSchema = z.object({
  scheduled_time: z.string().min(1, "Please select a date and time"),
  pickup_location: z.string().min(3, "Please enter a pickup location"),
  destination: z.string().min(3, "Please enter a destination"),
  rental_duration: z.coerce.number().min(1, "Please enter rental duration"),
  seating_capacity: z.string().min(1, "Please select a seating capacity"),
  special_requests: z.string().optional(),
  rental_vehicle_id: z.string().min(1, "Please select a bus")
});

export function BusServiceForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available buses
  const { data: buses, isLoading: isLoadingBuses } = useQuery({
    queryKey: ["buses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_vehicles")
        .select("*")
        .eq("type", "bus")
        .eq("availability_status", "available");
      
      if (error) throw error;
      return data as RentalVehicle[];
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scheduled_time: "",
      pickup_location: "",
      destination: "",
      rental_duration: 1,
      seating_capacity: "",
      special_requests: "",
      rental_vehicle_id: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // First get the bus service type id
      const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .select("id")
        .eq("type", "bus_service")
        .single();
      
      if (serviceError) {
        if (serviceError.code === "PGRST116") {
          toast.error("Bus service not found. Please contact admin.");
        } else {
          toast.error("Failed to fetch service information");
          console.error("Service fetch error:", serviceError);
        }
        return;
      }
      
      // Create the booking
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          service_id: serviceData.id,
          scheduled_time: new Date(values.scheduled_time).toISOString(),
          pickup_location: values.pickup_location,
          destination: values.destination,
          rental_duration: values.rental_duration,
          seating_capacity: values.seating_capacity,
          special_requests: values.special_requests || null,
          vehicle_id: values.rental_vehicle_id,
          status: "pending",
        })
        .select()
        .single();

      if (bookingError) {
        toast.error("Failed to create booking");
        console.error("Booking creation error:", bookingError);
        return;
      }

      // Success
      toast.success("Booking submitted successfully!");
      navigate("/bookings");
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Bus booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bus className="h-6 w-6 text-purple-500" />
          Book Bus Charter Service
        </CardTitle>
        <CardDescription>
          Complete the form below to book our bus charter service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="scheduled_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date and Time</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <Input type="datetime-local" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rental_duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rental Duration (Days)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="pickup_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Location</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Input {...field} placeholder="Enter pickup address" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Input {...field} placeholder="Enter destination address" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="seating_capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Seating Capacity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select seating capacity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="up to 20">Up to 20 passengers</SelectItem>
                        <SelectItem value="21-30">21-30 passengers</SelectItem>
                        <SelectItem value="31-40">31-40 passengers</SelectItem>
                        <SelectItem value="41-50">41-50 passengers</SelectItem>
                        <SelectItem value="50+">More than 50 passengers</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rental_vehicle_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Bus</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoadingBuses || !buses?.length}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={isLoadingBuses ? "Loading buses..." : "Select a bus"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {buses?.map((bus) => (
                          <SelectItem key={bus.id} value={bus.id}>
                            {bus.name} - {bus.seating_capacity} seats
                          </SelectItem>
                        ))}
                        {!isLoadingBuses && !buses?.length && (
                          <SelectItem value="none" disabled>No buses available</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="special_requests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any special requirements or additional information"
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Let us know if you have any special requirements
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Book Bus Service"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div>
          <p>Need help? Contact our support team</p>
          <p className="text-primary">support@carservices.com</p>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>24/7 Customer Service</span>
        </div>
      </CardFooter>
    </Card>
  );
}
