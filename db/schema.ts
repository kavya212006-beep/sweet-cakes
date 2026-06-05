import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["customer", "admin"]);
export const orderStatusEnum = pgEnum("order_status", [
  "received",
  "preparing",
  "baking",
  "out_for_delivery",
  "delivered",
  "cancelled",
]);
export const couponTypeEnum = pgEnum("coupon_type", ["percent", "fixed"]);
export const paymentMethodEnum = pgEnum("payment_method", ["razorpay", "stripe", "card", "cod"]);

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    phone: text("phone"),
    passwordHash: text("password_hash").notNull(),
    role: userRoleEnum("role").notNull().default("customer"),
    avatarUrl: text("avatar_url"),
    loyaltyPoints: integer("loyalty_points").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
  }),
);

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  line1: text("line1").notNull(),
  line2: text("line2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull().default("India"),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    badge: text("badge"),
    description: text("description").notNull(),
    priceCents: integer("price_cents").notNull(),
    compareAtCents: integer("compare_at_cents"),
    rating: integer("rating").notNull().default(5),
    reviewCount: integer("review_count").notNull().default(0),
    stock: integer("stock").notNull().default(0),
    featured: boolean("featured").notNull().default(false),
    bestseller: boolean("bestseller").notNull().default(false),
    availability: text("availability").notNull().default("In stock"),
    deliveryText: text("delivery_text").notNull().default("Same-day delivery available in select locations"),
    primaryImage: text("primary_image").notNull(),
    gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
    flavors: jsonb("flavors").$type<string[]>().notNull().default([]),
    sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
    weightOptions: jsonb("weight_options").$type<string[]>().notNull().default([]),
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    categoryIdx: uniqueIndex("products_slug_idx").on(table.slug),
  }),
);

export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }),
  userName: text("user_name").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  rating: integer("rating").notNull(),
  approved: boolean("approved").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const coupons = pgTable(
  "coupons",
  {
    id: serial("id").primaryKey(),
    code: text("code").notNull().unique(),
    type: couponTypeEnum("type").notNull(),
    value: integer("value").notNull(),
    minSubtotalCents: integer("min_subtotal_cents").notNull().default(0),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    codeIdx: uniqueIndex("coupons_code_idx").on(table.code),
  }),
);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  status: orderStatusEnum("status").notNull().default("received"),
  paymentMethod: paymentMethodEnum("payment_method").notNull().default("stripe"),
  subtotalCents: integer("subtotal_cents").notNull(),
  discountCents: integer("discount_cents").notNull().default(0),
  deliveryCents: integer("delivery_cents").notNull().default(0),
  taxCents: integer("tax_cents").notNull().default(0),
  totalCents: integer("total_cents").notNull(),
  deliveryDate: timestamp("delivery_date", { withTimezone: true }),
  shippingAddress: jsonb("shipping_address").$type<Record<string, string>>().notNull(),
  customization: jsonb("customization").$type<Record<string, unknown>>().notNull().default({}),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").references(() => products.id, { onDelete: "set null" }),
  productName: text("product_name").notNull(),
  productSlug: text("product_slug").notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitPriceCents: integer("unit_price_cents").notNull(),
  imageUrl: text("image_url").notNull(),
  customization: jsonb("customization").$type<Record<string, unknown>>().notNull().default({}),
});

export const orderEvents = pgTable("order_events", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  status: orderStatusEnum("status").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const wishlistItems = pgTable(
  "wishlist_items",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    uniqueWishlist: uniqueIndex("wishlist_user_product_idx").on(table.userId, table.productId),
  }),
);

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    source: text("source").notNull().default("website"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    newsletterIdx: uniqueIndex("newsletter_email_idx").on(table.email),
  }),
);

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
