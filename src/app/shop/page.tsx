import { ShopGrid } from "@/components/shop/ShopGrid";
import { getProducts } from "@/lib/store";

/** Same loaves as the homepage “What we bake” cards, in that order. */
const MENU = ["the-simply-sourdough", "tinned-simply-sourdough", "danish-rye-sourdough"];

export const metadata = {
  title: "Shop",
  description:
    "Three signature sourdoughs and Swedish cinnamon buns from Simply Sourdough in Lismore. Order for pickup Tuesday to Saturday.",
};

export default async function ShopPage() {
  const products = await getProducts();
  const menu = MENU.flatMap((slug) => {
    const product = products.find((item) => item.slug === slug);
    return product ? [product] : [];
  });
  const cinnamon = products.find((item) => item.slug === "cinnamon-buns");

  return (
    <div className="ss shop-page">
      <div className="container">
        <div className="section-head shop-head">
          <p className="eyebrow">What we bake</p>
          <h1 className="display-2">
            A small range, baked properly,
            <br />
            <em className="script">every loaf by hand.</em>
          </h1>
          <p className="lede">
            Three signature sourdoughs and our famous Swedish cinnamon buns. Only what we can do
            well, only on the days we bake. When it sells out, that&apos;s it until next bake day.
          </p>
        </div>
        <ShopGrid products={menu} cinnamon={cinnamon} />
      </div>
    </div>
  );
}
