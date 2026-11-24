import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { addressSuffix, mailto, plans, REFUND_WINDOW_MIN_DAYS, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "When and how you can get a refund on Sense Optimization passes. Every plan is a one-time payment.",
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "summary", label: "At a glance" },
  { id: "eligibility", label: "Refund eligibility" },
  { id: "how", label: "How to request a refund" },
  { id: "non-refundable", label: "What isn't refundable" },
  { id: "no-subscriptions", label: "No subscriptions" },
  { id: "consumer-rights", label: "Statutory consumer rights" },
  { id: "chargebacks", label: "Chargebacks" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
];

const Email = ({ subject }: { subject?: string }) => <a href={mailto(subject)}>{site.supportEmail}</a>;

const longRule = "Full refund within 14 days of purchase, for any reason.";
const shortRule = "Full refund if not yet activated (request within 7 days of purchase). Non-refundable once activated.";

const summary = [
  ...plans.map((p) => ({
    plan: `${p.name} (${p.cadenceLabel.toLowerCase()}, ${p.price})`,
    refund: p.days === null || p.days >= REFUND_WINDOW_MIN_DAYS ? longRule : shortRule,
  })),
  { plan: `Custom Pass, ${REFUND_WINDOW_MIN_DAYS}+ days`, refund: longRule },
  { plan: `Custom Pass, under ${REFUND_WINDOW_MIN_DAYS} days`, refund: shortRule },
];

const steps = [
  {
    title: "Email us",
    body: (
      <>
        Send a message to <Email subject="Refund request" /> from the email address you used at checkout.
      </>
    ),
  },
  {
    title: "Include a few details",
    body: "Your order number (from the Stripe receipt email), the pass you bought, and optionally a short note on why. Feedback helps us improve, but it's not required.",
  },
  {
    title: "We process the refund",
    body: (
      <>
        Eligible requests are approved within <strong>2 business days</strong>. Refunds are issued to the
        original payment method and typically appear on your statement within 5–10 business days, depending
        on your bank. Your license is deactivated once the refund is issued.
      </>
    ),
  },
];

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund Policy"
      toc={toc}
      intro={
        <p>
          Every {site.name} plan is a single, one-time payment. This page explains exactly when you can get your
          money back.
        </p>
      }
    >
      <h2 id="overview">Overview</h2>
      <p>
        This Refund Policy applies to all purchases of {site.name} passes (Day, Week, Month, Quarter, Lifetime and
        Custom) made through our website via our payment processor, Stripe. It is part of, and incorporated by
        reference into, our <Link href="/terms">Terms of Service</Link>.
      </p>

      <h2 id="summary">At a glance</h2>
      <div className="not-prose my-6 overflow-hidden rounded-lg border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="hidden sm:table-header-group bg-ink-800 text-white">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Plan</th>
              <th scope="col" className="px-4 py-3 font-medium">Refund terms</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-ink-300">
            {summary.map((row) => (
              <tr key={row.plan} className="flex flex-col sm:table-row">
                <th scope="row" className="px-4 pt-3 sm:py-3 font-medium text-ink-200 align-top">
                  {row.plan}
                </th>
                <td className="px-4 pb-3 sm:py-3 leading-relaxed">{row.refund}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="eligibility">Refund eligibility</h2>
      <h3>Passes of {REFUND_WINDOW_MIN_DAYS} days or more, and Lifetime</h3>
      <p>
        This covers the Month Pass, Quarter Pass, Lifetime, and any Custom Pass of {REFUND_WINDOW_MIN_DAYS} days or
        longer. You are eligible for a <strong>full refund within 14 days</strong> of your purchase, for any
        reason. No justification is required. We must receive your request before the 14-day window has elapsed.
      </p>
      <h3>Passes shorter than {REFUND_WINDOW_MIN_DAYS} days</h3>
      <p>
        This covers the Day Pass, Week Pass, and any Custom Pass shorter than {REFUND_WINDOW_MIN_DAYS} days. Most of
        their value is used within days of activation, so they are <strong>non-refundable once activated</strong>.
        If you have not activated the pass yet, contact us within 7 days of purchase and we will issue a full
        refund.
      </p>
      <h3>Team &amp; volume licenses</h3>
      <p>
        Volume and team licenses (10+ seats) are governed by the specific terms of your contract. Contact{" "}
        <Email subject="Volume licensing" /> for details.
      </p>

      <h2 id="how">How to request a refund</h2>
      <p>Requesting a refund takes three steps:</p>
      <ol className="not-prose my-8 space-y-5">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4 items-start">
            <span
              aria-hidden
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-ember-500/40 bg-ember-500/10 font-mono text-sm text-ember-300"
            >
              {i + 1}
            </span>
            <div>
              <p className="text-white font-medium mb-1">{step.title}</p>
              <p className="text-ink-300 text-sm leading-relaxed">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 id="non-refundable">What isn&rsquo;t refundable</h2>
      <p>The following are not eligible for a refund:</p>
      <ul>
        <li>
          Passes of {REFUND_WINDOW_MIN_DAYS} days or more and Lifetime, when the request arrives after the 14-day
          window
        </li>
        <li>Passes shorter than {REFUND_WINDOW_MIN_DAYS} days that have been activated</li>
        <li>
          Accounts terminated for violation of our <Link href="/terms">Terms of Service</Link>
        </li>
        <li>Unused remaining days of a pass (you keep access until the pass ends instead)</li>
      </ul>

      <h2 id="no-subscriptions">No subscriptions</h2>
      <p>
        We don&rsquo;t sell subscriptions. Every plan is charged once, at checkout. Nothing renews, there is nothing
        to cancel, and you will never be charged again automatically. When a pass ends, access simply stops. If
        you want more time, you can buy another pass whenever you like.
      </p>

      <h2 id="consumer-rights">Statutory consumer rights</h2>
      <p>
        This policy is in addition to, and does not limit, any statutory consumer rights you may have under your
        local laws.
      </p>
      <ul>
        <li>
          <strong>European Union / UK:</strong> EU and UK consumers generally have a 14-day right of withdrawal
          for digital content and services. By asking us to start the service immediately and activating your pass,
          you acknowledge that you lose this right for that pass. Our 14-day refund window on passes of{" "}
          {REFUND_WINDOW_MIN_DAYS} days or more applies regardless.
        </li>
        <li>
          <strong>Other jurisdictions:</strong> Nothing in this policy overrides mandatory consumer protection law
          in your country of residence.
        </li>
      </ul>

      <h2 id="chargebacks">Chargebacks</h2>
      <p>
        Before opening a dispute with your bank or card issuer, please reach out to us at{" "}
        <Email subject="Billing issue" />. We resolve the vast majority of billing concerns directly within 48
        hours. Charges appear on your statement as <strong>{site.statementDescriptor}</strong>.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Changes apply only to purchases made after the effective
        date of the updated policy. Purchases made before then remain governed by the policy in effect at the
        time of purchase.
      </p>

      <h2 id="contact">Contact</h2>
      <p>Questions, or need help with an existing refund?</p>
      <ul>
        <li>
          <strong>Email:</strong> <Email subject="Refund question" />
        </li>
        <li>
          <strong>Response time:</strong> {site.supportResponseTime}
        </li>
        <li>
          <strong>Operator:</strong> {site.legalEntity}
          {addressSuffix}
        </li>
      </ul>
    </LegalPage>
  );
}
