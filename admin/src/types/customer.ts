export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  totalBookings: number;
  totalSpent: number; // in smallest currency unit if needed
  lastBookingAt?: string; // ISO date
  vipLevel?: "NONE" | "SILVER" | "GOLD" | "PLATINUM";
  createdAt: string;
  updatedAt: string;
}
