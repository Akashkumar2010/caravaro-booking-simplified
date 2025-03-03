
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Shield, Star, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Fully Insured Services</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Premium Fleet</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>5-Star Rated Service</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className={cn(
                "relative rounded-2xl overflow-hidden shadow-2xl",
                "animate-[fade-in_0.5s_ease-out,scale-in_0.5s_ease-out]"
              )}>
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80" 
                    alt="Luxury car service" 
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-60"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white shadow-lg z-10 flex items-center justify-center animate-[fade-in_0.7s_ease-out] img-shine">
                <Car className="h-12 w-12 text-primary" />
              </div>
              
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white shadow-lg z-10 flex items-center justify-center animate-[fade-in_0.9s_ease-out] img-shine">
                <Shield className="h-12 w-12 text-primary" />
              </div>

              <div className="absolute animate-float hidden md:block top-1/2 right-12 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-20">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-sm font-medium mt-1">5-Star Service Excellence</p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-10">
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Vehicles</h3>
              <p className="text-gray-600">Our fleet features the latest models, meticulously maintained for your comfort.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600">Your safety is our priority with fully insured services and trained professionals.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">Our services are available round the clock to meet your schedule.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 to-teal-100 opacity-10" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-100 to-purple-100 opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-emerald-100 to-yellow-100 opacity-20 blur-3xl" />
      </div>
    </div>
  );
}
