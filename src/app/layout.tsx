import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Simply Sourdough · Artisan Bakery Lismore",
    template: "%s · Simply Sourdough",
  },
  description:
    "Beautiful breads and delightful buns inspired by Sweden. Artisan sourdough bakery in Lismore NSW — slow fermented, naturally made.",
  openGraph: {
    title: "Simply Sourdough",
    description: "Beautiful breads & delightful buns inspired by Sweden",
    url: "https://simplysourdough.shop",
    siteName: "Simply Sourdough",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${body.variable} ${display.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
