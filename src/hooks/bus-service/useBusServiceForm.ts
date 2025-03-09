
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { RentalVehicle } from "@/types/database";

export function useBusServiceForm() {
  // Fetch available buses
  const { data: buses, isLoading: isLoadingBuses } = useQuery({
    queryKey: ["buses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_vehicles")
        .select("*")
        .eq("type", "bus")
        .eq("availability_status", "available");
      
      if (error) throw error;
      return data as RentalVehicle[];
    },
  });

  return { buses, isLoadingBuses };
}
