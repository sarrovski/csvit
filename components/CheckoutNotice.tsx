"use client";

import { useEffect, useState } from "react";
import { mailto, site } from "@/lib/site";

type State = "error" | "unavailable" | "email" | null;

/** Shows a notice when /api/checkout bounced back with ?checkout=error|unavailable|email. */
export default function CheckoutNotice() {
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("checkout");
    if (s === "error" || s === "unavailable" || s === "email") setState(s);
  }, []);

  if (!state) return null;
  return (
    <p role="alert" className="mx-auto mb-8 max-w-2xl rounded-xl bg-ember-500/10 px-5 py-4 text-center text-[14px] text-ember-100 ring-1 ring-inset ring-ember-500/30">
      {state === "email" ? (
        <>Please enter a valid email address so we can send your license key, then choose your pass again.</>
      ) : (
        <>
          We couldn&rsquo;t start checkout. You have not been charged. Please try again in a moment, or email{" "}
          <a href={mailto("Checkout problem")} className="underline underline-offset-2 [overflow-wrap:anywhere]">
            {site.supportEmail}
          </a>
          .
        </>
      )}
    </p>
  );
}
