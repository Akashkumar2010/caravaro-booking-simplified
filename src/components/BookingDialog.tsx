
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BookingDialogProps, LocationDetails, CarRentalDetails, BusServiceDetails } from "./booking/types";
import { BookingFormFields } from "./booking/BookingFormFields";
import { useVehicles } from "@/hooks/booking/useVehicles";
import { useBookingSubmit } from "@/hooks/booking/useBookingSubmit";

export function BookingDialog({ service, isOpen, onClose }: BookingDialogProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [specialRequests, setSpecialRequests] = useState("");
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

  const { 
    vehicles, 
    selectedVehicle, 
    setSelectedVehicle, 
    newVehicle, 
    setNewVehicle, 
    fetchUserVehicles, 
    handleAddVehicle 
  } = useVehicles();

  const { handleBooking, loading } = useBookingSubmit({
    service,
    date,
    specialRequests,
    selectedVehicle,
    locationDetails,
    carRentalDetails,
    busServiceDetails,
    couponCode,
    onSuccess: onClose
  });

  useEffect(() => {
    if (isOpen) {
      fetchUserVehicles();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {service?.name}</DialogTitle>
          <DialogDescription>
            Select your preferred date and time for the service
          </DialogDescription>
        </DialogHeader>
        
        <BookingFormFields
          service={service}
          date={date}
          setDate={setDate}
          specialRequests={specialRequests}
          setSpecialRequests={setSpecialRequests}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
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
