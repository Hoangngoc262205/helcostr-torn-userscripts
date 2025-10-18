import { NextResponse } from "next/server";
import { readCollection } from "@/lib/db";
import { Payment } from "@/types";

export async function GET() {
  const payments = await readCollection<Payment[]>("payments", []);
  const headers = ["invoiceNumber","bookingId","amount","method","status","createdAt"];
  const rows = payments.map(p => [p.invoiceNumber,p.bookingId,p.amount,p.method,p.status,p.createdAt].join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv; charset=utf-8" } });
}
