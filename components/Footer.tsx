import Link from "next/link";
import Logo from "./Logo";
import { addressSuffix, mailto, operatorName, site } from "@/lib/site";

const columns = [
  {
    id: "product",
    title: "Product",
    links: [
      { href: "/#capabilities", label: "Capabilities" },
      { href: "/#method", label: "Method" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
      { href: "/about", label: "About us" },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/refunds", label: "Refund Policy" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-ink-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-ink-400">
              Measured, reversible performance tuning and hardware monitoring for Windows. Delivered digitally.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.id} aria-labelledby={`footer-${col.id}`}>
              <h2 id={`footer-${col.id}`} className="eyebrow mb-4">
                {col.title}
              </h2>
              <ul className="space-y-2.5 text-[14px] text-ink-300">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="eyebrow mb-4">Support</h2>
            <a
              href={mailto("Support request")}
              className="btn-ghost inline-flex items-center rounded-full px-4 py-2 text-[13px] text-white"
            >
              Contact Support
            </a>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-400">
              <span className="[overflow-wrap:anywhere]">{site.supportEmail}</span>
              <br />
              Replies {site.supportResponseTime}.
            </p>
          </div>
        </div>

        {/* Business identity notice */}
        <div className="mt-14 border-t border-white/[0.06] pt-8 grid gap-6 text-[12px] leading-relaxed text-ink-400 md:grid-cols-2">
          <p>
            Operated by <span className="text-ink-200">{operatorName}</span>{addressSuffix}.
            {site.registration && <> Registration: {site.registration}.</>}
          </p>
          <p>
            Payments are processed securely by Stripe. Charges appear on your card statement as{" "}
            <span className="font-mono text-ink-200 whitespace-nowrap">{site.statementDescriptor}</span>.
          </p>
        </div>

        <p className="mt-8 font-mono text-[11px] text-ink-400">
          © {year} {site.legalEntity}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
