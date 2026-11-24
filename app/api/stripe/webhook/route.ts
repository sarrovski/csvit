import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Stripe webhook. In the Stripe Dashboard add an endpoint for
 *   https://<your-domain>/api/stripe/webhook
 * with the events below, and set its signing secret as STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // Signature is computed over the raw body, so read it as text, not JSON.
    event = stripe().webhooks.constructEvent(await req.text(), signature, secret);
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      // TODO: deliver the product here: generate a license key for
      // session.metadata.plan and email it with the download link to
      // session.customer_details.email.
      console.info("[webhook] purchase completed", {
        session: session.id,
        plan: session.metadata?.plan,
        email: session.customer_details?.email,
        amount: session.amount_total,
      });
      break;
    }
    case "customer.subscription.deleted":
      // TODO: revoke Pro access for this subscription's license.
      console.info("[webhook] subscription ended", { subscription: event.data.object.id });
      break;
    case "invoice.payment_failed":
      console.warn("[webhook] renewal payment failed", { invoice: event.data.object.id });
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
