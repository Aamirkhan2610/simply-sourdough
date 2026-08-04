"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "./AddToCartButton";

export function ProductDetailClient({ product }: { product: Product }) {
  const [imageIdx, setImageIdx] = useState(0);
  const [variantId, setVariantId] = useState(
    product.variants?.[0]?.id ?? undefined
  );

  const variant = useMemo(
    () => product.variants?.find((v) => v.id === variantId),
    [product.variants, variantId]
  );

  const price = variant?.price ?? product.price;
  const image = product.images[imageIdx] || product.images[0];

  return (
    <div className="grain-bg min-h-screen">
      <div className="container-page py-10 md:py-16">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-espresso"
        >
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-parchment-deep shadow-[var(--shadow)]">
              {image && (
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setImageIdx(i)}
                    className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition ${
                      i === imageIdx
                        ? "border-clay shadow-md"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-clay">
              {product.category}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-espresso md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-3xl font-bold text-espresso">
              {formatMoney(price, product.currency)}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {product.shortDescription}
            </p>
            {product.description && (
              <p className="mt-3 text-base leading-relaxed text-muted">
                {product.description}
              </p>
            )}

            {product.variants && product.variants.length > 0 && (
              <div className="mt-7">
                <p className="mb-2.5 text-sm font-semibold text-espresso">
                  Options
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVariantId(v.id)}
                      className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                        variantId === v.id
                          ? "border-espresso bg-espresso text-parchment"
                          : "border-[var(--border-strong)] bg-white text-espresso hover:border-clay"
                      }`}
                    >
                      {v.name} · {formatMoney(v.price, product.currency)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-9">
              <AddToCartButton product={product} variant={variant} />
            </div>

            {(product.ingredients || product.allergens) && (
              <div className="mt-10 space-y-5 rounded-[1.25rem] border border-[var(--border)] bg-white p-6 shadow-sm">
                {product.ingredients && (
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-clay">
                      Ingredients
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {product.ingredients}
                    </p>
                  </div>
                )}
                {product.allergens && (
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-clay">
                      Allergens
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {product.allergens}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
