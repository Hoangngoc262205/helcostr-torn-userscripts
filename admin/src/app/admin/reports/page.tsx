"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ReportsPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/payments");
      setData(await res.json());
    })();
  }, []);

  const byMonth: Record<string, number> = {};
  data.forEach((p:any) => {
    if (p.status !== "PAID") return;
    const d = new Date(p.createdAt || Date.now());
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    byMonth[key] = (byMonth[key] || 0) + (p.amount || 0);
  });
  const labels = Object.keys(byMonth).sort();
  const values = labels.map(k => byMonth[k]);

  const chartData = {
    labels,
    datasets: [
      { label: "Doanh thu", data: values, backgroundColor: "rgba(37, 99, 235, 0.6)" },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Báo cáo</h1>
      <div className="max-w-3xl">
        <Bar data={chartData} />
      </div>
    </div>
  );
}
