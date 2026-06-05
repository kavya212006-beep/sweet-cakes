import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { orderEvents, orders } from "@/db/schema";
import { formatCurrency } from "@/lib/data";

export async function GET(_request: Request, { params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const matched = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  const order = matched[0];

  if (!order) {
    return NextResponse.json({ message: "Order not found." }, { status: 404 });
  }

  const events = await db.select().from(orderEvents).where(eq(orderEvents.orderId, order.id)).orderBy(desc(orderEvents.createdAt));

  return NextResponse.json({
    orderNumber: order.orderNumber,
    status: order.status,
    total: formatCurrency(order.totalCents),
    createdAt: order.createdAt,
    events: events.map((event) => ({
      status: event.status,
      message: event.message,
      createdAt: event.createdAt,
    })),
  });
}