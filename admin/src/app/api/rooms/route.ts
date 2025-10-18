import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { Room } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const rooms = await readCollection<Room[]>("rooms", []);
  return NextResponse.json(rooms);
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<Room>;
  if (!body.number || !body.category) {
    return NextResponse.json({ message: "Thiếu số phòng/loại" }, { status: 400 });
  }
  const rooms = await readCollection<Room[]>("rooms", []);
  const now = new Date().toISOString();
  const newRoom: Room = {
    id: uuidv4(),
    number: body.number!,
    name: body.name || `Phòng ${body.number}`,
    category: (body.category as Room["category"]) || "SINGLE",
    status: (body.status as Room["status"]) || "AVAILABLE",
    price: body.price || 0,
    images: body.images || [],
    amenities: body.amenities || [],
    description: body.description,
    floor: body.floor,
    capacity: body.capacity,
    createdAt: now,
    updatedAt: now,
  };
  rooms.push(newRoom);
  await writeCollection("rooms", rooms);
  return NextResponse.json(newRoom, { status: 201 });
}
