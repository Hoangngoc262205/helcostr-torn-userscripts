"use client";

import { useEffect, useMemo, useState } from "react";

type Customer = {
  id: string; name: string; email?: string; phone?: string; totalBookings: number; totalSpent: number; lastBookingAt?: string;
};

export default function CustomersPage() {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/customers");
      const data = await res.json();
      setCustomers(data);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return customers.filter(c =>
      (!q || (c.name?.toLowerCase().includes(q) || c.phone?.includes(query) || c.email?.toLowerCase().includes(q)))
    );
  }, [customers, query]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Khách hàng</h1>
      <input className="border rounded px-3 py-2 mb-3" placeholder="Tìm theo tên, điện thoại, email" value={query} onChange={(e)=>setQuery(e.target.value)} />
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 border">Tên</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Điện thoại</th>
            <th className="p-2 border">Số lần đặt</th>
            <th className="p-2 border">Tổng chi tiêu</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.phone}</td>
              <td className="p-2 border">{c.totalBookings}</td>
              <td className="p-2 border">{c.totalSpent.toLocaleString("vi-VN")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
