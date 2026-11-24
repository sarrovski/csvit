"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { customLabel, customLimits, customPriceCents, REFUND_WINDOW_MIN_DAYS, usd } from "@/lib/site";

const dayPresets = [3, 14, 60, 180, 365];

/** Pick-your-own pass. The price shown here is a preview; the server recomputes it at checkout. */
export default function CustomPass() {
  const [days, setDays] = useState(14);
  const [devices, setDevices] = useState(1);
  const ids = { days: useId(), devices: useId(), billing: useId(), consent: useId() };

  const cents = customPriceCents(days, devices);
  const label = customLabel(days, devices);
  const perDay = cents / 100 / days;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/[0.08]">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="grid gap-10 p-7 sm:p-9 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[15px] font-medium text-white">Custom Pass</h3>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Build your own</span>
          </div>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ink-300">
            Pick exactly how long you need Sense and on how many machines. Same full suite, one payment, nothing
            renews.
          </p>

          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <label htmlFor={ids.days} className="text-[14px] text-ink-200">Duration</label>
              <output htmlFor={ids.days} className="font-mono text-[14px] text-white tabular">
                {days === 1 ? "24 hours" : `${days} days`}
              </output>
            </div>
            <input
              id={ids.days}
              type="range"
              min={customLimits.minDays}
              max={customLimits.maxDays}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="mt-3 w-full cursor-pointer accent-[#ff8533]"
            />
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Duration presets">
              {dayPresets.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  aria-pressed={days === d}
                  className={`rounded-full px-3 py-1 font-mono text-[11px] ring-1 ring-inset transition-colors ${
                    days === d ? "bg-white text-ink-950 ring-white" : "text-ink-300 ring-white/15 hover:text-white hover:ring-white/30"
                  }`}
                >
                  {d === 365 ? "1 year" : `${d} days`}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <label htmlFor={ids.devices} className="text-[14px] text-ink-200">Devices</label>
              <output htmlFor={ids.devices} className="font-mono text-[14px] text-white tabular">{devices}</output>
            </div>
            <input
              id={ids.devices}
              type="range"
              min={customLimits.minDevices}
              max={customLimits.maxDevices}
              value={devices}
              onChange={(e) => setDevices(Number(e.target.value))}
              className="mt-3 w-full cursor-pointer accent-[#ff8533]"
            />
            <p className="mt-2 text-[12px] text-ink-400">Each extra device adds 40% of the single-device price.</p>
          </div>
        </div>

        <div className="flex flex-col rounded-xl bg-ink-950/60 p-6 ring-1 ring-inset ring-white/[0.06]">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Your pass</p>
          <p className="mt-1 text-[14px] text-ink-200">{label}</p>
          <p className="mt-6 flex items-baseline gap-2" aria-live="polite">
            <span className="display text-6xl text-white tabular">${cents / 100}</span>
            <span className="text-sm text-ink-400">one-time</span>
          </p>
          <p className="mt-2 font-mono text-[11px] text-ink-400">
            ≈ ${perDay.toFixed(2)} per day
            {days >= REFUND_WINDOW_MIN_DAYS ? " · 14-day refund window" : " · refundable until activated"}
          </p>

          <p id={ids.billing} className="mt-6 flex-1 border-t border-white/[0.07] pt-5 text-[12px] leading-relaxed text-ink-300">
            One-time charge of {usd(cents)} for {label} of access from activation. No subscription: access simply
            ends, nothing renews.
          </p>

          <form action="/api/checkout" method="POST" className="mt-5">
            <input type="hidden" name="plan" value="custom" />
            <input type="hidden" name="days" value={days} />
            <input type="hidden" name="devices" value={devices} />
            <button
              type="submit"
              aria-describedby={`${ids.billing} ${ids.consent}`}
              className="btn-primary inline-flex w-full cursor-pointer items-center justify-center rounded-full px-5 py-3 text-[14px] font-medium"
            >
              Buy Custom Pass: ${cents / 100}
            </button>
          </form>
          <p id={ids.consent} className="mt-3 text-center text-[11px] leading-relaxed text-ink-400">
            By purchasing you agree to the{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-white">Terms</Link> and{" "}
            <Link href="/refunds" className="underline underline-offset-2 hover:text-white">Refund Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
