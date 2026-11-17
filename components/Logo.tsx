import Link from "next/link";

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="lm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d1d24" />
          <stop offset="1" stopColor="#0d0d10" />
        </linearGradient>
        <linearGradient id="lm-sig" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffa363" />
          <stop offset="1" stopColor="#f56a14" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="url(#lm-bg)" stroke="rgba(255,255,255,0.12)" />
      {/* noisy signal settling into a clean line */}
      <path
        d="M5 18 L8 12 L10 21 L12.5 13 L14.5 18 L17 16.5 L27 16.5"
        fill="none"
        stroke="url(#lm-sig)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Sense-Optimization home">
      <LogoMark />
      <span className="text-[15px] font-medium tracking-tight text-white">
        Sense<span className="text-ink-400 font-normal">Optimization</span>
      </span>
    </Link>
  );
}
