import Link from "next/link";
import { deliverables, mailto, plans, site, type Plan } from "@/lib/site";

function BuyButton({ plan }: { plan: Plan }) {
  // Stripe Payment Link when configured; otherwise a pre-filled email so the button never dead-ends.
  const href = plan.checkoutUrl || mailto(`Purchase: ${plan.name}`);
  const style = plan.featured
    ? "btn-primary font-semibold"
    : "btn-ghost border border-white/15 text-white font-medium";

  return (
    <a
      href={href}
      className={`${style} w-full inline-flex justify-center items-center text-center px-5 py-3 rounded-md`}
      aria-describedby={`${plan.id}-billing ${plan.id}-consent`}
    >
      {plan.cta}
    </a>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-3 mb-6">
        <h3 className="font-medium text-white tracking-tight">{plan.name}</h3>
        <span
          className={`text-[11px] font-mono uppercase tracking-wider text-right ${
            plan.featured ? "text-ember-300" : "text-ink-400"
          }`}
        >
          {plan.cadenceLabel}
        </span>
      </div>
      <p className="mb-2">
        <span className="display text-5xl text-white tabular">{plan.price}</span>
        <span className="text-ink-400 text-sm ml-1.5">{plan.priceSuffix}</span>
      </p>
      <p className="text-sm text-ink-300 mb-8">{plan.blurb}</p>

      <h4 className="sr-only">Included in {plan.name}</h4>
      <ul className="space-y-3 text-sm text-ink-200 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span aria-hidden className="text-ember-400 mt-0.5">
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      <p
        id={`${plan.id}-billing`}
        className="mb-4 rounded-md border border-white/10 bg-ink-950/60 px-3 py-2.5 text-xs leading-relaxed text-ink-300"
      >
        <span className="font-mono uppercase tracking-wider text-ink-400 block mb-1">Billing</span>
        {plan.billing}
      </p>

      <BuyButton plan={plan} />

      <p id={`${plan.id}-consent`} className="mt-3 text-[11px] leading-relaxed text-ink-400 text-center">
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
    </>
  );

  if (plan.featured) {
    return (
      <div className="featured-ring rounded-xl relative">
        <div className="rounded-xl bg-ink-900 p-6 sm:p-8 flex flex-col h-full relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ember-500 text-ink-950 text-[10px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap">
            Most popular
          </div>
          {body}
        </div>
      </div>
    );
  }

  return <div className="card rounded-xl bg-ink-900/60 border border-white/5 p-6 sm:p-8 flex flex-col">{body}</div>;
}

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 md:py-36 relative scroll-mt-16">
      <div aria-hidden className="absolute inset-0 ember-glow pointer-events-none opacity-60" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative">
        <div className="text-center mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-ember-400 font-mono mb-5">— 03 / pricing</p>
          <h2 id="pricing-heading" className="display text-4xl md:text-6xl text-white font-light leading-tight">
            Simple plans. <span className="italic text-ember-300">No surprises.</span>
          </h2>
          <p className="mt-6 text-ink-300 max-w-xl mx-auto">
            Every plan includes the full optimization suite and overlay tools. Pick a one-time pass, a monthly
            subscription, or a lifetime license.
          </p>
        </div>

        <div className="grid gap-8 md:gap-5 md:grid-cols-3 items-stretch">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 rounded-xl border border-white/5 bg-ink-900/60 p-6 sm:p-8">
          <div>
            <h3 className="text-white font-medium mb-4">What you receive with every plan</h3>
            <ul className="space-y-2.5 text-sm text-ink-300">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span aria-hidden className="text-ember-400">
                    →
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Billing &amp; refunds</h3>
            <ul className="space-y-2.5 text-sm text-ink-300">
              <li>All prices in USD. Applicable taxes are calculated and shown at checkout before you pay.</li>
              <li>Secure checkout by Stripe. Charges appear on your statement as{" "}
                <span className="font-mono text-ink-200">{site.statementDescriptor}</span>.</li>
              <li>
                Pro and Elite: full refund within 14 days of first purchase. Basic: refundable until activated.{" "}
                <Link href="/refunds" className="text-ember-300 underline underline-offset-2 hover:text-ember-200">
                  Read the Refund &amp; Cancellation Policy
                </Link>
                .
              </li>
              <li>Cancel Pro anytime. You keep access until the end of the period you&rsquo;ve paid for.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
