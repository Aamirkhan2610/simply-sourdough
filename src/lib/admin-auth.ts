/** Demo CRM credentials — change before production. */
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "SimplySourdough2026!",
} as const;

export const ADMIN_SESSION_KEY = "ss-admin-session-v1";

export function verifyAdminCredentials(
  username: string,
  password: string
): boolean {
  return (
    username.trim() === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  );
}

export function createSessionToken(): string {
  return `ss-ok-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
