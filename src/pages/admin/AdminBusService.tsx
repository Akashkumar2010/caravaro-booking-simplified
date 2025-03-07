
import { AdminLayout } from "@/layouts/AdminLayout";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash, Bus } from "lucide-react";
import { RentalVehicle } from "@/types/database";

export default function AdminBusService() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<RentalVehicle | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "bus",
    seating_capacity: 0,
    price_per_day: 0,
    availability_status: "available",
    image_url: "",
    description: ""
  });

  // Fetch all buses
  const { data: buses, isLoading } = useQuery({
    queryKey: ["adminBuses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_vehicles")
        .select("*")
        .eq("type", "bus")
        .order("name");
      
      if (error) {
        console.error("Error fetching buses:", error);
        toast.error("Failed to load buses");
        throw error;
      }
      
      return data as RentalVehicle[];
    },
  });

  // Create or update bus mutation
  const upsertBus = useMutation({
    mutationFn: async (busData: any) => {
      let response;

      // Always set type to "bus" for this page
      const dataToSave = { ...busData, type: "bus" };

      if (editingBus) {
        // Update existing bus
        response = await supabase
          .from("rental_vehicles")
          .update(dataToSave)
          .eq("id", editingBus.id);
      } else {
        // Create new bus
        response = await supabase
          .from("rental_vehicles")
          .insert(dataToSave);
      }

      if (response.error) {
        console.error("Error saving bus:", response.error);
        throw response.error;
      }
      
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBuses"] });
      setIsDialogOpen(false);
      toast.success(editingBus ? "Bus updated" : "Bus created");
      resetForm();
    },
    onError: (error) => {
      console.error("Failed to save bus:", error);
      toast.error(editingBus ? "Failed to update bus" : "Failed to create bus");
    },
  });

  // Delete bus mutation
  const deleteBus = useMutation({
    mutationFn: async (busId: string) => {
      const { error } = await supabase
        .from("rental_vehicles")
        .delete()
        .eq("id", busId);
      
      if (error) {
        console.error("Error deleting bus:", error);
        throw error;
      }
      
      return busId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBuses"] });
      toast.success("Bus deleted");
    },
    onError: (error) => {
      console.error("Failed to delete bus:", error);
      toast.error("Failed to delete bus");
    },
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    upsertBus.mutate(formData);
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      type: "bus",
      seating_capacity: 0,
      price_per_day: 0,
      availability_status: "available",
      image_url: "",
      description: ""
    });
    setEditingBus(null);
  };

  // Open edit dialog with bus data
  const handleEdit = (bus: RentalVehicle) => {
    setEditingBus(bus);
    setFormData({
      name: bus.name,
      type: bus.type,
      seating_capacity: bus.seating_capacity,
      price_per_day: bus.price_per_day,
      availability_status: bus.availability_status,
      image_url: bus.image_url || "",
      description: ""
    });
    setIsDialogOpen(true);
  };

  // Handle bus deletion with confirmation
  const handleDelete = (busId: string) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      deleteBus.mutate(busId);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Bus size={32} />
          <h1 className="text-3xl font-bold">Bus Service Management</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Bus
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingBus ? "Edit Bus" : "Add New Bus"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="name">Bus Name/Model</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
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
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBus ? "Update Bus" : "Add Bus"}
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
          {buses?.map((bus) => (
            <Card key={bus.id} className="overflow-hidden">
              <div className="h-40 overflow-hidden bg-gray-100">
                {bus.image_url ? (
                  <img 
                    src={bus.image_url} 
                    alt={bus.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <Bus size={64} className="text-gray-400" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bus size={18} /> {bus.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="font-medium">Seating Capacity: </span>
                    {bus.seating_capacity} passengers
                  </div>
                  <div>
                    <span className="font-medium">Price: </span>
                    ${bus.price_per_day}/day
                  </div>
                  <div>
                    <span className="font-medium">Status: </span>
                    <span className={`${
                      bus.availability_status === 'available' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {bus.availability_status}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEdit(bus)}
                >
                  <Pencil size={16} className="mr-1" /> Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => handleDelete(bus.id)}
                >
                  <Trash size={16} className="mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
          {buses?.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              No buses found. Click "Add Bus" to create one.
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
