import { NextResponse } from "next/server";
import { readCollection } from "@/lib/db";
import { Feedback } from "@/types";

export async function GET() {
  const feedback = await readCollection<Feedback[]>("feedback", []);
  return NextResponse.json(feedback);
}
