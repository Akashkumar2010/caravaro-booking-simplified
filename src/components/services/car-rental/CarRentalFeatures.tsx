
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Car, MapPin, Shield } from "lucide-react";

export function CarRentalFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
            <Car className="h-8 w-8" />
          </div>
          <div>
            <CardTitle>Premium Fleet</CardTitle>
            <CardDescription>Well-maintained vehicles</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 rounded-full bg-green-500/10 text-green-500">
            <MapPin className="h-8 w-8" />
          </div>
          <div>
            <CardTitle>Flexible Pickup</CardTitle>
            <CardDescription>Multiple locations</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <Card className="hover:shadow-md transition-all duration-300 border-primary/10">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 rounded-full bg-purple-500/10 text-purple-500">
            <Shield className="h-8 w-8" />
          </div>
          <div>
            <CardTitle>Full Insurance</CardTitle>
            <CardDescription>Comprehensive coverage</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
