"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, CarFront, ChevronLeft, ChevronRight, MapPin, Maximize2, X } from "lucide-react";
import { useEffect } from "react";
import type { MapBrowseListing } from "./types";

const THUMB_POOL = [
  "https://images.unsplash.com/photo-1600566753080-43a9e9fc642a?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1600585154529-990dced4db0d?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=75",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=400&q=75",
] as const;

function formatUsdCents(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatRentCents(monthly: number) {
  return `${formatUsdCents(monthly)}/mo`;
}

function galleryThumbs(row: MapBrowseListing, index: number): [string, string, string] {
  const g = row.galleryThumbUrls;
  if (g && g.length >= 3) return [g[0]!, g[1]!, g[2]!];
  const a = THUMB_POOL[index % THUMB_POOL.length]!;
  const b = THUMB_POOL[(index + 1) % THUMB_POOL.length]!;
  return [row.imageUrl, a, b];
}

type Props = {
  row: MapBrowseListing;
  listings: MapBrowseListing[];
  onClose: () => void;
};

/**
 * Map popup card: gallery, price with cents, spec icons, address, deep link.
 * Prev/Next live in `MapPopupNav` on the map chrome.
 */
export function MapPropertyInfoWindow({ row, listings, onClose }: Props) {
  const idx = Math.max(0, listings.findIndex((l) => l.id === row.id));
  const thumbs = galleryThumbs(row, idx);
  const garages = row.garages ?? 2;

  const href = row.listingKind === "rent" || !row.slug ? "/contact" : `/properties/${row.slug}`;
  const priceLabel =
    row.listingKind === "rent" && row.rentMonthly != null
      ? formatRentCents(row.rentMonthly)
      : formatUsdCents(row.priceUsd);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const typeLine = (() => {
    const x = row.propertyType.toLowerCase();
    if (x.includes("single family")) return "Single family home";
    return row.propertyType;
  })();

  return (
    <motion.div
      key={row.id}
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_22px_55px_rgba(0,0,0,0.28)]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`map-popup-title-${row.id}`}
    >
        {/* Gallery */}
        <div className="relative aspect-[16/10] w-full bg-stone-100">
          <Image
            src={row.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="300px"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/10" />
          {row.featured && (
            <span className="absolute left-2 top-2 rounded-md bg-emerald-600 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white shadow-sm">
              Featured
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-stone-700 shadow-md ring-1 ring-stone-200/80 transition hover:bg-white"
            aria-label="Close property preview"
          >
            <X className="h-4 w-4" />
          </button>
          {/* Agent badge — reference-style overlay */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full border border-white/40 bg-white/90 py-0.5 pl-0.5 pr-2 shadow-md backdrop-blur-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#C63A2B] text-[10px] font-extrabold text-white">
              TR
            </span>
            <span className="max-w-[4.5rem] truncate text-[9px] font-bold leading-tight text-stone-800">Tampa Realty Pros</span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 gap-1 border-b border-stone-100 bg-stone-50 p-1">
          {thumbs.map((url, i) => (
            <div key={`${row.id}-t-${i}`} className="relative aspect-[4/3] overflow-hidden rounded-md bg-stone-200">
              <Image src={url} alt="" fill className="object-cover" sizes="120px" />
            </div>
          ))}
        </div>

        <div className="space-y-2.5 p-3.5">
          <p id={`map-popup-title-${row.id}`} className="text-xl font-extrabold tabular-nums tracking-tight text-stone-900">
            {priceLabel}
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-wide text-stone-500">
            <span className="inline-flex items-center gap-1">
              <Bed className="h-3.5 w-3.5 text-accent" aria-hidden />
              {row.beds} beds
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath className="h-3.5 w-3.5 text-accent" aria-hidden />
              {row.baths} baths
            </span>
            <span className="inline-flex items-center gap-1">
              <CarFront className="h-3.5 w-3.5 text-accent" aria-hidden />
              {garages}-car
            </span>
            <span className="inline-flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5 text-accent-2" aria-hidden />
              {row.sqft.toLocaleString()} sqft
            </span>
          </div>

          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">{typeLine}</p>

          <p className="flex items-start gap-1.5 text-xs font-semibold leading-snug text-stone-700">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
            <span className="line-clamp-2">
              {row.addressLine}, {row.city}
              {row.state ? `, ${row.state}` : ""}
            </span>
          </p>

          <Link
            href={href}
            className="mt-1 block w-full rounded-xl bg-stone-900 py-2.5 text-center text-xs font-extrabold text-white no-underline shadow-sm transition hover:bg-stone-800"
          >
            View full listing
          </Link>
        </div>
    </motion.div>
  );
}

/** Floating map chrome: cycle markers without clicking each pin. */
export function MapPopupNav({
  canPrev,
  canNext,
  onPrev,
  onNext,
}: {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="pointer-events-auto flex gap-1.5">
      <button
        type="button"
        aria-label="Previous property on map"
        disabled={!canPrev}
        onClick={onPrev}
        className="rounded-lg border border-white/15 bg-stone-950/92 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-lg backdrop-blur-md transition hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <span className="inline-flex items-center gap-0.5">
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
          Prev
        </span>
      </button>
      <button
        type="button"
        aria-label="Next property on map"
        disabled={!canNext}
        onClick={onNext}
        className="rounded-lg border border-white/15 bg-stone-950/92 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-lg backdrop-blur-md transition hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <span className="inline-flex items-center gap-0.5">
          Next
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </button>
    </div>
  );
}
