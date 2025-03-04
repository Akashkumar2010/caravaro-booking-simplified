
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Timer, Droplets, Shield } from "lucide-react";

export function CarWashFeatures({ duration = 60 }: { duration?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
            <Timer className="h-8 w-8" />
          </div>
          <div>
            <CardTitle>Duration</CardTitle>
            <CardDescription>{duration} minutes</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 rounded-full bg-green-500/10 text-green-500">
            <Droplets className="h-8 w-8" />
          </div>
          <div>
            <CardTitle>Eco-Friendly</CardTitle>
            <CardDescription>Water-saving techniques</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
            <Shield className="h-8 w-8" />
          </div>
          <div>
            <CardTitle>Guaranteed</CardTitle>
            <CardDescription>100% satisfaction</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
