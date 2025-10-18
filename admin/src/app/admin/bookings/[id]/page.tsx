"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditBookingPage() {
  const params = useParams();
  const id = params?.id as string;
  const [form, setForm] = useState({ customerId: "", roomId: "", checkIn: "", checkOut: "", guests: 1, status: "PENDING" });
  const [customers, setCustomers] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [c, r, b] = await Promise.all([
        fetch("/api/customers").then(r=>r.json()),
        fetch("/api/rooms").then(r=>r.json()),
        fetch(`/api/bookings/${id}`).then(r=>r.json()),
      ]);
      setCustomers(c);
      setRooms(r);
      setForm({
        customerId: b.customerId || "",
        roomId: b.roomId || "",
        checkIn: (b.checkIn || "").slice(0,16),
        checkOut: (b.checkOut || "").slice(0,16),
        guests: b.guests || 1,
        status: b.status || "PENDING",
      });
      setLoading(false);
    })();
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      window.location.href = "/admin/bookings";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Lỗi cập nhật đặt phòng");
    }
  };

  if (loading) return <div>Đang tải...</div>;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Sửa đặt phòng</h1>
      <form onSubmit={onSubmit} className="max-w-xl grid gap-3">
        <select className="border rounded px-3 py-2" value={form.customerId} onChange={(e)=>setForm({...form,customerId:e.target.value})}>
          <option value="">-- Chọn khách hàng --</option>
          {customers.map((c:any)=> <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>)}
        </select>
        <select className="border rounded px-3 py-2" value={form.roomId} onChange={(e)=>setForm({...form,roomId:e.target.value})}>
          <option value="">-- Chọn phòng --</option>
          {rooms.map((r:any)=> <option key={r.id} value={r.id}>{r.number} - {r.name}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" type="datetime-local" value={form.checkIn} onChange={(e)=>setForm({...form,checkIn:e.target.value})} />
          <input className="border rounded px-3 py-2" type="datetime-local" value={form.checkOut} onChange={(e)=>setForm({...form,checkOut:e.target.value})} />
        </div>
        <input className="border rounded px-3 py-2" type="number" min={1} value={form.guests} onChange={(e)=>setForm({...form,guests:Number(e.target.value)})} />
        <select className="border rounded px-3 py-2" value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CHECKED_IN">CHECKED_IN</option>
          <option value="CHECKED_OUT">CHECKED_OUT</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white rounded px-3 py-2">Lưu</button>
          <a className="px-3 py-2 border rounded" href="/admin/bookings">Hủy</a>
        </div>
      </form>
    </div>
  );
}
