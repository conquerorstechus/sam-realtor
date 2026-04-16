"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  pageCount: number;
  onPageChange: (p: number) => void;
};

/** Reference-style pagination: Prev / numbered pages / Next. */
export function MapBrowsePagination({ page, pageCount, onPageChange }: Props) {
  if (pageCount <= 1) return null;

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 border-t border-stone-100 pt-4"
      aria-label="Listing results pages"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:border-accent/30 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          aria-label={`Page ${p}`}
          aria-current={p === page ? "page" : undefined}
          onClick={() => onPageChange(p)}
          className={`min-h-10 min-w-10 rounded-xl border text-xs font-extrabold tabular-nums transition ${
            p === page
              ? "border-accent/40 bg-accent text-accent-ink shadow-[0_6px_18px_rgba(232,100,42,0.28)]"
              : "border-stone-200 bg-white text-stone-500 hover:border-accent/25 hover:text-stone-900"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:border-accent/30 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
