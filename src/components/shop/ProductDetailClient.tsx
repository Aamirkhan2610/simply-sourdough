"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "./AddToCartButton";

export function ProductDetailClient({ product }: { product: Product }) {
  const [imageIdx, setImageIdx] = useState(0);
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? undefined);

  const variant = useMemo(
    () => product.variants?.find((v) => v.id === variantId),
    [product.variants, variantId]
  );

  const price = variant?.price ?? product.price;
  const image = product.images[imageIdx] || product.images[0];
  const sixPack = product.variants?.length === 1 && /6 pack/i.test(product.shortDescription);
  const onTheMenu = product.category !== "pastry" && product.category !== "subscription";

  return (
    <div className="ss shop-page">
      <div className="container">
        <Link href="/shop" className="back-link">
          Back to shop
        </Link>
        <div className="detail-grid">
          <div>
            <div className="detail-photo">
              {image ? (
                <Image src={image} alt={product.name} width={1000} height={1000} priority />
              ) : (
                <img src="/brand/mark.svg" alt="" style={{ width: 120, height: 120, margin: "auto" }} />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="thumbs">
                {product.images.map((img, i) => (
                  <button key={img + i} type="button" className={i === imageIdx ? "on" : undefined} onClick={() => setImageIdx(i)}>
                    <Image src={img} alt="" width={160} height={160} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="detail-copy">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="detail-price">{formatMoney(price, product.currency)}</p>
            <p>{product.shortDescription}</p>
            {product.description ? <p>{product.description}</p> : null}
            {product.variants && product.variants.length > 0 && (
              <div className="option-row">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={variantId === v.id ? "on" : undefined}
                    onClick={() => setVariantId(v.id)}
                  >
                    {v.name} · {formatMoney(v.price, product.currency)}
                  </button>
                ))}
                {sixPack && (
                  <button type="button" disabled>
                    6 pack · pricing being updated
                  </button>
                )}
              </div>
            )}
            <div style={{ marginTop: 22 }}>
              {onTheMenu ? (
                <AddToCartButton product={product} variant={variant} />
              ) : (
                <p>Not on the menu yet. Pastries and cakes are still coming.</p>
              )}
            </div>
            {(product.ingredients || product.allergens) && (
              <div className="facts">
                {product.ingredients && (
                  <div>
                    <h3>Ingredients</h3>
                    <p>{product.ingredients}</p>
                  </div>
                )}
                {product.allergens && (
                  <div>
                    <h3>Allergens</h3>
                    <p>{product.allergens}</p>
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
