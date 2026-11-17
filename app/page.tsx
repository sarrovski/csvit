import Link from "next/link";
import Pricing from "@/components/Pricing";
import { mailto, site } from "@/lib/site";

const stats = [
  { value: "-38", unit: "%", label: "avg. input latency" },
  { value: "+22", unit: "%", label: "1% low FPS" },
  { value: "14k+", unit: "", label: "active workstations" },
  { value: "4.9", unit: "/5", label: "user rating" },
];

const services = [
  {
    n: "01",
    title: "Process Optimization",
    body: "Intelligent process prioritization and CPU affinity management. We identify contention from background services and schedule threads for sustained, predictable throughput under load.",
    bullets: ["Real-time CPU affinity profiles", "Background service auditing", "Thermal & power plan tuning"],
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    n: "02",
    title: "Input Lag Reduction",
    body: "End-to-end latency auditing, from USB polling to display pipeline. The software measures each stage and tunes the stack so what you do at the peripheral reaches the screen faster.",
    bullets: ["Polling rate calibration", "Frame pacing diagnostics", "Display pipeline review"],
    icon: <path d="M4 12h4l2-7 4 14 2-7h4" />,
  },
  {
    n: "03",
    title: "Custom Overlays",
    body: "Configurable hardware-monitoring overlays: FPS, frametime, CPU/GPU temps, memory pressure. Clean, unobtrusive, and built for streamers and technicians who want signal, not noise.",
    bullets: ["Live sensor monitoring", "Custom layout presets", "CSV export for analysis"],
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M7 20h10M12 16v4" />
      </>
    ),
  },
];

const steps = [
  {
    title: "Baseline audit",
    body: "The app runs a full diagnostic: CPU scheduling, memory timings, storage latency, network jitter. You get a complete report before anything is modified.",
  },
  {
    title: "Targeted tuning",
    body: "Configurations are applied in reversible profiles. Each change is logged, documented, and can be rolled back instantly from the control panel.",
  },
  {
    title: "Verified uplift",
    body: "A second benchmark pass confirms the delta. Results are summarized in a shareable report, useful for studios validating workstation configs at scale.",
  },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is Sense-Optimization compatible with Windows 11?",
    a: "Yes. We support Windows 10 (21H2+) and Windows 11 on x64 hardware. All tuning profiles are tested against both platforms and updated when Microsoft ships major servicing updates.",
  },
  {
    q: "How is the software delivered?",
    a: "Digitally. Right after payment you receive an email with your license key and a download link, plus a Stripe receipt. Nothing is shipped.",
  },
  {
    q: "Are the changes reversible?",
    a: "Every profile is applied through a versioned, reversible system. A single click restores your machine to its prior configuration, and a full audit log of every change is kept.",
  },
  {
    q: "Will the overlay work with streaming software?",
    a: "The overlay renders through a standard capture-friendly layer and is compatible with OBS, Streamlabs, and similar broadcast tools. You can toggle visibility per scene.",
  },
  {
    q: "Which plans renew automatically?",
    a: "Only Pro. It is billed $19 every month until you cancel. Basic ($4, 24 hours) and Elite ($249, lifetime) are one-time payments that never renew.",
  },
  {
    q: "How do I cancel my subscription?",
    a: (
      <>
        Cancel anytime from your account dashboard or by emailing{" "}
        <a href={mailto("Cancel my subscription")} className="text-ember-300 underline underline-offset-2 break-all">
          {site.supportEmail}
        </a>
        . You won&rsquo;t be charged again, and you keep access until the end of the period you&rsquo;ve paid for.
      </>
    ),
  },
  {
    q: "How does the refund policy work?",
    a: (
      <>
        Pro and Elite: contact support within 14 days of your first purchase for a full refund, no questions
        asked. Basic 24-hour passes can be refunded until they&rsquo;re activated. Full details are in our{" "}
        <Link href="/refunds" className="text-ember-300 underline underline-offset-2">
          Refund &amp; Cancellation Policy
        </Link>
        .
      </>
    ),
  },
  {
    q: "Do you offer volume licensing for studios?",
    a: (
      <>
        Yes. For teams of 10+ workstations we offer discounted licenses and centralized deployment. Email{" "}
        <a href={mailto("Volume licensing")} className="text-ember-300 underline underline-offset-2 break-all">
          {site.supportEmail}
        </a>{" "}
        for a quote.
      </>
    ),
  },
];

const Arrow = () => (
  <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-20 pb-24 md:pt-36 md:pb-40">
        <div aria-hidden className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative">
          <div className="flex items-center gap-3 mb-8 rise" style={{ animationDelay: ".05s" }}>
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-ember-400" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ember-400" />
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-ink-300 font-mono">
              Windows performance software · v3.2
            </span>
          </div>

          <h1
            className="display text-5xl sm:text-6xl lg:text-8xl font-light text-white leading-[0.95] max-w-5xl rise"
            style={{ animationDelay: ".1s" }}
          >
            Elevate your <span className="italic font-normal text-ember-300">system</span> performance.
          </h1>

          <p className="mt-8 max-w-xl text-lg text-ink-300 leading-relaxed rise" style={{ animationDelay: ".25s" }}>
            Downloadable tuning and monitoring software for Windows workstations. It reduces background
            contention, trims input latency, and surfaces the metrics that actually matter, so your hardware
            performs the way it was specced to.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 rise" style={{ animationDelay: ".35s" }}>
            <Link
              href="/#pricing"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-semibold"
            >
              See plans &amp; pricing
              <Arrow />
            </Link>
            <Link
              href="/#how"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-white/15 text-ink-200 font-medium"
            >
              How it works
            </Link>
          </div>

          <dl
            className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-lg overflow-hidden rise"
            style={{ animationDelay: ".5s" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-ink-950 p-5 sm:p-6 flex flex-col-reverse">
                <dt className="mt-2 text-xs uppercase tracking-wider text-ink-400 font-mono">{s.label}</dt>
                <dd className="display text-3xl sm:text-4xl text-white tabular">
                  {s.value}
                  {s.unit && <span className="text-ember-400 text-xl sm:text-2xl">{s.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" aria-labelledby="services-heading" className="py-24 md:py-36 relative border-t border-white/5 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14 md:mb-16">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-ember-400 font-mono mb-5">— 01 / services</p>
              <h2 id="services-heading" className="display text-4xl md:text-6xl text-white font-light leading-tight">
                Three tools. One discipline: <span className="italic text-ember-300">measured performance.</span>
              </h2>
            </div>
            <p className="text-ink-300 max-w-sm">
              Every tool ships with before/after benchmarks, so you can see the difference on your own machine.
              Pro and Elite include a 14-day, no-questions-asked refund window.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {services.map((s) => (
              <article
                key={s.n}
                className="card group relative rounded-xl bg-ink-900/60 border border-white/5 p-6 sm:p-8 overflow-hidden"
              >
                <div aria-hidden className="absolute inset-0 ember-glow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs text-ink-400">{s.n}</span>
                    <svg aria-hidden width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff8533" strokeWidth="1.4">
                      {s.icon}
                    </svg>
                  </div>
                  <h3 className="display text-2xl text-white mb-3">{s.title}</h3>
                  <p className="text-ink-300 text-sm leading-relaxed mb-8">{s.body}</p>
                  <ul className="space-y-2 text-sm text-ink-200">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span aria-hidden className="text-ember-400">→</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" aria-labelledby="how-heading" className="py-24 md:py-36 border-t border-white/5 bg-ink-900/30 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-ember-400 font-mono mb-5">— 02 / workflow</p>
          <h2 id="how-heading" className="display text-4xl md:text-5xl text-white font-light leading-tight max-w-3xl mb-14 md:mb-20">
            A clear, three-step path from baseline to benchmark.
          </h2>
          <ol className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <li key={step.title}>
                <div aria-hidden className="display text-6xl text-ember-400/50 mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-white text-xl mb-3 font-medium">{step.title}</h3>
                <p className="text-ink-300 text-sm leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Pricing />

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="py-24 md:py-36 border-t border-white/5 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-ember-400 font-mono mb-5">— 04 / common questions</p>
          <h2 id="faq-heading" className="display text-4xl md:text-5xl text-white font-light leading-tight mb-12 md:mb-14">
            Things people ask us.
          </h2>
          <div className="divide-y divide-white/5 border-y border-white/5">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-white font-medium">{f.q}</span>
                  <span aria-hidden className="text-ember-400 text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-4 text-ink-300 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 border-t border-white/5 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 ember-glow pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center relative">
          <h2 className="display text-4xl md:text-6xl text-white font-light leading-tight">
            Ready to see <span className="italic text-ember-300">real numbers?</span>
          </h2>
          <p className="mt-6 text-ink-300 max-w-lg mx-auto">
            Install, benchmark, tune, verify. The whole loop takes less than an hour.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link href="/#pricing" className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-semibold">
              Choose a plan
              <Arrow />
            </Link>
            <a
              href={mailto("Question before buying")}
              className="btn-ghost inline-flex items-center px-6 py-3.5 rounded-md border border-white/15 text-ink-200 font-medium"
            >
              Ask a question
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
