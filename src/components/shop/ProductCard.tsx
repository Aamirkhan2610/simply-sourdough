import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0] || "/placeholder-bread.svg";
  const fromPrice =
    product.variants && product.variants.length > 0
      ? Math.min(...product.variants.map((v) => v.price), product.price)
      : product.price;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group card-surface flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden img-placeholder">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-espresso/90 px-3 py-1 text-xs font-semibold text-white">
            Sold out
          </span>
        )}
        {product.featured && product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-clay px-3 py-1 text-xs font-semibold text-white shadow">
            Favourite
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-clay">
          {product.category}
        </p>
        <h3 className="font-display text-2xl font-semibold leading-tight text-espresso transition group-hover:text-clay-deep">
          {product.name}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
          <span className="text-lg font-bold text-espresso">
            {product.variants?.length ? "From " : ""}
            {formatMoney(fromPrice, product.currency)}
          </span>
          <span className="text-sm font-semibold text-clay opacity-0 transition group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
