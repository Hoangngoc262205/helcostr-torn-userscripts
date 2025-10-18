import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { Booking } from "@/types";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const bookings = await readCollection<Booking[]>("bookings", []);
  const found = bookings.find((b) => b.id === params.id);
  if (!found) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(found);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const bookings = await readCollection<Booking[]>("bookings", []);
  const idx = bookings.findIndex((b) => b.id === params.id);
  if (idx === -1) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as Partial<Booking>;
  const now = new Date().toISOString();
  const updated: Booking = {
    ...bookings[idx],
    customerId: body.customerId ?? bookings[idx].customerId,
    roomId: body.roomId ?? bookings[idx].roomId,
    checkIn: body.checkIn ?? bookings[idx].checkIn,
    checkOut: body.checkOut ?? bookings[idx].checkOut,
    status: (body.status as Booking["status"]) ?? bookings[idx].status,
    guests: body.guests ?? bookings[idx].guests,
    services: body.services ?? bookings[idx].services,
    totalPrice: body.totalPrice ?? bookings[idx].totalPrice,
    source: body.source ?? bookings[idx].source,
    notes: body.notes ?? bookings[idx].notes,
    updatedAt: now,
  };
  bookings[idx] = updated;
  await writeCollection("bookings", bookings);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const bookings = await readCollection<Booking[]>("bookings", []);
  const filtered = bookings.filter((b) => b.id !== params.id);
  await writeCollection("bookings", filtered);
  return NextResponse.json({ ok: true });
}
