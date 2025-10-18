export type UserRole =
  | "ADMIN"
  | "RECEPTIONIST"
  | "ACCOUNTANT"
  | "HOUSEKEEPING"
  | "MANAGER";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  roles: UserRole[];
  status: "ACTIVE" | "LOCKED";
  avatarUrl?: string;
  password?: string; // For demo/dev only. Do NOT use in production.
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}
