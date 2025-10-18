export interface HotelSettings {
  name: string;
  address?: string;
  logoUrl?: string;
  hotline?: string;
  email?: string;
  currency: string; // e.g. "VND"
  timezone: string; // e.g. "Asia/Ho_Chi_Minh"
  language: string; // e.g. "vi"
}
