"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fadeUp } from "@/components/ui/MotionDiv";
import { formatListingPrice, listedShortAgo } from "./listingFormat";
import type { MapBrowseListing } from "./types";

type Props = {
  row: MapBrowseListing;
  active?: boolean;
  hovered?: boolean;
  saved?: boolean;
  onHover: (on: boolean) => void;
  onToggleSave: () => void;
  onSelect: () => void;
};

/** Reference-style horizontal row: photo + dense copy + agent avatars on image. */
export function MapBrowsePropertyCard({
  row,
  active,
  hovered,
  saved,
  onHover,
  onToggleSave,
  onSelect,
}: Props) {
  const href = row.listingKind === "rent" || !row.slug ? "/contact" : `/properties/${row.slug}`;
  const headline = `${row.addressLine}, ${row.city}`;
  const bathsLabel = Number.isInteger(row.baths) ? `${row.baths}` : `${row.baths}`;

  return (
    <motion.article
      variants={fadeUp}
      layout
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`group relative overflow-hidden rounded-xl border bg-white shadow-sm transition ${
        active || hovered
          ? "border-accent/40 shadow-md ring-1 ring-accent/15"
          : "border-stone-200 hover:border-stone-300 hover:shadow-md"
      }`}
    >
      <Link
        href={href}
        className="flex min-w-0 flex-col text-left no-underline outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:flex-row"
        onClick={onSelect}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[5/3] w-full shrink-0 sm:w-[38%] sm:min-w-[140px] sm:max-w-[200px] sm:self-stretch sm:min-h-[9.5rem]">
          <Image
            src={row.imageUrl}
            alt=""
            fill
            sizes="(min-width: 640px) 200px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-stone-950/10" />
          {row.featured && (
            <span className="absolute left-2 top-2 rounded-md bg-accent px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-accent-ink shadow-sm">
              Featured
            </span>
          )}
          {/* Agent avatars — reference: stacked on image corner */}
          <div className="absolute bottom-2 right-2 flex -space-x-2">
            <span
              className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-accent to-[#C63A2B] text-[10px] font-extrabold text-white shadow-md"
              title="Agent"
            >
              TR
            </span>
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-stone-200 text-[10px] font-extrabold text-stone-700 shadow-md">
              +
            </span>
          </div>
        </div>

        {/* Copy block */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-4 sm:py-4 sm:pl-5">
          <div className="min-w-0 space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">{row.propertyType}</p>
            <h4 className="text-sm font-extrabold leading-snug text-stone-900 sm:text-[0.95rem]">{headline}</h4>
            <p className="truncate text-xs text-stone-500">{row.title}</p>
            <p className="pt-1 text-xl font-extrabold tracking-tight text-stone-900 sm:text-2xl">
              {formatListingPrice(row)}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
              {row.beds} beds <span className="text-stone-300">·</span> {bathsLabel} baths{" "}
              <span className="text-stone-300">·</span> {row.sqft.toLocaleString()} sqft
            </p>
          </div>
          <p className="text-[10px] font-semibold text-stone-400">{listedShortAgo(row.listedAtIso)}</p>
        </div>
      </Link>

      <button
        type="button"
        aria-label={saved ? "Remove from saved" : "Save listing"}
        aria-pressed={saved}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleSave();
        }}
        className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white/95 text-accent shadow-sm transition hover:scale-105 hover:border-accent/30 sm:right-3 sm:top-3"
      >
        <Heart className={`h-4 w-4 ${saved ? "fill-accent text-accent" : ""}`} aria-hidden />
      </button>
    </motion.article>
  );
}
