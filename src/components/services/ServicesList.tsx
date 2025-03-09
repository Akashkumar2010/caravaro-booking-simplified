
import { useState, useRef, useEffect } from "react";
import { Service } from "@/types/database";
import { ServiceCard } from "../ServiceCard";
import { Car, UserCircle2, Bus, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

interface ServicesListProps {
  services: Service[];
  onBookService: (service: Service) => void;
}

export function ServicesList({ services, onBookService }: ServicesListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollable = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      checkScrollable();
      containerRef.current.addEventListener('scroll', checkScrollable);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', checkScrollable);
      }
    };
  }, [services]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "car_wash":
        return <Car className="h-6 w-6 text-blue-500" />;
      case "driver_hire":
        return <UserCircle2 className="h-6 w-6 text-amber-500" />;
      case "car_rental":
        return <Car className="h-6 w-6 text-emerald-500" />;
      case "bus_service":
        return <Bus className="h-6 w-6 text-purple-500" />;
      default:
        return <Car className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="relative">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md hidden md:flex rounded-full"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </Button>
      )}
      
      {canScrollRight && (
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-md hidden md:flex rounded-full"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </Button>
      )}
      
      {/* Services container - Using flex instead of grid to show in a single row */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-8 px-4 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => (
          <div key={service.id} className="min-w-[300px] w-[300px] flex-shrink-0 transform transition-transform duration-300 hover:translate-y-[-5px]">
            <ServiceCard
              title={service.name}
              description={service.description || ""}
              icon={getIcon(service.type)}
              onClick={() => onBookService(service)}
              price={service.price}
              imageUrl={service.image_url || ""}
              serviceType={service.type}
              duration={service.duration || 180}
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-6 gap-2">
        {services.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-300'}`}
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollTo({
                  left: index * 320,
                  behavior: 'smooth'
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
