"use client";

import { useState } from "react";

export default function NewRoomPage() {
  const [form, setForm] = useState({ number: "", name: "", category: "SINGLE", status: "AVAILABLE", price: 800000 });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      window.location.href = "/admin/rooms";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Lỗi tạo phòng");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Thêm phòng</h1>
      <form onSubmit={onSubmit} className="max-w-lg space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Số phòng" value={form.number} onChange={(e)=>setForm({...form,number:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Tên" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <select className="w-full border rounded px-3 py-2" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}>
          <option value="SINGLE">SINGLE</option>
          <option value="DOUBLE">DOUBLE</option>
          <option value="SUITE">SUITE</option>
          <option value="VIP">VIP</option>
        </select>
        <select className="w-full border rounded px-3 py-2" value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="BOOKED">BOOKED</option>
          <option value="CLEANING">CLEANING</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
        </select>
        <input className="w-full border rounded px-3 py-2" type="number" placeholder="Giá" value={form.price} onChange={(e)=>setForm({...form,price:Number(e.target.value)})} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="bg-blue-600 text-white rounded px-3 py-2">Lưu</button>
      </form>
    </div>
  );
}
