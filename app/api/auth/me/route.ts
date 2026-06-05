import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const matched = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
  const user = matched[0];
  if (!user) {
    return NextResponse.json({ user: null }, { status: 404 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      loyaltyPoints: user.loyaltyPoints,
    },
  });
}