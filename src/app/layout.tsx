import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Serif_Display, Inter, Manrope, Tenor_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import "./globals.css";
import "./brochure.css";

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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const serif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const tenor = Tenor_Sans({
  variable: "--font-tenor",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Simply Sourdough · Artisan Sourdough & Swedish Buns, Lismore",
    template: "%s · Simply Sourdough",
  },
  description:
    "Artisan sourdough and Swedish buns, baked fresh in Lismore. Stone baked, slow fermented, inside Embassy Arcade.",
  icons: {
    icon: [{ url: "/brand/mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/mark.svg" }],
    shortcut: "/brand/mark.svg",
  },
  openGraph: {
    title: "Simply Sourdough",
    description:
      "Artisan sourdough and Swedish buns, baked fresh in Lismore. Stone baked, slow fermented, inside Embassy Arcade.",
    url: "https://simplysourdough.shop",
    siteName: "Simply Sourdough",
    locale: "en_AU",
    type: "website",
    images: [{ url: "/brand/mark.svg", alt: "Simply Sourdough" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${body.variable} ${display.variable} ${inter.variable} ${serif.variable} ${tenor.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
