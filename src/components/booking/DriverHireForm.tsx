
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LocationDetails {
  pickup: string;
  destination: string;
}

interface DriverHireFormProps {
  locationDetails: LocationDetails;
  onLocationDetailsChange: (details: LocationDetails) => void;
}

export function DriverHireForm({
  locationDetails,
  onLocationDetailsChange,
}: DriverHireFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Pickup Location</Label>
        <Input
          placeholder="Enter pickup location"
          value={locationDetails.pickup}
          onChange={(e) => onLocationDetailsChange({
            ...locationDetails,
            pickup: e.target.value
          })}
        />
      </div>
      <div className="space-y-2">
        <Label>Destination</Label>
        <Input
          placeholder="Enter destination"
          value={locationDetails.destination}
          onChange={(e) => onLocationDetailsChange({
            ...locationDetails,
            destination: e.target.value
          })}
        />
      </div>
    </div>
  );
}
