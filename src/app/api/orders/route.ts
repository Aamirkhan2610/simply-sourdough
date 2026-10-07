import { NextResponse } from "next/server";
import { getProducts, saveOrders, getOrders } from "@/lib/store";
import { formatMoney } from "@/lib/format";
import {
  getMailer,
  MailerNotConfiguredError,
  orderRecipients,
} from "@/lib/mailer";
import type { Order } from "@/lib/types";

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  let body: {
    customerName?: string;
    email?: string;
    phone?: string;
    notes?: string;
    items?: { productId?: string; variantId?: string; quantity?: number }[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Could not read this order." }, { status: 400 });
  }

  const customerName = clean(body.customerName, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const notes = clean(body.notes, 800);
  const requested = Array.isArray(body.items) ? body.items.slice(0, 30) : [];

  if (customerName.length < 2) {
    return NextResponse.json({ error: "Please add the name for this order." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please add a valid email address." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ error: "Please add a phone number." }, { status: 400 });
  }
  if (requested.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const catalog = await getProducts();
  const lines: Order["items"] = [];
  for (const row of requested) {
    const product = catalog.find((p) => p.id === row.productId);
    if (!product || !product.inStock) {
      return NextResponse.json({ error: "A product in this cart is no longer available." }, { status: 400 });
    }
    const qty = Math.min(24, Math.max(1, Math.round(Number(row.quantity) || 0)));
    if (!qty) {
      return NextResponse.json({ error: "Check the quantities in your cart." }, { status: 400 });
    }
    let name = product.name;
    let price = product.price;
    if (row.variantId) {
      const variant = product.variants?.find((v) => v.id === row.variantId);
      if (!variant) {
        return NextResponse.json({ error: "Choose an available option for each item." }, { status: 400 });
      }
      name = `${product.name} (${variant.name})`;
      price = variant.price;
    }
    lines.push({ productId: product.id, name, quantity: qty, price });
  }

  const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const order: Order = {
    id: `SS-${Date.now().toString(36).toUpperCase()}`,
    customerName,
    email,
    phone,
    items: lines,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
    notes: notes || undefined,
  };

  // Recipient and SMTP account come from the admin panel's email settings.
  let mailer;
  try {
    mailer = await getMailer();
  } catch (error) {
    if (error instanceof MailerNotConfiguredError) {
      return NextResponse.json(
        { error: "This order was not sent. The bakery inbox is not connected yet. Please call +61 478 481 989." },
        { status: 503 }
      );
    }
    throw error;
  }
  const { to: orderTo, cc: orderCc } = orderRecipients(mailer.settings);

  const itemText = lines
    .map((line) => `- ${line.name} × ${line.quantity} — ${formatMoney(line.price * line.quantity)}`)
    .join("\n");
  const text = [
    "New pickup order from the Simply Sourdough website",
    "",
    `Order: ${order.id}`,
    `Name: ${customerName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    notes ? `Notes: ${notes}` : "Notes: —",
    "",
    itemText,
    "",
    `Total: ${formatMoney(total)}`,
    "",
    "Pickup: Embassy Arcade, 3/97 Keen St, Lismore NSW 2480",
    "Hours: Tuesday to Friday 8:00 AM–5:00 PM, Saturday 7:00 AM–2:00 PM, or until sold out.",
    "Payment on collection.",
  ].join("\n");

  // The bakery notification is the one that must get through.
  try {
    await mailer.send({
      to: orderTo,
      cc: orderCc,
      replyTo: email,
      subject: `New Simply Sourdough order ${order.id}`,
      text,
    });
  } catch (error) {
    console.error("order email failed", error);
    return NextResponse.json(
      { error: "We could not send this order. Please call the bakery and we will take it from there." },
      { status: 502 }
    );
  }

  // The customer's copy is a courtesy — a bounce here must not lose the order.
  if (mailer.settings.sendCustomerConfirmation) {
    try {
      await mailer.send({
        to: email,
        replyTo: orderTo,
        subject: `We received your Simply Sourdough order ${order.id}`,
        text: [
          `Hello ${customerName},`,
          "",
          "Thanks for your order. We will have it ready for pickup at Embassy Arcade, 3/97 Keen St, Lismore.",
          "Tuesday to Friday, 8:00 AM to 5:00 PM. Saturday, 7:00 AM to 2:00 PM, or until sold out.",
          "Payment is on collection.",
          "",
          itemText,
          "",
          `Total: ${formatMoney(total)}`,
          "",
          "Simply Sourdough",
          "+61 478 481 989",
        ].join("\n"),
      });
    } catch (error) {
      console.error("customer confirmation failed", error);
    }
  }

  const existing = await getOrders();
  await saveOrders([order, ...existing]);

  return NextResponse.json({ id: order.id });
}
