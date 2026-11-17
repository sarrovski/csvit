import Link from "next/link";
import Logo from "./Logo";

const nav = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#method", label: "Method" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 nav-blur bg-ink-950/75 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-[13px] text-ink-300">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#pricing"
          className="btn-primary inline-flex items-center rounded-full px-4 py-1.5 text-[13px] font-medium whitespace-nowrap"
        >
          Get Sense
        </Link>
      </div>
    </header>
  );
}
