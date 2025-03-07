
import { LocationDetails } from "./types";
import { DriverHireFormData, DriverHireForm as ServiceDriverHireForm } from "../services/driver-hire/DriverHireForm";

export interface DriverHireFormProps {
  locationDetails: LocationDetails;
  setLocationDetails: (details: LocationDetails) => void;
}

export function DriverHireForm({ locationDetails, setLocationDetails }: DriverHireFormProps) {
  const handleFormChange = (formData: DriverHireFormData) => {
    setLocationDetails({
      pickup: formData.pickupLocation,
      destination: formData.destination
    });
  };

  return (
    <ServiceDriverHireForm 
      onFormChange={handleFormChange} 
    />
  );
}
