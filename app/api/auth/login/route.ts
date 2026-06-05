import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { comparePassword, createSessionToken, SESSION_COOKIE_NAME, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const matched = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = matched[0];
  if (!user) {
    return NextResponse.json({ message: "Incorrect email or password." }, { status: 401 });
  }

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ message: "Incorrect email or password." }, { status: 401 });
  }

  const token = await createSessionToken({ userId: user.id, role: user.role, email: user.email });
  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
  return response;
}