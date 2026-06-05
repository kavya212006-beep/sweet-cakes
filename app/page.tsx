import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  brand,
  categories,
  formatCurrency,
  getBestSellers,
  products,
  reasons,
  testimonials,
} from "@/lib/data";

export const metadata = {
  title: "Sweet Delights | Luxury Cake Atelier",
};

const featured = products.filter((product) => product.featured).slice(0, 4);
const bestSellers = getBestSellers(4);

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[color:var(--card)] px-6 py-10 shadow-[0_20px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-10 sm:py-14 lg:px-12 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.2),transparent_30%)]" />
        <div className="relative grid gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
              <span className="text-rose-200">✦</span>
              Luxury bakery brand serving handcrafted celebration cakes
            </div>
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Sweet Delights</p>
              <h1 className="max-w-3xl text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.92] text-white">
                Cakes that feel like a celebration before the first slice.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                Explore couture cake design, premium ingredients, same-day delivery, and bespoke customization made for weddings, birthdays, and elegant gifting.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/catalog" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">
                Browse cakes
              </Link>
              <Link href="/customize" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                Customize cake
              </Link>
              <Link href="/track-order" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                Track order
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["1,200+", "Celebration cakes delivered"],
                ["4.9/5", "Average customer rating"],
                ["Same day", "Delivery in select zones"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80 backdrop-blur-xl">
                  <p className="text-3xl font-semibold text-white">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-rose-400/25 blur-3xl" />
            <div className="absolute -right-10 bottom-4 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 p-3 shadow-premium animate-float">
                <img src={products[1].primaryImage} alt={products[1].name} className="h-[24rem] w-full rounded-[1.5rem] object-cover" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">Featured today</p>
                  <p className="mt-2 text-xl font-semibold text-white">{products[4].name}</p>
                  <p className="mt-3 text-sm text-white/65">{products[4].availability}</p>
                  <p className="mt-4 text-2xl font-semibold text-white">{formatCurrency(products[4].priceCents)}</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">Signature offer</p>
                  <p className="mt-2 text-xl font-semibold text-white">10% off first order</p>
                  <p className="mt-3 text-sm text-white/65">Use code <span className="text-white">SWEET10</span> at checkout.</p>
                  <Link href="/catalog" className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">Shop now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {featured.map((product) => (
          <Link key={product.slug} href={`/product/${product.slug}`} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[color:var(--card)] backdrop-blur-xl transition duration-300 hover:-translate-y-1">
            <div className="relative aspect-[4/4.6] overflow-hidden">
              <img src={product.primaryImage} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-950">{product.badge}</span>
            </div>
            <div className="space-y-3 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-200/70">Featured cake</p>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="line-clamp-2 text-sm leading-6 text-white/65">{product.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{formatCurrency(product.priceCents)}</p>
                <p className="text-sm text-white/55">⭐ {product.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.92fr,1.08fr]">
        <div className="rounded-[2.25rem] border border-white/10 bg-[color:var(--card)] p-8 text-white backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Why choose us</p>
          <h2 className="mt-3 text-4xl font-semibold">Premium cakes with a couture hospitality experience.</h2>
          <p className="mt-4 text-sm leading-7 text-white/65">
            From the first scroll to the final delivery update, Sweet Delights is designed to feel polished, intuitive, and beautifully indulgent.
          </p>
          <div className="mt-8 grid gap-4">
            {reasons.map((reason) => (
              <div key={reason.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="font-medium text-white">{reason.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/65">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {bestSellers.map((product) => (
            <Link key={product.slug} href={`/product/${product.slug}`} className="rounded-[2rem] border border-white/10 bg-[color:var(--card)] p-4 text-white backdrop-blur-xl transition hover:-translate-y-1">
              <img src={product.primaryImage} alt={product.name} className="h-48 w-full rounded-[1.5rem] object-cover" />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">Best seller</p>
                  <h3 className="mt-1 text-xl font-semibold">{product.name}</h3>
                </div>
                <p className="text-lg font-semibold">{formatCurrency(product.priceCents)}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/65">{product.availability}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[2.25rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Cake categories</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">Explore our luxury cake collections.</h2>
          </div>
          <Link href="/catalog" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">Open catalog</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.slug} href={`/catalog?category=${category.slug}`} className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5 text-white transition hover:bg-white/10">
              <p className="text-2xl">{category.icon}</p>
              <p className="mt-4 font-semibold">{category.name}</p>
              <p className="mt-2 text-sm text-white/55">{category.accent}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-5 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-white/10 bg-[color:var(--card)] p-7 text-white backdrop-blur-xl lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Special offers</p>
          <h2 className="mt-3 text-4xl font-semibold">Seasonal luxury, curated for your next celebration.</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <OfferCard title="First order welcome" text="Use SWEET10 and enjoy 10% off your first order." />
            <OfferCard title="Corporate gifting" text="Luxury cupcakes and pastry boxes for teams and events." />
            <OfferCard title="Wedding planning" text="Venue coordination and bespoke multi-tier cake design." />
            <OfferCard title="Same-day premium delivery" text="Order before the cutoff for fast local delivery." />
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 text-white backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Newsletter</p>
          <h2 className="mt-3 text-3xl font-semibold">Join the inner circle.</h2>
          <p className="mt-3 text-sm leading-6 text-white/65">Get menu launches, limited drops, and birthday reminders from the atelier.</p>
          <div className="mt-6"><NewsletterForm /></div>
        </div>
      </section>

      <section className="mt-16 rounded-[2.25rem] border border-white/10 bg-[color:var(--card)] p-8 text-white backdrop-blur-xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Testimonials</p>
            <h2 className="mt-3 text-4xl font-semibold">Loved by couples, families, and premium brands.</h2>
          </div>
          <Link href="/about" className="hidden rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white lg:inline-flex">Meet our team</Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-amber-200">{"★".repeat(testimonial.rating)}</p>
              <p className="mt-4 text-sm leading-7 text-white/70">“{testimonial.quote}”</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-sm font-semibold text-white">{testimonial.name.slice(0, 2)}</div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          products[0].gallery[0],
          products[2].gallery[0],
          products[7].gallery[0],
          products[9].gallery[0],
        ].map((image, index) => (
          <div key={image} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl">
            <img src={image} alt={`Sweet Delights Instagram ${index + 1}`} className="h-72 w-full object-cover transition duration-700 hover:scale-105" />
          </div>
        ))}
      </section>
    </div>
  );
}

function OfferCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
      <p className="font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
    </div>
  );
}
