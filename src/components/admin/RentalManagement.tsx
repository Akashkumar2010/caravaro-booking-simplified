
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

interface RentalVehicle {
  id: string;
  name: string;
  type: string;
  seating_capacity: number;
  price_per_day: number;
  availability_status: string;
}

export function RentalManagement() {
  const { toast } = useToast();

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["rental-vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("rental_vehicles").select("*");
      if (error) throw error;
      return data as RentalVehicle[];
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <Button>Add New Vehicle</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Price/Day</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles?.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.name}</TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>{vehicle.seating_capacity}</TableCell>
              <TableCell>${vehicle.price_per_day}</TableCell>
              <TableCell>{vehicle.availability_status}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
