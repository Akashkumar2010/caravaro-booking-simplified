
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-6xl heading-gradient">
              Your Premium Car Services Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 animate-fade-in">
              From professional car wash services to experienced drivers and luxury vehicle rentals.
              Experience convenience and quality, all in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up">
              <Button size="lg" className="group">
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 to-teal-100 opacity-30" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-100 to-purple-100 opacity-30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-emerald-100 to-yellow-100 opacity-30 blur-3xl" />
      </div>
    </div>
  );
}
