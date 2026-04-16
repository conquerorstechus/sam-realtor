"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { fadeUp } from "@/components/ui/MotionDiv";
import { MAP_BROWSE_MOCK_LISTINGS } from "./mockListings";
import { MapPanel } from "./MapPanel";
import { PropertyListingsPanel } from "./PropertyListingsPanel";
import {
  buildSearchDatalistOptions,
  filterMapListings,
  PROPERTY_MAP_SEARCH_LIST_ID,
} from "./searchFilter";
import type { ListingSegment, MapBrowseListing, RegionFilter, SortKey } from "./types";
import { ViewToggle } from "./ViewToggle";

const PAGE_SIZE = 4;

function sortListings(rows: MapBrowseListing[], sort: SortKey): MapBrowseListing[] {
  const next = [...rows];
  if (sort === "newest") {
    next.sort((a, b) => +new Date(b.listedAtIso) - +new Date(a.listedAtIso));
  } else if (sort === "priceHigh") {
    next.sort((a, b) => {
      const pa = a.listingKind === "rent" ? (a.rentMonthly ?? 0) * 120 : a.priceUsd;
      const pb = b.listingKind === "rent" ? (b.rentMonthly ?? 0) * 120 : b.priceUsd;
      return pb - pa;
    });
  } else {
    next.sort((a, b) => {
      const pa = a.listingKind === "rent" ? (a.rentMonthly ?? 0) * 120 : a.priceUsd;
      const pb = b.listingKind === "rent" ? (b.rentMonthly ?? 0) * 120 : b.priceUsd;
      return pa - pb;
    });
  }
  return next;
}

/**
 * Split map + listings browse — placed under “Explore Property Types” on `/properties`.
 */
export function PropertyMapSection() {
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<ListingSegment>("all");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());

  const filtered = useMemo(
    () => sortListings(filterMapListings(MAP_BROWSE_MOCK_LISTINGS, query, segment, region), sort),
    [query, segment, region, sort],
  );

  const searchDatalistOptions = useMemo(
    () => buildSearchDatalistOptions(MAP_BROWSE_MOCK_LISTINGS),
    [],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const pageRows = useMemo(() => {
    const safePage = Math.min(page, pageCount);
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page, pageCount]);

  useEffect(() => {
    setPage(1);
  }, [query, segment, region, sort]);

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  return (
    <section
      className="border-t border-border bg-bg py-20 sm:py-24"
      aria-labelledby="map-browse-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-accent">Map browse</p>
          <h2
            id="map-browse-heading"
            className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-text sm:text-4xl"
          >
            Search homes across the Bay
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Explore live-positioned listings on our branded map canvas, then refine by neighborhood,
            price, or lifestyle — crafted for Tampa, St. Pete, Clearwater, and the north corridor.
          </p>
          <div className="mx-auto mt-5 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#C63A2B] to-[#F28C45]" />
        </motion.div>

        <ViewToggle value={mobileView} onChange={setMobileView} className="mx-auto mt-10 max-w-md md:hidden" />

        <datalist id={PROPERTY_MAP_SEARCH_LIST_ID}>
          {searchDatalistOptions.map((opt, i) => (
            <option key={`${i}-${opt}`} value={opt} />
          ))}
        </datalist>

        {/* ~60% map / ~40% list on large screens (reference proportions) */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className={`min-h-0 ${mobileView === "map" ? "block" : "hidden"} md:block`}>
            <MapPanel
              listings={filtered}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={setSelectedId}
              onHoverMarker={setHoveredId}
              query={query}
              onQueryChange={setQuery}
              segment={segment}
              onSegmentChange={setSegment}
              searchListId={PROPERTY_MAP_SEARCH_LIST_ID}
            />
          </div>

          <div className={`min-h-0 ${mobileView === "list" ? "block" : "hidden"} md:block`}>
            <PropertyListingsPanel
              searchListId={PROPERTY_MAP_SEARCH_LIST_ID}
              totalResults={filtered.length}
              query={query}
              onQueryChange={setQuery}
              segment={segment}
              onSegmentChange={setSegment}
              sort={sort}
              onSortChange={setSort}
              region={region}
              onRegionChange={setRegion}
              page={Math.min(page, pageCount)}
              pageCount={pageCount}
              onPageChange={setPage}
              pageRows={pageRows}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onHoverCard={setHoveredId}
              onSelectCard={setSelectedId}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
