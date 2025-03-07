
import { AdminLayout } from "@/layouts/AdminLayout";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash } from "lucide-react";
import { RentalVehicle } from "@/types/database";

type VehicleFormData = {
  name: string;
  type: string;
  seating_capacity: number;
  price_per_day: number;
  availability_status: string;
  image_url: string;
};

export default function AdminVehicles() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<RentalVehicle | null>(null);
  const [formData, setFormData] = useState<VehicleFormData>({
    name: "",
    type: "",
    seating_capacity: 0,
    price_per_day: 0,
    availability_status: "available",
    image_url: "",
  });

  // Fetch all vehicles
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["adminVehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_vehicles")
        .select("*")
        .order("name");
      
      if (error) {
        console.error("Error fetching vehicles:", error);
        toast.error("Failed to load vehicles");
        throw error;
      }
      
      return data as RentalVehicle[];
    },
  });

  // Create or update vehicle mutation
  const upsertVehicle = useMutation({
    mutationFn: async (vehicleData: VehicleFormData) => {
      let response;

      if (editingVehicle) {
        // Update existing vehicle
        response = await supabase
          .from("rental_vehicles")
          .update(vehicleData)
          .eq("id", editingVehicle.id);
      } else {
        // Create new vehicle
        response = await supabase
          .from("rental_vehicles")
          .insert(vehicleData);
      }

      if (response.error) {
        console.error("Error saving vehicle:", response.error);
        throw response.error;
      }
      
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminVehicles"] });
      setIsDialogOpen(false);
      toast.success(editingVehicle ? "Vehicle updated" : "Vehicle created");
      resetForm();
    },
    onError: (error) => {
      console.error("Failed to save vehicle:", error);
      toast.error(editingVehicle ? "Failed to update vehicle" : "Failed to create vehicle");
    },
  });

  // Delete vehicle mutation
  const deleteVehicle = useMutation({
    mutationFn: async (vehicleId: string) => {
      const { error } = await supabase
        .from("rental_vehicles")
        .delete()
        .eq("id", vehicleId);
      
      if (error) {
        console.error("Error deleting vehicle:", error);
        throw error;
      }
      
      return vehicleId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminVehicles"] });
      toast.success("Vehicle deleted");
    },
    onError: (error) => {
      console.error("Failed to delete vehicle:", error);
      toast.error("Failed to delete vehicle");
    },
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    upsertVehicle.mutate(formData);
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      seating_capacity: 0,
      price_per_day: 0,
      availability_status: "available",
      image_url: "",
    });
    setEditingVehicle(null);
  };

  // Open edit dialog with vehicle data
  const handleEdit = (vehicle: RentalVehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      seating_capacity: vehicle.seating_capacity,
      price_per_day: vehicle.price_per_day,
      availability_status: vehicle.availability_status,
      image_url: vehicle.image_url || "",
    });
    setIsDialogOpen(true);
  };

  // Handle vehicle deletion with confirmation
  const handleDelete = (vehicleId: string) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      deleteVehicle.mutate(vehicleId);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Vehicles</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="name">Vehicle Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="seating_capacity">Seating Capacity</Label>
                <Input
                  id="seating_capacity"
                  name="seating_capacity"
                  type="number"
                  min="1"
                  value={formData.seating_capacity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="price_per_day">Price Per Day ($)</Label>
                <Input
                  id="price_per_day"
                  name="price_per_day"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price_per_day}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="availability_status">Availability Status</Label>
                <Input
                  id="availability_status"
                  name="availability_status"
                  value={formData.availability_status}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles?.map((vehicle) => (
            <Card key={vehicle.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{vehicle.name}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-1 text-sm">
                  {vehicle.image_url && (
                    <div className="w-full h-40 bg-gray-100 mb-3 rounded overflow-hidden">
                      <img 
                        src={vehicle.image_url} 
                        alt={vehicle.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Type: </span>
                    {vehicle.type}
                  </div>
                  <div>
                    <span className="font-medium">Seating: </span>
                    {vehicle.seating_capacity}
                  </div>
                  <div>
                    <span className="font-medium">Price: </span>
                    ${vehicle.price_per_day}/day
                  </div>
                  <div>
                    <span className="font-medium">Status: </span>
                    {vehicle.availability_status}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEdit(vehicle)}
                >
                  <Pencil size={16} className="mr-1" /> Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => handleDelete(vehicle.id)}
                >
                  <Trash size={16} className="mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
          {vehicles?.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              No vehicles found. Click "Add Vehicle" to create one.
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
