import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getPlan, parseCustom, site } from "@/lib/site";
import { stripe, stripeEnabled } from "@/lib/stripe";

export const runtime = "nodejs";

type Purchase = {
  key: string; // plan id, or "custom"
  name: string;
  billing: string;
  amountCents: number;
  metadata: Record<string, string>;
};

/** Resolves the posted form into a purchase. Prices always come from the server, never the client. */
function resolvePurchase(form: FormData | null): Purchase | null {
  const id = form?.get("plan");
  if (id === "custom") {
    const c = parseCustom(form?.get("days"), form?.get("devices"));
    if (!c) return null;
    return {
      key: "custom",
      name: `Custom Pass (${c.label})`,
      billing: c.billing,
      amountCents: c.amountCents,
      metadata: { plan: "custom", days: String(c.days), devices: String(c.devices) },
    };
  }
  const plan = getPlan(id);
  if (!plan) return null;
  return {
    key: plan.id,
    name: plan.name,
    billing: plan.billing,
    amountCents: plan.amountCents,
    metadata: { plan: plan.id, days: plan.days === null ? "lifetime" : String(plan.days), devices: String(plan.devices) },
  };
}

/**
 * POST /api/checkout
 *   plan = day | week | month | quarter | lifetime
 *   plan = custom, days = 1..365, devices = 1..10
 * Creates a one-time Stripe Checkout Session and 303-redirects to it (plain form post, no client JS needed).
 */
export async function POST(req: NextRequest) {
  const origin = new URL(req.url).origin;
  const form = await req.formData().catch(() => null);
  const purchase = resolvePurchase(form);

  if (!purchase) {
    return NextResponse.json({ error: "Unknown plan or invalid custom options" }, { status: 400 });
  }
  if (!stripeEnabled()) {
    console.error("[checkout] STRIPE_SECRET_KEY is not set");
    return NextResponse.redirect(`${origin}/?checkout=unavailable#pricing`, 303);
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: purchase.amountCents,
          product_data: {
            // Stripe requires a name; show only the business name, not what was bought.
            // The plan details stay in metadata for fulfilment.
            name: site.name,
            metadata: purchase.metadata,
          },
        },
      },
    ],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#pricing`,
    client_reference_id: purchase.key,
    metadata: purchase.metadata,
    payment_intent_data: { metadata: purchase.metadata },
    customer_creation: "always",
    billing_address_collection: "auto",
    automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "true" },
  };

  try {
    const session = await stripe().checkout.sessions.create(params);
    if (!session.url) throw new Error("Checkout session has no URL");
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("[checkout] failed to create session", { plan: purchase.key, err });
    return NextResponse.redirect(`${origin}/?checkout=error#pricing`, 303);
  }
}
