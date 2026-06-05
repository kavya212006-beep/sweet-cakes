import { formatCurrency } from "./data";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function calculateCartSubtotal(items: Array<{ priceCents: number; quantity: number }>) {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

export function calculateDelivery(subtotalCents: number) {
  return subtotalCents >= 350000 ? 0 : 4900;
}

export function calculateTax(subtotalCents: number) {
  return Math.round(subtotalCents * 0.05);
}

export function calculateDiscount(subtotalCents: number, coupon?: { type: "percent" | "fixed"; value: number }) {
  if (!coupon) return 0;
  if (coupon.type === "percent") return Math.round(subtotalCents * (coupon.value / 100));
  return coupon.value;
}

export function calculateOrderTotal(subtotalCents: number, deliveryCents: number, taxCents: number, discountCents: number) {
  return Math.max(subtotalCents + deliveryCents + taxCents - discountCents, 0);
}

export function safeFormatCurrency(amountInCents: number) {
  return formatCurrency(amountInCents);
}
