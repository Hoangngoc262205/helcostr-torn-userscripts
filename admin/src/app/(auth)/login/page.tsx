"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) {
      window.location.href = "/admin";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Đăng nhập Admin</h1>
        <label className="block mb-2 text-sm">Email</label>
        <input
          className="w-full border rounded px-3 py-2 mb-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
        />
        <label className="block mb-2 text-sm">Mật khẩu</label>
        <input
          className="w-full border rounded px-3 py-2 mb-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
