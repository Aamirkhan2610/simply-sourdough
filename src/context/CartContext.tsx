"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  itemKey: (item: Pick<CartItem, "productId" | "variantId">) => string;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ss-cart-v1";

function keyOf(item: Pick<CartItem, "productId" | "variantId">) {
  return `${item.productId}::${item.variantId ?? "base"}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, qty = 1) => {
      setItems((prev) => {
        const k = keyOf(item);
        const existing = prev.find((i) => keyOf(i) === k);
        if (existing) {
          return prev.map((i) =>
            keyOf(i) === k ? { ...i, quantity: i.quantity + qty } : i
          );
        }
        return [...prev, { ...item, quantity: qty }];
      });
    },
    []
  );

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => keyOf(i) !== key));
  }, []);

  const updateQty = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (keyOf(i) === key ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return {
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      count,
      subtotal,
      itemKey: keyOf,
    };
  }, [items, addItem, removeItem, updateQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
