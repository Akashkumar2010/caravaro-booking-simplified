
import { Shield, Clock, Award, ThumbsUp } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure & Safe",
      description: "All our services are fully insured and our drivers are verified",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "24/7 Availability",
      description: "Round-the-clock service to meet your needs anytime",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Premium Quality",
      description: "Top-tier services with attention to every detail",
    },
    {
      icon: <ThumbsUp className="h-8 w-8 text-primary" />,
      title: "Satisfaction Guaranteed",
      description: "Your satisfaction is our top priority",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold heading-gradient">Why Choose Us</h2>
          <p className="mt-4 text-gray-600">Experience the difference with our premium services</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
