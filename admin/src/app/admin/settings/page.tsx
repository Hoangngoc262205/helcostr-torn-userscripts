"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({ name: "", address: "", logoUrl: "", hotline: "", email: "", currency: "VND", timezone: "Asia/Ho_Chi_Minh", language: "vi" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setForm(data);
    })();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaved(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Cấu hình hệ thống</h1>
      <form onSubmit={onSubmit} className="max-w-2xl grid grid-cols-1 gap-3">
        <input className="border rounded px-3 py-2" placeholder="Tên khách sạn" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Địa chỉ" value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Logo URL" value={form.logoUrl} onChange={(e)=>setForm({...form,logoUrl:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Hotline" value={form.hotline} onChange={(e)=>setForm({...form,hotline:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <div className="grid grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Tiền tệ" value={form.currency} onChange={(e)=>setForm({...form,currency:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Múi giờ" value={form.timezone} onChange={(e)=>setForm({...form,timezone:e.target.value})} />
          <input className="border rounded px-3 py-2" placeholder="Ngôn ngữ" value={form.language} onChange={(e)=>setForm({...form,language:e.target.value})} />
        </div>
        <button className="bg-blue-600 text-white rounded px-3 py-2 w-fit">Lưu</button>
        {saved && <div className="text-green-700">Đã lưu</div>}
      </form>
    </div>
  );
}
