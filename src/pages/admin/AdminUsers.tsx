
import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/database";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Edit, Trash2, UserCircle, Loader2, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    avatar_url: ""
  });
  
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Profile[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (profile: Partial<Profile> & { id: string }) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", profile.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setIsFormOpen(false);
      resetForm();
      toast.success("User profile updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update user profile", {
        description: error.message
      });
    }
  });

  const handleEditUser = (user: Profile) => {
    setSelectedUser(user);
    setFormData({
      full_name: user.full_name || "",
      phone_number: user.phone_number || "",
      avatar_url: user.avatar_url || ""
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      full_name: "",
      phone_number: "",
      avatar_url: ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      updateMutation.mutate({
        id: selectedUser.id,
        ...formData
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users?.map((user) => (
            <Card key={user.id} className="overflow-hidden">
              <CardHeader className="p-4 flex flex-row items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {user.avatar_url ? (
                    <img 
                      src={user.avatar_url} 
                      alt={user.full_name || "User"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">{user.full_name || "Unnamed User"}</CardTitle>
                  <p className="text-sm text-gray-500">{user.id.substring(0, 8)}...</p>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{user.phone_number || "No phone number"}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </div>
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
              Edit User Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Full Name</Label>
                <Input
                  className="col-span-3"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Phone Number</Label>
                <Input
                  className="col-span-3"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Avatar URL</Label>
                <Input
                  className="col-span-3"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
