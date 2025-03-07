
import { AdminLayout } from "@/layouts/AdminLayout";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Booking, Service, Profile, ServiceStatus } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Check, X, Clock, RefreshCw, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

type BookingWithDetails = Booking & {
  service: Service;
  profile: Profile;
};

export default function AdminBookings() {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<ServiceStatus | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});

  // Fetch all bookings with service and user details
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["adminBookings", filterStatus],
    queryFn: async () => {
      let query = supabase
        .from("bookings")
        .select(`
          *,
          service:services(*),
          profile:profiles(*)
        `)
        .order("scheduled_time", { ascending: false });
      
      if (filterStatus) {
        query = query.eq("status", filterStatus);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
        throw error;
      }
      
      return data as BookingWithDetails[];
    },
  });

  // Update booking status mutation
  const updateBookingStatus = useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: string; status: ServiceStatus }) => {
      const { error } = await supabase
        .from("bookings")
        .update({ status, admin_notes: adminNotes[bookingId] || null })
        .eq("id", bookingId);
      
      if (error) {
        console.error("Error updating booking:", error);
        throw error;
      }
      
      return { bookingId, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBookings"] });
      toast.success("Booking status updated");
    },
    onError: (error) => {
      console.error("Failed to update booking:", error);
      toast.error("Failed to update booking status");
    },
  });

  // Handle status update
  const handleStatusUpdate = (bookingId: string, status: ServiceStatus) => {
    updateBookingStatus.mutate({ bookingId, status });
  };

  // Helper function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-500">Confirmed</Badge>;
      case "in_progress":
        return <Badge className="bg-purple-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Update admin notes
  const handleNotesChange = (bookingId: string, notes: string) => {
    setAdminNotes(prev => ({ ...prev, [bookingId]: notes }));
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
        <div className="flex gap-2">
          <Button 
            variant={filterStatus === null ? "default" : "outline"} 
            onClick={() => setFilterStatus(null)}
          >
            All
          </Button>
          <Button 
            variant={filterStatus === "pending" ? "default" : "outline"} 
            onClick={() => setFilterStatus("pending")}
          >
            Pending
          </Button>
          <Button 
            variant={filterStatus === "confirmed" ? "default" : "outline"} 
            onClick={() => setFilterStatus("confirmed")}
          >
            Confirmed
          </Button>
          <Button 
            variant={filterStatus === "in_progress" ? "default" : "outline"} 
            onClick={() => setFilterStatus("in_progress")}
          >
            In Progress
          </Button>
          <Button 
            variant={filterStatus === "completed" ? "default" : "outline"} 
            onClick={() => setFilterStatus("completed")}
          >
            Completed
          </Button>
          <Button 
            variant={filterStatus === "cancelled" ? "default" : "outline"} 
            onClick={() => setFilterStatus("cancelled")}
          >
            Cancelled
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : bookings?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No bookings found.
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings?.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {booking.service.name} - {booking.profile.full_name || "Anonymous User"}
                  </CardTitle>
                  {getStatusBadge(booking.status)}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Scheduled: </span>
                        {format(new Date(booking.scheduled_time), "PPP p")}
                      </div>
                      <div>
                        <span className="font-medium">Service Type: </span>
                        {booking.service.type}
                      </div>
                      <div>
                        <span className="font-medium">Price: </span>
                        ${booking.service.price}
                      </div>
                      {booking.pickup_location && (
                        <div>
                          <span className="font-medium">Pickup: </span>
                          {booking.pickup_location}
                        </div>
                      )}
                      {booking.destination && (
                        <div>
                          <span className="font-medium">Destination: </span>
                          {booking.destination}
                        </div>
                      )}
                      {booking.rental_duration && (
                        <div>
                          <span className="font-medium">Rental Duration: </span>
                          {booking.rental_duration} days
                        </div>
                      )}
                      {booking.special_requests && (
                        <div>
                          <span className="font-medium">Special Requests: </span>
                          {booking.special_requests}
                        </div>
                      )}
                      {booking.admin_notes && (
                        <div>
                          <span className="font-medium">Admin Notes: </span>
                          {booking.admin_notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Admin Notes:</div>
                    <Textarea
                      placeholder="Add notes about this booking"
                      value={adminNotes[booking.id] || booking.admin_notes || ""}
                      onChange={(e) => handleNotesChange(booking.id, e.target.value)}
                      className="h-24"
                    />
                    <div className="font-medium mt-4">Change Status:</div>
                    <div className="flex flex-wrap gap-2">
                      {booking.status !== "confirmed" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                          className="flex gap-1"
                        >
                          <Check size={16} /> Confirm
                        </Button>
                      )}
                      {booking.status !== "cancelled" && (
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                          className="flex gap-1"
                        >
                          <X size={16} /> Cancel
                        </Button>
                      )}
                      {booking.status !== "in_progress" && booking.status !== "completed" && booking.status !== "cancelled" && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleStatusUpdate(booking.id, "in_progress")}
                          className="flex gap-1"
                        >
                          <Clock size={16} /> In Progress
                        </Button>
                      )}
                      {booking.status !== "completed" && booking.status !== "cancelled" && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleStatusUpdate(booking.id, "completed")}
                          className="flex gap-1"
                        >
                          <CheckCircle size={16} /> Complete
                        </Button>
                      )}
                      {booking.status === "cancelled" && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleStatusUpdate(booking.id, "pending")}
                          className="flex gap-1"
                        >
                          <RefreshCw size={16} /> Reactivate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
