
import { supabase } from "@/lib/supabase";
import { Booking, ServiceStatus } from "@/types/database";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BookingWithDetails = Booking & {
  service: any;
  profile: any;
};

export function useBookings(filterStatus: ServiceStatus | null) {
  const queryClient = useQueryClient();

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
    mutationFn: async ({ 
      bookingId, 
      status, 
      adminNotes 
    }: { 
      bookingId: string; 
      status: ServiceStatus;
      adminNotes?: string; 
    }) => {
      const { error } = await supabase
        .from("bookings")
        .update({ status, admin_notes: adminNotes || null })
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

  return {
    bookings,
    isLoading,
    updateBookingStatus
  };
}
