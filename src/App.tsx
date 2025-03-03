
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CarWashService from "./pages/services/CarWashService";
import DriverHireService from "./pages/services/DriverHireService";
import CarRentalService from "./pages/services/CarRentalService";
import BusService from "./pages/services/BusService";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={session ? <Index /> : <Navigate to="/auth" replace />} />
            <Route path="/profile" element={session ? <Profile /> : <Navigate to="/auth" replace />} />
            <Route path="/bookings" element={session ? <Bookings /> : <Navigate to="/auth" replace />} />
            <Route path="/admin/*" element={session ? <AdminDashboard /> : <Navigate to="/auth" replace />} />
            <Route path="/services/car-wash" element={session ? <CarWashService /> : <Navigate to="/auth" replace />} />
            <Route path="/services/driver-hire" element={session ? <DriverHireService /> : <Navigate to="/auth" replace />} />
            <Route path="/services/car-rental" element={session ? <CarRentalService /> : <Navigate to="/auth" replace />} />
            <Route path="/services/bus-service" element={session ? <BusService /> : <Navigate to="/auth" replace />} />
            <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
