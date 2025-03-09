
export type ServiceType = 'car_wash' | 'driver_hire' | 'car_rental' | 'bus_service';
export type ServiceStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface Profile {
  id: string;
  full_name: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  type: ServiceType;
  price: number;
  duration: number | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  status: ServiceStatus;
  scheduled_time: string;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
  vehicle_id?: string | null;
  pickup_location?: string | null;
  destination?: string | null;
  rental_duration?: number | null;
  seating_capacity?: string | null;
  admin_notes?: string | null;
  rental_vehicle_id?: string | null;
}

export interface Vehicle {
  id: string;
  owner_id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  created_at: string;
  updated_at: string;
}

export interface RentalVehicle {
  id: string;
  name: string;
  type: string;
  seating_capacity: number;
  price_per_day: number;
  availability_status: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  description?: string | null;
}
