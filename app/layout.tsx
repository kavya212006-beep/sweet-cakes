import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { AppProviders, LiveChatWidget, SiteFooter, SiteHeader } from "@/components/site-shell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: {
    default: "Sweet Delights | Luxury Cake Atelier",
    template: "%s | Sweet Delights",
  },
  description:
    "Sweet Delights is a premium, modern cake shop e-commerce experience for luxury birthday, wedding, anniversary, designer, and custom cakes.",
  keywords: ["cake shop", "luxury bakery", "custom cakes", "premium desserts", "Sweet Delights"],
  openGraph: {
    title: "Sweet Delights | Luxury Cake Atelier",
    description: "Premium cake shop with custom cakes, catalog, checkout, tracking, and admin dashboard.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} min-h-screen bg-[color:var(--bg)] text-white antialiased`}>
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <LiveChatWidget />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
