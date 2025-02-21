
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Service, Vehicle } from "@/types/database";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface BookingDialogProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

interface LocationDetails {
  pickup: string;
  destination: string;
}

interface CarRentalDetails {
  seatingCapacity: string;
  rentalDuration: number;
}

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
  });
  const { toast } = useToast();

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
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch vehicles",
      });
    }
  };

  const handleAddVehicle = async () => {
    try {
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

      toast({
        title: "Success",
        description: "Vehicle added successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleBooking = async () => {
    if (!service || !date) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a date for your booking",
      });
      return;
    }

    if ((service.type === "car_wash" || service.type === "car_rental") && !selectedVehicle) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select or add a vehicle",
      });
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
      if (service.type === "car_wash" || service.type === "car_rental") {
        bookingData.vehicle_id = selectedVehicle;
      }

      if (service.type === "driver_hire") {
        bookingData.pickup_location = locationDetails.pickup;
        bookingData.destination = locationDetails.destination;
      }

      if (service.type === "car_rental") {
        bookingData.seating_capacity = carRentalDetails.seatingCapacity;
        bookingData.rental_duration = carRentalDetails.rentalDuration;
      }

      if (couponCode) {
        bookingData.coupon_code = couponCode;
      }

      const { error } = await supabase.from("bookings").insert(bookingData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your booking has been confirmed!",
      });
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderServiceSpecificFields = () => {
    if (!service) return null;

    switch (service.type) {
      case "car_wash":
      case "car_rental":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Vehicle</Label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.make} {vehicle.model} ({vehicle.license_plate})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Or Add New Vehicle</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Make"
                  value={newVehicle.make}
                  onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                />
                <Input
                  placeholder="Model"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                />
                <Input
                  placeholder="Year"
                  type="number"
                  value={newVehicle.year}
                  onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                />
                <Input
                  placeholder="License Plate"
                  value={newVehicle.licensePlate}
                  onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleAddVehicle}
                disabled={!newVehicle.make || !newVehicle.model || !newVehicle.year || !newVehicle.licensePlate}
              >
                Add Vehicle
              </Button>
            </div>

            {service.type === "car_rental" && (
              <div className="space-y-2">
                <Label>Seating Capacity</Label>
                <Select
                  value={carRentalDetails.seatingCapacity}
                  onValueChange={(value) => setCarRentalDetails({ ...carRentalDetails, seatingCapacity: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select seating capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Seater</SelectItem>
                    <SelectItem value="7">7 Seater</SelectItem>
                    <SelectItem value="9">9 Seater</SelectItem>
                    <SelectItem value="12">12 Seater Mini Bus</SelectItem>
                    <SelectItem value="20">20 Seater Bus</SelectItem>
                  </SelectContent>
                </Select>

                <Label>Rental Duration (days)</Label>
                <Input
                  type="number"
                  min="1"
                  value={carRentalDetails.rentalDuration}
                  onChange={(e) => setCarRentalDetails({
                    ...carRentalDetails,
                    rentalDuration: parseInt(e.target.value) || 1
                  })}
                />
              </div>
            )}
          </div>
        );

      case "driver_hire":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Pickup Location</Label>
              <Input
                placeholder="Enter pickup location"
                value={locationDetails.pickup}
                onChange={(e) => setLocationDetails({ ...locationDetails, pickup: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Destination</Label>
              <Input
                placeholder="Enter destination"
                value={locationDetails.destination}
                onChange={(e) => setLocationDetails({ ...locationDetails, destination: e.target.value })}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
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
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
          
          {renderServiceSpecificFields()}

          <div className="space-y-2">
            <Label>Coupon Code</Label>
            <Input
              placeholder="Enter coupon code (optional)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>

          <Textarea
            placeholder="Any special requests or notes?"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleBooking} disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
