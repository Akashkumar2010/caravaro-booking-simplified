
import { Car, Car as CarIcon, UserCircle2 } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  const services = [
    {
      title: "Car Wash Services",
      description: "Professional car washing and detailing services to keep your vehicle spotless.",
      icon: <CarIcon className="h-6 w-6" />,
      onClick: () => console.log("Car Wash clicked"),
    },
    {
      title: "Hire a Driver",
      description: "Experienced and verified drivers for local and outstation trips.",
      icon: <UserCircle2 className="h-6 w-6" />,
      onClick: () => console.log("Driver clicked"),
    },
    {
      title: "Rent a Vehicle",
      description: "Wide range of vehicles available for your travel needs.",
      icon: <Car className="h-6 w-6" />,
      onClick: () => console.log("Rental clicked"),
    },
  ];

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
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
