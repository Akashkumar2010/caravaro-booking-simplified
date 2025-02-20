
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "./ServiceCard";
import { supabase } from "@/lib/supabase";
import type { Service } from "@/types/database";
import { Car, UserCircle2 } from "lucide-react";

export function Services() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (error) throw error;
      return data as Service[];
    },
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "car_wash":
      case "car_rental":
        return <Car className="h-6 w-6" />;
      case "driver_hire":
        return <UserCircle2 className="h-6 w-6" />;
      default:
        return <Car className="h-6 w-6" />;
    }
  };

  if (isLoading) {
    return <div>Loading services...</div>;
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight heading-gradient sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose from our range of premium car services
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.name}
              description={service.description || ""}
              icon={getIcon(service.type)}
              onClick={() => console.log("Service clicked:", service.id)}
              price={service.price}
              imageUrl={service.image_url || ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
