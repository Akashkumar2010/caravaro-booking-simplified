
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Shield, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 md:pr-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>Premium Car Services</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl heading-gradient animate-fade-in">
                Your Premium Car Services Platform
              </h1>
              
              <p className="text-lg leading-8 text-gray-600 animate-fade-in">
                From professional car wash services to experienced drivers and luxury vehicle rentals.
                Experience convenience and quality, all in one place.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 animate-slide-up">
                <Button size="lg" className="group">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  <span>Premium Fleet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>5-Star Service</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className={cn(
                "relative rounded-xl overflow-hidden shadow-2xl",
                "animate-[fade-in_0.5s_ease-out,scale-in_0.5s_ease-out]"
              )}>
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" 
                    alt="Luxury car service" 
                    className="object-cover"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-60"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-lg bg-primary/10 backdrop-blur-lg z-10 flex items-center justify-center animate-[fade-in_0.7s_ease-out]">
                <Car className="h-12 w-12 text-primary" />
              </div>
              
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-lg bg-primary/10 backdrop-blur-lg z-10 flex items-center justify-center animate-[fade-in_0.9s_ease-out]">
                <Shield className="h-12 w-12 text-primary" />
              </div>
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
