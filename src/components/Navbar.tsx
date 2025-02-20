
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Car className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold">Caravaro</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
