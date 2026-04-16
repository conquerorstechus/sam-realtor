"use client";

import { Filter, Search } from "lucide-react";
import { AREA_QUICK_SEARCHES } from "./searchFilter";
import type { ListingSegment, SortKey } from "./types";

type Props = {
  searchListId: string;
  query: string;
  onQueryChange: (q: string) => void;
  segment: ListingSegment;
  onSegmentChange: (s: ListingSegment) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  totalResults: number;
  onFilterClick?: () => void;
};

/**
 * Reference-style sidebar header: title + “Show” toggle, search with live count,
 * then sort / filters row.
 */
export function PropertySearchToolbar({
  searchListId,
  query,
  onQueryChange,
  segment,
  onSegmentChange,
  sort,
  onSortChange,
  totalResults,
  onFilterClick,
}: Props) {
  const showLabel =
    segment === "all" ? "All" : segment === "sale" ? "For sale" : "For rent";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold tracking-tight text-stone-900 sm:text-xl">Properties Search</h3>
        <div className="flex items-center gap-2 text-xs font-semibold text-muted">
          <span className="text-stone-500">Show:</span>
          <div
            className="inline-flex rounded-full border border-stone-200 bg-stone-50 p-0.5 shadow-inner"
            role="group"
            aria-label="Listing type"
          >
            {(["all", "sale", "rent"] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={segment === s}
                onClick={() => onSegmentChange(s)}
                className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide transition ${
                  segment === s ? "bg-white text-accent shadow-sm ring-1 ring-accent/15" : "text-stone-500 hover:text-text"
                }`}
              >
                {s === "all" ? "All" : s === "sale" ? "Sale" : "Rent"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="relative block">
        <span className="sr-only">Search listings, showing {showLabel}</span>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden />
        <input
          list={searchListId}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          autoComplete="off"
          placeholder="Listing name, neighborhood, street, or city…"
          className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-14 text-sm font-medium text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
        />
        <span
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-extrabold tabular-nums text-stone-400"
          aria-live="polite"
          aria-label={`${totalResults} homes match this search`}
        >
          {totalResults}
        </span>
      </label>

      <div className="text-[11px] leading-relaxed text-stone-500" role="note">
        Tip: try multiple words (e.g.{" "}
        <button
          type="button"
          className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
          onClick={() => onQueryChange("Hyde Park Tampa")}
        >
          Hyde Park Tampa
        </button>
        ) or pick a market below.
      </div>

      <div className="flex flex-wrap gap-1.5" aria-label="Quick area search">
        {AREA_QUICK_SEARCHES.map((a) => (
          <button
            key={a.value}
            type="button"
            onClick={() => onQueryChange(a.value)}
            className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-stone-600 transition hover:border-accent/35 hover:bg-white hover:text-accent"
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] font-medium text-stone-500">
          Showing <span className="font-extrabold text-stone-700">{totalResults}</span> homes
          <span className="mx-1 text-stone-300">·</span>
          <span className="text-stone-600">{showLabel}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onFilterClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-[11px] font-extrabold text-stone-700 shadow-sm transition hover:border-accent/35 hover:text-accent"
          >
            <Filter className="h-3.5 w-3.5" aria-hidden />
            Filters
          </button>
          <label className="sr-only" htmlFor="map-sort">
            Sort results
          </label>
          <select
            id="map-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="min-w-[9.5rem] cursor-pointer rounded-xl border border-stone-200 bg-white px-2.5 py-2 text-[11px] font-extrabold text-stone-800 shadow-sm outline-none transition focus:border-accent/40 focus:ring-2 focus:ring-accent/20"
          >
            <option value="newest">Newest first</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="priceLow">Price: Low → High</option>
          </select>
        </div>
      </div>
    </div>
  );
}
