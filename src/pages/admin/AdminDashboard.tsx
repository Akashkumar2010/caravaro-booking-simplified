
import { AdminLayout } from "@/layouts/AdminLayout";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const [bookings, services, users] = await Promise.all([
        supabase.from("bookings").select("*", { count: "exact" }),
        supabase.from("services").select("*", { count: "exact" }),
        supabase.from("profiles").select("*", { count: "exact" }),
      ]);
      
      return {
        bookings: bookings.count || 0,
        services: services.count || 0,
        users: users.count || 0,
      };
    },
  });

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl">{stats?.bookings || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Total Services</h3>
          <p className="text-3xl">{stats?.services || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Total Users</h3>
          <p className="text-3xl">{stats?.users || 0}</p>
        </Card>
      </div>
    </AdminLayout>
  );
}
