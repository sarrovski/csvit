import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/cs-logo.png";

/** The CS brand mark. Height-driven; width follows the logo's aspect ratio. */
export function LogoMark({ className = "h-6 w-auto" }: { className?: string }) {
  return <Image src={logo} alt="" aria-hidden priority className={className} sizes="80px" />;
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Sense Optimization home">
      <LogoMark />
      <span className="text-[15px] font-medium tracking-tight text-white">
        Sense<span className="text-ink-400 font-normal">Optimization</span>
      </span>
    </Link>
  );
}
