import Link from "next/link";
import Logo from "./Logo";
import { mailto, site } from "@/lib/site";

const productLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/refunds", label: "Refund & Cancellation Policy" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-ink-950 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 mb-12">
          <div className="sm:col-span-2">
            <div className="mb-5">
              <Logo />
            </div>
            <p className="text-ink-400 text-sm max-w-sm leading-relaxed">
              Measured, reversible system tuning and hardware-monitoring software for Windows,
              delivered digitally.
            </p>
          </div>

          <nav aria-labelledby="footer-product">
            <h2 id="footer-product" className="text-white text-sm font-medium mb-4">
              Product
            </h2>
            <ul className="space-y-3 text-sm text-ink-400">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-legal">
            <h2 id="footer-legal" className="text-white text-sm font-medium mb-4">
              Legal &amp; support
            </h2>
            <ul className="space-y-3 text-sm text-ink-400">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={mailto("Support request")} className="hover:text-white transition">
                  Contact Support
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Business identity notice */}
        <div className="rounded-lg border border-white/5 bg-ink-900/60 p-5 mb-8 text-xs leading-relaxed text-ink-400">
          <p>
            <span className="text-ink-200">{site.name}</span> is a software product operated by{" "}
            <span className="text-ink-200">{site.legalEntity}</span>, {site.address}. Registration:{" "}
            {site.registration}.
          </p>
          <p className="mt-2">
            Payments are processed securely by Stripe. Charges appear on your card statement as{" "}
            <span className="font-mono text-ink-200">{site.statementDescriptor}</span>. Questions about a
            charge? Email{" "}
            <a href={mailto("Billing question")} className="text-ember-300 underline underline-offset-2 break-all">
              {site.supportEmail}
            </a>{" "}
            (we reply {site.supportResponseTime}).
          </p>
        </div>

        <div className="h-divider mb-6" />

        <p className="text-xs text-ink-400 font-mono">
          © {year} {site.legalEntity}. {site.name} is a trade name of {site.legalEntity}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
