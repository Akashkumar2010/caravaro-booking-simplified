
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Booking, Profile, Service, ServiceStatus } from "@/types/database";
import { format } from "date-fns";
import { Check, CheckCircle, Clock, RefreshCw, X } from "lucide-react";

type BookingWithDetails = Booking & {
  service: Service;
  profile: Profile;
};

interface BookingCardProps {
  booking: BookingWithDetails;
  adminNotes: Record<string, string>;
  onNotesChange: (bookingId: string, notes: string) => void;
  onStatusUpdate: (bookingId: string, status: ServiceStatus) => void;
}

export function BookingCard({ 
  booking, 
  adminNotes, 
  onNotesChange, 
  onStatusUpdate 
}: BookingCardProps) {
  
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

  return (
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
              onChange={(e) => onNotesChange(booking.id, e.target.value)}
              className="h-24"
            />
            <div className="font-medium mt-4">Change Status:</div>
            <div className="flex flex-wrap gap-2">
              {booking.status !== "confirmed" && (
                <Button 
                  size="sm" 
                  onClick={() => onStatusUpdate(booking.id, "confirmed")}
                  className="flex gap-1"
                >
                  <Check size={16} /> Confirm
                </Button>
              )}
              {booking.status !== "cancelled" && (
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => onStatusUpdate(booking.id, "cancelled")}
                  className="flex gap-1"
                >
                  <X size={16} /> Cancel
                </Button>
              )}
              {booking.status !== "in_progress" && booking.status !== "completed" && booking.status !== "cancelled" && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onStatusUpdate(booking.id, "in_progress")}
                  className="flex gap-1"
                >
                  <Clock size={16} /> In Progress
                </Button>
              )}
              {booking.status !== "completed" && booking.status !== "cancelled" && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onStatusUpdate(booking.id, "completed")}
                  className="flex gap-1"
                >
                  <CheckCircle size={16} /> Complete
                </Button>
              )}
              {booking.status === "cancelled" && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onStatusUpdate(booking.id, "pending")}
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
  );
}
