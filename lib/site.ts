/**
 * Single source of truth for business identity, contact details and plans.
 * Every page (footer, pricing, legal pages) reads from here, so what Stripe
 * reviewers see on the site always matches what customers are charged.
 *
 * TODO before going live: replace every value marked `TODO` with your real,
 * verifiable details. They must match your Stripe account's business profile.
 */

export const site = {
  name: "Sense-Optimization",
  url: "https://sense-optimization.vercel.app",

  /** TODO: the legal name registered with Stripe (sole trader name, LLC, SAS, Ltd…). */
  legalEntity: "[LEGAL BUSINESS NAME]",
  /** TODO: registered business address, as shown in your Stripe public details. */
  address: "[REGISTERED BUSINESS ADDRESS]",
  /**
   * Company registration number + jurisdiction. Optional: sole traders without one
   * can leave this as "" and it is hidden everywhere.
   */
  registration: "" as string,
  /** TODO: governing law for the Terms (e.g. "the State of Delaware, USA"). */
  governingLaw: "[GOVERNING LAW JURISDICTION]",
  /** TODO: city/court where disputes are heard. */
  venue: "[CITY / COURT JURISDICTION]",

  /**
   * TODO: this mailbox must actually receive mail. As of this change, neither
   * sense-optimization.vercel.app nor sense-optimization.com has MX records,
   * and a *.vercel.app subdomain can never receive email.
   */
  supportEmail: "support@sense-optimization.vercel.app",

  /** TODO: must match Settings → Public details → Statement descriptor in Stripe. */
  statementDescriptor: "SENSE-OPTIMIZATION",

  supportResponseTime: "within 24 hours on business days",
  legalLastUpdated: "November 17, 2026",
} as const;

export const mailto = (subject?: string) =>
  `mailto:${site.supportEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export type Plan = {
  id: "basic" | "pro" | "elite";
  name: string;
  cadenceLabel: string;
  price: string;
  priceSuffix: string;
  /** Plain-language billing terms shown right above the buy button. */
  billing: string;
  blurb: string;
  features: string[];
  cta: string;
  checkoutUrl: string | undefined;
  featured?: boolean;
};

/**
 * What every paid plan delivers digitally, shown under the pricing grid.
 * TODO: confirm this matches your actual fulfilment flow.
 */
export const deliverables = [
  "Sense-Optimization desktop app for Windows 10 (21H2+) and Windows 11, x64",
  "License key and download link emailed to you immediately after payment",
  "Stripe receipt emailed for every charge",
  "No physical goods are shipped. Everything is delivered digitally.",
];

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Sense-Opti Basic",
    cadenceLabel: "24-hour pass",
    price: "$4",
    priceSuffix: "one-time",
    billing:
      "One-time charge of $4.00 USD for 24 hours of access from activation. Does not renew.",
    blurb:
      "Try the full suite, or run a single tuning session before an event or deadline.",
    features: [
      "Full optimization toolkit",
      "Standard overlay presets",
      "Community support",
      "License for 1 device",
    ],
    cta: "Buy 24-hour pass: $4",
    checkoutUrl: process.env.NEXT_PUBLIC_STRIPE_LINK_BASIC,
  },
  {
    id: "pro",
    name: "Sense-Opti Pro",
    cadenceLabel: "Monthly subscription",
    price: "$19",
    priceSuffix: "/ month",
    billing:
      "$19.00 USD billed every month, starting today. Renews automatically until you cancel. Cancel anytime; access continues to the end of the paid period.",
    blurb:
      "The default for creators and teams. Ongoing updates, full monitoring, and priority support.",
    features: [
      "Everything in Basic",
      "Custom overlay builder",
      "Benchmark history & reports",
      "Priority email support",
      "Licenses for up to 3 devices",
    ],
    cta: "Subscribe: $19/month",
    checkoutUrl: process.env.NEXT_PUBLIC_STRIPE_LINK_PRO,
    featured: true,
  },
  {
    id: "elite",
    name: "Sense-Opti Elite",
    cadenceLabel: "Lifetime license",
    price: "$249",
    priceSuffix: "one-time",
    billing:
      "Single payment of $249.00 USD. No subscription and no recurring charges.",
    blurb:
      "Best value for power users and studios standardizing across multiple workstations.",
    features: [
      "Everything in Pro",
      "Lifetime feature updates",
      "Advanced CLI & scripting",
      "Dedicated onboarding session",
      "Licenses for up to 5 devices",
    ],
    cta: "Buy lifetime license: $249",
    checkoutUrl: process.env.NEXT_PUBLIC_STRIPE_LINK_ELITE,
  },
];
