import { CatalogClient } from "@/components/catalog-client";
import { categories } from "@/lib/data";

export const metadata = {
  title: "Cake Catalog",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const initialCategory = params.category ? categories.find((item) => item.slug === params.category)?.name ?? "All" : "All";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10 rounded-[2.5rem] border border-white/10 bg-[color:var(--card)] p-8 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Catalog</p>
        <h1 className="mt-3 text-5xl font-semibold">Discover the Sweet Delights collection.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">
          Search, filter, sort, and quickly preview our signature cakes, pastries, cupcakes, and gift boxes.
        </p>
      </section>
      <CatalogClient initialCategory={initialCategory} />
    </div>
  );
}