
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { BusServiceDetails } from "@/components/booking/types";

interface BusServiceFormProps {
  onFormChange: (formData: BusServiceDetails) => void;
}

export function BusServiceForm({ onFormChange }: BusServiceFormProps) {
  const [formData, setFormData] = useState<BusServiceDetails>({
    pickupLocation: "",
    destination: "",
    passengers: 1,
    tripType: "one-way",
    departureDate: format(new Date(), "yyyy-MM-dd"),
    returnDate: ""
  });

  const [departureDate, setDepartureDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "passengers") {
      const numValue = parseInt(value);
      if (numValue > 0) {
        setFormData({ ...formData, passengers: numValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRadioChange = (value: 'one-way' | 'round-trip') => {
    setFormData({ 
      ...formData, 
      tripType: value,
      returnDate: value === 'one-way' ? '' : formData.returnDate 
    });
  };

  const handleDepartureDateSelect = (date: Date | undefined) => {
    if (date) {
      setDepartureDate(date);
      setFormData({ ...formData, departureDate: format(date, "yyyy-MM-dd") });
      
      // If return date is before new departure date, reset it
      if (returnDate && returnDate < date) {
        setReturnDate(undefined);
        setFormData(prev => ({ ...prev, returnDate: '' }));
      }
    }
  };

  const handleReturnDateSelect = (date: Date | undefined) => {
    if (date) {
      setReturnDate(date);
      setFormData({ ...formData, returnDate: format(date, "yyyy-MM-dd") });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pickupLocation">Pickup Location</Label>
          <Input
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleInputChange}
            placeholder="Enter pickup address"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Enter destination address"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="passengers">Number of Passengers</Label>
        <Input
          id="passengers"
          name="passengers"
          type="number"
          value={formData.passengers}
          onChange={handleInputChange}
          min={1}
          max={60}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Trip Type</Label>
        <RadioGroup 
          value={formData.tripType} 
          onValueChange={(value) => handleRadioChange(value as 'one-way' | 'round-trip')}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-way" id="one-way" />
            <Label htmlFor="one-way">One Way</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="round-trip" id="round-trip" />
            <Label htmlFor="round-trip">Round Trip</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departureDate ? format(departureDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={handleDepartureDateSelect}
                initialFocus
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {formData.tripType === "round-trip" && (
          <div className="space-y-2">
            <Label>Return Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={handleReturnDateSelect}
                  initialFocus
                  disabled={(date) => 
                    date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                    (departureDate ? date < departureDate : false)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      
      <div className="pt-4">
        <div className="text-lg font-semibold">Service Details</div>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• Comfortable air-conditioned buses</li>
          <li>• Professional drivers</li>
          <li>• Free Wi-Fi onboard</li>
          <li>• Luggage allowance included</li>
          <li>• Child seats available on request</li>
        </ul>
      </div>
    </div>
  );
}

export interface BusServiceFormData {
  pickupLocation: string;
  destination: string;
  passengers: number;
  tripType: 'one-way' | 'round-trip';
  departureDate: string;
  returnDate?: string;
}
