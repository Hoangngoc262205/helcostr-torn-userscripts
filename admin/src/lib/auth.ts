import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { readCollection } from "@/lib/db";
import { User } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "admin_token";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export function signToken(user: SessionUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch (e) {
    return null;
  }
}

export async function login(email: string, password: string): Promise<SessionUser | null> {
  const users = await readCollection<User[]>("users", []);
  const found = users.find((u) => u.email === email && u.password === password && u.status === "ACTIVE");
  if (!found) return null;
  return { id: found.id, name: found.name, email: found.email, roles: found.roles };
}

export function getCookieToken(): string | undefined {
  try {
    const store = cookies();
    return store.get(COOKIE_NAME)?.value;
  } catch {
    return undefined;
  }
}

export function setAuthCookie(token: string): void {
  const store = cookies();
  store.set({ name: COOKIE_NAME, value: token, httpOnly: true, path: "/", sameSite: "lax" });
}

export function clearAuthCookie(): void {
  const store = cookies();
  store.delete(COOKIE_NAME);
}

export function requireAdminRole(user: SessionUser | null): boolean {
  if (!user) return false;
  return user.roles.includes("ADMIN");
}
