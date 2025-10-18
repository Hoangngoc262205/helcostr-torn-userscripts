"use client";

import { useState } from "react";

export default function NewUserPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", roles: "RECEPTIONIST" });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, roles: form.roles.split(",").map((s)=>s.trim()).filter(Boolean) }),
    });
    if (res.ok) {
      window.location.href = "/admin/users";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Lỗi tạo người dùng");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Thêm người dùng</h1>
      <form onSubmit={onSubmit} className="max-w-lg space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Tên" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Điện thoại" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Mật khẩu" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <input className="w-full border rounded px-3 py-2" placeholder="Vai trò (ví dụ: ADMIN,MANAGER)" value={form.roles} onChange={(e)=>setForm({...form,roles:e.target.value})} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="bg-blue-600 text-white rounded px-3 py-2">Lưu</button>
      </form>
    </div>
  );
}
