
import { useState } from "react";

export function useCarRentalForm() {
  const [carType, setCarType] = useState("economy");
  const [rentalDays, setRentalDays] = useState("1");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [insurance, setInsurance] = useState("basic");

  const getPriceForCarType = () => {
    switch(carType) {
      case "economy": return 45;
      case "midsize": return 65;
      case "suv": return 85;
      case "luxury": return 120;
      default: return 45;
    }
  };

  const getInsuranceCost = () => {
    switch(insurance) {
      case "basic": return 10;
      case "premium": return 25;
      case "full": return 40;
      default: return 10;
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = getPriceForCarType() * parseInt(rentalDays);
    const insurancePrice = getInsuranceCost() * parseInt(rentalDays);
    return basePrice + insurancePrice;
  };

  return {
    carType, 
    setCarType,
    rentalDays, 
    setRentalDays,
    pickupLocation, 
    setPickupLocation,
    returnLocation, 
    setReturnLocation,
    insurance, 
    setInsurance,
    getPriceForCarType,
    getInsuranceCost,
    calculateTotalPrice
  };
}
