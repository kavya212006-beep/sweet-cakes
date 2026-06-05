import crypto from "crypto";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { orderEvents, orderItems, orders } from "@/db/schema";

function buildOrderNumber() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `SD-${year}-${suffix}`;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    customer?: { name?: string; email?: string; phone?: string };
    shippingAddress?: Record<string, string>;
    paymentMethod?: "razorpay" | "stripe" | "card" | "cod";
    notes?: string;
    items?: Array<{
      key: string;
      slug: string;
      name: string;
      image: string;
      priceCents: number;
      quantity: number;
      category: string;
      options?: Record<string, string>;
      note?: string;
    }>;
    subtotalCents?: number;
    deliveryCents?: number;
    taxCents?: number;
    discountCents?: number;
    totalCents?: number;
  } | null;

  if (!body?.customer?.name || !body.customer.email || !body.customer.phone || !body.shippingAddress || !body.items?.length) {
    return NextResponse.json({ message: "Your checkout details are incomplete." }, { status: 400 });
  }

  const subtotal = body.subtotalCents ?? 0;
  const delivery = body.deliveryCents ?? 0;
  const tax = body.taxCents ?? 0;
  const discount = body.discountCents ?? 0;
  const total = body.totalCents ?? subtotal + delivery + tax - discount;
  const orderNumber = buildOrderNumber();
  const createdAt = new Date();

  const [order] = await db
    .insert(orders)
    .values({
      orderNumber,
      customerName: body.customer.name.trim(),
      customerEmail: body.customer.email.trim().toLowerCase(),
      customerPhone: body.customer.phone.trim(),
      paymentMethod: body.paymentMethod ?? "stripe",
      subtotalCents: subtotal,
      deliveryCents: delivery,
      taxCents: tax,
      discountCents: discount,
      totalCents: total,
      shippingAddress: body.shippingAddress,
      customization: {},
      notes: body.notes?.trim() || null,
      createdAt,
      status: "received",
    })
    .returning({ id: orders.id, orderNumber: orders.orderNumber });

  await db.insert(orderItems).values(
    body.items.map((item) => ({
      orderId: order.id,
      productName: item.name,
      productSlug: item.slug,
      quantity: item.quantity,
      unitPriceCents: item.priceCents,
      imageUrl: item.image,
      customization: item.options ?? {},
    })),
  );

  await db.insert(orderEvents).values([
    { orderId: order.id, status: "received", message: "Order confirmed and payment initiated." },
    { orderId: order.id, status: "preparing", message: "Our pastry chefs are preparing your order." },
  ]);

  return NextResponse.json({ orderNumber: order.orderNumber, message: "Order placed successfully." });
}