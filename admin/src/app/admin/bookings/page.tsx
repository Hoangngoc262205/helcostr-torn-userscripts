"use client";

import { useEffect, useMemo, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return bookings.filter((b:any)=>
      (!q || b.id?.toLowerCase().includes(q) || b.customerId?.toLowerCase().includes(q)) &&
      (!status || b.status === status)
    );
  }, [bookings, query, status]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Đặt phòng</h1>
        <a className="bg-blue-600 text-white rounded px-3 py-1" href="/admin/bookings/new">Thêm</a>
      </div>
      <div className="flex gap-2 mb-3">
        <input className="border rounded px-3 py-2" placeholder="Tìm theo mã/khách" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <select className="border rounded px-3 py-2" value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CHECKED_IN">CHECKED_IN</option>
          <option value="CHECKED_OUT">CHECKED_OUT</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 border">Mã</th>
            <th className="p-2 border">Khách</th>
            <th className="p-2 border">Phòng</th>
            <th className="p-2 border">Check-in</th>
            <th className="p-2 border">Check-out</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((b:any) => (
            <tr key={b.id}>
              <td className="p-2 border">{b.id}</td>
              <td className="p-2 border">{b.customerId}</td>
              <td className="p-2 border">{b.roomId}</td>
              <td className="p-2 border">{new Date(b.checkIn).toLocaleString("vi-VN")}</td>
              <td className="p-2 border">{new Date(b.checkOut).toLocaleString("vi-VN")}</td>
              <td className="p-2 border">{b.status}</td>
              <td className="p-2 border space-x-2">
                <a className="text-blue-600 underline" href={`/admin/bookings/${b.id}`}>Sửa</a>
                <a className="text-red-600 underline" href={`/admin/bookings/${b.id}/delete`}>Xóa</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
