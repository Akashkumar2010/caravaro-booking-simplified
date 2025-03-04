
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface CarWashFormProps {
  onFormChange: (formData: CarWashFormData) => void;
}

export interface CarWashFormData {
  washType: string;
  specialRequests: string;
  additionalServices: {
    interiorDetailing: boolean;
    waxTreatment: boolean;
    leatherConditioning: boolean;
  };
  totalPrice: number;
}

export function CarWashForm({ onFormChange }: CarWashFormProps) {
  const [washType, setWashType] = useState("basic");
  const [specialRequests, setSpecialRequests] = useState("");
  const [additionalServices, setAdditionalServices] = useState({
    interiorDetailing: false,
    waxTreatment: false,
    leatherConditioning: false
  });

  const getPriceForWashType = () => {
    switch(washType) {
      case "basic": return 20;
      case "deluxe": return 35;
      case "premium": return 50;
      default: return 20;
    }
  };

  const calculateTotalPrice = () => {
    return (
      getPriceForWashType() + 
      (additionalServices.interiorDetailing ? 25 : 0) + 
      (additionalServices.waxTreatment ? 15 : 0) + 
      (additionalServices.leatherConditioning ? 20 : 0)
    );
  };

  const handleAdditionalServiceChange = (service: keyof typeof additionalServices, checked: boolean) => {
    const newServices = { ...additionalServices, [service]: checked };
    setAdditionalServices(newServices);
    
    // Notify parent component of changes
    onFormChange({
      washType,
      specialRequests,
      additionalServices: newServices,
      totalPrice: calculateTotalPrice()
    });
  };

  const handleWashTypeChange = (type: string) => {
    setWashType(type);
    
    // Notify parent component of changes
    onFormChange({
      washType: type,
      specialRequests,
      additionalServices,
      totalPrice: calculateTotalPrice()
    });
  };

  const handleSpecialRequestsChange = (text: string) => {
    setSpecialRequests(text);
    
    // Notify parent component of changes
    onFormChange({
      washType,
      specialRequests: text,
      additionalServices,
      totalPrice: calculateTotalPrice()
    });
  };

  return (
    <Card className="mb-8 shadow-sm border-primary/10 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <h2 className="text-xl font-bold text-white">Customize Your Car Wash</h2>
        <p className="text-white/80 text-sm">Select options to create your perfect service package</p>
      </div>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="washType" className="text-base font-medium">Wash Package</Label>
            <select 
              id="washType" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
              value={washType}
              onChange={(e) => handleWashTypeChange(e.target.value)}
            >
              <option value="basic">Basic Wash - $20</option>
              <option value="deluxe">Deluxe Wash - $35</option>
              <option value="premium">Premium Wash - $50</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <Label className="text-base font-medium">Additional Services</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="interiorDetailing" 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={additionalServices.interiorDetailing}
                  onChange={(e) => handleAdditionalServiceChange('interiorDetailing', e.target.checked)}
                />
                <label htmlFor="interiorDetailing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Interior Detailing (+$25)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="waxTreatment" 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={additionalServices.waxTreatment}
                  onChange={(e) => handleAdditionalServiceChange('waxTreatment', e.target.checked)}
                />
                <label htmlFor="waxTreatment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Wax Treatment (+$15)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="leatherConditioning" 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={additionalServices.leatherConditioning}
                  onChange={(e) => handleAdditionalServiceChange('leatherConditioning', e.target.checked)}
                />
                <label htmlFor="leatherConditioning" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Leather Conditioning (+$20)
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="specialRequests" className="text-base font-medium">Special Requests</Label>
            <Textarea 
              id="specialRequests"
              className="mt-2"
              placeholder="Any special requests or instructions"
              value={specialRequests}
              onChange={(e) => handleSpecialRequestsChange(e.target.value)}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Package Price:</span>
              <span>${getPriceForWashType().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
              <span>Additional Services:</span>
              <span>
                ${(
                  (additionalServices.interiorDetailing ? 25 : 0) + 
                  (additionalServices.waxTreatment ? 15 : 0) + 
                  (additionalServices.leatherConditioning ? 20 : 0)
                ).toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center font-bold">
              <span>Total:</span>
              <span className="text-primary">
                ${calculateTotalPrice().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
