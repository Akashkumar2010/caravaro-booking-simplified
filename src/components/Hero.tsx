
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
          alt="Luxury Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-6xl text-white">
              Premium Car Services at Your Fingertips
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200 animate-fade-in max-w-3xl mx-auto">
              From luxurious car rentals to professional car wash services and experienced drivers.
              Experience convenience and quality, all in one platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up">
              <Button size="lg" className="group">
                Book Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
