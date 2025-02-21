
import React, { useEffect, useState } from "react";
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
import AdminDashboard from "./pages/admin/Dashboard";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      checkIfAdmin(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkIfAdmin(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIfAdmin = async (session: Session | null) => {
    if (!session) return;
    const { data, error } = await supabase.rpc('get_user_role');
    if (!error && data) {
      setIsAdmin(data === 'admin');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={session ? <Index /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/profile"
              element={session ? <Profile /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/bookings"
              element={session ? <Bookings /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/admin/*"
              element={
                session && isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/auth"
              element={!session ? <Auth /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
