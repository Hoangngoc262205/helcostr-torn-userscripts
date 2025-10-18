"use client";

import { useEffect, useState } from "react";

export default function FeedbackPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/feedback");
      setItems(await res.json());
    })();
  }, []);

  const mark = async (id: string, status: string) => {
    await fetch(`/api/feedback/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    const res = await fetch("/api/feedback");
    setItems(await res.json());
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Phản hồi & Khiếu nại</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 border">Khách</th>
            <th className="p-2 border">Đánh giá</th>
            <th className="p-2 border">Bình luận</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {items.map((f:any) => (
            <tr key={f.id}>
              <td className="p-2 border">{f.customerId}</td>
              <td className="p-2 border">{f.rating}★</td>
              <td className="p-2 border">{f.comment}</td>
              <td className="p-2 border">{f.status}</td>
              <td className="p-2 border space-x-2">
                <button className="text-blue-600 underline" onClick={()=>mark(f.id, "IN_PROGRESS")}>Xử lý</button>
                <button className="text-green-600 underline" onClick={()=>mark(f.id, "RESOLVED")}>Đã xử lý</button>
                <button className="text-red-600 underline" onClick={()=>mark(f.id, "REPORTED")}>Báo cáo</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
