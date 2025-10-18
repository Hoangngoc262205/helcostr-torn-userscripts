import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { User } from "@/types";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const users = await readCollection<User[]>("users", []);
  const found = users.find((u) => u.id === params.id);
  if (!found) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(found);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const users = await readCollection<User[]>("users", []);
  const idx = users.findIndex((u) => u.id === params.id);
  if (idx === -1) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as Partial<User>;
  const now = new Date().toISOString();
  const updated: User = {
    ...users[idx],
    name: body.name ?? users[idx].name,
    email: body.email ?? users[idx].email,
    phone: body.phone ?? users[idx].phone,
    roles: (body.roles as string[]) ?? users[idx].roles,
    status: (body.status as User["status"]) ?? users[idx].status,
    avatarUrl: body.avatarUrl ?? users[idx].avatarUrl,
    password: body.password ?? users[idx].password,
    updatedAt: now,
  };
  users[idx] = updated;
  await writeCollection("users", users);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const users = await readCollection<User[]>("users", []);
  const filtered = users.filter((u) => u.id !== params.id);
  await writeCollection("users", filtered);
  return NextResponse.json({ ok: true });
}
