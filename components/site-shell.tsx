"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { brand } from "@/lib/data";
import { cn } from "@/lib/utils";
import { NewsletterForm } from "./newsletter-form";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  priceCents: number;
  quantity: number;
  note?: string;
  options?: Record<string, string>;
};

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addItem: (item: Omit<CartItem, "quantity" | "key"> & { quantity?: number; key?: string }) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function getStoredCart() {
  if (typeof window === "undefined") return [] as CartItem[];
  try {
    const raw = window.localStorage.getItem("sweet-delights-cart");
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [] as CartItem[];
  }
}

function persistCart(items: CartItem[]) {
  window.localStorage.setItem("sweet-delights-cart", JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getStoredCart());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    persistCart(items);
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

    return {
      items,
      cartCount,
      cartSubtotal,
      setItems,
      addItem: (item) => {
        const quantity = item.quantity ?? 1;
        setItems((current) => {
          const nextKey = item.key ?? `${item.slug}:${JSON.stringify(item.options ?? {})}`;
          const index = current.findIndex((entry) => entry.key === nextKey);
          if (index >= 0) {
            return current.map((entry) =>
              entry.key === nextKey ? { ...entry, quantity: entry.quantity + quantity } : entry,
            );
          }
          return [...current, { ...item, quantity, key: nextKey }];
        });
      },
      updateQuantity: (key, quantity) => {
        setItems((current) =>
          current
            .map((entry) => (entry.key === key ? { ...entry, quantity } : entry))
            .filter((entry) => entry.quantity > 0),
        );
      },
      removeItem: (key) => setItems((current) => current.filter((entry) => entry.key !== key)),
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

type ThemeContextValue = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("sweet-delights-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setThemeState(stored === "dark" || (!stored && prefersDark) ? "dark" : "light");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    window.localStorage.setItem("sweet-delights-theme", theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => setThemeState((current) => (current === "light" ? "dark" : "light")),
      setTheme: (nextTheme) => setThemeState(nextTheme),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}

const navigation = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/customize", label: "Customize" },
  { href: "/dashboard", label: "Account" },
  { href: "/admin", label: "Admin" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--bg-glass)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3 text-white">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-amber-300 text-lg font-semibold text-slate-950 shadow-[0_10px_35px_rgba(236,72,153,0.4)] transition-transform duration-300 group-hover:scale-105">
            SD
          </span>
          <span>
            <span className="block text-[0.72rem] uppercase tracking-[0.3em] text-rose-100/80">Sweet Delights</span>
            <span className="block text-sm text-white/90">Luxury Cake Atelier</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition duration-300",
                  active
                    ? "bg-white text-slate-950 shadow-lg"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white/90 transition hover:bg-white/10 sm:inline-flex"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
          <Link
            href="/cart"
            className="relative flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white/90 transition hover:bg-white/10"
          >
            Cart
            <span className="ml-2 inline-flex min-w-6 justify-center rounded-full bg-rose-400 px-2 py-0.5 text-xs font-semibold text-slate-950">
              {cartCount}
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10 lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            <span className="text-lg">☰</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {theme === "light" ? "Switch to dark" : "Switch to light"}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-amber-300 text-sm font-semibold text-slate-950">
              SD
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-rose-100/70">Sweet Delights</p>
              <p className="text-white/80">Luxury Cake Atelier</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/65">
            Premium cakes, bespoke celebrations, curated gifting, and seamless delivery for occasions worth remembering.
          </p>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <a className="transition hover:text-white" href={`https://wa.me/${brand.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <span>•</span>
            <a className="transition hover:text-white" href={`mailto:${brand.email}`}>
              Email
            </a>
            <span>•</span>
            <a className="transition hover:text-white" href={brand.mapUrl} target="_blank" rel="noreferrer">
              Visit us
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/50">Explore</p>
          <div className="grid gap-3 text-sm text-white/70">
            <Link href="/catalog" className="transition hover:text-white">Cake catalog</Link>
            <Link href="/customize" className="transition hover:text-white">Cake customization</Link>
            <Link href="/track-order" className="transition hover:text-white">Track order</Link>
            <Link href="/checkout" className="transition hover:text-white">Checkout</Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/50">Support</p>
          <div className="grid gap-3 text-sm text-white/70">
            <Link href="/dashboard" className="transition hover:text-white">Account</Link>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
            <Link href="/admin" className="transition hover:text-white">Admin dashboard</Link>
            <span>{brand.phone}</span>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/50">Newsletter</p>
          <p className="mb-4 text-sm leading-6 text-white/65">
            Get first access to seasonal launches, custom cake releases, and exclusive offers.
          </p>
          <NewsletterForm compact />
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs tracking-[0.2em] text-white/35 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Sweet Delights. Crafted for celebrations.
      </div>
    </footer>
  );
}

export function LiveChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="mb-3 w-[min(92vw,20rem)] rounded-3xl border border-white/10 bg-slate-950/95 p-4 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <p className="text-sm font-semibold">Need help choosing a cake?</p>
              <p className="text-xs text-white/55">Chat with our concierge team</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/55 transition hover:text-white" aria-label="Close chat">
              ✕
            </button>
          </div>
          <div className="mt-4 space-y-2 text-sm text-white/75">
            <p>• Custom cake recommendations</p>
            <p>• Delivery and availability questions</p>
            <p>• WhatsApp ordering assistance</p>
          </div>
          <a
            href={`https://wa.me/${brand.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Sweet Delights, I need help with a cake order.")}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white"
          >
            Start WhatsApp chat
          </a>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-rose-400 via-fuchsia-500 to-amber-300 text-xl font-semibold text-slate-950 shadow-[0_18px_55px_rgba(236,72,153,0.45)] transition hover:scale-105"
        aria-label="Open chat"
      >
        💬
      </button>
    </div>
  );
}
