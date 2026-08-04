"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/format";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Story" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--border)] bg-[rgba(246,240,230,0.88)] shadow-[var(--shadow-sm)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-xl font-bold text-espresso"
          aria-label="Simply Sourdough home"
        >
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-[var(--border)] transition group-hover:ring-clay/40 sm:h-14 sm:w-14">
            <Image
              src="/logo.png"
              alt="Simply Sourdough Organic"
              fill
              priority
              className="object-contain p-0.5"
              sizes="56px"
            />
          </span>
          <span className="leading-none">
            <span className="block tracking-tight">Simply</span>
            <span className="mt-0.5 block font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-clay">
              Sourdough
            </span>
          </span>
        </Link>

        <nav className="hidden items-center rounded-full border border-[var(--border)] bg-white/70 p-1.5 shadow-sm backdrop-blur md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                pathname === l.href
                  ? "bg-espresso text-parchment shadow-sm"
                  : "text-espresso-soft hover:bg-parchment-deep/80"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-white transition hover:border-clay hover:text-clay"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-[11px] font-bold text-white shadow">
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-parchment/98 backdrop-blur md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-2xl px-4 py-3.5 text-base font-semibold",
                  pathname === l.href
                    ? "bg-espresso text-parchment"
                    : "text-espresso hover:bg-parchment-deep"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
