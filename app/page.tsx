import Link from "next/link";
import Pricing from "@/components/Pricing";
import { CoreMap, LatencyWaterfall, OverlayPreview, ProductWindow } from "@/components/visuals";
import { mailto, site } from "@/lib/site";

const stats = [
  { value: "−38%", label: "Avg. input latency" },
  { value: "+22%", label: "1% low FPS" },
  { value: "14k+", label: "Active workstations" },
  { value: "4.9/5", label: "User rating" },
];

const compat = ["Windows 10 21H2+", "Windows 11", "x64", "OBS & Streamlabs", "One-click rollback"];

const capabilities = [
  {
    id: "process",
    kicker: "Process optimization",
    title: "Threads where they belong.",
    body: "Sense maps every running process to your CPU topology, pins the foreground workload to performance cores, and pushes background services out of its way, so throughput stays predictable under load.",
    points: ["Real-time CPU affinity profiles", "Background service auditing", "Thermal & power plan tuning"],
    visual: <CoreMap />,
  },
  {
    id: "latency",
    kicker: "Input lag reduction",
    title: "A shorter path from hand to screen.",
    body: "Latency is measured stage by stage, from USB polling through the OS queue, simulation, render and display, so every change targets the part of the chain that is actually slow.",
    points: ["Polling rate calibration", "Frame pacing diagnostics", "Display pipeline review"],
    visual: <LatencyWaterfall />,
  },
  {
    id: "overlay",
    kicker: "Custom overlays",
    title: "Signal, not noise.",
    body: "A capture-friendly overlay for FPS, frametime, temperatures and memory pressure. Lay it out the way you read it, show it per scene, and export every session to CSV.",
    points: ["Live sensor monitoring", "Custom layout presets", "CSV export for analysis"],
    visual: <OverlayPreview />,
  },
];

const method = [
  {
    n: "01",
    title: "Baseline",
    body: "A full diagnostic of scheduling, memory timings, storage latency and network jitter. You see the report before anything changes.",
  },
  {
    n: "02",
    title: "Tune",
    body: "Changes are applied as versioned, reversible profiles. Each one is logged and can be rolled back from the control panel in one click.",
  },
  {
    n: "03",
    title: "Verify",
    body: "A second benchmark pass measures the difference on your machine and produces a shareable before/after report.",
  },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is it compatible with Windows 11?",
    a: "Yes. Sense supports Windows 10 (21H2+) and Windows 11 on x64 hardware. Profiles are tested on both and updated when Microsoft ships major servicing updates.",
  },
  {
    q: "How is the software delivered?",
    a: "Digitally. Right after payment you receive an email with your license key and a download link, plus a Stripe receipt. Nothing is shipped.",
  },
  {
    q: "Are the changes reversible?",
    a: "Every profile is applied through a versioned system. One click restores your previous configuration, and a full audit log of every change is kept.",
  },
  {
    q: "Will the overlay work with streaming software?",
    a: "Yes. The overlay renders on a capture-friendly layer that works with OBS, Streamlabs and similar tools, and can be toggled per scene.",
  },
  {
    q: "Which plans renew automatically?",
    a: "Only Pro, billed $19 every month until you cancel. Basic ($4, 24 hours) and Elite ($249, lifetime) are one-time payments that never renew.",
  },
  {
    q: "How do I cancel?",
    a: (
      <>
        From your account dashboard, or by emailing{" "}
        <a href={mailto("Cancel my subscription")} className="text-ember-300 underline underline-offset-2 [overflow-wrap:anywhere]">
          {site.supportEmail}
        </a>
        . You won&rsquo;t be charged again and keep access until the end of the period you&rsquo;ve paid for.
      </>
    ),
  },
  {
    q: "What is the refund policy?",
    a: (
      <>
        Pro and Elite: a full refund within 14 days of your first purchase, no questions asked. Basic passes are
        refundable until activated. Details in the{" "}
        <Link href="/refunds" className="text-ember-300 underline underline-offset-2">
          Refund &amp; Cancellation Policy
        </Link>
        .
      </>
    ),
  },
  {
    q: "Do you offer volume licensing?",
    a: (
      <>
        Yes. For 10+ workstations we offer discounted licenses and centralized deployment. Email{" "}
        <a href={mailto("Volume licensing")} className="text-ember-300 underline underline-offset-2 [overflow-wrap:anywhere]">
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

function SectionHeading({ eyebrow, title, muted }: { eyebrow: string; title: string; muted: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h2 className="display text-[2.4rem] leading-[1.05] sm:text-5xl md:text-6xl text-white">
        {title} <span className="text-ink-400">{muted}</span>
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="horizon pointer-events-none absolute inset-x-0 top-0 h-[900px]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 md:pt-36 text-center">
          <p className="eyebrow rise inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 ring-inset ring-white/10" style={{ animationDelay: ".05s" }}>
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ember-400" />
            Performance software for Windows
          </p>

          <h1
            className="display rise mx-auto mt-8 max-w-5xl text-[2.6rem] sm:text-6xl lg:text-[5.25rem] text-white"
            style={{ animationDelay: ".12s" }}
          >
            Every millisecond, <span className="text-ink-400">accounted&nbsp;for.</span>
          </h1>

          <p className="rise mx-auto mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-ink-300" style={{ animationDelay: ".22s" }}>
            Sense measures where your workstation loses time, then applies reversible tuning profiles and proves
            the result with a before-and-after benchmark.
          </p>

          <div className="rise mt-10 flex flex-wrap justify-center gap-3" style={{ animationDelay: ".32s" }}>
            <Link href="/#pricing" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium">
              Choose a plan <Arrow />
            </Link>
            <Link href="/#method" className="btn-ghost inline-flex items-center rounded-full px-6 py-3 text-[15px] text-ink-200">
              How it works
            </Link>
          </div>
          <p className="rise mt-5 font-mono text-[11px] text-ink-400" style={{ animationDelay: ".38s" }}>
            $4 day pass · $19/month · $249 lifetime
          </p>

          <div className="rise relative mt-16 sm:mt-20" style={{ animationDelay: ".45s" }}>
            <ProductWindow />
            <p className="mt-4 font-mono text-[11px] text-ink-400">Illustrative interface. Results vary by hardware and workload.</p>
          </div>

          <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.07] border-y border-white/[0.07]">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse items-center bg-ink-950 py-7 sm:py-9">
                <dt className="mt-2 eyebrow">{s.label}</dt>
                <dd className="display text-4xl sm:text-5xl text-white tabular">{s.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">
            {compat.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" aria-labelledby="cap-heading" className="scroll-mt-14 py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div id="cap-heading">
            <SectionHeading eyebrow="Capabilities" title="Three instruments." muted="One discipline: measured performance." />
          </div>

          <div className="mt-20 md:mt-28 space-y-24 md:space-y-36">
            {capabilities.map((c, i) => (
              <article key={c.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember-300">
                    0{i + 1} · {c.kicker}
                  </p>
                  <h3 className="display mt-4 text-3xl sm:text-4xl leading-tight text-white">{c.title}</h3>
                  <p className="mt-5 max-w-md leading-relaxed text-ink-300">{c.body}</p>
                  <ul className="mt-8 max-w-md border-t border-white/[0.07]">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-center justify-between border-b border-white/[0.07] py-3 text-[14px] text-ink-200">
                        {p}
                        <span aria-hidden className="h-1 w-1 rounded-full bg-ember-400" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={i % 2 ? "lg:order-1" : ""}>{c.visual}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="method" aria-labelledby="method-heading" className="scroll-mt-14 border-t border-white/[0.06] bg-ink-900/50 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div id="method-heading">
            <SectionHeading eyebrow="Method" title="Baseline. Tune. Verify." muted="Under an hour, start to finish." />
          </div>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/[0.07] md:grid-cols-3">
            {method.map((m) => (
              <li key={m.n} className="bg-ink-900 p-7 sm:p-9">
                <span className="font-mono text-[11px] text-ember-300">{m.n}</span>
                <h3 className="display mt-6 text-2xl text-white">{m.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-300">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Pricing />

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-14 border-t border-white/[0.06] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">FAQ</p>
            <h2 id="faq-heading" className="display text-4xl sm:text-5xl leading-tight text-white">
              Questions, <span className="text-ink-400">answered.</span>
            </h2>
            <p className="mt-6 max-w-sm text-ink-300 leading-relaxed">
              Something else? Email{" "}
              <a href={mailto("Question")} className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white [overflow-wrap:anywhere]">
                {site.supportEmail}
              </a>
              . We reply {site.supportResponseTime}.
            </p>
          </div>
          <div className="border-t border-white/[0.07]">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-white/[0.07]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-white [&::-webkit-details-marker]:hidden">
                  <span className="text-[15px]">{f.q}</span>
                  <span aria-hidden className="relative h-3 w-3 flex-none">
                    <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink-300" />
                    <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink-300 transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <div className="pb-6 pr-8 text-[14px] leading-relaxed text-ink-300">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-28 md:py-40">
        <div aria-hidden className="horizon pointer-events-none absolute inset-0 opacity-80" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="display text-5xl sm:text-6xl md:text-7xl leading-[1] text-white">
            Measure first. <span className="text-ink-400">Then tune.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-ink-300">Install, benchmark, tune, verify, all within an hour.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/#pricing" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium">
              Choose a plan <Arrow />
            </Link>
            <a href={mailto("Question before buying")} className="btn-ghost inline-flex items-center rounded-full px-6 py-3 text-[15px] text-ink-200">
              Ask a question
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
