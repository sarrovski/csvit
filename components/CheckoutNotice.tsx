"use client";

import { useEffect, useState } from "react";
import { mailto, site } from "@/lib/site";

/** Shows a notice when /api/checkout bounced back with ?checkout=error|unavailable. */
export default function CheckoutNotice() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const state = new URLSearchParams(window.location.search).get("checkout");
    setFailed(state === "error" || state === "unavailable");
  }, []);

  if (!failed) return null;
  return (
    <p role="alert" className="mx-auto mb-8 max-w-2xl rounded-xl bg-ember-500/10 px-5 py-4 text-center text-[14px] text-ember-100 ring-1 ring-inset ring-ember-500/30">
      We couldn&rsquo;t start checkout. You have not been charged. Please try again in a moment, or email{" "}
      <a href={mailto("Checkout problem")} className="underline underline-offset-2 [overflow-wrap:anywhere]">
        {site.supportEmail}
      </a>
      .
    </p>
  );
}
