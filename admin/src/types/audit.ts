export interface AuditLog {
  id: string;
  userId: string;
  action: string; // e.g. "USER_CREATE"
  targetType?: string; // e.g. "USER"
  targetId?: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  createdAt: string;
}
