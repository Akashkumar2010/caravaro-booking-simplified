
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface DriverHireFormData {
  driverType: string;
  hours: string;
  pickupLocation: string;
  destination: string;
  totalPrice: number;
}

interface DriverHireFormProps {
  onFormChange: (formData: DriverHireFormData) => void;
}

export function DriverHireForm({ onFormChange }: DriverHireFormProps) {
  const [formData, setFormData] = useState<DriverHireFormData>({
    driverType: "standard",
    hours: "4",
    pickupLocation: "",
    destination: "",
    totalPrice: 35 * 4 // Default price: $35/hour * 4 hours
  });

  const handleFormChange = (field: keyof DriverHireFormData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    
    // Calculate total price based on driver type and hours
    const baseRate = 
      updatedData.driverType === "standard" ? 35 :
      updatedData.driverType === "executive" ? 50 :
      75; // VIP rate
    
    updatedData.totalPrice = baseRate * Number(updatedData.hours);
    
    setFormData(updatedData);
    onFormChange(updatedData);
  };

  return (
    <Card className="mb-8 shadow-sm border-primary/10 overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
        <h2 className="text-xl font-bold text-white">Customize Your Service</h2>
        <p className="text-white/80 text-sm">Select your preferences for driver hire</p>
      </div>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="driverType">Driver Type</Label>
            <select 
              id="driverType"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
              value={formData.driverType}
              onChange={(e) => handleFormChange('driverType', e.target.value)}
            >
              <option value="standard">Standard Driver - $35/hour</option>
              <option value="executive">Executive Driver - $50/hour</option>
              <option value="vip">VIP Chauffeur - $75/hour</option>
            </select>
          </div>

          <div>
            <Label htmlFor="hours">Number of Hours</Label>
            <Input
              id="hours"
              type="number"
              min="2"
              max="24"
              value={formData.hours}
              onChange={(e) => handleFormChange('hours', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="pickupLocation">Pickup Location</Label>
            <Input
              id="pickupLocation"
              placeholder="Enter pickup location"
              value={formData.pickupLocation}
              onChange={(e) => handleFormChange('pickupLocation', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="Enter destination"
              value={formData.destination}
              onChange={(e) => handleFormChange('destination', e.target.value)}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <div className="flex justify-between items-center font-bold">
              <span>Total Price:</span>
              <span className="text-primary">${formData.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
