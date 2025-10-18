import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { Room } from "@/types";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const rooms = await readCollection<Room[]>("rooms", []);
  const found = rooms.find((r) => r.id === params.id);
  if (!found) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(found);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const rooms = await readCollection<Room[]>("rooms", []);
  const idx = rooms.findIndex((r) => r.id === params.id);
  if (idx === -1) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as Partial<Room>;
  const now = new Date().toISOString();
  const updated: Room = {
    ...rooms[idx],
    number: body.number ?? rooms[idx].number,
    name: body.name ?? rooms[idx].name,
    category: (body.category as Room["category"]) ?? rooms[idx].category,
    status: (body.status as Room["status"]) ?? rooms[idx].status,
    price: body.price ?? rooms[idx].price,
    images: body.images ?? rooms[idx].images,
    amenities: body.amenities ?? rooms[idx].amenities,
    description: body.description ?? rooms[idx].description,
    floor: body.floor ?? rooms[idx].floor,
    capacity: body.capacity ?? rooms[idx].capacity,
    updatedAt: now,
  };
  rooms[idx] = updated;
  await writeCollection("rooms", rooms);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const rooms = await readCollection<Room[]>("rooms", []);
  const filtered = rooms.filter((r) => r.id !== params.id);
  await writeCollection("rooms", filtered);
  return NextResponse.json({ ok: true });
}
