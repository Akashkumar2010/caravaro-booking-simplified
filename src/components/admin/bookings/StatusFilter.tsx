
import { Button } from "@/components/ui/button";
import { ServiceStatus } from "@/types/database";

interface StatusFilterProps {
  filterStatus: ServiceStatus | null;
  onFilterChange: (status: ServiceStatus | null) => void;
}

export function StatusFilter({ filterStatus, onFilterChange }: StatusFilterProps) {
  return (
    <div className="flex gap-2">
      <Button 
        variant={filterStatus === null ? "default" : "outline"} 
        onClick={() => onFilterChange(null)}
      >
        All
      </Button>
      <Button 
        variant={filterStatus === "pending" ? "default" : "outline"} 
        onClick={() => onFilterChange("pending")}
      >
        Pending
      </Button>
      <Button 
        variant={filterStatus === "confirmed" ? "default" : "outline"} 
        onClick={() => onFilterChange("confirmed")}
      >
        Confirmed
      </Button>
      <Button 
        variant={filterStatus === "in_progress" ? "default" : "outline"} 
        onClick={() => onFilterChange("in_progress")}
      >
        In Progress
      </Button>
      <Button 
        variant={filterStatus === "completed" ? "default" : "outline"} 
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </Button>
      <Button 
        variant={filterStatus === "cancelled" ? "default" : "outline"} 
        onClick={() => onFilterChange("cancelled")}
      >
        Cancelled
      </Button>
    </div>
  );
}
