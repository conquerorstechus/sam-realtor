"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { CloudSun, Filter, MapPinned, Search } from "lucide-react";
import { useMemo } from "react";
import { MapPopupNav } from "./MapPropertyInfoWindow";

const LeafletPropertyMap = dynamic(
  () => import("./LeafletPropertyMap").then((m) => m.LeafletPropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[260px] w-full items-center justify-center rounded-[inherit] bg-stone-200 text-sm font-semibold text-stone-500">
        Loading map…
      </div>
    ),
  },
);
import type { ListingSegment, MapBrowseListing } from "./types";

type Props = {
  listings: MapBrowseListing[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHoverMarker: (id: string | null) => void;
  query: string;
  onQueryChange: (q: string) => void;
  segment: ListingSegment;
  onSegmentChange: (s: ListingSegment) => void;
  searchListId: string;
};

/**
 * Map stage: Leaflet + OSM in a clipped rounded frame; floating search, weather, and
 * prev/next sit in a pointer-events-none overlay so clicks pass through to the map.
 */
export function MapPanel({
  listings,
  selectedId,
  hoveredId,
  onSelect,
  onHoverMarker,
  query,
  onQueryChange,
  segment,
  onSegmentChange,
  searchListId,
}: Props) {
  const selected = useMemo(
    () => (selectedId ? listings.find((l) => l.id === selectedId) ?? null : null),
    [listings, selectedId],
  );
  const selectedIdx = selected ? listings.findIndex((l) => l.id === selected.id) : -1;

  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/5] min-h-[300px] w-full overflow-visible rounded-[var(--radius-2xl)] border border-stone-200 bg-stone-100 shadow-[var(--shadow-elevated)] sm:min-h-[380px] sm:aspect-[10/11] lg:aspect-[16/11] lg:min-h-[480px] xl:min-h-[540px]">
        <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-2xl)]">
          <LeafletPropertyMap
            listings={listings}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onSelect={onSelect}
            onHoverMarker={onHoverMarker}
          />
          <div className="pointer-events-none absolute bottom-16 right-4 z-[400] opacity-[0.12] sm:bottom-20 sm:right-6 sm:opacity-[0.16]">
            <Image
              src="/brand-symbol-tampa-realty-pros.png"
              alt=""
              width={100}
              height={100}
              className="object-contain drop-shadow-lg"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-auto absolute right-4 top-4 z-30 flex max-w-[min(100%,20rem)] flex-col gap-2 sm:right-5 sm:top-5">
            <div className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/95 p-1 shadow-lg backdrop-blur-md">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" aria-hidden />
                <input
                  list={searchListId}
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  autoComplete="off"
                  placeholder="Name, area, street…"
                  aria-label="Search on map by listing name, neighborhood, or city"
                  className="w-full min-w-[8rem] rounded-lg border-0 bg-transparent py-2 pl-8 pr-2 text-[11px] font-semibold text-stone-800 outline-none placeholder:text-stone-400"
                />
              </div>
              <div className="h-6 w-px shrink-0 bg-stone-200" aria-hidden />
              <div className="flex shrink-0 items-center gap-0.5 pr-1" role="group" aria-label="Map listing mode">
                {(["sale", "rent"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={segment === s}
                    onClick={() => onSegmentChange(segment === s ? "all" : s)}
                    className={`rounded-lg px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide transition ${
                      segment === s ? "bg-accent text-accent-ink shadow-sm" : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    {s === "sale" ? "Sale" : "Rent"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selected && selectedIdx >= 0 && (
            <div className="pointer-events-auto absolute right-3 top-16 z-[60] sm:right-4 sm:top-[4.5rem]">
              <MapPopupNav
                canPrev={selectedIdx > 0}
                canNext={selectedIdx < listings.length - 1}
                onPrev={() => {
                  if (selectedIdx > 0) onSelect(listings[selectedIdx - 1]!.id);
                }}
                onNext={() => {
                  if (selectedIdx < listings.length - 1) onSelect(listings[selectedIdx + 1]!.id);
                }}
              />
            </div>
          )}

          <div className="pointer-events-auto absolute bottom-5 left-4 z-30 flex items-center gap-2 rounded-xl border border-white/15 bg-stone-950/88 px-3 py-2.5 text-white shadow-lg backdrop-blur-md sm:left-5">
            <CloudSun className="h-8 w-8 shrink-0 text-amber-300" aria-hidden />
            <div>
              <div className="text-lg font-extrabold leading-none tabular-nums">29°C</div>
              <div className="text-[10px] font-semibold text-white/75">Partly cloudy</div>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Tampa+Bay+FL"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto absolute bottom-5 right-4 z-30 inline-flex items-center gap-2 rounded-xl border border-stone-800 bg-stone-950 px-4 py-2.5 text-xs font-extrabold tracking-wide text-white shadow-xl transition hover:bg-stone-900 sm:right-5"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <MapPinned className="h-4 w-4" aria-hidden />
            </span>
            <span className="pr-1">Full map</span>
            <Filter className="h-3.5 w-3.5 text-white/70" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
