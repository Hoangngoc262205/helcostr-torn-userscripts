import { NextRequest, NextResponse } from "next/server";
import { readCollection } from "@/lib/db";
import { Payment } from "@/types";

export async function GET() {
  const payments = await readCollection<Payment[]>("payments", []);
  return NextResponse.json(payments);
}
