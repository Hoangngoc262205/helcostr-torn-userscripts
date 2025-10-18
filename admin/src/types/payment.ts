export type PaymentMethod = "CASH" | "CARD" | "BANK_TRANSFER" | "EWALLET";
export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED" | "FAILED";

export interface PaymentItemLine {
  name: string;
  quantity: number;
  price: number;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  invoiceNumber: string;
  items: PaymentItemLine[];
  createdAt: string;
  updatedAt: string;
}
