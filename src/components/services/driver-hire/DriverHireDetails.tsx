
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Service } from "@/types/database";
import { Zap } from "lucide-react";

export function DriverHireDetails({ service }: { service: Service }) {
  return (
    <Card className="mb-8 shadow-sm hover:shadow-md transition-all duration-300 border-primary/10">
      <CardHeader>
        <CardTitle>About This Service</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          {service.description || 
          `Our professional driver hire service provides experienced, reliable drivers for any occasion. 
          Whether you need a chauffeur for a special event, a designated driver for a night out, or 
          professional transportation for business meetings, our vetted drivers ensure a safe and 
          comfortable journey.`}
        </p>
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Service Features:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-amber-500/10 text-amber-500 mr-2">
                <Zap className="h-4 w-4" />
              </div>
              Professional, uniformed drivers
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-amber-500/10 text-amber-500 mr-2">
                <Zap className="h-4 w-4" />
              </div>
              24/7 availability
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-amber-500/10 text-amber-500 mr-2">
                <Zap className="h-4 w-4" />
              </div>
              Point-to-point transportation
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-amber-500/10 text-amber-500 mr-2">
                <Zap className="h-4 w-4" />
              </div>
              Hourly booking options
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
