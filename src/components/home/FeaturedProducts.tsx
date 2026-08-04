import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/types";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="container-page py-20 md:py-28">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <span className="section-label">The menu</span>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso sm:text-5xl">
            Fresh from the oven
          </h2>
          <p className="mt-3 text-muted">
            Signature loaves, Swedish buns, and Nordic pastries — managed in our
            admin CRM and ready for pickup on bake days.
          </p>
        </div>
        <Link href="/shop" className="btn btn-ghost">
          View full shop
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <div
            key={p.id}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
