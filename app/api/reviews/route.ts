import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { getProductBySlug } from "@/lib/data";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    productSlug?: string;
    userName?: string;
    title?: string;
    body?: string;
    rating?: number;
  } | null;

  const product = body?.productSlug ? getProductBySlug(body.productSlug) : null;
  if (!product || !body?.userName || !body?.title || !body?.body || !body.rating) {
    return NextResponse.json({ message: "Review details are incomplete." }, { status: 400 });
  }

  await db.insert(reviews).values({
    productId: product.id,
    userName: body.userName.trim(),
    title: body.title.trim(),
    body: body.body.trim(),
    rating: Math.max(1, Math.min(5, body.rating)),
    approved: true,
  });

  return NextResponse.json({ message: "Review submitted successfully." });
}