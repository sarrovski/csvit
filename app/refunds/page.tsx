import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "How refunds and subscription cancellations work for Sense Optimization plans.",
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "summary", label: "At a glance" },
  { id: "eligibility", label: "Refund eligibility" },
  { id: "how", label: "How to request a refund" },
  { id: "non-refundable", label: "What isn't refundable" },
  { id: "cancellation", label: "Cancelling a subscription" },
  { id: "consumer-rights", label: "Statutory consumer rights" },
  { id: "chargebacks", label: "Chargebacks" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
];

const Email = ({ subject }: { subject?: string }) => <a href={mailto(subject)}>{site.supportEmail}</a>;

const summary = [
  { plan: "Basic: 24-hour pass ($4, one-time)", refund: "Full refund if not yet activated (request within 7 days). Non-refundable once activated." },
  { plan: "Pro: monthly ($19/month, recurring)", refund: "Full refund within 14 days of your first payment. Renewals: see the 48-hour goodwill rule." },
  { plan: "Elite: lifetime ($249, one-time)", refund: "Full refund within 14 days of purchase." },
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
    body: "Your order number (from the Stripe receipt email), the plan purchased, and optionally a short note on why. Feedback helps us improve, but it's not required.",
  },
  {
    title: "We process the refund",
    body: (
      <>
        Eligible requests are approved within <strong>2 business days</strong>. Refunds are issued to the
        original payment method and typically appear on your statement within 5–10 business days, depending
        on your bank.
      </>
    ),
  },
];

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      toc={toc}
      intro={
        <p>
          We want every purchase to feel fair. This page explains exactly when you can get your money back
          and how to stop a subscription.
        </p>
      }
    >
      <h2 id="overview">Overview</h2>
      <p>
        This Refund &amp; Cancellation Policy applies to all purchases of {site.name} plans (Basic, Pro and
        Elite) made through our website via our payment processor, Stripe. It is part of, and incorporated by
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
      <h3>Pro (Monthly) &amp; Elite (Lifetime) plans</h3>
      <p>
        You are eligible for a <strong>full refund within 14 days</strong> of your original purchase, for any
        reason. No justification is required.
      </p>
      <ul>
        <li>
          For monthly plans, the 14-day window applies to your <strong>first payment only</strong>, not to
          subsequent renewals.
        </li>
        <li>For lifetime plans, the 14-day window runs from the date of purchase.</li>
        <li>To qualify, we must receive your refund request before the 14-day window has elapsed.</li>
      </ul>
      <h3>Basic (24-hour) passes</h3>
      <p>
        Daily passes are short-duration access products. Because the full value is consumed within 24 hours
        of activation, daily passes are <strong>non-refundable once activated</strong>. If you purchased a
        daily pass and have not yet activated it, contact us within 7 days of purchase and we will issue a
        full refund.
      </p>
      <h3>Renewal charges</h3>
      <p>
        Monthly subscription renewals are not automatically refundable. However, if you contact us within{" "}
        <strong>48 hours</strong> of a renewal charge and have not materially used the Service during that
        period, we will cancel the subscription and generally grant a full refund of that renewal as a
        goodwill gesture.
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
        <li>Requests submitted after the 14-day window</li>
        <li>Activated daily passes</li>
        <li>Subscription renewals beyond the 48-hour grace period described above</li>
        <li>
          Accounts terminated for violation of our <Link href="/terms">Terms of Service</Link>
        </li>
        <li>
          Partial months or pro-rated portions of an active billing cycle (you keep access until the end of
          the period instead)
        </li>
      </ul>

      <h2 id="cancellation">Cancelling a subscription</h2>
      <p>
        You can cancel a Pro subscription at any time, either from your account dashboard or by emailing{" "}
        <Email subject="Cancel my subscription" />. We confirm every cancellation by email. Cancellation stops
        all future charges immediately; you keep access until the end of the period you&rsquo;ve already paid
        for.
      </p>
      <p>
        Cancelling and requesting a refund are separate actions. If you want both (within the eligible
        window), say so in your email and we&rsquo;ll handle both in one step.
      </p>
      <p>Basic passes and Elite lifetime licenses are one-time purchases. There is nothing to cancel.</p>

      <h2 id="consumer-rights">Statutory consumer rights</h2>
      <p>
        This policy is in addition to, and does not limit, any statutory consumer rights you may have under
        your local laws.
      </p>
      <ul>
        <li>
          <strong>European Union / UK:</strong> EU and UK consumers generally have a 14-day right of
          withdrawal for digital content and services. By starting to use the Service immediately after
          purchase, you may lose this right, but our 14-day refund window on Pro and Elite mirrors and
          preserves this protection regardless.
        </li>
        <li>
          <strong>Other jurisdictions:</strong> Nothing in this policy overrides mandatory consumer protection
          law in your country of residence.
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
          <strong>Operator:</strong> {site.legalEntity}, {site.address}
        </li>
      </ul>
    </LegalPage>
  );
}
