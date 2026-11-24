import Link from "next/link";
import { deliverables, plans, site, type Plan } from "@/lib/site";
import CheckoutNotice from "./CheckoutNotice";

function BuyButton({ plan }: { plan: Plan }) {
  // Plain form post: the server creates a Stripe Checkout Session and redirects to it.
  return (
    <form action="/api/checkout" method="POST">
      <input type="hidden" name="plan" value={plan.id} />
      <button
        type="submit"
        className={`${plan.featured ? "btn-primary font-medium" : "btn-ghost text-white"} inline-flex w-full cursor-pointer items-center justify-center rounded-full px-5 py-3 text-center text-[14px]`}
        aria-describedby={`${plan.id}-billing ${plan.id}-consent`}
      >
        {plan.cta}
      </button>
    </form>
  );
}

function PlanColumn({ plan }: { plan: Plan }) {
  return (
    <div className={`relative flex flex-col p-7 sm:p-9 ${plan.featured ? "bg-ink-850" : "bg-ink-900"}`}>
      {plan.featured && (
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-400 to-transparent" />
      )}
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-medium text-white">{plan.name}</h3>
        {plan.featured && <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember-300">Recommended</span>}
      </div>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-400">{plan.cadenceLabel}</p>

      <p className="mt-8 flex items-baseline gap-2">
        <span className="display text-6xl text-white tabular">{plan.price}</span>
        <span className="text-sm text-ink-400">{plan.priceSuffix}</span>
      </p>
      <p className="mt-4 text-[14px] leading-relaxed text-ink-300">{plan.blurb}</p>

      <h4 className="sr-only">Included in {plan.name}</h4>
      <ul className="mt-8 flex-1 space-y-3 text-[14px] text-ink-200">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <svg aria-hidden viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 flex-none text-ember-400" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <p id={`${plan.id}-billing`} className="mt-10 border-t border-white/[0.07] pt-5 text-[12px] leading-relaxed text-ink-300">
        {plan.billing}
      </p>

      <div className="mt-5">
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
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Pricing</p>
          <h2 id="pricing-heading" className="display text-[2.4rem] leading-[1.05] sm:text-5xl md:text-6xl text-white">
            One suite. <span className="text-ink-400">Three ways to own it.</span>
          </h2>
          <p className="mt-6 text-ink-300">
            Every plan includes the full optimization suite and overlay tools. Pay once for a day, monthly, or once
            for life.
          </p>
        </div>

        <div className="mt-12"><CheckoutNotice /></div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/[0.08] ring-1 ring-white/[0.08] md:grid-cols-3">
          {plans.map((plan) => (
            <PlanColumn key={plan.id} plan={plan} />
          ))}
        </div>

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
                <>All prices in USD. Applicable taxes are calculated and shown at checkout before you pay.</>,
                <>
                  Secure checkout by Stripe. Charges appear on your statement as{" "}
                  <span className="font-mono text-ink-200 whitespace-nowrap">{site.statementDescriptor}</span>.
                </>,
                <>
                  Pro and Elite: full refund within 14 days of first purchase. Basic: refundable until activated.{" "}
                  <Link href="/refunds" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white">
                    Refund &amp; Cancellation Policy
                  </Link>
                </>,
                <>Cancel Pro anytime. You keep access until the end of the period you&rsquo;ve paid for.</>,
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
