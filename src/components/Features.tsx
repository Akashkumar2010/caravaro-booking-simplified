
import { CheckCircle2, Clock, Shield, ThumbsUp } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Service",
      description: "Round-the-clock availability for all your car service needs"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Fully Insured",
      description: "Complete coverage for your peace of mind"
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: "Expert Staff",
      description: "Professional and experienced service providers"
    },
    {
      icon: <ThumbsUp className="h-6 w-6" />,
      title: "Satisfaction Guaranteed",
      description: "Your satisfaction is our top priority"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight heading-gradient sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience the difference with our premium car services
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center p-6 glass rounded-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-center text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
