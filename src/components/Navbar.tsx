
import { Button } from "@/components/ui/button";
import { Car, User, Calendar, Settings } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin - with more robust error handling
  const { data: adminStatus, isLoading: checkingAdmin } = useQuery({
    queryKey: ["navbarAdminCheck"],
    queryFn: async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.log('No active session found');
          return false;
        }
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log('No user found in the session');
          return false;
        }
        
        console.log('Checking admin role for user:', user.email);
        
        // Check user_roles table for admin role
        const { data, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) {
          console.error('Error checking admin status:', error);
          return false;
        }
        
        const isAdminUser = !!data;
        console.log('Is admin user:', isAdminUser);
        return isAdminUser;
      } catch (error) {
        console.error('Error in admin check query:', error);
        return false;
      }
    },
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000, // Cache the result for 10 seconds
  });

  useEffect(() => {
    if (!checkingAdmin) {
      console.log('Setting admin status to:', adminStatus);
      setIsAdmin(!!adminStatus);
    }
  }, [adminStatus, checkingAdmin]);

  const handleSignOut = async () => {
    try {
      console.log("Signing out...");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        toast.error("Error signing out", {
          description: error.message,
        });
        return;
      }
      console.log("Sign out successful");
      // Force navigation to auth page
      navigate("/auth", { replace: true });
    } catch (error: any) {
      console.error("Error in sign out process:", error);
      toast.error("Error signing out", {
        description: error.message || "An unexpected error occurred",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Car className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Caravaro</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/bookings">
              <Button variant="ghost" className="gap-2">
                <Calendar className="h-4 w-4" />
                My Bookings
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </Link>
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" className="gap-2 bg-primary/10">
                  <Settings className="h-4 w-4" />
                  Admin Panel
                </Button>
              </Link>
            )}
            <Button onClick={handleSignOut} variant="ghost">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
