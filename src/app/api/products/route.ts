import { NextResponse } from "next/server";
import { getProducts, upsertProduct } from "@/lib/store";
import type { Product } from "@/lib/types";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Product>;
  const now = new Date().toISOString();
  const product: Product = {
    id: body.id || `p-${Date.now()}`,
    name: body.name || "Untitled product",
    slug:
      body.slug ||
      (body.name || "product")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    price: Number(body.price ?? 0),
    currency: body.currency || "AUD",
    shortDescription: body.shortDescription || "",
    description: body.description || "",
    ingredients: body.ingredients,
    allergens: body.allergens,
    images: body.images?.length ? body.images : [],
    category: body.category || "other",
    featured: Boolean(body.featured),
    inStock: body.inStock !== false,
    variants: body.variants,
    createdAt: body.createdAt || now,
    updatedAt: now,
  };
  const saved = await upsertProduct(product);
  return NextResponse.json(saved, { status: 201 });
}
