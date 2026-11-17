import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sense-Optimization: Elevate Your System Performance",
    template: "%s · Sense-Optimization",
  },
  description:
    "Performance tuning and hardware-monitoring overlay software for Windows. Daily pass, monthly subscription, or lifetime license.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="grain relative overflow-x-hidden">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div aria-hidden className="pointer-events-none fixed inset-0 ember-glow z-0" />
        <Header />
        <main id="content" className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
