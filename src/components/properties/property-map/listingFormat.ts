import { formatDate, formatUsd } from "@/lib/format";
import type { MapBrowseListing } from "./types";

export function formatListingPrice(row: MapBrowseListing) {
  if (row.listingKind === "rent" && row.rentMonthly != null) {
    return `${formatUsd(row.rentMonthly)}/mo`;
  }
  return formatUsd(row.priceUsd);
}

export function listedRelativeLabel(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / 86_400_000);
  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 7) return `Updated ${days} days ago`;
  return `Listed ${formatDate(iso)}`;
}

/** Compact “time ago” for dense listing rows (reference-style). */
export function listedShortAgo(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 8) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  return formatDate(iso);
}
