"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  brand,
  dashboardTabs,
  formatCurrency,
  orderStages,
  paymentMethods,
  testimonials,
  type Product,
  adminTabs,
  products,
} from "@/lib/data";
import {
  calculateDelivery,
  calculateDiscount,
  calculateOrderTotal,
  calculateTax,
  calculateCartSubtotal,
  formatDate,
  getInitials,
} from "@/lib/utils";
import { useCart } from "./site-shell";

export function ProductDetailClient({ product, recommendations }: { product: Product; recommendations: Product[] }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.primaryImage);
  const [reviewName, setReviewName] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [status, setStatus] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    const viewed = JSON.parse(window.localStorage.getItem("sweet-delights-recently-viewed") ?? "[]") as string[];
    const next = [product.slug, ...viewed.filter((item) => item !== product.slug)].slice(0, 8);
    window.localStorage.setItem("sweet-delights-recently-viewed", JSON.stringify(next));
    setWishlist(JSON.parse(window.localStorage.getItem("sweet-delights-wishlist") ?? "[]").includes(product.slug));
  }, [product.slug]);

  function toggleWishlist() {
    const stored = JSON.parse(window.localStorage.getItem("sweet-delights-wishlist") ?? "[]") as string[];
    const next = stored.includes(product.slug) ? stored.filter((item) => item !== product.slug) : [...stored, product.slug];
    window.localStorage.setItem("sweet-delights-wishlist", JSON.stringify(next));
    setWishlist(next.includes(product.slug));
  }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Submitting your review...");

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productSlug: product.slug,
        userName: reviewName,
        title: reviewTitle,
        body: reviewBody,
        rating: reviewRating,
      }),
    });

    if (response.ok) {
      setStatus("Thanks — your review has been submitted for approval.");
      setReviewName("");
      setReviewTitle("");
      setReviewBody("");
      setReviewRating(5);
    } else {
      setStatus("Unable to submit review right now. Please try again.");
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
      <section className="space-y-5">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <img src={selectedImage} alt={product.name} className="h-[30rem] w-full object-cover" />
            <button
              type="button"
              onClick={toggleWishlist}
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-black/50"
            >
              {wishlist ? "♥ Saved" : "♡ Wishlist"}
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.gallery.map((image) => (
              <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden rounded-2xl border transition ${
                  selectedImage === image ? "border-white" : "border-white/10 opacity-80"
                }`}
              >
                <img src={image} alt={product.name} className="h-28 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-3">
          <StatCard label="Availability" value={product.availability} />
          <StatCard label="Delivery" value={product.deliveryText} />
          <StatCard label="Rating" value={`⭐ ${product.rating}/5`} />
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-2">
            <InfoBlock title="Description" value={product.description} />
            <InfoBlock title="Flavors" value={product.flavors.join(" • ")} />
            <InfoBlock title="Sizes" value={product.sizes.join(" • ")} />
            <InfoBlock title="Weight options" value={product.weightOptions.join(" • ")} />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">Customer reviews</h3>
          <div className="mt-5 grid gap-4">
            {testimonials.map((review) => (
              <article key={review.name} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-white/75">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-xs uppercase tracking-[0.25em] text-rose-200/70">{review.role}</p>
                  </div>
                  <p className="text-sm text-amber-200">{"★".repeat(review.rating)}</p>
                </div>
                <p className="mt-3 text-sm leading-6">{review.quote}</p>
              </article>
            ))}
          </div>

          <form onSubmit={submitReview} className="mt-6 grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">Leave a review</p>
            <div className="grid gap-3 md:grid-cols-2">
              <input value={reviewName} onChange={(e) => setReviewName(e.target.value)} required placeholder="Your name" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
              <input value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} required placeholder="Review title" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
            </div>
            <textarea value={reviewBody} onChange={(e) => setReviewBody(e.target.value)} required rows={4} placeholder="Tell us what you loved..." className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-sm text-white/70">Rating</label>
              <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} className="rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-white outline-none">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} stars
                  </option>
                ))}
              </select>
              <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Submit review</button>
              {status ? <span className="text-sm text-white/70">{status}</span> : null}
            </div>
          </form>
        </div>
      </section>

      <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[2rem] border border-white/10 bg-[color:var(--card)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-200/70">{product.category}</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{product.name}</h1>
          <p className="mt-3 text-sm leading-6 text-white/70">{product.description}</p>
          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-semibold text-white">{formatCurrency(product.priceCents)}</p>
              {product.compareAtCents ? <p className="text-sm text-white/45 line-through">{formatCurrency(product.compareAtCents)}</p> : null}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right text-sm text-white/70">
              <p>{product.stock} pieces left</p>
              <p>{product.reviewCount} verified reviews</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => addItem({ slug: product.slug, name: product.name, category: product.category, image: product.primaryImage, priceCents: product.priceCents, options: { size: product.sizes[0] } })}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => {
                addItem({ slug: product.slug, name: product.name, category: product.category, image: product.primaryImage, priceCents: product.priceCents, options: { size: product.sizes[0] } });
                router.push("/checkout");
              }}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Buy now
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white">Recommended for you</h3>
          <div className="mt-4 grid gap-3">
            {recommendations.map((item) => (
              <Link key={item.slug} href={`/product/${item.slug}`} className="flex gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3 transition hover:bg-white/5">
                <img src={item.primaryImage} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white">{item.name}</p>
                  <p className="text-xs text-white/55">{item.category}</p>
                  <p className="mt-1 text-sm text-white/80">{formatCurrency(item.priceCents)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export function CustomizerClient({ initialProduct }: { initialProduct: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState<Product>(initialProduct);
  const [flavor, setFlavor] = useState(initialProduct.flavors[0]);
  const [size, setSize] = useState(initialProduct.sizes[0]);
  const [weight, setWeight] = useState(initialProduct.weightOptions[0]);
  const [message, setMessage] = useState("Happy Celebration");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("18:00");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [customImageName, setCustomImageName] = useState("");

  const price = useMemo(() => {
    const sizeMultiplier = size.includes("10") ? 1.28 : size.includes("8") ? 1.12 : 1;
    const weightMultiplier = weight.includes("2") ? 1.18 : weight.includes("3") ? 1.34 : 1;
    const messageCost = message.trim() ? 1500 : 0;
    const designCost = imagePreview ? 5500 : 0;
    return Math.round(product.priceCents * sizeMultiplier * weightMultiplier + messageCost + designCost);
  }, [imagePreview, message, product.priceCents, size, weight]);

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setCustomImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
  }

  function addCustomizedCake() {
    addItem({
      slug: `${product.slug}-${flavor}-${size}-${weight}`,
      name: `${product.name} • ${flavor}`,
      category: product.category,
      image: imagePreview ?? product.primaryImage,
      priceCents: price,
      quantity: 1,
      options: { flavor, size, weight, deliveryDate, deliveryTime, image: customImageName || "None" },
      note: message,
    });
    router.push("/cart");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,0.9fr]">
      <section className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-white/75">
            Cake style
            <select value={product.slug} onChange={(event) => setProduct(products.find((cake) => cake.slug === event.target.value) ?? initialProduct)} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none">
              {products.map((cake) => (
                <option key={cake.slug} value={cake.slug}>{cake.name}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-white/75">
            Flavor
            <select value={flavor} onChange={(event) => setFlavor(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none">
              {product.flavors.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-white/75">
            Size
            <select value={size} onChange={(event) => setSize(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none">
              {product.sizes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-white/75">
            Weight
            <select value={weight} onChange={(event) => setWeight(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none">
              {product.weightOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-white/75 md:col-span-2">
            Custom message
            <input value={message} onChange={(event) => setMessage(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" placeholder="Happy Anniversary, Aanya!" />
          </label>
          <label className="grid gap-2 text-sm text-white/75 md:col-span-2">
            Upload cake design inspiration
            <input type="file" accept="image/*" onChange={handleUpload} className="rounded-2xl border border-dashed border-white/10 bg-slate-950/60 px-4 py-3 text-white file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-slate-950" />
          </label>
          <label className="grid gap-2 text-sm text-white/75">
            Delivery date
            <input type="date" value={deliveryDate} onChange={(event) => setDeliveryDate(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
          </label>
          <label className="grid gap-2 text-sm text-white/75">
            Delivery time
            <input type="time" value={deliveryTime} onChange={(event) => setDeliveryTime(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
          </label>
        </div>

        <div className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5 md:grid-cols-3">
          <StatCard label="Base price" value={formatCurrency(product.priceCents)} />
          <StatCard label="Live final price" value={formatCurrency(price)} />
          <StatCard label="Preview" value={imagePreview ? "Custom image added" : "No upload yet"} />
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={addCustomizedCake} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950">Add customized cake</button>
          <button onClick={() => router.push("/checkout")} className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white">Proceed to checkout</button>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[color:var(--card)] backdrop-blur-xl">
          <img src={imagePreview ?? product.primaryImage} alt={product.name} className="h-80 w-full object-cover" />
          <div className="space-y-3 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-rose-200/70">Customization preview</p>
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-sm text-white/65">{message}</p>
            <div className="grid gap-3 text-sm text-white/70 md:grid-cols-2">
              <PreviewLabel label="Flavor" value={flavor} />
              <PreviewLabel label="Size" value={size} />
              <PreviewLabel label="Weight" value={weight} />
              <PreviewLabel label="Delivery" value={deliveryDate ? `${deliveryDate} • ${deliveryTime}` : "Select a slot"} />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white backdrop-blur-xl">
          <h3 className="text-lg font-semibold">Why customers love customization</h3>
          <ul className="mt-4 grid gap-3 text-sm text-white/70">
            <li>• Transparent live pricing</li>
            <li>• Elegant celebration messaging</li>
            <li>• Image-based design requests</li>
            <li>• Convenient delivery scheduling</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export function CartClient() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountCents, setDiscountCents] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const subtotal = calculateCartSubtotal(items);
  const delivery = calculateDelivery(subtotal);
  const tax = calculateTax(subtotal);
  const total = calculateOrderTotal(subtotal, delivery, tax, discountCents);

  async function applyCoupon() {
    if (!couponCode.trim()) return;
    const response = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode, subtotalCents: subtotal }),
    });
    const data = (await response.json()) as { valid?: boolean; discountCents?: number; message?: string };
    if (data.valid) {
      setDiscountCents(data.discountCents ?? 0);
      setCouponMessage(data.message ?? "Coupon applied successfully.");
    } else {
      setDiscountCents(0);
      setCouponMessage(data.message ?? "Coupon not valid.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
      <section className="space-y-4">
        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-white/70 backdrop-blur-xl">
            Your cart is empty. Browse the catalog to start creating a celebration box.
          </div>
        ) : (
          items.map((item) => (
            <article key={item.key} className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:grid-cols-[110px,1fr,auto]">
              <img src={item.image} alt={item.name} className="h-28 w-28 rounded-2xl object-cover" />
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-rose-200/70">{item.category}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-sm text-white/65">{item.note ?? "Premium cake with custom styling."}</p>
                {item.options ? <p className="mt-2 text-xs text-white/55">{Object.entries(item.options).map(([key, value]) => `${key}: ${value}`).join(" • ")}</p> : null}
              </div>
              <div className="flex flex-col items-end gap-3">
                <p className="text-lg font-semibold text-white">{formatCurrency(item.priceCents * item.quantity)}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white">−</button>
                  <span className="min-w-8 text-center text-white">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white">+</button>
                </div>
                <button onClick={() => removeItem(item.key)} className="text-sm text-white/55 transition hover:text-rose-200">Remove</button>
              </div>
            </article>
          ))
        )}
      </section>

      <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[2rem] border border-white/10 bg-[color:var(--card)] p-6 text-white backdrop-blur-xl">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm text-white/72">
            <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
            <SummaryRow label="Delivery" value={formatCurrency(delivery)} />
            <SummaryRow label="Tax" value={formatCurrency(tax)} />
            <SummaryRow label="Discount" value={`- ${formatCurrency(discountCents)}`} />
            <div className="border-t border-white/10 pt-3">
              <SummaryRow label="Total" value={formatCurrency(total)} strong />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white backdrop-blur-xl">
          <label className="grid gap-2 text-sm text-white/70">
            Coupon code
            <div className="flex gap-2">
              <input value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="SWEET10" className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
              <button onClick={applyCoupon} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Apply</button>
            </div>
          </label>
          {couponMessage ? <p className="mt-3 text-sm text-rose-100/80">{couponMessage}</p> : null}
          <div className="mt-5 flex gap-3">
            <Link href="/checkout" className="flex-1 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950">Checkout</Link>
            <button onClick={clearCart} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white">Clear</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function CheckoutClient() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400050",
    paymentMethod: "stripe",
    notes: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const subtotal = calculateCartSubtotal(items);
  const delivery = calculateDelivery(subtotal);
  const tax = calculateTax(subtotal);
  const total = calculateOrderTotal(subtotal, delivery, tax, 0);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Placing your secure order...");

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        shippingAddress: {
          line1: form.line1,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: "India",
        },
        paymentMethod: form.paymentMethod,
        notes: form.notes,
        items,
        subtotalCents: subtotal,
        deliveryCents: delivery,
        taxCents: tax,
        totalCents: total,
      }),
    });

    const data = (await response.json()) as { orderNumber?: string; message?: string };
    if (response.ok && data.orderNumber) {
      clearCart();
      setStatus(`Order confirmed: ${data.orderNumber}`);
      router.push(`/track-order?order=${data.orderNumber}`);
      return;
    }

    setStatus(data.message ?? "We could not place the order just now.");
  }

  return (
    <form onSubmit={submitOrder} className="grid gap-8 lg:grid-cols-[1fr,0.9fr]">
      <section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-white">Billing & shipping details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Full name" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" placeholder="Email" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required placeholder="Phone number" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
          <input value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} required placeholder="Postal code" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
          <input value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} required placeholder="Street address" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none md:col-span-2" />
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required placeholder="City" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
          <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} required placeholder="State" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5">
          <h3 className="text-lg font-semibold text-white">Payment method</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {paymentMethods.map((method) => (
              <label key={method.id} className={`cursor-pointer rounded-2xl border p-4 transition ${form.paymentMethod === method.id ? "border-white bg-white/10" : "border-white/10 bg-white/5"}`}>
                <input type="radio" name="paymentMethod" value={method.id} checked={form.paymentMethod === method.id} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="sr-only" />
                <p className="font-medium text-white">{method.label}</p>
                <p className="mt-1 text-sm text-white/60">{method.description}</p>
              </label>
            ))}
          </div>
        </div>

        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={4} placeholder="Order notes, allergen concerns, delivery instructions..." className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
      </section>

      <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[2rem] border border-white/10 bg-[color:var(--card)] p-6 text-white backdrop-blur-xl">
          <h3 className="text-xl font-semibold">Secure order review</h3>
          <div className="mt-4 space-y-3 text-sm text-white/72">
            <SummaryRow label="Items" value={`${items.length} cake line item(s)`} />
            <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
            <SummaryRow label="Delivery" value={formatCurrency(delivery)} />
            <SummaryRow label="Tax" value={formatCurrency(tax)} />
            <div className="border-t border-white/10 pt-3">
              <SummaryRow label="Total due" value={formatCurrency(total)} strong />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.25em] text-white/45">Secure checkout</p>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">SSL protected</span>
          </div>
          <div className="mt-4 flex items-center gap-3 text-sm text-white/65">
            <span className="text-lg">🔒</span>
            <p>Payment integrations are ready for Razorpay and Stripe.</p>
          </div>
          <button className="mt-5 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Place order</button>
          {status ? <p className="mt-3 text-sm text-rose-100/80">{status}</p> : null}
        </div>
      </aside>
    </form>
  );
}

export function TrackOrderClient({ initialOrderNumber }: { initialOrderNumber?: string }) {
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber ?? "");
  const [status, setStatus] = useState<string | null>(null);
  const [order, setOrder] = useState<{
    orderNumber: string;
    status: string;
    total: string;
    createdAt: string;
    events: Array<{ status: string; message: string; createdAt: string }>;
  } | null>(null);

  async function lookupOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Tracking your order...");
    const response = await fetch(`/api/orders/${encodeURIComponent(orderNumber)}`);
    const data = (await response.json()) as typeof order;
    if (response.ok && data) {
      setOrder(data);
      setStatus(null);
    } else {
      setOrder(null);
      setStatus("We could not find that order number. Please double-check it.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr,1.15fr]">
      <form onSubmit={lookupOrder} className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-white">Track your cake order</h2>
        <p className="text-sm leading-6 text-white/65">Enter your order number to see live status updates from received to delivered.</p>
        <input value={orderNumber} onChange={(e) => setOrderNumber(e.target.value.toUpperCase())} required placeholder="SD-2026-0001" className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
        <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Track order</button>
        {status ? <p className="text-sm text-rose-100/80">{status}</p> : null}
      </form>

      <section className="space-y-5 rounded-[2rem] border border-white/10 bg-[color:var(--card)] p-6 text-white backdrop-blur-xl">
        {order ? (
          <>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-rose-200/70">Order status</p>
                <h3 className="mt-2 text-2xl font-semibold">{order.orderNumber}</h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right text-sm">
                <p className="text-white/60">Total</p>
                <p className="font-semibold text-white">{order.total}</p>
              </div>
            </div>
            <p className="text-sm text-white/65">Placed on {formatDate(order.createdAt)}</p>
            <div className="grid gap-3">
              {orderStages.map((stage, index) => {
                const activeIndex = orderStages.findIndex((item) => item.key === order.status);
                const active = index <= activeIndex;
                return (
                  <div key={stage.key} className={`rounded-2xl border p-4 ${active ? "border-white/15 bg-white/10" : "border-white/10 bg-white/5"}`}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-white">{stage.label}</p>
                        <p className="text-sm text-white/60">{stage.description}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs ${active ? "bg-emerald-400/20 text-emerald-200" : "bg-white/5 text-white/40"}`}>
                        {active ? "Complete" : "Pending"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              Latest update: {order.events[0]?.message ?? "We’re preparing your order."}
            </div>
          </>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/5 p-10 text-center text-white/60">
            Order tracking details will appear here once you search.
          </div>
        )}
      </section>
    </div>
  );
}

export function DashboardClient({ initialUser }: { initialUser?: { id: number; name: string; email: string; role: string } | null }) {
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "profile">(initialUser ? "profile" : "login");
  const [user, setUser] = useState(initialUser ?? null);
  const [status, setStatus] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [addresses, setAddresses] = useState([
    { label: "Home", line1: "23 Palm Residency, Bandra", city: "Mumbai" },
    { label: "Office", line1: "The Crescent, BKC", city: "Mumbai" },
  ]);
  const wishlist = typeof window === "undefined" ? [] : (JSON.parse(window.localStorage.getItem("sweet-delights-wishlist") ?? "[]") as string[]);
  const recent = typeof window === "undefined" ? [] : (JSON.parse(window.localStorage.getItem("sweet-delights-recently-viewed") ?? "[]") as string[]);

  useEffect(() => {
    async function loadSession() {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = (await response.json()) as { user?: { id: number; name: string; email: string; role: string } };
        if (data.user) {
          setUser(data.user);
          setMode("profile");
        }
      }
    }
    loadSession();
  }, []);

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Working on it...");
    const route = mode === "signup" ? "/api/auth/signup" : mode === "forgot" ? "/api/auth/forgot-password" : "/api/auth/login";
    const response = await fetch(route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await response.json()) as { user?: { id: number; name: string; email: string; role: string }; message?: string };

    if (response.ok && data.user) {
      setUser(data.user);
      setMode("profile");
      setStatus(null);
      return;
    }

    setStatus(data.message ?? "Please try again.");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr,1.15fr]">
      <section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex flex-wrap gap-2">
          {dashboardTabs.map((tab) => (
            <button key={tab} onClick={() => setMode(tab === "Security" ? "forgot" : user ? "profile" : tab === "Overview" ? "login" : mode)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10">
              {tab}
            </button>
          ))}
        </div>

        {user ? (
          <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5 text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-rose-200/70">Welcome back</p>
            <h2 className="text-3xl font-semibold">{user.name}</h2>
            <p className="text-sm text-white/65">{user.email}</p>
            <div className="grid gap-3 md:grid-cols-3">
              <SmallMetric label="Orders" value="14" />
              <SmallMetric label="Wishlist" value={`${wishlist.length} items`} />
              <SmallMetric label="Recent" value={`${recent.length} cakes`} />
            </div>
          </div>
        ) : (
          <form onSubmit={submitAuth} className="space-y-4 rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5 text-white">
            <div className="flex flex-wrap gap-2">
              {(["login", "signup", "forgot"] as const).map((item) => (
                <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full px-4 py-2 text-sm ${mode === item ? "bg-white text-slate-950" : "border border-white/10 bg-white/5 text-white/70"}`}>
                  {item === "login" ? "Login" : item === "signup" ? "Signup" : "Forgot password"}
                </button>
              ))}
            </div>
            {mode === "signup" ? <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" /> : null}
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
            {mode !== "forgot" ? <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required type="password" placeholder="Password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" /> : null}
            {mode === "signup" ? <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" /> : null}
            <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">{mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Login"}</button>
            {status ? <p className="text-sm text-rose-100/80">{status}</p> : null}
          </form>
        )}
      </section>

      <section className="space-y-5 rounded-[2rem] border border-white/10 bg-[color:var(--card)] p-6 text-white backdrop-blur-xl">
        {user ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <Panel title="Order history" description="Four current orders plus delivery milestones." />
              <Panel title="Saved addresses" description={`${addresses.length} delivery locations saved securely.`} />
              <Panel title="Wishlist" description={`${wishlist.map((slug) => products.find((product) => product.slug === slug)?.name ?? slug).slice(0, 3).join(", ") || "No items yet"}`} />
              <Panel title="Profile management" description="Edit contact details, set defaults, and manage notifications." />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <p className="font-semibold text-white">Saved addresses</p>
              <div className="mt-3 grid gap-3">
                {addresses.map((address) => (
                  <div key={address.label} className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                    <p className="font-medium text-white">{address.label}</p>
                    <p>{address.line1}</p>
                    <p>{address.city}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-10 text-white/65">
            Sign in to view order history, addresses, wishlist, and profile controls.
          </div>
        )}
      </section>
    </div>
  );
}

export function ContactClient() {
  const [status, setStatus] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending your message...");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await response.json()) as { message?: string };
    setStatus(data.message ?? (response.ok ? "Thanks! We’ll get back to you soon." : "Please try again."));
    if (response.ok) {
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,0.85fr]">
      <form onSubmit={submit} className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-white">Contact Sweet Delights</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Name" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" placeholder="Email" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
          <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required placeholder="Subject" className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
        </div>
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} placeholder="Tell us about your event or cake request..." className="w-full rounded-[1.5rem] border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none" />
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Send enquiry</button>
          <a href={`https://wa.me/${brand.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white">WhatsApp us</a>
          {status ? <span className="text-sm text-rose-100/80">{status}</span> : null}
        </div>
      </form>

      <aside className="space-y-5 rounded-[2rem] border border-white/10 bg-[color:var(--card)] p-6 text-white backdrop-blur-xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-200/70">Visit us</p>
          <p className="mt-2 text-lg font-semibold">{brand.address}</p>
          <p className="mt-2 text-sm text-white/65">Business hours: Mon-Sun, 9:00 AM – 10:00 PM</p>
        </div>
        <iframe title="Sweet Delights map" src={brand.mapUrl} className="h-72 w-full rounded-[1.5rem] border border-white/10 bg-slate-950/50" />
        <div className="grid gap-3 md:grid-cols-2">
          <Panel title="Social" description="Instagram, Pinterest, WhatsApp, and email support." />
          <Panel title="Response time" description="We reply to event enquiries within 30 minutes during working hours." />
        </div>
      </aside>
    </div>
  );
}

export function AdminDashboardClient({ stats }: { stats: { revenue: number; orders: number; customers: number; reviews: number } }) {
  const [tab, setTab] = useState<(typeof adminTabs)[number]>("Analytics");
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <AdminMetric label="Revenue" value={formatCurrency(stats.revenue)} />
        <AdminMetric label="Orders" value={stats.orders.toString()} />
        <AdminMetric label="Customers" value={stats.customers.toString()} />
        <AdminMetric label="Reviews" value={stats.reviews.toString()} />
      </div>

      <div className="flex flex-wrap gap-2">
        {adminTabs.map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-2 text-sm ${tab === item ? "bg-white text-slate-950" : "border border-white/10 bg-white/5 text-white/70"}`}>
            {item}
          </button>
        ))}
      </div>

      <section className="rounded-[2rem] border border-white/10 bg-[color:var(--card)] p-6 text-white backdrop-blur-xl">
        {tab === "Analytics" ? (
          <div className="grid gap-4 md:grid-cols-3">
            <Panel title="Sales growth" description="+34% this month compared to the previous month." />
            <Panel title="Peak category" description="Wedding and designer cakes drive the highest order value." />
            <Panel title="Customer satisfaction" description="4.9 average rating across 500+ premium orders." />
          </div>
        ) : null}
        {tab === "Products" ? (
          <div className="space-y-3">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full text-left text-sm text-white/75">
                <thead className="bg-white/5 text-white">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.slug} className="border-t border-white/10">
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3">{formatCurrency(product.priceCents)}</td>
                      <td className="px-4 py-3">{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        {tab === "Orders" ? <Panel title="Order pipeline" description="Received → preparing → baking → out for delivery → delivered." /> : null}
        {tab === "Customers" ? <Panel title="Customer management" description="VIP customers, loyalty tier updates, and support notes." /> : null}
        {tab === "Coupons" ? <Panel title="Coupon manager" description="Create seasonal promos, fixed discounts, and minimum spend rules." /> : null}
        {tab === "Inventory" ? <Panel title="Inventory control" description="Low-stock alerts, prep capacity, and fulfillment flags." /> : null}
        {tab === "Reviews" ? <Panel title="Review moderation" description="Approve new reviews and showcase the highest-rated cakes." /> : null}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</p>
      <p className="mt-2 text-sm text-white">{value}</p>
    </div>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-white">
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/75">{value}</p>
    </div>
  );
}

function PreviewLabel({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</p>
      <p className="mt-2 text-sm text-white">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "text-white" : "text-white/68"}>{label}</span>
      <span className={strong ? "text-lg font-semibold text-white" : "text-white"}>{value}</span>
    </div>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</p>
      <p className="mt-2 text-sm text-white">{value}</p>
    </div>
  );
}

function Panel({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="font-medium text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/65">{description}</p>
    </div>
  );
}

function AdminMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
