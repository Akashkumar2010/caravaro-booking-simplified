
import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  // Check if user is admin
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;
        
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not verify admin access.",
          });
          return false;
        }

        return data?.role === 'admin';
      } catch (error) {
        console.error('Error in isAdmin query:', error);
        return false;
      }
    },
  });

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
      });
      navigate("/");
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <aside className="w-64 glass p-4 rounded-lg">
            <nav className="space-y-2">
              <a href="/admin" className="block p-2 hover:bg-primary/5 rounded">
                Dashboard
              </a>
              <a href="/admin/services" className="block p-2 hover:bg-primary/5 rounded">
                Services
              </a>
              <a href="/admin/bookings" className="block p-2 hover:bg-primary/5 rounded">
                Bookings
              </a>
              <a href="/admin/users" className="block p-2 hover:bg-primary/5 rounded">
                Users
              </a>
            </nav>
          </aside>
          <main className="flex-1 glass p-6 rounded-lg">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
