
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Service } from "@/types/database";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

interface BookingDialogProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingDialog({ service, isOpen, onClose }: BookingDialogProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleBooking = async () => {
    if (!service || !date) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a date for your booking",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to make a booking");
      }

      const { error } = await supabase.from("bookings").insert({
        service_id: service.id,
        user_id: user.id,
        scheduled_time: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
        special_requests: specialRequests,
        status: 'pending'
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your booking has been confirmed!",
      });
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {service?.name}</DialogTitle>
          <DialogDescription>
            Select your preferred date and time for the service
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
          <Textarea
            placeholder="Any special requests or notes?"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleBooking} disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
