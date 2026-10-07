import { createHmac, timingSafeEqual } from "crypto";
import { ADMIN_CREDENTIALS } from "@/lib/admin-auth";

/**
 * The admin gate in the browser is only a UI convenience. Routes that read or
 * write SMTP credentials need a signed, httpOnly cookie the client cannot forge.
 */
export const ADMIN_COOKIE = "ss_admin_session";

const MAX_AGE_SECONDS = 60 * 60 * 8;

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    `ss-session-${ADMIN_CREDENTIALS.password}`
  );
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionCookieValue(): string {
  const expires = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return `${expires}.${sign(expires)}`;
}

export function isValidSessionValue(value: string | null): boolean {
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  if (signature.length !== expected.length) return false;
  if (
    !timingSafeEqual(
      Buffer.from(signature, "utf8"),
      Buffer.from(expected, "utf8")
    )
  ) {
    return false;
  }

  const expires = Number(payload);
  return Number.isFinite(expires) && expires > Date.now();
}

/** Read one cookie straight off the request, with no framework coupling. */
function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    if (part.slice(0, index).trim() === name) {
      return decodeURIComponent(part.slice(index + 1).trim());
    }
  }
  return null;
}

export function isAdminRequest(request: Request): boolean {
  return isValidSessionValue(readCookie(request, ADMIN_COOKIE));
}

function cookie(value: string, maxAge: number): string {
  const attributes = [
    `${ADMIN_COOKIE}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  if (process.env.NODE_ENV === "production") {
    attributes.push("Secure");
  }
  return attributes.join("; ");
}

export function sessionCookie(): string {
  return cookie(createSessionCookieValue(), MAX_AGE_SECONDS);
}

export function clearedSessionCookie(): string {
  return cookie("", 0);
}
