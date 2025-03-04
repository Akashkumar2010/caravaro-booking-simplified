
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VehicleFormProps } from "./types";

export function VehicleForm({
  vehicles,
  selectedVehicle,
  setSelectedVehicle,
  newVehicle,
  setNewVehicle,
  handleAddVehicle
}: VehicleFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select Vehicle</Label>
        <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
          <SelectTrigger>
            <SelectValue placeholder="Select a vehicle" />
          </SelectTrigger>
          <SelectContent>
            {vehicles.map((vehicle) => (
              <SelectItem key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} ({vehicle.license_plate})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Or Add New Vehicle</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Make"
            value={newVehicle.make}
            onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
          />
          <Input
            placeholder="Model"
            value={newVehicle.model}
            onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
          />
          <Input
            placeholder="Year"
            type="number"
            value={newVehicle.year}
            onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
          />
          <Input
            placeholder="License Plate"
            value={newVehicle.licensePlate}
            onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleAddVehicle}
          disabled={!newVehicle.make || !newVehicle.model || !newVehicle.year || !newVehicle.licensePlate}
        >
          Add Vehicle
        </Button>
      </div>
    </div>
  );
}
