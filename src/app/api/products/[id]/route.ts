import { NextResponse } from "next/server";
import {
  deleteProduct,
  getProductById,
  upsertProduct,
} from "@/lib/store";
import type { Product } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = await getProductById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const body = (await request.json()) as Partial<Product>;
  const product: Product = {
    ...existing,
    ...body,
    id,
    price: Number(body.price ?? existing.price),
    updatedAt: new Date().toISOString(),
  };
  const saved = await upsertProduct(product);
  return NextResponse.json(saved);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ok = await deleteProduct(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
