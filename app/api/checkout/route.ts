import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getPlan, site } from "@/lib/site";
import { stripe, stripeEnabled } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * POST /api/checkout  (form field: plan = basic | pro | elite)
 * Creates a Stripe Checkout Session from server-side prices and 303-redirects to it.
 * Works as a plain HTML form post, so no client JavaScript is needed.
 */
export async function POST(req: NextRequest) {
  const origin = new URL(req.url).origin;
  const form = await req.formData().catch(() => null);
  const plan = getPlan(form?.get("plan"));

  if (!plan) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }
  if (!stripeEnabled()) {
    // Not configured yet: send the buyer back with a visible notice instead of failing silently.
    console.error("[checkout] STRIPE_SECRET_KEY is not set");
    return NextResponse.redirect(`${origin}/?checkout=unavailable#pricing`, 303);
  }

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: plan.amountCents,
      product_data: {
        name: plan.name,
        description: plan.billing,
        metadata: { plan: plan.id },
      },
      ...(plan.mode === "subscription" ? { recurring: { interval: "month" as const } } : {}),
    },
  };

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: plan.mode,
    line_items: [lineItem],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#pricing`,
    client_reference_id: plan.id,
    metadata: { plan: plan.id },
    billing_address_collection: "auto",
    allow_promotion_codes: true,
    automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "true" },
    custom_text: {
      submit: {
        message: `${plan.billing} By paying you agree to our Terms (${site.url}/terms) and Refund Policy (${site.url}/refunds).`,
      },
    },
    ...(plan.mode === "subscription"
      ? { subscription_data: { metadata: { plan: plan.id } } }
      : { customer_creation: "always" as const, payment_intent_data: { metadata: { plan: plan.id } } }),
  };

  try {
    const session = await stripe().checkout.sessions.create(params);
    if (!session.url) throw new Error("Checkout session has no URL");
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("[checkout] failed to create session", { plan: plan.id, err });
    return NextResponse.redirect(`${origin}/?checkout=error#pricing`, 303);
  }
}
