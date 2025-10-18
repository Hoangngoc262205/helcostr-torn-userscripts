import { NextRequest, NextResponse } from "next/server";
import { login, signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };
  if (!email || !password) {
    return NextResponse.json({ message: "Thiếu thông tin" }, { status: 400 });
  }
  const user = await login(email, password);
  if (!user) {
    return NextResponse.json({ message: "Sai email hoặc mật khẩu" }, { status: 401 });
  }
  const token = signToken(user);
  setAuthCookie(token);
  return NextResponse.json({ ok: true });
}
