
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCarRentalForm } from "@/hooks/services/useCarRentalForm";

export function CarRentalDetailForm() {
  const { 
    carType, setCarType,
    rentalDays, setRentalDays,
    pickupLocation, setPickupLocation,
    returnLocation, setReturnLocation,
    insurance, setInsurance,
    calculateTotalPrice,
    getPriceForCarType,
    getInsuranceCost
  } = useCarRentalForm();

  return (
    <Card className="mb-8 shadow-sm border-primary/10 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4">
        <h2 className="text-xl font-bold text-white">Create Your Rental Package</h2>
        <p className="text-white/80 text-sm">Customize your perfect rental experience</p>
      </div>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="carType" className="text-base font-medium">Vehicle Type</Label>
            <select 
              id="carType" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            >
              <option value="economy">Economy Car - $45/day</option>
              <option value="midsize">Midsize Sedan - $65/day</option>
              <option value="suv">SUV - $85/day</option>
              <option value="luxury">Luxury Vehicle - $120/day</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="rentalDays" className="text-base font-medium">Rental Duration (Days)</Label>
            <Input 
              id="rentalDays"
              type="number"
              min="1"
              max="30" 
              value={rentalDays}
              onChange={(e) => setRentalDays(e.target.value)}
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="pickupLocation" className="text-base font-medium">Pickup Location</Label>
            <Input 
              id="pickupLocation"
              placeholder="Enter your preferred pickup location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="returnLocation" className="text-base font-medium">Return Location</Label>
            <Input 
              id="returnLocation"
              placeholder="Same as pickup location if left empty"
              value={returnLocation}
              onChange={(e) => setReturnLocation(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="insurance" className="text-base font-medium">Insurance Coverage</Label>
            <select 
              id="insurance" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
            >
              <option value="basic">Basic - $10/day</option>
              <option value="premium">Premium - $25/day</option>
              <option value="full">Full Coverage - $40/day</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Vehicle Rental:</span>
              <span>${getPriceForCarType().toFixed(2)} × {rentalDays} days = ${(getPriceForCarType() * parseInt(rentalDays)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
              <span>Insurance:</span>
              <span>${getInsuranceCost().toFixed(2)} × {rentalDays} days = ${(getInsuranceCost() * parseInt(rentalDays)).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center font-bold">
              <span>Total:</span>
              <span className="text-primary">${calculateTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
