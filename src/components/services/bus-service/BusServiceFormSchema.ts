
import { z } from "zod";

export const formSchema = z.object({
  scheduled_time: z.string().min(1, "Please select a date and time"),
  pickup_location: z.string().min(3, "Please enter a pickup location"),
  destination: z.string().min(3, "Please enter a destination"),
  rental_duration: z.coerce.number().min(1, "Please enter rental duration"),
  seating_capacity: z.string().min(1, "Please select a seating capacity"),
  special_requests: z.string().optional(),
  rental_vehicle_id: z.string().min(1, "Please select a bus")
});

export type BusServiceFormValues = z.infer<typeof formSchema>;
