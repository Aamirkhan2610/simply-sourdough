"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/format";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, itemKey, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-28 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-parchment-deep">
          <ShoppingBag className="h-8 w-8 text-muted" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold text-espresso">
          Your cart is empty
        </h1>
        <p className="mt-2 max-w-sm text-muted">
          Add some fresh loaves and buns — pickup on Mon, Wed & Fri.
        </p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grain-bg min-h-screen">
      <div className="container-page py-12 md:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-espresso md:text-5xl">
          Your cart
        </h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => {
              const key = itemKey(item);
              return (
                <div
                  key={key}
                  className="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                >
                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-parchment-deep sm:h-24 sm:w-24">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="font-display text-xl font-semibold text-espresso hover:text-clay-deep"
                    >
                      {item.name}
                    </Link>
                    {item.variantName && (
                      <p className="text-sm text-muted">{item.variantName}</p>
                    )}
                    <p className="mt-1 font-bold text-espresso">
                      {formatMoney(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-full border border-[var(--border-strong)] bg-white">
                      <button
                        type="button"
                        className="p-2.5"
                        onClick={() => updateQty(key, item.quantity - 1)}
                        aria-label="Decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="p-2.5"
                        onClick={() => updateQty(key, item.quantity + 1)}
                        aria-label="Increase"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(key)}
                      className="rounded-full p-2.5 text-muted transition hover:bg-red-50 hover:text-red-600"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              onClick={clear}
              className="text-sm font-semibold text-muted underline underline-offset-2 hover:text-espresso"
            >
              Clear cart
            </button>
          </div>

          <aside className="card-elevated h-fit p-6 md:p-7">
            <h2 className="font-display text-2xl font-semibold text-espresso">
              Summary
            </h2>
            <div className="mt-5 flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-lg font-bold text-espresso">
                {formatMoney(subtotal)}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Pickup at Embassy Arcade, Lismore. Payment on collection (demo
              checkout).
            </p>
            <button type="button" className="btn btn-primary mt-6 w-full">
              Place pickup order
            </button>
            <Link href="/shop" className="btn btn-ghost mt-3 w-full">
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
