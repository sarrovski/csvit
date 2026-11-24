import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

/** True when a Stripe secret key is configured for this deployment. */
export const stripeEnabled = () => Boolean(process.env.STRIPE_SECRET_KEY);

/** Server-side Stripe client. Never import this from a client component. */
export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  client ??= new Stripe(key, {
    appInfo: { name: "sense-optimization-web" },
    // Lets tests point the SDK at a local stand-in; unset in production.
    ...(process.env.STRIPE_API_HOST
      ? { host: process.env.STRIPE_API_HOST, port: Number(process.env.STRIPE_API_PORT ?? 80), protocol: "http" as const }
      : {}),
  });
  return client;
}
