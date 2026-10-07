"use client";

import Link from "next/link";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";

const SPOTLIGHT: Record<string, { num: string; label: string; copy: string; images?: string[] }> = {
  "the-simply-sourdough": {
    num: "No. 01",
    label: "Whole loaf",
    copy: "Our daily loaf. A light open crumb, mahogany crust, gentle tang. Made with stoneground flour, water, sea salt and a living starter. Nothing else, no shortcuts.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sour1.png",
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sour2.png",
      "/brand/country-extra.jpg",
    ],
  },
  "tinned-simply-sourdough": {
    num: "No. 02",
    label: "Family size",
    copy: "A softer, family sized sourdough built for the table. Toasts beautifully, holds up to a sandwich, keeps for days. The one most of our regulars take home each bake day.",
    images: ["/brand/tinted-rack.jpg", "/brand/tinted-pair.jpg"],
  },
  "danish-rye-sourdough": {
    num: "No. 03",
    label: "Traditional rye",
    copy: "Dense, dark, properly Scandinavian. Whole rye, cracked grains, a touch of malt and a long cold ferment. Slice it thin, pile it high, the way Farid grew up eating it in Copenhagen.",
    images: [
      "https://simplysourdough.shop/wp-content/uploads/2023/08/unnamed-1.png",
      "https://simplysourdough.shop/wp-content/uploads/2023/08/sourn1.png",
    ],
  },
};

export function ShopGrid({ products, cinnamon }: { products: Product[]; cinnamon?: Product }) {
  const bun = cinnamon?.variants?.[0];

  return (
    <>
      <div className="bread-grid">
        {products.map((product) => {
          const spotlight = SPOTLIGHT[product.slug];
          const photos = (spotlight?.images ?? product.images).filter(Boolean).slice(0, 3);
          return (
            <article key={product.id} className="bread-card">
              {photos.length ? (
                <Link href={`/shop/${product.slug}`} aria-label={product.name}>
                  <div className={photos.length > 1 ? "bread-photos" : "bread-photos single"}>
                    {photos.map((src) => (
                      <img key={src} src={src} alt="" />
                    ))}
                  </div>
                </Link>
              ) : null}
              <div className="bread-num">{spotlight?.num}</div>
              <h3>
                <Link href={`/shop/${product.slug}`}>{product.name}</Link>
              </h3>
              <p>{spotlight?.copy ?? product.shortDescription}</p>
              <div className="bread-foot">
                <span>{spotlight?.label ?? product.category}</span>
                <span className="bread-price">from {formatMoney(product.price, product.currency)}</span>
              </div>
              <div className="bread-order">
                <AddToCartButton product={product} className="is-block" />
              </div>
            </article>
          );
        })}
      </div>

      {cinnamon ? (
        <div className="bread-feature">
          <div>
            <span className="eyebrow">House favourite</span>
            <h3>Swedish cinnamon buns, the real ones.</h3>
            <p>
              Hand rolled, cardamom warmed, lightly glazed. Pulled from the oven Tuesday to
              Saturday morning. They go quickly, and that is on purpose.
            </p>
            <p className="bun-price">
              {bun ? `${bun.name} · ${formatMoney(bun.price, cinnamon.currency)}` : formatMoney(cinnamon.price, cinnamon.currency)}
            </p>
            <div className="bread-order">
              <AddToCartButton product={cinnamon} variant={bun} />
            </div>
          </div>
          <div className="img-wrap">
            <img src="/brand/buns.jpg" alt="Tray of golden Swedish cinnamon buns, fresh from the oven" />
          </div>
        </div>
      ) : null}

      <div className="coming-soon">
        <span className="eyebrow">Coming soon</span>
        <h3>Pastries, cakes and more, the Nordic way.</h3>
        <p>
          Farid is building the menu out slowly. Wienerbrød, kanelbullar variations, sandwiches,
          Christmas fruit tarts, and semla in season. Worth the wait.
        </p>
      </div>
    </>
  );
}
