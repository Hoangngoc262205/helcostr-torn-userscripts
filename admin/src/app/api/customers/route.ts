import { NextResponse } from "next/server";
import { readCollection } from "@/lib/db";
import { Customer } from "@/types";

export async function GET() {
  const customers = await readCollection<Customer[]>("customers", []);
  return NextResponse.json(customers);
}
