"use client";

import Link from "next/link";

export function MobileStickyCta() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 p-4 sm:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-white/10 bg-surface/85 p-3 shadow-[var(--shadow-elevated)] backdrop-blur">
        <div className="min-w-0">
          <div className="truncate text-xs font-extrabold text-text">Ready to move?</div>
          <div className="truncate text-[11px] text-muted">Get a same-day game plan.</div>
        </div>
        <Link
          href="/contact"
          className="shrink-0 rounded-xl bg-accent px-4 py-2 text-xs font-extrabold text-accent-ink"
        >
          Book now
        </Link>
      </div>
    </div>
  );
}
