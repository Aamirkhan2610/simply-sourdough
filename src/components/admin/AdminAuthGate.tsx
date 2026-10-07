"use client";

import Image from "next/image";
import {
  createContext,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ADMIN_SESSION_KEY,
  createSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

const LogoutContext = createContext<(() => void) | null>(null);

export function useAdminLogout() {
  return useContext(LogoutContext);
}

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    try {
      const token = sessionStorage.getItem(ADMIN_SESSION_KEY);
      setAuthed(Boolean(token?.startsWith("ss-ok-")));
    } catch {
      setAuthed(false);
    }
    setReady(true);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!verifyAdminCredentials(username, password)) {
      setError("Invalid username or password. Please try again.");
      return;
    }
    sessionStorage.setItem(ADMIN_SESSION_KEY, createSessionToken());
    setAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthed(false);
    setUsername("");
    setPassword("");
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-parchment-deep text-muted">
        Loading admin…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-parchment-deep px-4">
        <div className="w-full max-w-md rounded-[1.5rem] border border-[var(--border)] bg-white p-8 shadow-[var(--shadow)]">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="relative mb-4 h-16 w-16 overflow-hidden rounded-full bg-parchment ring-1 ring-[var(--border)]">
              <Image
                src="/brand/mark.svg"
                alt="Simply Sourdough"
                fill
                className="object-contain p-0.5"
                sizes="64px"
              />
            </span>
            <h1 className="font-display text-3xl font-semibold text-espresso">
              Admin CRM
            </h1>
            <p className="mt-1 text-sm text-muted">
              Simply Sourdough · Sign in to manage the shop
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-espresso">
                Username
              </label>
              <input
                className="admin-input"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-espresso">
                Password
              </label>
              <div className="relative">
                <input
                  className="admin-input pr-20"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-clay"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button type="submit" className="btn btn-primary w-full">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            Private staff access only. Do not share credentials with customers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <LogoutContext.Provider value={handleLogout}>
      {children}
    </LogoutContext.Provider>
  );
}
