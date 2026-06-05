import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createSessionToken, hashPassword, SESSION_COOKIE_NAME, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { name?: string; email?: string; password?: string; phone?: string }
    | null;

  const name = body?.name?.trim();
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password ?? "";

  if (!name || !email || password.length < 6) {
    return NextResponse.json({ message: "Please provide name, email, and a password with at least 6 characters." }, { status: 400 });
  }

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length) {
    return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const [created] = await db
    .insert(users)
    .values({
      name,
      email,
      phone: body?.phone?.trim() || null,
      passwordHash,
    })
    .returning({ id: users.id, name: users.name, email: users.email, role: users.role });

  const token = await createSessionToken({ userId: created.id, role: created.role, email: created.email });
  const response = NextResponse.json({ user: created });
  response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
  return response;
}