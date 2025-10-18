"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteServicePage() {
  const params = useParams();
  const id = params?.id as string;
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      setDone(true);
      setTimeout(()=>{ window.location.href = "/admin/services"; }, 800);
    })();
  }, [id]);

  return <div className="text-red-700">Đang xóa dịch vụ...</div>;
}
