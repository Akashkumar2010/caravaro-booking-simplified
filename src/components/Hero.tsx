
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
      <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}
