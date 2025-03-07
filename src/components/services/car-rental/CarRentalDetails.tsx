
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Service } from "@/types/database";

interface CarRentalDetailsProps {
  service: Service;
}

export function CarRentalDetails({ service }: CarRentalDetailsProps) {
  return (
    <Card className="mb-8 shadow-sm hover:shadow-md transition-all duration-300 border-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl">About This Service</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {service.description || 
          `Our car rental service offers a wide range of vehicles to suit every need and budget. 
          From compact cars for city driving to spacious SUVs for family trips and luxury models 
          for special occasions, our well-maintained fleet ensures a comfortable and reliable 
          driving experience. All rentals include comprehensive insurance and 24/7 roadside assistance.`}
        </p>
        <div className="mt-6">
          <h3 className="font-semibold mb-3 text-lg">Available Vehicle Types:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Check className="h-4 w-4" />
              </div>
              Economy & Compact Cars
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Check className="h-4 w-4" />
              </div>
              Midsize & Full-size Sedans
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Check className="h-4 w-4" />
              </div>
              SUVs & Minivans
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Check className="h-4 w-4" />
              </div>
              Luxury Cars
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Check className="h-4 w-4" />
              </div>
              Electric & Hybrid Vehicles
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Check className="h-4 w-4" />
              </div>
              Specialty Vehicles
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
