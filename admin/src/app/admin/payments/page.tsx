"use client";

import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/payments");
      setItems(await res.json());
    })();
  }, []);

  const exportCsv = async () => {
    const res = await fetch("/api/payments/export");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Thanh toán & Hóa đơn</h1>
        <button className="bg-green-600 text-white rounded px-3 py-1" onClick={exportCsv}>Xuất CSV</button>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 border">Mã hóa đơn</th>
            <th className="p-2 border">Booking</th>
            <th className="p-2 border">Số tiền</th>
            <th className="p-2 border">Phương thức</th>
            <th className="p-2 border">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p:any) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.invoiceNumber}</td>
              <td className="p-2 border">{p.bookingId}</td>
              <td className="p-2 border">{p.amount?.toLocaleString("vi-VN")}</td>
              <td className="p-2 border">{p.method}</td>
              <td className="p-2 border">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
