
export type ServiceType = 'car_wash' | 'driver_hire' | 'car_rental';
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
