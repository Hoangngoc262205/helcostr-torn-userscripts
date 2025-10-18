"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteRoomPage() {
  const params = useParams();
  const id = params?.id as string;
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      await fetch(`/api/rooms/${id}`, { method: "DELETE" });
      setDone(true);
      setTimeout(()=>{ window.location.href = "/admin/rooms"; }, 800);
    })();
  }, [id]);

  return <div className="text-red-700">Đang xóa phòng...</div>;
}
