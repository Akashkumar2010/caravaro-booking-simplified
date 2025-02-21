
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "John Smith",
      role: "Business Executive",
      content: "The car rental service was exceptional. The vehicle was clean and the process was smooth.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Tourist",
      content: "Great experience with the driver service. Professional and punctual.",
      rating: 5,
    },
    {
      name: "Michael Brown",
      role: "Local Resident",
      content: "Best car wash service in town. They pay attention to every detail.",
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold heading-gradient">What Our Customers Say</h2>
          <p className="mt-4 text-gray-600">Trusted by thousands of satisfied customers</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">{testimonials[currentSlide].content}</p>
              <div>
                <p className="font-semibold">{testimonials[currentSlide].name}</p>
                <p className="text-gray-500">{testimonials[currentSlide].role}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
