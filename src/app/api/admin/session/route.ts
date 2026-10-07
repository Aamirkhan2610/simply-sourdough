import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/admin-auth";
import {
  clearedSessionCookie,
  isAdminRequest,
  sessionCookie,
} from "@/lib/admin-session";

/** Tells the admin UI whether the httpOnly cookie is still valid. */
export async function GET(request: Request) {
  return NextResponse.json({ authenticated: isAdminRequest(request) });
}

/** Exchange admin credentials for a signed session cookie. */
export async function POST(request: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyAdminCredentials(body.username || "", body.password || "")) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { authenticated: true },
    { headers: { "Set-Cookie": sessionCookie() } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { authenticated: false },
    { headers: { "Set-Cookie": clearedSessionCookie() } }
  );
}
