"use client";

import { useEffect, useMemo, useState } from "react";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      setRooms(data);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rooms.filter((r:any)=>
      (!q || r.name?.toLowerCase().includes(q) || r.number?.includes(query)) &&
      (!category || r.category === category) &&
      (!status || r.status === status)
    );
  }, [rooms, query, category, status]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Phòng</h1>
        <a className="bg-blue-600 text-white rounded px-3 py-1" href="/admin/rooms/new">Thêm</a>
      </div>
      <div className="flex gap-2 mb-3">
        <input className="border rounded px-3 py-2" placeholder="Tìm theo tên/ số phòng" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <select className="border rounded px-3 py-2" value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">Tất cả loại</option>
          <option value="SINGLE">SINGLE</option>
          <option value="DOUBLE">DOUBLE</option>
          <option value="SUITE">SUITE</option>
          <option value="VIP">VIP</option>
        </select>
        <select className="border rounded px-3 py-2" value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="BOOKED">BOOKED</option>
          <option value="CLEANING">CLEANING</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
        </select>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 border">Số phòng</th>
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Loại</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Giá</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r:any) => (
            <tr key={r.id}>
              <td className="p-2 border">{r.number}</td>
              <td className="p-2 border">{r.name}</td>
              <td className="p-2 border">{r.category}</td>
              <td className="p-2 border">{r.status}</td>
              <td className="p-2 border">{r.price.toLocaleString("vi-VN")}</td>
              <td className="p-2 border space-x-2">
                <a className="text-blue-600 underline" href={`/admin/rooms/${r.id}`}>Sửa</a>
                <a className="text-red-600 underline" href={`/admin/rooms/${r.id}/delete`}>Xóa</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
