import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { readCollection } from "@/lib/db";
import { Booking, Payment } from "@/types";

export default async function AdminHome() {
  const token = cookies().get("admin_token")?.value;
  const user = token ? verifyToken(token) : null;
  if (!user) {
    return null; // redirected by layout prompt
  }
  const [bookings, payments] = await Promise.all([
    readCollection<Booking[]>("bookings", []),
    readCollection<Payment[]>("payments", []),
  ]);
  const revenue = payments.filter(p=>p.status==="PAID").reduce((s,p)=>s+p.amount,0);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Tổng quan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded border">
          <div className="text-gray-500 text-sm">Đơn đặt phòng</div>
          <div className="text-2xl font-bold">{bookings.length}</div>
        </div>
        <div className="p-4 rounded border">
          <div className="text-gray-500 text-sm">Doanh thu (đ)
          </div>
          <div className="text-2xl font-bold">{revenue.toLocaleString("vi-VN")}</div>
        </div>
        <div className="p-4 rounded border">
          <div className="text-gray-500 text-sm">Người dùng</div>
          <div className="text-2xl font-bold">—</div>
        </div>
      </div>
    </div>
  );
}
