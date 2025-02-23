
import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      const { data } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      return data?.role === 'admin';
    },
  });

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <aside className="w-64 glass p-4 rounded-lg">
            <nav className="space-y-2">
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
