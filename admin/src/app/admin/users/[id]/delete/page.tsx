"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteUserPage() {
  const params = useParams();
  const id = params?.id as string;
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      setDone(true);
      setTimeout(()=>{ window.location.href = "/admin/users"; }, 800);
    })();
  }, [id]);

  return <div className="text-red-700">Đang xóa người dùng...</div>;
}
