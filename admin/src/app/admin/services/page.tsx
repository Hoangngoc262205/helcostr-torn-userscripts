"use client";

import { useEffect, useState } from "react";

export default function ServicesPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/services");
      setItems(await res.json());
    })();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Dịch vụ</h1>
        <a className="bg-blue-600 text-white rounded px-3 py-1" href="/admin/services/new">Thêm</a>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Giá</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s:any) => (
            <tr key={s.id}>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.price?.toLocaleString("vi-VN")}</td>
              <td className="p-2 border">{s.status}</td>
              <td className="p-2 border space-x-2">
                <a className="text-blue-600 underline" href={`/admin/services/${s.id}`}>Sửa</a>
                <a className="text-red-600 underline" href={`/admin/services/${s.id}/delete`}>Xóa</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
