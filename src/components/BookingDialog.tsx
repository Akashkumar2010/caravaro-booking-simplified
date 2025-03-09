
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Service, Vehicle } from "@/types/database";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BookingDialogProps, LocationDetails, CarRentalDetails, BusServiceDetails } from "./booking/types";
import { ServiceSpecificFields } from "./booking/ServiceSpecificFields";
import { Loader2 } from "lucide-react";

export function BookingDialog({ service, isOpen, onClose }: BookingDialogProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [locationDetails, setLocationDetails] = useState<LocationDetails>({
    pickup: "",
    destination: "",
  });
  const [carRentalDetails, setCarRentalDetails] = useState<CarRentalDetails>({
    seatingCapacity: "",
    rentalDuration: 1,
    pickupLocation: "",
    returnLocation: "",
    carType: "economy",
    insurance: "basic"
  });
  const [busServiceDetails, setBusServiceDetails] = useState<BusServiceDetails>({
    pickupLocation: "",
    destination: "",
    passengers: 0,
    tripType: 'one-way',
    departureDate: "",
    returnDate: ""
  });

  useEffect(() => {
    if (isOpen) {
      fetchUserVehicles();
    }
  }, [isOpen]);

  const fetchUserVehicles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("owner_id", user.id);

      if (error) throw error;
      setVehicles(data);
    } catch (error: any) {
      toast.error("Failed to fetch vehicles", {
        description: error.message
      });
    }
  };

  const handleAddVehicle = async () => {
    try {
      if (!newVehicle.make || !newVehicle.model || !newVehicle.year || !newVehicle.licensePlate) {
        toast.error("All vehicle fields are required");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { data, error } = await supabase.from("vehicles").insert({
        owner_id: user.id,
        make: newVehicle.make,
        model: newVehicle.model,
        year: parseInt(newVehicle.year),
        license_plate: newVehicle.licensePlate,
      }).select().single();

      if (error) throw error;

      setVehicles([...vehicles, data]);
      setSelectedVehicle(data.id);
      setNewVehicle({ make: "", model: "", year: "", licensePlate: "" });

      toast.success("Vehicle added successfully");
    } catch (error: any) {
      toast.error("Error adding vehicle", {
        description: error.message
      });
    }
  };

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
      onClose();
    } catch (error: any) {
      toast.error("Booking failed", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {service?.name}</DialogTitle>
          <DialogDescription>
            Select your preferred date and time for the service
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border mx-auto"
            disabled={(date) => date < new Date()}
          />
          
          <ServiceSpecificFields
            service={service}
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            newVehicle={newVehicle}
            setNewVehicle={setNewVehicle}
            handleAddVehicle={handleAddVehicle}
            locationDetails={locationDetails}
            setLocationDetails={setLocationDetails}
            carRentalDetails={carRentalDetails}
            setCarRentalDetails={setCarRentalDetails}
            busServiceDetails={busServiceDetails}
            setBusServiceDetails={setBusServiceDetails}
          />

          <div className="space-y-2">
            <Label>Coupon Code</Label>
            <Input
              placeholder="Enter coupon code (optional)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Special Requests</Label>
            <Textarea
              placeholder="Any special requests or notes?"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleBooking} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
