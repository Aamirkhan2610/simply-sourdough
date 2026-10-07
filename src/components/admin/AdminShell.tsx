"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Star,
  ShoppingBag,
  ExternalLink,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/format";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { useAdminLogout } from "@/components/admin/AdminAuthGate";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/instagram", label: "Instagram", icon: InstagramIcon },
  { href: "/admin/settings", label: "Email settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const logout = useAdminLogout();

  return (
    <div className="min-h-screen bg-parchment-deep">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-espresso text-parchment md:flex">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white">
              <Image
                src="/brand/mark.svg"
                alt="Simply Sourdough"
                fill
                className="object-contain p-0.5"
                sizes="44px"
              />
            </span>
            <div>
              <p className="font-display text-lg font-bold">Simply CRM</p>
              <p className="text-[11px] uppercase tracking-wider text-parchment/50">
                Admin panel
              </p>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {nav.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                    active
                      ? "bg-clay text-white shadow-md"
                      : "text-parchment/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="space-y-2 border-t border-white/10 p-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-parchment/70 transition hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              View storefront
            </Link>
            {logout && (
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-2 text-left text-sm text-parchment/70 transition hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            )}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border)] bg-[rgba(246,240,230,0.92)] px-4 py-3 backdrop-blur md:px-8">
            <div className="flex items-center gap-2 md:hidden">
              <span className="relative h-8 w-8 overflow-hidden rounded-full bg-white ring-1 ring-[var(--border)]">
                <Image
                  src="/brand/mark.svg"
                  alt=""
                  fill
                  className="object-contain p-0.5"
                  sizes="32px"
                />
              </span>
              <span className="font-display font-bold text-espresso">CRM</span>
            </div>
            <div className="hidden text-sm font-medium text-muted md:block">
              Simply Sourdough · Admin CRM
            </div>
            <div className="flex max-w-[55vw] gap-1.5 overflow-x-auto md:hidden">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold",
                    pathname === item.href ||
                      (item.href !== "/admin" && pathname.startsWith(item.href))
                      ? "bg-espresso text-white"
                      : "bg-white text-espresso"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" className="btn btn-ghost !px-3 !py-2 text-xs">
                Storefront
              </Link>
              {logout && (
                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-secondary !px-3 !py-2 text-xs"
                >
                  Sign out
                </button>
              )}
            </div>
          </header>
          <div className="flex-1 p-4 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
