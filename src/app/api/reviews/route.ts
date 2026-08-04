import { NextResponse } from "next/server";
import { getReviews, saveReviews } from "@/lib/store";
import type { Review } from "@/lib/types";

export async function GET() {
  const reviews = await getReviews();
  return NextResponse.json(reviews);
}

export async function PUT(request: Request) {
  const reviews = (await request.json()) as Review[];
  const saved = await saveReviews(reviews);
  return NextResponse.json(saved);
}
