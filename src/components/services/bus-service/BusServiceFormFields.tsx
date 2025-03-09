
import { Calendar, MapPin, Users } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BusServiceFormProps } from "./BusServiceForm";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./BusServiceFormSchema";
import { RentalVehicle } from "@/types/database";

interface BusServiceFormFieldsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  buses?: RentalVehicle[];
  isLoadingBuses: boolean;
}

export function BusServiceFormFields({ form, buses, isLoadingBuses }: BusServiceFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="scheduled_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date and Time</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input type="datetime-local" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="rental_duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rental Duration (Days)</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="pickup_location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pickup Location</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Input {...field} placeholder="Enter pickup address" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="destination"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Destination</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Input {...field} placeholder="Enter destination address" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="seating_capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Seating Capacity</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select seating capacity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="up to 20">Up to 20 passengers</SelectItem>
                  <SelectItem value="21-30">21-30 passengers</SelectItem>
                  <SelectItem value="31-40">31-40 passengers</SelectItem>
                  <SelectItem value="41-50">41-50 passengers</SelectItem>
                  <SelectItem value="50+">More than 50 passengers</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rental_vehicle_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Bus</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoadingBuses || !buses?.length}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={isLoadingBuses ? "Loading buses..." : "Select a bus"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {buses?.map((bus) => (
                    <SelectItem key={bus.id} value={bus.id}>
                      {bus.name} - {bus.seating_capacity} seats
                    </SelectItem>
                  ))}
                  {!isLoadingBuses && !buses?.length && (
                    <SelectItem value="none" disabled>No buses available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="special_requests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Requests</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter any special requirements or additional information"
                className="resize-y"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Optional: Let us know if you have any special requirements
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
