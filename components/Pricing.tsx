import Link from "next/link";
import { deliverables, plans, REFUND_WINDOW_MIN_DAYS, site, type Plan } from "@/lib/site";
import CheckoutNotice from "./CheckoutNotice";
import CustomPass from "./CustomPass";

function BuyButton({ plan }: { plan: Plan }) {
  // Submits the shared checkout form (email + this plan); the server then redirects to Stripe.
  return (
    <button
      type="submit"
      name="plan"
      value={plan.id}
      className={`${plan.featured ? "btn-primary font-medium" : "btn-ghost text-white"} inline-flex w-full cursor-pointer items-center justify-center rounded-full px-4 py-3 text-center text-[13px]`}
      aria-describedby={`${plan.id}-billing ${plan.id}-consent checkout-email-hint`}
    >
      {plan.cta}
    </button>
  );
}

function EmailField() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-ink-900 p-5 sm:p-6 ring-1 ring-white/[0.08]">
      <label htmlFor="checkout-email" className="flex items-center gap-2 text-[14px] font-medium text-white">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ember-500/15 font-mono text-[11px] text-ember-300 ring-1 ring-inset ring-ember-500/30">
          1
        </span>
        Your email
      </label>
      <input
        id="checkout-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        maxLength={254}
        placeholder="you@example.com"
        aria-describedby="checkout-email-hint"
        className="mt-3 w-full rounded-xl bg-ink-950 px-4 py-3 text-[15px] text-white placeholder:text-ink-500 ring-1 ring-inset ring-white/12 outline-none transition focus:ring-2 focus:ring-ember-400"
      />
      <p id="checkout-email-hint" className="mt-2 text-[12px] leading-relaxed text-ink-400">
        Your license key, download link and receipt are sent here. Then pick a pass below.
      </p>
    </div>
  );
}

function PlanColumn({ plan, last }: { plan: Plan; last: boolean }) {
  const perDay = plan.days ? plan.amountCents / 100 / plan.days : null;
  return (
    <div
      className={`relative flex flex-col p-6 sm:p-7 ${plan.featured ? "bg-ink-850" : "bg-ink-900"} ${
        last ? "sm:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {plan.featured && (
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-400 to-transparent" />
      )}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[15px] font-medium text-white">{plan.name}</h3>
        {plan.featured && <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ember-300">Popular</span>}
      </div>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-400">{plan.cadenceLabel}</p>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="display text-5xl text-white tabular">{plan.price}</span>
        <span className="text-[13px] text-ink-400">one-time</span>
      </p>
      <p className="mt-1 h-4 font-mono text-[11px] text-ink-400">
        {perDay ? `≈ $${perDay.toFixed(2)} per day` : "Never expires"}
      </p>
      <p className="mt-4 text-[13px] leading-relaxed text-ink-300">{plan.blurb}</p>

      <h4 className="sr-only">Included in {plan.name}</h4>
      <ul className="mt-6 flex-1 space-y-2.5 text-[13px] text-ink-200">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <svg aria-hidden viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 flex-none text-ember-400" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <p id={`${plan.id}-billing`} className="mt-8 border-t border-white/[0.07] pt-4 text-[11.5px] leading-relaxed text-ink-300">
        {plan.billing}
      </p>

      <div className="mt-4">
        <BuyButton plan={plan} />
      </div>

      <p id={`${plan.id}-consent`} className="mt-3 text-center text-[11px] leading-relaxed text-ink-400">
        By purchasing you agree to the{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:text-white">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/refunds" className="underline underline-offset-2 hover:text-white">
          Refund Policy
        </Link>
        .
      </p>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative scroll-mt-14 border-t border-white/[0.06] py-24 md:py-36">
      <div aria-hidden className="horizon pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-70" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Pricing</p>
          <h2 id="pricing-heading" className="display text-[2.4rem] leading-[1.05] sm:text-5xl md:text-6xl text-white">
            Pay once. <span className="text-ink-400">Nothing renews.</span>
          </h2>
          <p className="mt-6 text-ink-300">
            Every pass includes the full optimization suite and overlay tools. Choose how long you need it, or build
            your own. No subscriptions, no automatic charges.
          </p>
        </div>

        <div className="mt-12"><CheckoutNotice /></div>

        {/* One form for every pass: the clicked button sends its plan, the email goes along with it. */}
        <form action="/api/checkout" method="POST">
          <div className="mt-4">
            <EmailField />
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/[0.08] ring-1 ring-white/[0.08] sm:grid-cols-2 lg:grid-cols-5">
            {plans.map((plan, i) => (
              <PlanColumn key={plan.id} plan={plan} last={i === plans.length - 1} />
            ))}
          </div>

          <div id="custom" className="mt-6 scroll-mt-20">
            <CustomPass />
          </div>
        </form>

        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-white/[0.07] ring-1 ring-white/[0.07] md:grid-cols-2">
          <div className="bg-ink-900 p-7 sm:p-9">
            <h3 className="eyebrow mb-5">What you receive</h3>
            <ul className="space-y-3 text-[14px] text-ink-300">
              {deliverables.map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-ember-400" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink-900 p-7 sm:p-9">
            <h3 className="eyebrow mb-5">Billing &amp; refunds</h3>
            <ul className="space-y-3 text-[14px] text-ink-300">
              {[
                <>Every plan is a single payment in USD. Nothing renews and you are never charged again automatically.</>,
                <>Applicable taxes are calculated and shown at checkout before you pay.</>,
                <>
                  Secure checkout by Stripe. Charges appear on your statement as{" "}
                  <span className="font-mono text-ink-200 whitespace-nowrap">{site.statementDescriptor}</span>.
                </>,
                <>
                  Passes of {REFUND_WINDOW_MIN_DAYS} days or more and Lifetime: full refund within 14 days of purchase.
                  Shorter passes: refundable until activated.{" "}
                  <Link href="/refunds" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white">
                    Refund Policy
                  </Link>
                </>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-ink-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
