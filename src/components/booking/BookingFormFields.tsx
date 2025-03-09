
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Service, Vehicle } from "@/types/database";
import { LocationDetails, CarRentalDetails, BusServiceDetails } from "./types";
import { ServiceSpecificFields } from "./ServiceSpecificFields";

interface BookingFormFieldsProps {
  service: Service | null;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  specialRequests: string;
  setSpecialRequests: (value: string) => void;
  couponCode: string;
  setCouponCode: (value: string) => void;
  vehicles: Vehicle[];
  selectedVehicle: string;
  setSelectedVehicle: (id: string) => void;
  newVehicle: {
    make: string;
    model: string;
    year: string;
    licensePlate: string;
  };
  setNewVehicle: (vehicle: {
    make: string;
    model: string;
    year: string;
    licensePlate: string;
  }) => void;
  handleAddVehicle: () => Promise<void>;
  locationDetails: LocationDetails;
  setLocationDetails: (details: LocationDetails) => void;
  carRentalDetails: CarRentalDetails;
  setCarRentalDetails: (details: CarRentalDetails) => void;
  busServiceDetails: BusServiceDetails;
  setBusServiceDetails: (details: BusServiceDetails) => void;
}

export function BookingFormFields({ 
  service,
  date,
  setDate,
  specialRequests,
  setSpecialRequests,
  couponCode,
  setCouponCode,
  vehicles,
  selectedVehicle,
  setSelectedVehicle,
  newVehicle,
  setNewVehicle,
  handleAddVehicle,
  locationDetails,
  setLocationDetails,
  carRentalDetails,
  setCarRentalDetails,
  busServiceDetails,
  setBusServiceDetails
}: BookingFormFieldsProps) {
  return (
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
  );
}
