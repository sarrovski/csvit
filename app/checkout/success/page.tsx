import type { Metadata } from "next";
import Link from "next/link";
import { customLabel, getPlan, mailto, site } from "@/lib/site";
import { stripe, stripeEnabled } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Payment received",
  robots: { index: false },
};

function planName(meta: Record<string, string> | null | undefined) {
  if (meta?.plan === "custom") {
    const days = Number(meta.days);
    const devices = Number(meta.devices);
    return days && devices ? `Custom Pass (${customLabel(days, devices)})` : "Custom Pass";
  }
  return getPlan(meta?.plan)?.name ?? null;
}

async function loadSession(id: string | undefined) {
  if (!id || !stripeEnabled() || !/^cs_[A-Za-z0-9_]+$/.test(id)) return null;
  try {
    const s = await stripe().checkout.sessions.retrieve(id);
    if (s.status !== "complete") return null;
    return {
      email: s.customer_details?.email ?? null,
      planName: planName(s.metadata),
      total: s.amount_total,
    };
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const session = await loadSession(session_id);

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="horizon pointer-events-none absolute inset-x-0 top-0 h-[600px]" />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 py-24 md:py-36">
        <p className="eyebrow mb-6 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ember-400" /> Payment received
        </p>
        <h1 className="display text-4xl sm:text-6xl text-white">Thank you. You&rsquo;re all set.</h1>

        <div className="panel mt-10 rounded-2xl p-6 sm:p-8">
          {session ? (
            <dl className="grid gap-4 text-[15px] sm:grid-cols-[140px_1fr]">
              {session.planName && (
                <>
                  <dt className="text-ink-400">Plan</dt>
                  <dd className="text-white">{session.planName}</dd>
                </>
              )}
              {session.total != null && (
                <>
                  <dt className="text-ink-400">Charged</dt>
                  <dd className="font-mono text-white">
                    ${(session.total / 100).toFixed(2)} USD
                    <span className="text-ink-400"> one-time, nothing renews</span>
                  </dd>
                </>
              )}
              {session.email && (
                <>
                  <dt className="text-ink-400">Sent to</dt>
                  <dd className="text-white [overflow-wrap:anywhere]">{session.email}</dd>
                </>
              )}
            </dl>
          ) : (
            <p className="text-ink-300">Your payment was processed by Stripe.</p>
          )}
          <p className="mt-6 border-t border-white/[0.07] pt-6 text-[14px] leading-relaxed text-ink-300">
            Your license key and download link are on their way by email, along with your Stripe receipt. Charges
            appear on your statement as <span className="font-mono text-ink-200 whitespace-nowrap">{site.statementDescriptor}</span>.
          </p>
        </div>

        <p className="mt-8 text-[14px] text-ink-400">
          Nothing arrived within 15 minutes? Check spam, then email{" "}
          <a href={mailto("Missing license email")} className="text-white underline underline-offset-4 decoration-white/30 [overflow-wrap:anywhere]">
            {site.supportEmail}
          </a>
          .
        </p>
        <Link href="/" className="btn-ghost mt-10 inline-flex rounded-full px-5 py-2.5 text-[14px] text-white">
          Back to home
        </Link>
      </div>
    </section>
  );
}
