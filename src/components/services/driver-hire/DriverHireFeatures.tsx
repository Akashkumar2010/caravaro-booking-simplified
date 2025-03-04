
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Clock, User } from "lucide-react";

export function DriverHireFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <User className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Professional</CardTitle>
            <CardDescription>Experienced drivers</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>24/7 Service</CardTitle>
            <CardDescription>Available anytime</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <CardTitle>Insured</CardTitle>
            <CardDescription>Full coverage</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
