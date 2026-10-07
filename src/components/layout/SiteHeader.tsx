"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

const PHONE = "tel:+61478481989";

export function SiteHeader({
  home = false,
  reserveSpace = false,
}: {
  home?: boolean;
  reserveSpace?: boolean;
}) {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = () => setOpen(false);
  const to = (hash: string) => (home ? hash : `/${hash}`);
  const shopActive = pathname === "/shop" || pathname?.startsWith("/shop/");

  return (
    <>
      <header className={scrolled ? "nav scrolled" : "nav"}>
        <div className="container nav-inner">
          <Link href={home ? "#top" : "/"} className="brand" aria-label="Simply Sourdough home">
            <span className="brand-mark">
              <img src="/brand/mark.svg" alt="" />
            </span>
            <span>
              <span className="brand-name">Simply Sourdough</span>
              <span className="brand-sub">organic, Lismore</span>
            </span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            <a href={to("#bread")}>The bread</a>
            <a href={to("#story")}>Our baker</a>
            <a href={to("#why")}>Why us</a>
            <a href={to("#visit")}>Visit</a>
            <Link href="/shop" className={shopActive ? "is-active" : undefined}>
              Shop
            </Link>
          </nav>
          <div className="nav-tools">
            <Link href="/cart" className="nav-cart" aria-label={count ? `Cart, ${count} items` : "Cart"}>
              <ShoppingBag size={16} strokeWidth={1.5} />
              {count > 0 && <span className="nav-count">{count}</span>}
            </Link>
            <a href={PHONE} className="nav-cta">
              Call the bakery
            </a>
            <button
              className="hamburger"
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>
      {reserveSpace ? <div className="nav-spacer" aria-hidden="true" /> : null}
      <aside className={open ? "drawer open" : "drawer"} aria-hidden={!open}>
        <div className="drawer-top">
          <Link href={home ? "#top" : "/"} className="brand" onClick={close}>
            <span className="brand-mark">
              <img src="/brand/mark.svg" alt="" />
            </span>
            <span className="brand-name">Simply Sourdough</span>
          </Link>
          <button className="drawer-close" type="button" aria-label="Close menu" onClick={close}>
            <X size={18} />
          </button>
        </div>
        <nav aria-label="Mobile">
          <a href={to("#bread")} onClick={close}>
            The bread
          </a>
          <a href={to("#story")} onClick={close}>
            Our baker
          </a>
          <a href={to("#why")} onClick={close}>
            Why us
          </a>
          <a href={to("#visit")} onClick={close}>
            Visit
          </a>
          <Link href="/shop" onClick={close}>
            Shop
          </Link>
          <Link href="/cart" onClick={close}>
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
          <a href={PHONE} onClick={close}>
            Call the bakery
          </a>
        </nav>
        <div className="drawer-foot">
          Embassy Arcade, 3/97 Keen St, Lismore
          <br />
          Tuesday to Friday, 8:00 AM to 5:00 PM. Saturday, 7:00 AM to 2:00 PM, or until sold out.
        </div>
      </aside>
    </>
  );
}
