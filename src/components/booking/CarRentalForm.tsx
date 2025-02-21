
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VehicleSelector } from "./VehicleSelector";
import { Vehicle } from "@/types/database";

interface CarRentalFormProps {
  vehicles: Vehicle[];
  selectedVehicle: string;
  onVehicleSelect: (id: string) => void;
  onVehiclesUpdate: (vehicles: Vehicle[]) => void;
  carRentalDetails: {
    seatingCapacity: string;
    rentalDuration: number;
  };
  onCarRentalDetailsChange: (details: { seatingCapacity: string; rentalDuration: number }) => void;
}

export function CarRentalForm({
  vehicles,
  selectedVehicle,
  onVehicleSelect,
  onVehiclesUpdate,
  carRentalDetails,
  onCarRentalDetailsChange,
}: CarRentalFormProps) {
  return (
    <div className="space-y-4">
      <VehicleSelector
        vehicles={vehicles}
        selectedVehicle={selectedVehicle}
        onVehicleSelect={onVehicleSelect}
        onVehiclesUpdate={onVehiclesUpdate}
      />

      <div className="space-y-2">
        <Label>Seating Capacity</Label>
        <Select
          value={carRentalDetails.seatingCapacity}
          onValueChange={(value) => onCarRentalDetailsChange({
            ...carRentalDetails,
            seatingCapacity: value
          })}
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
          onChange={(e) => onCarRentalDetailsChange({
            ...carRentalDetails,
            rentalDuration: parseInt(e.target.value) || 1
          })}
        />
      </div>
    </div>
  );
}
