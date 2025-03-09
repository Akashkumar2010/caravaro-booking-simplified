
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Bus, Users } from "lucide-react";
import { z } from "zod";
import { formSchema } from "./BusServiceFormSchema";
import { BusServiceFormFields } from "./BusServiceFormFields";
import { useBusServiceForm } from "@/hooks/bus-service/useBusServiceForm";

// Define the BusServiceFormData type for use with onFormChange prop
export interface BusServiceFormData {
  pickupLocation: string;
  destination: string;
  passengers: number;
  tripType: 'one-way' | 'round-trip';
  departureDate: string;
  returnDate?: string;
}

export interface BusServiceFormProps {
  onFormChange?: (formData: BusServiceFormData) => void;
}

export function BusServiceForm({ onFormChange }: BusServiceFormProps = {}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { buses, isLoadingBuses } = useBusServiceForm();
  
  // Create state to track form values for the onFormChange callback
  const [formData, setFormData] = useState<BusServiceFormData>({
    pickupLocation: "",
    destination: "",
    passengers: 0,
    tripType: 'one-way',
    departureDate: ""
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

  // Update formData when form values change
  const updateFormData = (values: any) => {
    const newFormData = {
      ...formData,
      pickupLocation: values.pickup_location || formData.pickupLocation,
      destination: values.destination || formData.destination,
      departureDate: values.scheduled_time || formData.departureDate,
    };
    
    setFormData(newFormData);
    
    // Call the onFormChange prop if it exists
    if (onFormChange) {
      onFormChange(newFormData);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    updateFormData(values);
    
    try {
      // First get the bus service type id
      const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .select("id")
        .eq("type", "bus_service")
        .maybeSingle();
      
      if (serviceError) {
        toast.error("Failed to fetch service information");
        console.error("Service fetch error:", serviceError);
        return;
      }
      
      if (!serviceData) {
        toast.error("Bus service not found. Please contact admin.");
        return;
      }
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast.error("You must be logged in to make a booking");
        return;
      }
      
      // Create the booking
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
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
          <form onChange={() => updateFormData(form.getValues())} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BusServiceFormFields 
              form={form} 
              buses={buses} 
              isLoadingBuses={isLoadingBuses} 
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
