import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Sense-Optimization home">
      <span
        aria-hidden
        className="logo-mark w-8 h-8 rounded-md flex items-center justify-center font-display font-semibold text-ink-950 text-[13px] tracking-tight"
      >
        CS
      </span>
      <span className="text-ink-200 font-medium tracking-tight">
        Sense<span className="text-ember-400">·</span>Optimization
      </span>
    </Link>
  );
}
