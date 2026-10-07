"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function Header() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname === "/") return null;
  return (
    <div className="ss ss-chrome">
      <SiteHeader reserveSpace />
    </div>
  );
}
