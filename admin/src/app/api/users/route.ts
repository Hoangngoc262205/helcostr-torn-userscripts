import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { User } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const users = await readCollection<User[]>("users", []);
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<User>;
  if (!body.name || !body.email) {
    return NextResponse.json({ message: "Thiếu tên hoặc email" }, { status: 400 });
  }
  const users = await readCollection<User[]>("users", []);
  if (users.some((u) => u.email === body.email)) {
    return NextResponse.json({ message: "Email đã tồn tại" }, { status: 409 });
  }
  const now = new Date().toISOString();
  const newUser: User = {
    id: uuidv4(),
    name: body.name!,
    email: body.email!,
    phone: body.phone,
    roles: (body.roles as string[]) || ["RECEPTIONIST"],
    status: body.status === "LOCKED" ? "LOCKED" : "ACTIVE",
    avatarUrl: body.avatarUrl,
    password: body.password || "secret123",
    createdAt: now,
    updatedAt: now,
  };
  users.push(newUser);
  await writeCollection("users", users);
  return NextResponse.json(newUser, { status: 201 });
}
