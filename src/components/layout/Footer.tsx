"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteSettings } from "@/data/seed";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.4-3.69 3.56-3.69 1.03 0 2.11.19 2.11.19v2.33h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.91h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname === "/") return null;

  return (
    <footer className="mt-auto bg-espresso text-parchment">
      <div className="border-b border-white/10">
        <div className="container-page grid gap-10 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-5 flex items-center gap-3 font-display text-2xl font-bold">
              <span className="footer-logo">
                <img src="/brand/mark.svg" alt="" />
              </span>
              Simply Sourdough
            </div>
            <p className="max-w-md text-sm leading-relaxed text-parchment/75">
              {siteSettings.tagline}. Artisan Nordic baking in the heart of
              Lismore — fresh, natural ingredients and traditional methods only.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium transition hover:bg-white/10"
              >
                <InstagramIcon className="h-4 w-4 text-copper-light" />
                Instagram
              </a>
              <a
                href={siteSettings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium transition hover:bg-white/10"
              >
                <FacebookIcon className="h-4 w-4 text-copper-light" />
                Facebook
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-copper-light">
              Visit
            </h4>
            <ul className="space-y-3 text-sm text-parchment/80">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay-soft" />
                <span>
                  {siteSettings.address}
                  <br />
                  {siteSettings.city}
                </span>
              </li>
              <li className="pl-7 text-parchment/65">{siteSettings.hours}</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-copper-light">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-parchment/80">
              <li>
                <Link href="/shop" className="hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-copper-light">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-parchment/80">
              <li>
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Phone className="h-4 w-4 text-clay-soft" />
                  {siteSettings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="inline-flex items-start gap-2 hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-clay-soft" />
                  <span className="break-all">{siteSettings.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-parchment/50 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} Simply Sourdough · Lismore NSW</p>
        <p>Slow fermented · Stone milled · Made with care</p>
      </div>
    </footer>
  );
}
