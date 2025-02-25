
import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
        if (!user) {
          console.log('No user found');
          return false;
        }
        
        const { data, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) {
          console.error('Error fetching user role:', error);
          return false;
        }

        return !!data;
      } catch (error) {
        console.error('Error in isAdmin query:', error);
        return false;
      }
    },
    retry: false
  });

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast.error("Access Denied", {
        description: "You don't have permission to access the admin panel."
      });
      navigate("/");
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
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
              <Link to="/admin" className="block p-2 hover:bg-primary/5 rounded">
                Dashboard
              </Link>
              <Link to="/admin/services" className="block p-2 hover:bg-primary/5 rounded">
                Services
              </Link>
              <Link to="/admin/bookings" className="block p-2 hover:bg-primary/5 rounded">
                Bookings
              </Link>
              <Link to="/admin/users" className="block p-2 hover:bg-primary/5 rounded">
                Users
              </Link>
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
