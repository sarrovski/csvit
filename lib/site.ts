/**
 * Single source of truth for business identity, contact details and plans.
 * Every page (footer, pricing, legal pages) reads from here, so what Stripe
 * reviewers see on the site always matches what customers are charged.
 *
 * TODO before going live: replace every value marked `TODO` with your real,
 * verifiable details. They must match your Stripe account's business profile.
 */

export const site = {
  name: "Sense Optimization",
  url: "https://sense-optimization.vercel.app",

  /**
   * Business name shown as the operator on the site. Must match the business name in your
   * Stripe account. If you are a sole trader, Stripe and French law (mentions légales)
   * expect your own legal name here, optionally "trading as" the brand.
   */
  legalEntity: "Sense Optimization" as string,
  /** Business address. Optional: leave "" to hide it everywhere on the site. */
  address: "" as string,
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
   * Used for every contact link on the site (support, billing, refunds, privacy, sales).
   * TODO: sense-optimization.com is not registered yet and has no MX records, so mail to
   * this address bounces until the domain is bought and email forwarding is set up.
   */
  supportEmail: "support@sense-optimization.com",

  /** Must match Settings → Public details → Statement descriptor in Stripe. */
  statementDescriptor: "SENSE OPTIMIZATION",

  supportResponseTime: "within 24 hours on business days",
  legalLastUpdated: "November 17, 2026",
} as const;

/** "Legal name, trading as Brand", or just the name when both are the same. */
export const operatorName =
  site.legalEntity === site.name ? site.name : `${site.legalEntity}, trading as ${site.name}`;

/** ", <address>" when an address is set, otherwise nothing. */
export const addressSuffix = site.address ? `, ${site.address}` : "";

export const mailto = (subject?: string) =>
  `mailto:${site.supportEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export type Plan = {
  id: "day" | "week" | "month" | "quarter" | "lifetime";
  name: string;
  /** Access length in days from activation; null = lifetime. */
  days: number | null;
  devices: number;
  cadenceLabel: string;
  price: string;
  /** Plain-language billing terms shown right above the buy button. */
  billing: string;
  blurb: string;
  features: string[];
  cta: string;
  /** Charged amount in US cents. Checkout always uses this server-side value. */
  amountCents: number;
  featured?: boolean;
};

/**
 * What every paid plan delivers digitally, shown under the pricing grid.
 * TODO: confirm this matches your actual fulfilment flow.
 */
export const deliverables = [
  "Sense Optimization desktop app for Windows 10 (21H2+) and Windows 11, x64",
  "License key and download link emailed to you immediately after payment",
  "Stripe receipt emailed for every purchase",
  "No physical goods are shipped. Everything is delivered digitally.",
];

export const usd = (cents: number) => `$${(cents / 100).toFixed(2)} USD`;
const durationLabel = (days: number) => (days === 1 ? "24 hours" : `${days} days`);
const passBilling = (cents: number, days: number) =>
  `One-time charge of ${usd(cents)} for ${durationLabel(days)} of access from activation. No subscription: access simply ends, nothing renews.`;

export const plans: Plan[] = [
  {
    id: "day",
    name: "Day Pass",
    days: 1,
    devices: 1,
    cadenceLabel: "24 hours",
    price: "$4",
    billing: passBilling(400, 1),
    blurb: "Run a single tuning session before an event, a stream or a deadline.",
    features: ["Full optimization toolkit", "Standard overlay presets", "Community support", "1 device"],
    cta: "Buy Day Pass: $4",
    amountCents: 400,
  },
  {
    id: "week",
    name: "Week Pass",
    days: 7,
    devices: 1,
    cadenceLabel: "7 days",
    price: "$9",
    billing: passBilling(900, 7),
    blurb: "Enough time to baseline, tune, and live with the result for a week.",
    features: ["Full optimization toolkit", "Custom overlay builder", "Community support", "1 device"],
    cta: "Buy Week Pass: $9",
    amountCents: 900,
  },
  {
    id: "month",
    name: "Month Pass",
    days: 30,
    devices: 2,
    cadenceLabel: "30 days",
    price: "$19",
    billing: passBilling(1900, 30),
    blurb: "The sweet spot for creators: a full month of tuning, monitoring and reports.",
    features: ["Everything in Week Pass", "Benchmark history & reports", "Priority email support", "Up to 2 devices"],
    cta: "Buy Month Pass: $19",
    amountCents: 1900,
    featured: true,
  },
  {
    id: "quarter",
    name: "Quarter Pass",
    days: 90,
    devices: 3,
    cadenceLabel: "90 days",
    price: "$39",
    billing: passBilling(3900, 90),
    blurb: "A full season of competition or production, at a lower daily cost.",
    features: ["Everything in Month Pass", "Advanced CLI & scripting", "Priority email support", "Up to 3 devices"],
    cta: "Buy Quarter Pass: $39",
    amountCents: 3900,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    days: null,
    devices: 5,
    cadenceLabel: "Forever",
    price: "$249",
    billing: "Single payment of $249.00 USD. No subscription and no recurring charges, ever.",
    blurb: "Pay once, keep it. Best value for power users and studios with several machines.",
    features: ["Everything in Quarter Pass", "Lifetime feature updates", "Dedicated onboarding session", "Up to 5 devices"],
    cta: "Buy Lifetime: $249",
    amountCents: 24900,
  },
];

export const getPlan = (id: unknown) => plans.find((p) => p.id === id);

/* Custom pass: the buyer picks days and devices; the price is always computed here, never taken from the client. */

export const customLimits = { minDays: 1, maxDays: 365, minDevices: 1, maxDevices: 10 } as const;

/** Single-device price anchors (days -> USD). Matches the fixed passes, extended to a full year. */
const anchors: [number, number][] = [
  [1, 4],
  [7, 9],
  [30, 19],
  [90, 39],
  [365, 99],
];
/** Each extra device adds 40% of the single-device price. */
const EXTRA_DEVICE_RATE = 0.4;

export function customPriceCents(days: number, devices: number): number {
  const d = Math.min(Math.max(Math.round(days), customLimits.minDays), customLimits.maxDays);
  const n = Math.min(Math.max(Math.round(devices), customLimits.minDevices), customLimits.maxDevices);
  let base = anchors[anchors.length - 1][1];
  for (let i = 1; i < anchors.length; i++) {
    const [d0, p0] = anchors[i - 1];
    const [d1, p1] = anchors[i];
    if (d <= d1) {
      base = p0 + ((d - d0) / (d1 - d0)) * (p1 - p0);
      break;
    }
  }
  return Math.round(base * (1 + EXTRA_DEVICE_RATE * (n - 1))) * 100;
}

export const customLabel = (days: number, devices: number) =>
  `${durationLabel(days)}, ${devices} device${devices > 1 ? "s" : ""}`;

/** Parses and validates a custom request; returns null when out of range or malformed. */
export function parseCustom(daysRaw: unknown, devicesRaw: unknown) {
  if (typeof daysRaw !== "string" || typeof devicesRaw !== "string") return null;
  if (!/^\d{1,3}$/.test(daysRaw) || !/^\d{1,2}$/.test(devicesRaw)) return null;
  const days = Number(daysRaw);
  const devices = Number(devicesRaw);
  if (days < customLimits.minDays || days > customLimits.maxDays) return null;
  if (devices < customLimits.minDevices || devices > customLimits.maxDevices) return null;
  const amountCents = customPriceCents(days, devices);
  const label = customLabel(days, devices);
  return {
    days,
    devices,
    amountCents,
    label,
    billing: `One-time charge of ${usd(amountCents)} for ${label} of access from activation. No subscription: access simply ends, nothing renews.`,
  };
}

/** Purchases of this many days or more (and Lifetime) get the 14-day refund; shorter ones are refundable until activated. */
export const REFUND_WINDOW_MIN_DAYS = 30;
