"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatMoney } from "@/lib/format";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, itemKey, clear } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [sending, setSending] = useState(false);

  async function placeOrder() {
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          email,
          phone,
          notes,
          items: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });
      const data = (await res.json()) as { id?: string; error?: string };
      if (!res.ok || !data.id) {
        setError(data.error || "We could not send this order.");
        return;
      }
      setOrderId(data.id);
      clear();
    } catch {
      setError("We could not send this order. Please call the bakery.");
    } finally {
      setSending(false);
    }
  }

  if (orderId) {
    return (
      <div className="ss shop-page">
        <div className="container" style={{ maxWidth: 720 }}>
          <p className="eyebrow">Order received</p>
          <h1 className="display-2" style={{ marginTop: 12 }}>
            Thank you
          </h1>
          <p className="shop-lead">
            Order {orderId} is on its way to the bakery. We will have it ready for pickup at Embassy Arcade. Payment is on collection.
          </p>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: 28 }}>
            Back to the shop
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="ss shop-page">
        <div className="container" style={{ maxWidth: 720 }}>
          <p className="eyebrow">Cart</p>
          <h1 className="display-2" style={{ marginTop: 12 }}>
            Your cart is empty
          </h1>
          <p className="shop-lead">Add a loaf or a bun, then send the order through for pickup.</p>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: 28 }}>
            Browse the shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ss shop-page">
      <div className="container">
        <p className="eyebrow">Cart</p>
        <h1 className="display-2" style={{ marginTop: 12 }}>
          Your order
        </h1>
        <div className="cart-grid" style={{ marginTop: 28 }}>
          <div>
            {items.map((item) => {
              const key = itemKey(item);
              return (
                <div key={key} className="cart-line">
                  <div>
                    {item.image ? (
                      <Image src={item.image} alt="" width={192} height={192} />
                    ) : (
                      <img src="/brand/mark.svg" alt="" />
                    )}
                  </div>
                  <div>
                    <Link href={`/shop/${item.slug}`}>
                      <strong>{item.name}</strong>
                    </Link>
                    {item.variantName ? <p>{item.variantName}</p> : null}
                    <p>{formatMoney(item.price)}</p>
                  </div>
                  <div className="qty">
                    <button type="button" onClick={() => updateQty(key, item.quantity - 1)} aria-label="Decrease">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQty(key, item.quantity + 1)} aria-label="Increase">
                      <Plus size={14} />
                    </button>
                    <button type="button" onClick={() => removeItem(key)} aria-label="Remove">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
            <button type="button" onClick={clear} className="back-link" style={{ marginTop: 16 }}>
              Clear cart
            </button>
          </div>
          <form
            className="order-box"
            onSubmit={(event) => {
              event.preventDefault();
              void placeOrder();
            }}
          >
            <h2>Pickup details</h2>
            <p className="shop-lead" style={{ marginTop: 8 }}>
              {formatMoney(subtotal)} · Embassy Arcade, Lismore. Payment on collection.
            </p>
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            </label>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </label>
            <label>
              Phone
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete="tel" />
            </label>
            <label>
              Note for the bakery
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Pickup day, or anything we should know" />
            </label>
            {error ? <p className="form-error">{error}</p> : null}
            <button type="submit" className="btn btn-primary" style={{ marginTop: 18, width: "100%" }} disabled={sending}>
              {sending ? "Sending…" : "Place pickup order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
