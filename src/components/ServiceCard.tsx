
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  price: number;
  imageUrl: string;
}

export function ServiceCard({ title, description, icon, onClick, price, imageUrl }: ServiceCardProps) {
  return (
    <Card className="h-full overflow-hidden service-card card-hover border-gray-100">
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
            <span>4.9</span>
          </div>
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center">
            <Clock className="h-3 w-3 text-primary mr-1" />
            <span>3h</span>
          </div>
        </div>
      )}
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-full bg-primary/5">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 line-clamp-3">{description}</CardDescription>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
          <div className="flex items-center text-sm text-gray-500">
            <span>Available now</span>
          </div>
        </div>
        <Button onClick={onClick} className="w-full group btn-hover-effect">
          Book Now
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
