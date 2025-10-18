"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditServicePage() {
  const params = useParams();
  const id = params?.id as string;
  const [form, setForm] = useState({ name: "", price: 0, status: "ACTIVE" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/services/${id}`);
      if (res.ok) {
        const s = await res.json();
        setForm({ name: s.name || "", price: s.price || 0, status: s.status || "ACTIVE" });
      }
      setLoading(false);
    })();
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      window.location.href = "/admin/services";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Lỗi cập nhật dịch vụ");
    }
  };

  if (loading) return <div>Đang tải...</div>;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Sửa dịch vụ</h1>
      <form onSubmit={onSubmit} className="max-w-lg space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Tên" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" type="number" placeholder="Giá" value={form.price} onChange={(e)=>setForm({...form,price:Number(e.target.value)})} />
        <select className="w-full border rounded px-3 py-2" value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="bg-blue-600 text-white rounded px-3 py-2">Lưu</button>
      </form>
    </div>
  );
}
