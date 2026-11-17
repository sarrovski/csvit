import Link from "next/link";
import Logo from "./Logo";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 nav-blur bg-ink-950/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm text-ink-300">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white transition">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#pricing"
          className="inline-flex items-center px-4 py-2 rounded-md btn-primary text-sm font-semibold whitespace-nowrap"
        >
          View plans
        </Link>
      </div>
    </header>
  );
}
