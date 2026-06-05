import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-6 py-16 text-center text-white">
      <div className="rounded-[2.25rem] border border-white/10 bg-[color:var(--card)] p-10 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">404</p>
        <h1 className="mt-3 text-5xl font-semibold">We could not find that page.</h1>
        <p className="mt-4 text-sm leading-7 text-white/68">The cake you are looking for may be hidden in the catalog or the page may have moved.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950">Return home</Link>
      </div>
    </div>
  );
}