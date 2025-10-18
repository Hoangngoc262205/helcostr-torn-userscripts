export type ServiceStatus = "ACTIVE" | "INACTIVE";

export interface ServiceItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  status: ServiceStatus;
  category?: string; // e.g. "SPA", "FOOD", "TRANSFER"
  createdAt: string;
  updatedAt: string;
}
