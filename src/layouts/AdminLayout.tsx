
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  // Check if user is admin
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.log('No session found, not an admin');
          return false;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log('No user found, not an admin');
          return false;
        }
        
        console.log('Checking admin status for user:', user.email);
        
        // First, let's check what roles are available in the database
        const { data: allRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('*');
          
        if (rolesError) {
          console.error('Error fetching all roles:', rolesError);
        } else {
          console.log('All roles in database:', allRoles);
          setDebugInfo({ allRoles });
        }
        
        // Now, let's check if the current user has the admin role
        const { data, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching user role:', error);
          return false;
        }

        console.log('User roles found:', data);
        
        // Check if any of the returned roles is 'admin'
        const isUserAdmin = data.some(role => role.role === 'admin');
        console.log('Is user admin?', isUserAdmin);
        
        return isUserAdmin;
      } catch (error) {
        console.error('Error in isAdmin query:', error);
        return false;
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 30000, // Cache the result for 30 seconds
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
          if (!isAdmin) {
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
        {debugInfo && (
          <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded max-w-md max-h-60 overflow-auto">
            <pre className="text-xs">Debug: {JSON.stringify(debugInfo, null, 2)}</pre>
          </div>
        )}
      </div>
    );
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
