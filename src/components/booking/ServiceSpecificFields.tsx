
import { ServiceSpecificFieldsProps } from "./types";
import { VehicleForm } from "./VehicleForm";
import { CarRentalForm } from "./CarRentalForm";
import { DriverHireForm } from "./DriverHireForm";

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
  if (!service) return null;

  switch (service.type) {
    case "car_wash":
    case "car_rental":
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

          {service.type === "car_rental" && (
            <CarRentalForm
              carRentalDetails={carRentalDetails}
              setCarRentalDetails={setCarRentalDetails}
            />
          )}
        </div>
      );

    case "driver_hire":
      return (
        <DriverHireForm
          locationDetails={locationDetails}
          setLocationDetails={setLocationDetails}
        />
      );

    default:
      return null;
  }
}
