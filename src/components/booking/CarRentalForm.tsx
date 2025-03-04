
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CarRentalDetails } from "./types";

export interface CarRentalFormProps {
  carRentalDetails: CarRentalDetails;
  setCarRentalDetails: (details: CarRentalDetails) => void;
}

export function CarRentalForm({ carRentalDetails, setCarRentalDetails }: CarRentalFormProps) {
  return (
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
  );
}
