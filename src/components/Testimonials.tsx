
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "John Smith",
      role: "Business Owner",
      content: "The best car service I've ever experienced. Professional and punctual.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content: "Excellent service and very reliable. I highly recommend their services.",
      rating: 5
    },
    {
      name: "Michael Brown",
      role: "Event Planner",
      content: "Outstanding quality and customer service. Will definitely use again.",
      rating: 5
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight heading-gradient sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Don't just take our word for it
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass p-6 transition-all duration-300 hover:scale-105">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="mt-auto">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
