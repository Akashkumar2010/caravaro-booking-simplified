
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { Service } from "@/types/database";

export function CarWashDetails({ service }: { service: Service }) {
  return (
    <Card className="mb-8 shadow-sm hover:shadow-md transition-all duration-300 border-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl">About This Service</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {service.description || 
          `Our premium car wash service includes a thorough exterior wash, interior vacuuming, 
          window cleaning, tire dressing, and hand drying. We use only high-quality, eco-friendly 
          products that protect your vehicle's paint and finish. Whether your car needs a quick 
          refresh or a deep clean, our professional team delivers exceptional results.`}
        </p>
        <div className="mt-6">
          <h3 className="font-semibold mb-3 text-lg">What's Included:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Zap className="h-4 w-4" />
              </div>
              Exterior hand wash with premium soap
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Zap className="h-4 w-4" />
              </div>
              Interior vacuuming and dusting
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Zap className="h-4 w-4" />
              </div>
              Window and mirror cleaning
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Zap className="h-4 w-4" />
              </div>
              Tire dressing and wheel cleaning
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Zap className="h-4 w-4" />
              </div>
              Hand drying with microfiber towels
            </li>
            <li className="flex items-center text-gray-600">
              <div className="p-1 rounded-full bg-green-500/10 text-green-500 mr-2">
                <Zap className="h-4 w-4" />
              </div>
              Air freshener application
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
