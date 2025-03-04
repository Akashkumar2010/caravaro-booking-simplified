
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { ServiceType } from "@/types/database";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  price: number;
  imageUrl: string;
  serviceType: string;
  rating?: number;
  duration?: number;
}

export function ServiceCard({ 
  title, 
  description, 
  icon, 
  onClick, 
  price, 
  imageUrl, 
  serviceType, 
  rating = 4.9, 
  duration = 180 
}: ServiceCardProps) {
  const navigate = useNavigate();

  // Function to determine service page path based on service type
  const getServicePath = (type: string) => {
    switch (type) {
      case 'car_wash':
        return '/services/car-wash';
      case 'driver_hire':
        return '/services/driver-hire';
      case 'car_rental':
        return '/services/car-rental';
      case 'bus_service':
        return '/services/bus-service';
      default:
        return '/services';
    }
  };

  // Handle card click to navigate to service details page
  const handleCardClick = () => {
    navigate(getServicePath(serviceType));
  };

  // Function to get background gradient based on service type
  const getCardGradient = (type: string) => {
    switch (type) {
      case 'car_wash':
        return 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200';
      case 'driver_hire':
        return 'bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200';
      case 'car_rental':
        return 'bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200';
      case 'bus_service':
        return 'bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200';
    }
  };

  // Function to get button gradient based on service type
  const getButtonGradient = (type: string) => {
    switch (type) {
      case 'car_wash':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
      case 'driver_hire':
        return 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700';
      case 'car_rental':
        return 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700';
      case 'bus_service':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700';
      default:
        return 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary';
    }
  };

  return (
    <Card 
      className={cn(
        "h-full overflow-hidden service-card transition-all duration-300 hover:shadow-lg border-0", 
        getCardGradient(serviceType)
      )} 
      onClick={handleCardClick}
    >
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center shadow-sm">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
            <span>{rating}</span>
          </div>
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center shadow-sm">
            <Clock className="h-3 w-3 text-primary mr-1" />
            <span>{Math.floor(duration / 60)}h</span>
          </div>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-full bg-white/80 shadow-sm">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 line-clamp-3 text-gray-700">{description}</CardDescription>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
          <div className="flex items-center text-sm text-gray-500 bg-white/50 px-2 py-1 rounded-full">
            <span>Available now</span>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <Button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              navigate(getServicePath(serviceType));
            }} 
            className={cn("w-full text-white group btn-hover-effect border-0", getButtonGradient(serviceType))}
          >
            Book Now
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              navigate(getServicePath(serviceType));
            }} 
            className="w-full border-primary/20 text-primary hover:bg-primary/5"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
