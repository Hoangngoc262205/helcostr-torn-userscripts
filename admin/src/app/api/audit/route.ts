import { NextResponse } from "next/server";
import { readCollection } from "@/lib/db";
import { AuditLog } from "@/types";

export async function GET() {
  const logs = await readCollection<AuditLog[]>("audit", []);
  return NextResponse.json(logs);
}
