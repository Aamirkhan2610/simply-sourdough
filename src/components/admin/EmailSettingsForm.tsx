"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { AlertTriangle, Database, Mail, Save, Send } from "lucide-react";
import type { SafeEmailSettings } from "@/lib/types";

type Storage = "database" | "memory";

interface Draft {
  orderRecipient: string;
  ccRecipients: string;
  fromAddress: string;
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  sendCustomerConfirmation: boolean;
}

function toDraft(settings: SafeEmailSettings): Draft {
  return {
    orderRecipient: settings.orderRecipient,
    ccRecipients: settings.ccRecipients,
    fromAddress: settings.fromAddress,
    smtpHost: settings.smtpHost,
    smtpPort: String(settings.smtpPort),
    smtpUser: settings.smtpUser,
    // Never prefilled — the server does not hand the password back.
    smtpPassword: "",
    sendCustomerConfirmation: settings.sendCustomerConfirmation,
  };
}

export function EmailSettingsForm() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [passwordSet, setPasswordSet] = useState(false);
  const [storage, setStorage] = useState<Storage>("memory");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testTarget, setTestTarget] = useState("");

  const apply = useCallback(
    (settings: SafeEmailSettings, mode: Storage) => {
      setDraft(toDraft(settings));
      setPasswordSet(settings.smtpPasswordSet);
      setStorage(mode);
      setUpdatedAt(
        new Date(settings.updatedAt).getTime() > 0 ? settings.updatedAt : null
      );
    },
    []
  );

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/settings/email", { cache: "no-store" });
        if (!active) return;
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setLoadError(body.error || "Could not load the email settings.");
          return;
        }
        const body = await res.json();
        apply(body.settings as SafeEmailSettings, body.storage as Storage);
      } catch {
        if (active) setLoadError("Could not load the email settings.");
      }
    })();
    return () => {
      active = false;
    };
  }, [apply]);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
    setNotice("");
    setError("");
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/settings/email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, smtpPort: Number(draft.smtpPort) }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || "Could not save these settings.");
        return;
      }
      apply(body.settings as SafeEmailSettings, body.storage as Storage);
      setNotice(`Saved. New orders will go to ${body.settings.orderRecipient}.`);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    setTesting(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/settings/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: testTarget.trim() }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || "The test could not be sent.");
        return;
      }
      setNotice(`Test email sent to ${body.to}. Check that inbox.`);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setTesting(false);
    }
  }

  if (loadError) {
    return (
      <div className="card-surface flex items-start gap-3 p-6">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
        <div>
          <p className="font-semibold text-espresso">{loadError}</p>
          <p className="mt-1 text-sm text-muted">
            Sign out and sign in again, then reload this page.
          </p>
        </div>
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="card-surface p-6 text-sm text-muted">
        Loading email settings…
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {storage === "memory" && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4">
          <Database className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <div className="text-sm text-amber-900">
            <p className="font-semibold">No database connected</p>
            <p className="mt-0.5">
              Changes saved here will be lost when the site restarts. Connect a
              Postgres database in Vercel so this setting sticks.
            </p>
          </div>
        </div>
      )}

      <section className="card-surface space-y-5 p-6">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-clay" />
          <h2 className="font-display text-xl font-semibold text-espresso">
            Order notifications
          </h2>
        </div>

        <div>
          <label
            htmlFor="orderRecipient"
            className="mb-1.5 block text-sm font-semibold text-espresso"
          >
            Send new orders to
          </label>
          <input
            id="orderRecipient"
            className="admin-input"
            type="email"
            required
            value={draft.orderRecipient}
            onChange={(e) => update("orderRecipient", e.target.value)}
            placeholder="orders@simplysourdough.shop"
          />
          <p className="mt-1.5 text-xs text-muted">
            Every order placed on the website arrives in this inbox.
          </p>
        </div>

        <div>
          <label
            htmlFor="ccRecipients"
            className="mb-1.5 block text-sm font-semibold text-espresso"
          >
            Also copy to <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="ccRecipients"
            className="admin-input"
            value={draft.ccRecipients}
            onChange={(e) => update("ccRecipients", e.target.value)}
            placeholder="farid@simplysourdough.shop, kitchen@simplysourdough.shop"
          />
          <p className="mt-1.5 text-xs text-muted">
            Separate several addresses with commas.
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-clay"
            checked={draft.sendCustomerConfirmation}
            onChange={(e) =>
              update("sendCustomerConfirmation", e.target.checked)
            }
          />
          <span className="text-sm">
            <span className="font-semibold text-espresso">
              Email the customer a confirmation
            </span>
            <span className="block text-muted">
              Sends the customer their own copy of the order.
            </span>
          </span>
        </label>
      </section>

      <section className="card-surface space-y-5 p-6">
        <h2 className="font-display text-xl font-semibold text-espresso">
          Zoho SMTP account
        </h2>
        <p className="-mt-3 text-sm text-muted">
          The account the website signs in with to send mail. Leave this as it
          is unless the Zoho mailbox itself changes.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="smtpHost"
              className="mb-1.5 block text-sm font-semibold text-espresso"
            >
              SMTP host
            </label>
            <input
              id="smtpHost"
              className="admin-input"
              required
              value={draft.smtpHost}
              onChange={(e) => update("smtpHost", e.target.value)}
              placeholder="smtp.zoho.com"
            />
          </div>
          <div>
            <label
              htmlFor="smtpPort"
              className="mb-1.5 block text-sm font-semibold text-espresso"
            >
              Port
            </label>
            <input
              id="smtpPort"
              className="admin-input"
              type="number"
              min={1}
              max={65535}
              required
              value={draft.smtpPort}
              onChange={(e) => update("smtpPort", e.target.value)}
              placeholder="465"
            />
            <p className="mt-1.5 text-xs text-muted">
              465 for SSL, 587 for TLS.
            </p>
          </div>
          <div>
            <label
              htmlFor="smtpUser"
              className="mb-1.5 block text-sm font-semibold text-espresso"
            >
              Username
            </label>
            <input
              id="smtpUser"
              className="admin-input"
              autoComplete="off"
              required
              value={draft.smtpUser}
              onChange={(e) => update("smtpUser", e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="smtpPassword"
              className="mb-1.5 block text-sm font-semibold text-espresso"
            >
              Password
            </label>
            <input
              id="smtpPassword"
              className="admin-input"
              type="password"
              autoComplete="new-password"
              value={draft.smtpPassword}
              onChange={(e) => update("smtpPassword", e.target.value)}
              placeholder={
                passwordSet ? "Saved — leave blank to keep it" : "Zoho app password"
              }
            />
            <p className="mt-1.5 text-xs text-muted">
              {passwordSet
                ? "A password is saved. Leave this blank to keep using it."
                : "No password saved yet."}
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="fromAddress"
            className="mb-1.5 block text-sm font-semibold text-espresso"
          >
            From address
          </label>
          <input
            id="fromAddress"
            className="admin-input"
            type="email"
            value={draft.fromAddress}
            onChange={(e) => update("fromAddress", e.target.value)}
            placeholder={draft.smtpUser}
          />
          <p className="mt-1.5 text-xs text-muted">
            Must be the Zoho account above or one of its verified aliases, or
            Zoho will reject the message.
          </p>
        </div>
      </section>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {notice && (
        <p className="rounded-xl bg-moss/15 px-4 py-3 text-sm text-moss">
          {notice}
        </p>
      )}

      <div className="card-surface space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving || testing}
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving…" : "Save settings"}
          </button>
          {updatedAt && (
            <span className="text-xs text-muted">
              Last changed {new Date(updatedAt).toLocaleString("en-AU")}
            </span>
          )}
        </div>

        <div className="border-t border-[var(--border)] pt-4">
          <p className="mb-2 text-sm font-semibold text-espresso">
            Send a test email
          </p>
          <p className="mb-3 text-xs text-muted">
            Uses the settings already saved, so save first if you just changed
            something.
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              className="admin-input max-w-xs flex-1"
              type="email"
              value={testTarget}
              onChange={(e) => setTestTarget(e.target.value)}
              placeholder={draft.orderRecipient || "you@example.com"}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleTest}
              disabled={testing || saving}
            >
              <Send className="mr-2 h-4 w-4" />
              {testing ? "Sending…" : "Send test"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
