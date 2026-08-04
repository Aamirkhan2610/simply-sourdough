import { ProductCard } from "@/components/shop/ProductCard";
import { getProducts } from "@/lib/store";

export const metadata = {
  title: "Shop",
  description:
    "Order artisan sourdough, Swedish buns, and Nordic pastries from Simply Sourdough Lismore.",
};

export default async function ShopPage() {
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="grain-bg min-h-screen">
      <div className="container-page py-14 md:py-20">
        <div className="max-w-2xl">
          <span className="section-label">Online shop</span>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso md:text-6xl">
            Our breads & buns
          </h1>
          <p className="mt-4 text-muted">
            All products are preloaded in the admin CRM. Order for pickup on
            Mon, Wed & Fri from 8am — until sold out.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-espresso px-4 py-1.5 text-sm font-semibold text-parchment">
            {products.length} products
          </span>
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-sm font-medium capitalize text-espresso"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
