
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { LocationDetails } from "./types";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DriverHireFormProps {
  locationDetails: LocationDetails;
  setLocationDetails: (details: LocationDetails) => void;
}

export function DriverHireForm({ locationDetails, setLocationDetails }: DriverHireFormProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Pickup Location</Label>
        <Input
          placeholder="Enter pickup location"
          value={locationDetails.pickup}
          onChange={(e) => setLocationDetails({ ...locationDetails, pickup: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Destination</Label>
        <Input
          placeholder="Enter destination"
          value={locationDetails.destination}
          onChange={(e) => setLocationDetails({ ...locationDetails, destination: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Date and Time</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Special Instructions</Label>
        <Textarea
          placeholder="Any additional notes or requirements"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
}
