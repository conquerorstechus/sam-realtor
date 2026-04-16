import type { ListingSegment, MapBrowseListing, RegionFilter } from "./types";

/** Stable id for `<datalist>` shared by sidebar + map search inputs. */
export const PROPERTY_MAP_SEARCH_LIST_ID = "property-map-search-suggestions";

/** One-tap queries for common Tampa Bay markets (label vs search string). */
export const AREA_QUICK_SEARCHES: { label: string; value: string }[] = [
  { label: "Tampa", value: "Tampa" },
  { label: "St. Pete", value: "St. Petersburg" },
  { label: "Clearwater", value: "Clearwater" },
  { label: "Channelside", value: "Channelside" },
  { label: "Hyde Park", value: "Hyde Park" },
  { label: "Wesley Chapel", value: "Wesley Chapel" },
  { label: "Riverview", value: "Riverview" },
  { label: "Palm Harbor", value: "Palm Harbor" },
  { label: "Snell Isle", value: "Snell Isle" },
  { label: "Island Estates", value: "Island Estates" },
];

/** Lowercase + drop punctuation so “St Petersburg” matches “St. Petersburg”. */
function normalizeSearchText(s: string) {
  return s
    .toLowerCase()
    .replace(/['.]/g, "")
    .replace(/,/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function listingSearchBlob(row: MapBrowseListing): string {
  const areas = (row.areaNames ?? []).join(" ");
  const raw = `${row.title} ${row.addressLine} ${row.city} ${row.state} ${row.propertyType} ${areas}`;
  return normalizeSearchText(raw);
}

function matchesQuery(blob: string, rawQuery: string): boolean {
  const q = normalizeSearchText(rawQuery);
  if (!q) return true;
  const tokens = q.split(" ").filter(Boolean);
  return tokens.every((t) => blob.includes(t));
}

export function filterMapListings(
  rows: MapBrowseListing[],
  query: string,
  segment: ListingSegment,
  region: RegionFilter,
): MapBrowseListing[] {
  return rows.filter((r) => {
    if (segment === "sale" && r.listingKind !== "sale") return false;
    if (segment === "rent" && r.listingKind !== "rent") return false;
    if (region === "tampa" && r.regionTag !== "tampa") return false;
    if (region === "beach" && r.regionTag !== "beach") return false;
    if (region === "north" && r.regionTag !== "north") return false;
    if (region === "featured" && !r.featured) return false;
    return matchesQuery(listingSearchBlob(r), query);
  });
}

/** Values for `<datalist>` — cities, areas, and listing titles from the catalog. */
export function buildSearchDatalistOptions(rows: MapBrowseListing[]): string[] {
  const set = new Set<string>();
  for (const r of rows) {
    set.add(r.city);
    set.add(r.title);
    set.add(r.addressLine.split(",")[0]?.trim() ?? "");
    for (const a of r.areaNames ?? []) {
      if (a.trim()) set.add(a);
    }
  }
  for (const { label, value } of AREA_QUICK_SEARCHES) {
    set.add(label);
    set.add(value);
  }
  set.add("Tampa Bay");
  set.add("Downtown Tampa");
  set.add("Gulf beaches");
  return [...set].filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}
