export type BookingStatus = "PENDING" | "CONFIRMED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED";

export interface BookingServiceItem {
  serviceId: string;
  quantity: number;
  price: number; // snapshot price
}

export interface Booking {
  id: string;
  customerId: string;
  roomId: string;
  checkIn: string; // ISO
  checkOut: string; // ISO
  status: BookingStatus;
  guests: number;
  services: BookingServiceItem[];
  totalPrice: number;
  source?: "WEB" | "PHONE" | "WALK_IN" | "AGENCY";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
