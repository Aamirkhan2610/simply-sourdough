import { NextResponse } from "next/server";
import { getInstagram, saveInstagram } from "@/lib/store";
import type { InstagramPost } from "@/lib/types";

export async function GET() {
  const posts = await getInstagram();
  return NextResponse.json(posts);
}

export async function PUT(request: Request) {
  const posts = (await request.json()) as InstagramPost[];
  const saved = await saveInstagram(posts);
  return NextResponse.json(saved);
}
