import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  } | null;

  if (!body?.name || !body.email || !body.subject || !body.message) {
    return NextResponse.json({ message: "Please complete every required field." }, { status: 400 });
  }

  await db.insert(contactMessages).values({
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone?.trim() || null,
    subject: body.subject.trim(),
    message: body.message.trim(),
  });

  return NextResponse.json({ message: "Thanks — we’ll reply shortly with a tailored response." });
}