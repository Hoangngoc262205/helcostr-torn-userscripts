"use client";

import { useEffect, useState } from "react";

export default function SecurityPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/audit");
      setLogs(await res.json());
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Bảo mật & Nhật ký</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 border">Thời gian</th>
            <th className="p-2 border">Người dùng</th>
            <th className="p-2 border">Hành động</th>
            <th className="p-2 border">Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l:any) => (
            <tr key={l.id}>
              <td className="p-2 border">{new Date(l.createdAt).toLocaleString("vi-VN")}</td>
              <td className="p-2 border">{l.userId}</td>
              <td className="p-2 border">{l.action}</td>
              <td className="p-2 border">{JSON.stringify(l.metadata)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
