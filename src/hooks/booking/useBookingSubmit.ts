
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/database";
import { toast } from "sonner";
import { format } from "date-fns";
import { LocationDetails, CarRentalDetails, BusServiceDetails } from "@/components/booking/types";

interface UseBookingSubmitProps {
  service: Service | null;
  date: Date | undefined;
  specialRequests: string;
  selectedVehicle: string;
  locationDetails: LocationDetails;
  carRentalDetails: CarRentalDetails;
  busServiceDetails: BusServiceDetails;
  couponCode: string;
  onSuccess: () => void;
}

export function useBookingSubmit({
  service,
  date,
  specialRequests,
  selectedVehicle,
  locationDetails,
  carRentalDetails,
  busServiceDetails,
  couponCode,
  onSuccess
}: UseBookingSubmitProps) {
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!service || !date) {
      toast.error("Please select a date for your booking");
      return;
    }

    if ((service.type === "car_wash") && !selectedVehicle) {
      toast.error("Please select or add a vehicle");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to make a booking");
      }

      const bookingData: any = {
        service_id: service.id,
        user_id: user.id,
        scheduled_time: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
        special_requests: specialRequests,
        status: 'pending'
      };

      // Add service-specific details
      if (service.type === "car_wash") {
        bookingData.vehicle_id = selectedVehicle;
      }

      if (service.type === "driver_hire") {
        bookingData.pickup_location = locationDetails.pickup;
        bookingData.destination = locationDetails.destination;
      }

      if (service.type === "car_rental") {
        bookingData.seating_capacity = carRentalDetails.seatingCapacity;
        bookingData.rental_duration = carRentalDetails.rentalDuration;
        bookingData.pickup_location = carRentalDetails.pickupLocation;
        bookingData.destination = carRentalDetails.returnLocation;
      }

      if (service.type === "bus_service") {
        bookingData.pickup_location = busServiceDetails.pickupLocation;
        bookingData.destination = busServiceDetails.destination;
        bookingData.seating_capacity = busServiceDetails.passengers.toString();
        bookingData.rental_duration = busServiceDetails.tripType === 'round-trip' ? 2 : 1;
      }

      if (couponCode) {
        bookingData.coupon_code = couponCode;
      }

      const { error } = await supabase.from("bookings").insert(bookingData);

      if (error) throw error;

      toast.success("Your booking has been confirmed!", {
        description: "You can view your booking details in your profile."
      });
      onSuccess();
    } catch (error: any) {
      toast.error("Booking failed", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleBooking, loading };
}
