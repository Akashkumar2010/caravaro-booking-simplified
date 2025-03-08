import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Service, ServiceType } from "@/types/database";
import { ServiceFormData } from "@/components/booking/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Edit, Trash2, Plus, Image, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminServices() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    description: "",
    type: "car_wash",
    price: 0,
    duration: 0,
    image_url: ""
  });
  
  const { data: services, isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Service[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newService: ServiceFormData) => {
      const { data, error } = await supabase
        .from("services")
        .insert(newService as { 
          name: string;
          description: string;
          type: "car_wash" | "driver_hire" | "car_rental";
          price: number;
          duration: number;
          image_url: string;
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      setIsFormOpen(false);
      resetForm();
      toast.success("Service created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create service", {
        description: error.message
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (service: ServiceFormData & { id: string }) => {
      const { data, error } = await supabase
        .from("services")
        .update(service as {
          id: string;
          name?: string;
          description?: string;
          type?: "car_wash" | "driver_hire" | "car_rental";
          price?: number;
          duration?: number;
          image_url?: string;
        })
        .eq("id", service.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      setIsFormOpen(false);
      resetForm();
      toast.success("Service updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update service", {
        description: error.message
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast.success("Service deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete service", {
        description: error.message
      });
    }
  });

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      description: service.description || "",
      type: service.type === 'bus_service' ? 'car_rental' : service.type as "car_wash" | "driver_hire" | "car_rental",
      price: service.price,
      duration: service.duration || 0,
      image_url: service.image_url || ""
    });
    setIsFormOpen(true);
  };

  const handleCreateNewService = () => {
    setSelectedService(null);
    resetForm();
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "car_wash",
      price: 0,
      duration: 0,
      image_url: ""
    });
  };

  const handleDeleteService = async (id: string) => {
    if (confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService) {
      updateMutation.mutate({
        id: selectedService.id,
        ...formData
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const getTypeLabel = (type: ServiceType) => {
    switch (type) {
      case "car_wash": return "Car Wash";
      case "driver_hire": return "Driver Hire";
      case "car_rental": return "Car Rental";
      case "bus_service": return "Bus Service";
      default: return type;
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services Management</h1>
        <Button onClick={handleCreateNewService} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add New Service
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services?.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <div className="h-40 bg-gray-100 relative">
                {service.image_url ? (
                  <img 
                    src={service.image_url} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image className="h-12 w-12 text-gray-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8 rounded-full bg-white/80"
                    onClick={() => handleEditService(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    className="h-8 w-8 rounded-full bg-white/80"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {getTypeLabel(service.type)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-sm text-gray-500 line-clamp-2 mb-2">
                  {service.description || "No description provided"}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">${service.price.toFixed(2)}</span>
                  {service.duration && (
                    <span className="text-sm text-gray-500">{service.duration} min</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedService ? "Edit Service" : "Create New Service"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <Input
                  className="col-span-3"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: "car_wash" | "driver_hire" | "car_rental") => 
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car_wash">Car Wash</SelectItem>
                    <SelectItem value="driver_hire">Driver Hire</SelectItem>
                    <SelectItem value="car_rental">Car Rental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Price ($)</Label>
                <Input
                  type="number"
                  className="col-span-3"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Duration (min)</Label>
                <Input
                  type="number"
                  className="col-span-3"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  min="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Image URL</Label>
                <Input
                  className="col-span-3"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Description</Label>
                <Textarea
                  className="col-span-3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {selectedService ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
