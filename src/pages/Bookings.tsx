
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import type { Booking, Service } from "@/types/database";
import { format } from "date-fns";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<(Booking & { service: Service })[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          service:services(*)
        `)
        .order("scheduled_time", { ascending: true });

      if (error) throw error;

      setBookings(data);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-blue-500";
      case "in_progress":
        return "bg-purple-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{booking.service.name}</CardTitle>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <p>
                      <strong>Date:</strong>{" "}
                      {format(new Date(booking.scheduled_time), "PPP")}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {format(new Date(booking.scheduled_time), "p")}
                    </p>
                    {booking.special_requests && (
                      <p>
                        <strong>Special Requests:</strong>{" "}
                        {booking.special_requests}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {bookings.length === 0 && (
              <p className="text-center text-gray-500">
                You don't have any bookings yet.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
