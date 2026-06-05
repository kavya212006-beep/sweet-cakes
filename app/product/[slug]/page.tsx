import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/commerce-clients";
import { getProductBySlug, getRecommendedProducts } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const recommendations = getRecommendedProducts(slug, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-[2.5rem] border border-white/10 bg-[color:var(--card)] p-8 text-white backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-rose-100/70">Product details</p>
        <h1 className="mt-3 text-5xl font-semibold">{product.name}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/68">
          Explore images, reviews, delivery details, customization options, and recommended pairings.
        </p>
      </section>
      <ProductDetailClient product={product} recommendations={recommendations} />
    </div>
  );
}