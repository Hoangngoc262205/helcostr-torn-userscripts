"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteBookingPage() {
  const params = useParams();
  const id = params?.id as string;
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      setDone(true);
      setTimeout(()=>{ window.location.href = "/admin/bookings"; }, 800);
    })();
  }, [id]);

  return <div className="text-red-700">Đang xóa đặt phòng...</div>;
}
