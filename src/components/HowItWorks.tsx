
import { MapPin, Calendar, Car } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      title: "Choose Location",
      description: "Select your pickup location and destination",
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "Pick Date & Time",
      description: "Choose your preferred date and time",
    },
    {
      icon: <Car className="h-8 w-8 text-white" />,
      title: "Book Your Service",
      description: "Confirm your booking with secure payment",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="mt-4 text-gray-100">Simple steps to get started</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-white/10 rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-100">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
