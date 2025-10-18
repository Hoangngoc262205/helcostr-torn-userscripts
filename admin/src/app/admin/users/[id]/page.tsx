"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditUserPage() {
  const params = useParams();
  const id = params?.id as string;
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", roles: "", status: "ACTIVE" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/users/${id}`);
      if (res.ok) {
        const u = await res.json();
        setForm({
          name: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
          password: "",
          roles: (u.roles || []).join(","),
          status: u.status || "ACTIVE",
        });
      }
      setLoading(false);
    })();
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        roles: form.roles.split(",").map((s)=>s.trim()).filter(Boolean),
        password: form.password || undefined,
      }),
    });
    if (res.ok) {
      window.location.href = "/admin/users";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Lỗi cập nhật người dùng");
    }
  };

  if (loading) return <div>Đang tải...</div>;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Sửa người dùng</h1>
      <form onSubmit={onSubmit} className="max-w-lg space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Tên" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Điện thoại" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Mật khẩu (để trống nếu không đổi)" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Vai trò, ví dụ: ADMIN,MANAGER" value={form.roles} onChange={(e)=>setForm({...form,roles:e.target.value})} />
        <select className="w-full border rounded px-3 py-2" value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="LOCKED">LOCKED</option>
        </select>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="bg-blue-600 text-white rounded px-3 py-2">Lưu</button>
      </form>
    </div>
  );
}
