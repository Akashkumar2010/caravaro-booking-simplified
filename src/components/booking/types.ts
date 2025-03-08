
import { Service, Vehicle } from "@/types/database";
import { CarWashFormData } from "../services/car-wash/CarWashForm";
import { DriverHireFormData } from "../services/driver-hire/DriverHireForm";
import { CarRentalFormData } from "../services/car-rental/CarRentalForm";

export interface BookingDialogProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface LocationDetails {
  pickup: string;
  destination: string;
}

export interface CarRentalDetails {
  seatingCapacity: string;
  rentalDuration: number;
  pickupLocation?: string;
  returnLocation?: string;
  carType?: string;
  insurance?: string;
}

export interface VehicleFormProps {
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
}

export interface ServiceSpecificFieldsProps {
  service: Service | null;
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
}

// Adding a type for admin service form data that matches what Supabase expects
export interface ServiceFormData {
  name: string;
  description: string;
  type: "car_wash" | "driver_hire" | "car_rental" | "bus_service";
  price: number;
  duration: number;
  image_url: string;
}
