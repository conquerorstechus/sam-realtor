"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/components/ui/MotionDiv";
import { FilterChips } from "./FilterChips";
import { MapBrowsePagination } from "./MapBrowsePagination";
import { MapBrowsePropertyCard } from "./MapBrowsePropertyCard";
import { PropertySearchToolbar } from "./PropertySearchToolbar";
import type { ListingSegment, MapBrowseListing, RegionFilter, SortKey } from "./types";

type Props = {
  searchListId: string;
  totalResults: number;
  query: string;
  onQueryChange: (q: string) => void;
  segment: ListingSegment;
  onSegmentChange: (s: ListingSegment) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  region: RegionFilter;
  onRegionChange: (r: RegionFilter) => void;
  page: number;
  pageCount: number;
  onPageChange: (p: number) => void;
  pageRows: MapBrowseListing[];
  selectedId: string | null;
  hoveredId: string | null;
  onHoverCard: (id: string | null) => void;
  onSelectCard: (id: string) => void;
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
};

export function PropertyListingsPanel(props: Props) {
  const {
    searchListId,
    totalResults,
    query,
    onQueryChange,
    segment,
    onSegmentChange,
    sort,
    onSortChange,
    region,
    onRegionChange,
    page,
    pageCount,
    onPageChange,
    pageRows,
    selectedId,
    hoveredId,
    onHoverCard,
    onSelectCard,
    savedIds,
    onToggleSave,
  } = props;

  return (
    <div className="flex h-full flex-col gap-5 rounded-[var(--radius-2xl)] border border-stone-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
      <PropertySearchToolbar
        searchListId={searchListId}
        totalResults={totalResults}
        query={query}
        onQueryChange={onQueryChange}
        segment={segment}
        onSegmentChange={onSegmentChange}
        sort={sort}
        onSortChange={onSortChange}
        onFilterClick={() =>
          document.getElementById("map-browse-filters")?.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }
      />

      <div id="map-browse-filters" className="scroll-mt-28">
        <FilterChips value={region} onChange={onRegionChange} />
      </div>

      <motion.div
        className="grid flex-1 grid-cols-1 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        key={page}
      >
        {pageRows.map((row) => (
          <MapBrowsePropertyCard
            key={row.id}
            row={row}
            active={selectedId === row.id}
            hovered={hoveredId === row.id}
            saved={savedIds.has(row.id)}
            onHover={(on) => onHoverCard(on ? row.id : null)}
            onToggleSave={() => onToggleSave(row.id)}
            onSelect={() => onSelectCard(row.id)}
          />
        ))}
      </motion.div>

      {pageRows.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border bg-surface-2 px-4 py-8 text-center text-sm text-muted">
          No homes match your filters. Try clearing search or switching area chips.
        </p>
      )}

      <MapBrowsePagination page={page} pageCount={pageCount} onPageChange={onPageChange} />
    </div>
  );
}
