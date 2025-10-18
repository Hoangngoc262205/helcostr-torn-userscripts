import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { ServiceItem } from "@/types";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const services = await readCollection<ServiceItem[]>("services", []);
  const found = services.find((s) => s.id === params.id);
  if (!found) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(found);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const services = await readCollection<ServiceItem[]>("services", []);
  const idx = services.findIndex((s) => s.id === params.id);
  if (idx === -1) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as Partial<ServiceItem>;
  const now = new Date().toISOString();
  const updated: ServiceItem = {
    ...services[idx],
    name: body.name ?? services[idx].name,
    description: body.description ?? services[idx].description,
    price: body.price ?? services[idx].price,
    status: (body.status as ServiceItem["status"]) ?? services[idx].status,
    category: body.category ?? services[idx].category,
    updatedAt: now,
  };
  services[idx] = updated;
  await writeCollection("services", services);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const services = await readCollection<ServiceItem[]>("services", []);
  const filtered = services.filter((s) => s.id !== params.id);
  await writeCollection("services", filtered);
  return NextResponse.json({ ok: true });
}
