import crypto from "crypto";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schema";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ message: "Please provide an email address." }, { status: 400 });
  }

  const matched = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = matched[0];
  if (user) {
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
    await db.insert(passwordResetTokens).values({ userId: user.id, token, expiresAt });
  }

  return NextResponse.json({ message: "If that account exists, we’ve sent a password reset link." });
}