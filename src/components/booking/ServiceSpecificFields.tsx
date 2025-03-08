
import { ServiceSpecificFieldsProps } from "./types";
import { VehicleForm } from "./VehicleForm";
import { DriverHireForm, DriverHireFormData } from "../services/driver-hire/DriverHireForm";
import { CarWashForm, CarWashFormData } from "../services/car-wash/CarWashForm";
import { CarRentalForm, CarRentalFormData } from "../services/car-rental/CarRentalForm";
import { useState } from "react";

export function ServiceSpecificFields({
  service,
  vehicles,
  selectedVehicle,
  setSelectedVehicle,
  newVehicle,
  setNewVehicle,
  handleAddVehicle,
  locationDetails,
  setLocationDetails,
  carRentalDetails,
  setCarRentalDetails
}: ServiceSpecificFieldsProps) {
  const [driverHireData, setDriverHireData] = useState<DriverHireFormData>({
    driverType: "standard",
    hours: "4",
    pickupLocation: "",
    destination: "",
    totalPrice: 140 // Default: $35/hour * 4 hours
  });

  const [carWashData, setCarWashData] = useState<CarWashFormData>({
    washType: "basic",
    specialRequests: "",
    additionalServices: {
      interiorDetailing: false,
      waxTreatment: false,
      leatherConditioning: false
    },
    totalPrice: 20 // Default price for basic wash
  });

  const handleDriverHireFormChange = (formData: DriverHireFormData) => {
    setDriverHireData(formData);
    if (setLocationDetails) {
      setLocationDetails({
        pickup: formData.pickupLocation,
        destination: formData.destination
      });
    }
  };

  const handleCarWashFormChange = (formData: CarWashFormData) => {
    setCarWashData(formData);
  };

  const handleCarRentalFormChange = (formData: CarRentalFormData) => {
    if (setCarRentalDetails) {
      setCarRentalDetails({
        seatingCapacity: formData.carType === "suv" ? "5-7" : formData.carType === "luxury" ? "4-5" : "4",
        rentalDuration: parseInt(formData.rentalDays) || 1,
        pickupLocation: formData.pickupLocation,
        returnLocation: formData.returnLocation,
        carType: formData.carType,
        insurance: formData.insurance
      });
    }
  };

  if (!service) return null;

  switch (service.type) {
    case "car_wash":
      return (
        <div className="space-y-4">
          <VehicleForm
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            newVehicle={newVehicle}
            setNewVehicle={setNewVehicle}
            handleAddVehicle={handleAddVehicle}
          />
          <CarWashForm onFormChange={handleCarWashFormChange} />
        </div>
      );
    case "car_rental":
      return (
        <div className="space-y-4">
          <CarRentalForm onFormChange={handleCarRentalFormChange} />
        </div>
      );
    case "driver_hire":
      return (
        <div className="space-y-4">
          <DriverHireForm onFormChange={handleDriverHireFormChange} />
        </div>
      );
    case "bus_service":
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Bus service specifics will be discussed after booking.</p>
        </div>
      );
    default:
      return null;
  }
}
