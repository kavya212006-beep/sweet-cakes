import { TrackOrderClient } from "@/components/commerce-clients";

export const metadata = {
  title: "Track Order",
};

export default async function TrackOrderPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const params = await searchParams;
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-[2.5rem] border border-white/10 bg-[color:var(--card)] p-8 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Order tracking</p>
        <h1 className="mt-3 text-5xl font-semibold">Follow your order from oven to door.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">Track received, preparing, baking, out for delivery, and delivered status updates with elegant progress visuals.</p>
      </section>
      <TrackOrderClient initialOrderNumber={params.order} />
    </div>
  );
}