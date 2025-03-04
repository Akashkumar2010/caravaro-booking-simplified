
import { Service } from "@/types/database";

interface DriverHireHeroProps {
  service: Service;
}

export function DriverHireHero({ service }: DriverHireHeroProps) {
  return (
    <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-xl mb-8 shadow-lg">
      <img
        src={service.image_url || "/placeholder.svg"}
        alt={service.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-6 left-6 right-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{service.name}</h1>
        <p className="text-white/90 text-lg">Starting at ${service.price.toFixed(2)}/hour</p>
      </div>
    </div>
  );
}
