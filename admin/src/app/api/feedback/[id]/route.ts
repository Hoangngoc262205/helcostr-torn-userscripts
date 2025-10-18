import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { Feedback, FeedbackStatus } from "@/types";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const feedback = await readCollection<Feedback[]>("feedback", []);
  const idx = feedback.findIndex((f) => f.id === params.id);
  if (idx === -1) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as Partial<Feedback>;
  const now = new Date().toISOString();
  const updated: Feedback = {
    ...feedback[idx],
    status: (body.status as FeedbackStatus) ?? feedback[idx].status,
    updatedAt: now,
  };
  feedback[idx] = updated;
  await writeCollection("feedback", feedback);
  return NextResponse.json(updated);
}
