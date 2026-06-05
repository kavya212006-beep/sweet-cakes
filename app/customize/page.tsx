import { CustomizerClient } from "@/components/commerce-clients";
import { products } from "@/lib/data";

export const metadata = {
  title: "Customize Cake",
};

export default async function CustomizePage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const params = await searchParams;
  const product = products.find((item) => item.slug === params.product) ?? products[1];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-[2.5rem] border border-white/10 bg-[color:var(--card)] p-8 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Customization studio</p>
        <h1 className="mt-3 text-5xl font-semibold">Design a cake that feels one of a kind.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">
          Pick the flavor, size, weight, message, and delivery slot. Your final price updates instantly.
        </p>
      </section>
      <CustomizerClient initialProduct={product} />
    </div>
  );
}