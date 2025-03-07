
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if user is admin with improved error handling
  const { data: isAdmin, isLoading, error: adminCheckError } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.log('No session found, not an admin');
          return false;
        }

        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log('No user found, not an admin');
          return false;
        }
        
        console.log('Checking admin status for user:', user.email);
        
        // Check if the user has the admin role
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

        const hasAdminRole = !!data;
        console.log('User admin check result:', hasAdminRole);
        return hasAdminRole;
      } catch (error) {
        console.error('Error in isAdmin query:', error);
        return false;
      }
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 10000, // Cache the result for 10 seconds
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log('No session found, redirecting to auth');
          navigate('/auth', { replace: true });
          return;
        }

        if (!isLoading) {
          if (isAdmin === false) {
            console.log('User is not admin, redirecting to home');
            toast.error("Access Denied", {
              description: "You don't have permission to access the admin panel."
            });
            navigate("/", { replace: true });
            return;
          }
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        navigate('/auth', { replace: true });
      }
    };

    initializeAuth();
  }, [isAdmin, isLoading, navigate]);

  // Show loading state
  if (isLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If admin check failed for some reason
  if (adminCheckError) {
    toast.error("Error", {
      description: "Could not verify admin permissions. Please try again."
    });
    console.error("Admin check error:", adminCheckError);
  }

  // Don't render anything if not admin
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
              <Link to="/admin/vehicles" className="block p-2 hover:bg-primary/5 rounded">
                Vehicles
              </Link>
              <Link to="/admin/bus-service" className="block p-2 hover:bg-primary/5 rounded">
                Bus Service
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
