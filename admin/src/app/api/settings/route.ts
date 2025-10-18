import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { HotelSettings } from "@/types";

export async function GET() {
  const settings = await readCollection<HotelSettings>("settings", {
    name: "Hotel",
    currency: "VND",
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi",
  } as HotelSettings);
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<HotelSettings>;
  const current = await readCollection<HotelSettings>("settings", {
    name: "Hotel",
    currency: "VND",
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi",
  } as HotelSettings);
  const next: HotelSettings = {
    ...current,
    ...body,
  } as HotelSettings;
  await writeCollection("settings", next);
  return NextResponse.json(next);
}
