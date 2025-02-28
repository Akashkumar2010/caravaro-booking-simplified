
import { Button } from "@/components/ui/button";
import { Car, User, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Navbar() {
  const navigate = useNavigate();

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
            <Button onClick={handleSignOut} variant="ghost">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
