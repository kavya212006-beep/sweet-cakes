import { and, eq, gt, isNull, lte } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { coupons } from "@/db/schema";

const fallbackCoupons = {
  SWEET10: { type: "percent" as const, value: 10, minSubtotalCents: 0 },
  GOLD250: { type: "fixed" as const, value: 25000, minSubtotalCents: 150000 },
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { code?: string; subtotalCents?: number } | null;
  const code = body?.code?.trim().toUpperCase();
  const subtotalCents = body?.subtotalCents ?? 0;

  if (!code) {
    return NextResponse.json({ valid: false, message: "Enter a coupon code." }, { status: 400 });
  }

  const matched = await db.select().from(coupons).where(eq(coupons.code, code)).limit(1);
  const coupon = matched[0] ?? (fallbackCoupons as Record<string, { type: "percent" | "fixed"; value: number; minSubtotalCents: number }>)[code];

  if (!coupon) {
    return NextResponse.json({ valid: false, message: "That coupon code is not valid." });
  }

  if ("active" in coupon && !coupon.active) {
    return NextResponse.json({ valid: false, message: "That coupon is currently inactive." });
  }

  if ("expiresAt" in coupon && coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return NextResponse.json({ valid: false, message: "That coupon has expired." });
  }

  if (subtotalCents < coupon.minSubtotalCents) {
    return NextResponse.json({ valid: false, message: `Spend at least ${coupon.minSubtotalCents / 100} to use this coupon.` });
  }

  const discountCents = coupon.type === "percent" ? Math.round(subtotalCents * (coupon.value / 100)) : coupon.value;
  return NextResponse.json({ valid: true, discountCents, message: `${code} applied successfully.` });
}