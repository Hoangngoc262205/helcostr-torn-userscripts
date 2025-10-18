import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { ServiceItem } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const services = await readCollection<ServiceItem[]>("services", []);
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<ServiceItem>;
  if (!body.name) {
    return NextResponse.json({ message: "Thiếu tên" }, { status: 400 });
  }
  const services = await readCollection<ServiceItem[]>("services", []);
  const now = new Date().toISOString();
  const newItem: ServiceItem = {
    id: uuidv4(),
    name: body.name!,
    description: body.description,
    price: body.price || 0,
    status: (body.status as ServiceItem["status"]) || "ACTIVE",
    category: body.category,
    createdAt: now,
    updatedAt: now,
  };
  services.push(newItem);
  await writeCollection("services", services);
  return NextResponse.json(newItem, { status: 201 });
}
