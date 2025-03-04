
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationDetails } from "./types";

export interface DriverHireFormProps {
  locationDetails: LocationDetails;
  setLocationDetails: (details: LocationDetails) => void;
}

export function DriverHireForm({ locationDetails, setLocationDetails }: DriverHireFormProps) {
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
}
