export type RoomCategory = "SINGLE" | "DOUBLE" | "SUITE" | "VIP";
export type RoomStatus = "AVAILABLE" | "BOOKED" | "CLEANING" | "MAINTENANCE";

export interface Room {
  id: string;
  number: string; // e.g. "101"
  name?: string;
  category: RoomCategory;
  status: RoomStatus;
  price: number; // per night
  images: string[];
  amenities: string[];
  description?: string;
  floor?: number;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}
