import Link from "next/link";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const token = cookies().get("admin_token")?.value;
  const user = token ? verifyToken(token) : null;
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Bạn chưa đăng nhập.</p>
          <Link className="text-blue-600 underline" href="/login">
            Đến trang đăng nhập
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="bg-gray-900 text-white p-4 space-y-2">
        <div className="font-bold text-lg mb-4">Hotel Admin</div>
        <nav className="space-y-1">
          <Link className="block hover:underline" href="/admin">Tổng quan</Link>
          <Link className="block hover:underline" href="/admin/users">Người dùng</Link>
          <Link className="block hover:underline" href="/admin/customers">Khách hàng</Link>
          <Link className="block hover:underline" href="/admin/rooms">Phòng</Link>
          <Link className="block hover:underline" href="/admin/bookings">Đặt phòng</Link>
          <Link className="block hover:underline" href="/admin/services">Dịch vụ</Link>
          <Link className="block hover:underline" href="/admin/payments">Thanh toán</Link>
          <Link className="block hover:underline" href="/admin/feedback">Phản hồi</Link>
          <Link className="block hover:underline" href="/admin/reports">Báo cáo</Link>
          <Link className="block hover:underline" href="/admin/settings">Cấu hình</Link>
          <Link className="block hover:underline" href="/admin/security">Bảo mật & Nhật ký</Link>
        </nav>
        <form action="/api/logout" method="post">
          <button className="mt-4 bg-red-600 rounded px-3 py-1">Đăng xuất</button>
        </form>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
