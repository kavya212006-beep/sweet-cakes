"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products as defaultProducts, formatCurrency, type Product } from "@/lib/data";
import { useCart } from "./site-shell";

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
  { id: "newest", label: "Newest" },
] as const;

export function CatalogClient({ products = defaultProducts, initialCategory = "All" }: { products?: Product[]; initialCategory?: string }) {
  const { addItem } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<(typeof sortOptions)[number]["id"]>("featured");
  const [page, setPage] = useState(1);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("sweet-delights-wishlist");
      if (stored) setWishlist(JSON.parse(stored));
    } catch {
      setWishlist([]);
    }
  }, []);

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filtered = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesQuery =
        !lowered ||
        [product.name, product.category, product.description, ...product.tags]
          .join(" ")
          .toLowerCase()
          .includes(lowered);
      const matchesCategory = category === "All" || product.category === category;
      return matchesQuery && matchesCategory;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.priceCents - b.priceCents;
        case "price-desc":
          return b.priceCents - a.priceCents;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        case "featured":
        default:
          return Number(b.featured) - Number(a.featured) || Number(b.bestseller) - Number(a.bestseller);
      }
    });

    return result;
  }, [category, products, query, sort]);

  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const currentProducts = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => {
    setPage(1);
  }, [category, query, sort]);

  function toggleWishlist(slug: string) {
    setWishlist((current) => {
      const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
      window.localStorage.setItem("sweet-delights-wishlist", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:grid-cols-[1.4fr,0.8fr,0.8fr]">
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/75">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cakes, flavors, occasions..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
          />
        </label>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as (typeof sortOptions)[number]["id"])}
          className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              category === item
                ? "bg-white text-slate-950 shadow-lg"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {currentProducts.map((product) => (
          <article
            key={product.slug}
            className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[color:var(--card)] shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.25)]"
          >
            <div className="relative aspect-[4/4.2] overflow-hidden">
              <img
                src={product.primaryImage}
                alt={product.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-950">{product.badge}</span>
                {product.bestseller ? (
                  <span className="rounded-full bg-rose-400 px-3 py-1 text-xs font-semibold text-slate-950">Popular</span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => toggleWishlist(product.slug)}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/25 text-white backdrop-blur-md transition hover:bg-black/40"
                aria-label="Toggle wishlist"
              >
                {wishlist.includes(product.slug) ? "♥" : "♡"}
              </button>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-rose-200/70">{product.category}</p>
                  <span className="text-xs text-white/55">{product.availability}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">{product.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">{product.description}</p>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl font-semibold text-white">{formatCurrency(product.priceCents)}</p>
                  {product.compareAtCents ? (
                    <p className="text-xs text-white/45 line-through">{formatCurrency(product.compareAtCents)}</p>
                  ) : null}
                </div>
                <div className="text-right text-xs text-white/60">
                  <p>⭐ {product.rating}/5</p>
                  <p>{product.reviewCount} reviews</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setQuickView(product)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Quick view
                </button>
                <button
                  type="button"
                  onClick={() => addItem({ slug: product.slug, name: product.name, category: product.category, image: product.primaryImage, priceCents: product.priceCents, options: { size: product.sizes[0] } })}
                  className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  Add to cart
                </button>
              </div>

              <Link href={`/product/${product.slug}`} className="block text-center text-sm text-rose-200/90 transition hover:text-white">
                View full details →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-10 text-center text-white/70 backdrop-blur-xl">
          No cakes matched your search. Try another category or flavor.
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/65 backdrop-blur-xl">
        <p>
          Showing <span className="text-white">{currentProducts.length}</span> of <span className="text-white">{filtered.length}</span> cakes
        </p>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition disabled:opacity-40"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(current - 1, 1))}
          >
            Prev
          </button>
          <span className="rounded-full bg-white px-4 py-2 text-slate-950">
            {page} / {totalPages}
          </span>
          <button
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition disabled:opacity-40"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => Math.min(current + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>

      {quickView ? (
        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} onAdd={() => addItem({ slug: quickView.slug, name: quickView.name, category: quickView.category, image: quickView.primaryImage, priceCents: quickView.priceCents, options: { size: quickView.sizes[0] } })} />
      ) : null}
    </div>
  );
}

function QuickViewModal({
  product,
  onClose,
  onAdd,
}: {
  product: Product;
  onClose: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_24px_100px_rgba(0,0,0,0.4)] md:grid-cols-[1fr,1fr]">
        <div className="relative min-h-[18rem]">
          <img src={product.primaryImage} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-5 p-6 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-rose-200/70">Quick view</p>
              <h3 className="mt-2 text-2xl font-semibold">{product.name}</h3>
            </div>
            <button type="button" onClick={onClose} className="text-white/55 transition hover:text-white" aria-label="Close quick view">
              ✕
            </button>
          </div>
          <p className="text-sm leading-6 text-white/70">{product.description}</p>
          <div className="grid grid-cols-2 gap-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-white">Price</p>
              <p>{formatCurrency(product.priceCents)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-white">Rating</p>
              <p>⭐ {product.rating}/5</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-white">Availability</p>
              <p>{product.availability}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-white">Delivery</p>
              <p>{product.deliveryText}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href={`/product/${product.slug}`} className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10">
              Full details
            </Link>
            <button type="button" onClick={onAdd} className="flex-1 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
