import { isDatabaseConfigured, readSetting, writeSetting } from "@/lib/db";
import type { EmailSettings } from "@/lib/types";

const SETTINGS_KEY = "email";

/** The inbox orders went to before these settings were configurable. */
const LEGACY_EMAIL = "Farid@simplysourdough.shop";

/** Cache so a burst of orders does not hit the database for every email. */
const CACHE_TTL_MS = 10_000;

declare global {
  var __ssEmailSettings: { value: EmailSettings; at: number } | undefined;
  var __ssEmailSettingsFallback: EmailSettings | undefined;
}

/**
 * Defaults come from the SMTP_* environment variables, so the site keeps
 * sending the same way until an admin saves something different.
 */
export function defaultEmailSettings(): EmailSettings {
  return {
    email: (process.env.SMTP_USER || "").trim() || LEGACY_EMAIL,
    password: process.env.SMTP_PASS || "",
    smtpHost: (process.env.SMTP_HOST || "").trim() || "smtp.zoho.com",
    smtpPort: Number(process.env.SMTP_PORT || 465),
    ccRecipients: (process.env.ORDER_EMAIL_CC || "").trim(),
    sendCustomerConfirmation: true,
    updatedAt: new Date(0).toISOString(),
  };
}

/** Fill in any field a stored record is missing, so old rows stay readable. */
function merge(stored: Partial<EmailSettings> | null): EmailSettings {
  const base = defaultEmailSettings();
  if (!stored) return base;
  const port = Number(stored.smtpPort);
  return {
    email: stored.email?.trim() || base.email,
    password: stored.password || base.password,
    smtpHost: stored.smtpHost?.trim() || base.smtpHost,
    smtpPort: Number.isFinite(port) && port > 0 ? port : base.smtpPort,
    ccRecipients: stored.ccRecipients?.trim() ?? base.ccRecipients,
    sendCustomerConfirmation:
      typeof stored.sendCustomerConfirmation === "boolean"
        ? stored.sendCustomerConfirmation
        : base.sendCustomerConfirmation,
    updatedAt: stored.updatedAt || base.updatedAt,
  };
}

export async function getEmailSettings(): Promise<EmailSettings> {
  const cached = globalThis.__ssEmailSettings;
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.value;
  }

  if (!isDatabaseConfigured()) {
    const value = globalThis.__ssEmailSettingsFallback ?? defaultEmailSettings();
    globalThis.__ssEmailSettings = { value, at: Date.now() };
    return value;
  }

  try {
    const stored = await readSetting<Partial<EmailSettings>>(SETTINGS_KEY);
    const value = merge(stored);
    globalThis.__ssEmailSettings = { value, at: Date.now() };
    return value;
  } catch (error) {
    // Never let a database hiccup stop an order from being emailed.
    console.error("could not read email settings, using defaults", error);
    return globalThis.__ssEmailSettingsFallback ?? defaultEmailSettings();
  }
}

export async function saveEmailSettings(
  patch: Partial<EmailSettings>
): Promise<EmailSettings> {
  const current = await getEmailSettings();
  const next: EmailSettings = {
    ...current,
    ...patch,
    smtpPort: Number(patch.smtpPort ?? current.smtpPort),
    updatedAt: new Date().toISOString(),
  };

  if (isDatabaseConfigured()) {
    await writeSetting(SETTINGS_KEY, next);
  } else {
    globalThis.__ssEmailSettingsFallback = next;
  }

  globalThis.__ssEmailSettings = { value: next, at: Date.now() };
  return next;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Parse the comma separated CC field into addresses, ignoring blanks. */
export function parseRecipients(value: string): string[] {
  return value
    .split(/[,;]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function describeStorage(): "database" | "memory" {
  return isDatabaseConfigured() ? "database" : "memory";
}
