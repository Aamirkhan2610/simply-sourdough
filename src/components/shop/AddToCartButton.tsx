"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product, ProductVariant } from "@/lib/types";

export function AddToCartButton({
  product,
  variant,
  className,
}: {
  product: Product;
  variant?: ProductVariant;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const price = variant?.price ?? product.price;

  function handleAdd() {
    if (!product.inStock) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price,
      image: product.images[0] || "",
      variantId: variant?.id,
      variantName: variant?.name,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!product.inStock}
      className={`btn btn-primary disabled:cursor-not-allowed disabled:opacity-50 ${className ?? "w-full sm:w-auto"}`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" /> Added to cart
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          {product.inStock ? "Add to cart" : "Sold out"}
        </>
      )}
    </button>
  );
}
