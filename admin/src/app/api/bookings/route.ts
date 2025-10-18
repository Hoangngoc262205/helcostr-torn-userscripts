import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { Booking } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const bookings = await readCollection<Booking[]>("bookings", []);
  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<Booking>;
  if (!body.customerId || !body.roomId || !body.checkIn || !body.checkOut) {
    return NextResponse.json({ message: "Thiếu thông tin đặt phòng" }, { status: 400 });
  }
  const bookings = await readCollection<Booking[]>("bookings", []);
  const now = new Date().toISOString();
  const newBooking: Booking = {
    id: uuidv4(),
    customerId: body.customerId!,
    roomId: body.roomId!,
    checkIn: body.checkIn!,
    checkOut: body.checkOut!,
    status: (body.status as Booking["status"]) || "PENDING",
    guests: body.guests || 1,
    services: body.services || [],
    totalPrice: body.totalPrice || 0,
    source: body.source,
    notes: body.notes,
    createdAt: now,
    updatedAt: now,
  };
  bookings.push(newBooking);
  await writeCollection("bookings", bookings);
  return NextResponse.json(newBooking, { status: 201 });
}
