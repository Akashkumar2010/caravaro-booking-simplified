
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Vehicle } from "@/types/database";
import { toast } from "sonner";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
  });

  const fetchUserVehicles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("owner_id", user.id);

      if (error) throw error;
      setVehicles(data);
    } catch (error: any) {
      toast.error("Failed to fetch vehicles", {
        description: error.message
      });
    }
  };

  const handleAddVehicle = async () => {
    try {
      if (!newVehicle.make || !newVehicle.model || !newVehicle.year || !newVehicle.licensePlate) {
        toast.error("All vehicle fields are required");
        return;
      }

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

      setVehicles([...vehicles, data]);
      setSelectedVehicle(data.id);
      setNewVehicle({ make: "", model: "", year: "", licensePlate: "" });

      toast.success("Vehicle added successfully");
    } catch (error: any) {
      toast.error("Error adding vehicle", {
        description: error.message
      });
    }
  };

  return { 
    vehicles, 
    selectedVehicle, 
    setSelectedVehicle, 
    newVehicle, 
    setNewVehicle, 
    fetchUserVehicles, 
    handleAddVehicle 
  };
}
