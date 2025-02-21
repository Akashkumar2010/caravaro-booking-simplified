
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Vehicle } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicle: string;
  onVehicleSelect: (id: string) => void;
  onVehiclesUpdate: (vehicles: Vehicle[]) => void;
}

export function VehicleSelector({
  vehicles,
  selectedVehicle,
  onVehicleSelect,
  onVehiclesUpdate,
}: VehicleSelectorProps) {
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
  });
  const { toast } = useToast();

  const handleAddVehicle = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { data, error } = await supabase.from("vehicles").insert({
        owner_id: user.id,
        make: newVehicle.make,
        model: newVehicle.model,
        year: parseInt(newVehicle.year),
        license_plate: newVehicle.licensePlate,
      }).select().single();

      if (error) throw error;

      onVehiclesUpdate([...vehicles, data]);
      onVehicleSelect(data.id);
      setNewVehicle({ make: "", model: "", year: "", licensePlate: "" });

      toast({
        title: "Success",
        description: "Vehicle added successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select Vehicle</Label>
        <Select value={selectedVehicle} onValueChange={onVehicleSelect}>
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
