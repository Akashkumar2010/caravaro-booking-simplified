
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCarRentalForm } from "@/hooks/services/useCarRentalForm";

export interface CarRentalFormData {
  carType: string;
  rentalDays: string;
  pickupLocation: string;
  returnLocation: string;
  insurance: string;
  totalPrice: number;
}

interface CarRentalFormProps {
  onFormChange?: (formData: CarRentalFormData) => void;
}

export function CarRentalForm({ onFormChange }: CarRentalFormProps) {
  const {
    carType, setCarType,
    rentalDays, setRentalDays,
    pickupLocation, setPickupLocation,
    returnLocation, setReturnLocation,
    insurance, setInsurance,
    getPriceForCarType,
    getInsuranceCost,
    calculateTotalPrice
  } = useCarRentalForm();

  const handleFormChange = (field: keyof CarRentalFormData, value: string) => {
    switch (field) {
      case 'carType':
        setCarType(value);
        break;
      case 'rentalDays':
        setRentalDays(value);
        break;
      case 'pickupLocation':
        setPickupLocation(value);
        break;
      case 'returnLocation':
        setReturnLocation(value);
        break;
      case 'insurance':
        setInsurance(value);
        break;
      default:
        break;
    }

    if (onFormChange) {
      onFormChange({
        carType: field === 'carType' ? value : carType,
        rentalDays: field === 'rentalDays' ? value : rentalDays,
        pickupLocation: field === 'pickupLocation' ? value : pickupLocation,
        returnLocation: field === 'returnLocation' ? value : returnLocation,
        insurance: field === 'insurance' ? value : insurance,
        totalPrice: calculateTotalPrice()
      });
    }
  };

  return (
    <Card className="mb-8 shadow-sm border-primary/10 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4">
        <h2 className="text-xl font-bold text-white">Customize Your Rental</h2>
        <p className="text-white/80 text-sm">Select your preferences for car rental</p>
      </div>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="carType">Car Type</Label>
            <select 
              id="carType"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
              value={carType}
              onChange={(e) => handleFormChange('carType', e.target.value)}
            >
              <option value="economy">Economy - $45/day</option>
              <option value="midsize">Midsize - $65/day</option>
              <option value="suv">SUV - $85/day</option>
              <option value="luxury">Luxury - $120/day</option>
            </select>
          </div>

          <div>
            <Label htmlFor="rentalDays">Number of Days</Label>
            <Input
              id="rentalDays"
              type="number"
              min="1"
              max="30"
              value={rentalDays}
              onChange={(e) => handleFormChange('rentalDays', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="insurance">Insurance Coverage</Label>
            <select 
              id="insurance"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
              value={insurance}
              onChange={(e) => handleFormChange('insurance', e.target.value)}
            >
              <option value="basic">Basic Coverage - $10/day</option>
              <option value="premium">Premium Coverage - $25/day</option>
              <option value="full">Full Coverage - $40/day</option>
            </select>
          </div>

          <div>
            <Label htmlFor="pickupLocation">Pickup Location</Label>
            <Input
              id="pickupLocation"
              placeholder="Enter pickup location"
              value={pickupLocation}
              onChange={(e) => handleFormChange('pickupLocation', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="returnLocation">Return Location</Label>
            <Input
              id="returnLocation"
              placeholder="Enter return location"
              value={returnLocation}
              onChange={(e) => handleFormChange('returnLocation', e.target.value)}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <div className="flex justify-between items-center">
              <span>Car Rate:</span>
              <span>${getPriceForCarType()}/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Insurance:</span>
              <span>${getInsuranceCost()}/day</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Duration:</span>
              <span>{rentalDays} day(s)</span>
            </div>
            <div className="flex justify-between items-center font-bold mt-2 pt-2 border-t border-gray-200">
              <span>Total Price:</span>
              <span className="text-primary">${calculateTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
