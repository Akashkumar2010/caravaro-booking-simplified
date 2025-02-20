
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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
    <Card className="glass card-hover overflow-hidden">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-full bg-primary/5">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">{description}</CardDescription>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-primary">${price}</span>
        </div>
        <Button onClick={onClick} className="w-full group">
          Book Now
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
