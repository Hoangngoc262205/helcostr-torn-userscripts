export type FeedbackStatus = "NEW" | "IN_PROGRESS" | "RESOLVED" | "REPORTED";

export interface Feedback {
  id: string;
  bookingId?: string;
  customerId: string;
  rating: number; // 1..5
  comment?: string;
  createdAt: string;
  updatedAt: string;
  status: FeedbackStatus;
}
