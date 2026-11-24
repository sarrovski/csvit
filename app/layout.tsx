import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

// Archivo: one grotesk family; its width axis gives expanded, engineered headlines.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

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
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="grain relative overflow-x-hidden">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="content" className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
