
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Service } from "@/types/database";

export function useServices() {
  // Create the bus service card with all required Service properties
  const busServiceCard: Service = {
    id: "bus-service",
    name: "Bus Charter Service",
    description: "Comfortable and reliable bus charter service for groups of all sizes. Perfect for corporate events, weddings, school trips, and more.",
    type: "bus_service",
    price: 250,
    duration: 480,
    image_url: "/placeholder.svg",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (error) throw error;
      return data as Service[];
    },
  });

  // Get the available services and add bus service
  const availableServices = [...(services || []), busServiceCard];

  return { services: availableServices, isLoading };
}
