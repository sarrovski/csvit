import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { addressSuffix, mailto, operatorName, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Sense Optimization builds Windows performance software that measures before it changes anything, keeps every change reversible, and proves the result.",
};

const principles = [
  {
    n: "01",
    title: "Measure before and after",
    body: "Every session starts with a baseline and ends with a second benchmark on the same machine. If a change doesn't show up in the numbers, it doesn't belong in your profile.",
  },
  {
    n: "02",
    title: "Nothing permanent",
    body: "Changes are applied as versioned profiles with a full audit log. One click restores your previous configuration, so trying Sense never puts your system at risk.",
  },
  {
    n: "03",
    title: "Plain pricing",
    body: "A one-time day pass, a monthly plan you can cancel anytime, or a lifetime license. The billing terms are written next to every button, and refunds are in a policy you can actually read.",
  },
  {
    n: "04",
    title: "Your machine, your data",
    body: "Telemetry is opt-in and anonymous. We don't sell personal data or use it for advertising, and card details never touch our servers. Payments go through Stripe.",
  },
];

const audiences = [
  {
    title: "Competitive players",
    body: "For people who feel every frame of input lag and want the whole chain from mouse to screen shorter and steadier.",
  },
  {
    title: "Streamers & creators",
    body: "For rigs that game, encode and broadcast at once, where background contention costs frames and the overlay has to look clean on stream.",
  },
  {
    title: "Studios & IT teams",
    body: "For anyone standardizing many workstations who needs configs that are documented, reversible and backed by a shareable report.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="horizon pointer-events-none absolute inset-x-0 top-0 h-[700px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-20 sm:pt-28 md:pt-36 md:pb-28">
          <p className="eyebrow mb-6">About us</p>
          <h1 className="display max-w-4xl text-[2.6rem] sm:text-6xl lg:text-7xl text-white">
            Performance tuning you can <span className="text-ink-400">prove.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-300">
            {site.name} makes Windows software that finds where a workstation loses time, applies changes you can
            undo, and shows the difference with a before-and-after benchmark. No guesswork, no &ldquo;trust
            us&rdquo;.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section aria-labelledby="why-heading" className="border-t border-white/[0.06] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Why we exist</p>
            <h2 id="why-heading" className="display text-3xl sm:text-5xl text-white">
              Most tuning advice <span className="text-ink-400">is folklore.</span>
            </h2>
          </div>
          <div className="space-y-5 text-[16px] leading-relaxed text-ink-300">
            <p>
              Search for &ldquo;how to reduce input lag&rdquo; and you&rsquo;ll find registry tweaks, service
              kill-lists and &ldquo;FPS boost&rdquo; scripts copied from forum to forum. Some help. Many do
              nothing. A few quietly break things, and almost none tell you how to undo them.
            </p>
            <p>
              We think a PC deserves the same discipline as any other engineering system. Measure first. Change one
              thing at a time. Keep a record. Verify the result. {site.name} turns that process into software,
              so anyone can tune a machine the careful way in under an hour.
            </p>
            {/* TODO: add your own founding story here (who started it, when and why) if you'd like to share it. */}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section aria-labelledby="principles-heading" className="border-t border-white/[0.06] bg-ink-900/50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow mb-5">How we work</p>
          <h2 id="principles-heading" className="display max-w-3xl text-3xl sm:text-5xl text-white">
            Four rules <span className="text-ink-400">we don&rsquo;t bend.</span>
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/[0.07] sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p.n} className="bg-ink-900 p-7 sm:p-9">
                <span className="font-mono text-[11px] text-ember-300">{p.n}</span>
                <h3 className="display mt-5 text-2xl text-white">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-300">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section aria-labelledby="who-heading" className="border-t border-white/[0.06] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow mb-5">Who it&rsquo;s for</p>
          <h2 id="who-heading" className="display max-w-3xl text-3xl sm:text-5xl text-white">
            Built for people who <span className="text-ink-400">notice the difference.</span>
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {audiences.map((a) => (
              <div key={a.title} className="border-t border-white/[0.1] pt-6">
                <h3 className="text-[17px] font-medium text-white">{a.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-300">{a.body}</p>
              </div>
            ))}
          </div>
          <Link
            href="/#capabilities"
            className="mt-12 inline-flex items-center gap-2 text-[14px] text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            See what Sense does <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* COMPANY & CONTACT */}
      <section aria-labelledby="company-heading" className="border-t border-white/[0.06] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="panel grid gap-10 rounded-2xl p-7 sm:p-10 md:grid-cols-[auto_1fr_1fr] md:items-start">
            <LogoMark className="h-10 w-auto" />
            <div>
              <h2 id="company-heading" className="eyebrow mb-4">The company</h2>
              <p className="text-[15px] leading-relaxed text-ink-300">
                Operated by <span className="text-white">{operatorName}</span>{addressSuffix}.
                {site.registration && <> Registration: {site.registration}.</>}
              </p>
              <p className="mt-4 text-[14px] text-ink-400">
                <Link href="/terms" className="underline underline-offset-2 hover:text-white">Terms</Link>
                {" · "}
                <Link href="/refunds" className="underline underline-offset-2 hover:text-white">Refunds</Link>
                {" · "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-white">Privacy</Link>
              </p>
            </div>
            <div>
              <h2 className="eyebrow mb-4">Talk to us</h2>
              <p className="text-[15px] leading-relaxed text-ink-300">
                Questions, feedback, volume licensing or press. A real person reads every email and replies{" "}
                {site.supportResponseTime}.
              </p>
              <a
                href={mailto("Hello from the About page")}
                className="btn-ghost mt-5 inline-flex rounded-full px-5 py-2.5 text-[14px] text-white"
              >
                {site.supportEmail}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32">
        <div aria-hidden className="horizon pointer-events-none absolute inset-0 opacity-80" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="display text-4xl sm:text-6xl text-white">
            See it on <span className="text-ink-400">your machine.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-ink-300">Start with a $4 day pass, or go monthly or lifetime.</p>
          <Link
            href="/#pricing"
            className="btn-primary mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium"
          >
            Choose a plan <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
