import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const existing = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
  if (existing.length === 0) {
    await db.insert(newsletterSubscribers).values({ email, source: "website" });
  }

  return NextResponse.json({ message: "You’re subscribed to Sweet Delights updates." });
}