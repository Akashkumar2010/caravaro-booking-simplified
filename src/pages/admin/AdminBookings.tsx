
import { AdminLayout } from "@/layouts/AdminLayout";
import { ServiceStatus } from "@/types/database";
import { useState } from "react";
import { BookingCard } from "@/components/admin/bookings/BookingCard";
import { StatusFilter } from "@/components/admin/bookings/StatusFilter";
import { useBookings } from "@/hooks/admin/useBookings";

export default function AdminBookings() {
  const [filterStatus, setFilterStatus] = useState<ServiceStatus | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
  const { bookings, isLoading, updateBookingStatus } = useBookings(filterStatus);

  // Handle status update
  const handleStatusUpdate = (bookingId: string, status: ServiceStatus) => {
    updateBookingStatus.mutate({ 
      bookingId, 
      status, 
      adminNotes: adminNotes[bookingId] 
    });
  };

  // Update admin notes
  const handleNotesChange = (bookingId: string, notes: string) => {
    setAdminNotes(prev => ({ ...prev, [bookingId]: notes }));
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
        <StatusFilter 
          filterStatus={filterStatus} 
          onFilterChange={setFilterStatus} 
        />
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
            <BookingCard
              key={booking.id}
              booking={booking}
              adminNotes={adminNotes}
              onNotesChange={handleNotesChange}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
