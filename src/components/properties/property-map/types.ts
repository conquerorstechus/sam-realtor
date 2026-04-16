/** Listing row used only in the map-browse experience (mock + client filters). */

export type MapBrowseListing = {
  id: string;
  /** Empty for lease rows that route to contact instead of a detail page. */
  slug: string;
  title: string;
  addressLine: string;
  city: string;
  state: string;
  /** Sale price in USD when `listingKind` is `"sale"`. */
  priceUsd: number;
  /** Monthly rent when `listingKind` is `"rent"`. */
  rentMonthly?: number;
  listingKind: "sale" | "rent";
  beds: number;
  baths: number;
  /** Defaults in UI if omitted. */
  garages?: number;
  sqft: number;
  propertyType: string;
  imageUrl: string;
  /** Extra photos for map popup thumbnails (main image is first if omitted). */
  galleryThumbUrls?: string[];
  listedAtIso: string;
  featured: boolean;
  /** WGS84 coordinates for the real map (Leaflet / OSM). */
  lat: number;
  lng: number;
  /** Used by quick filter chips. */
  regionTag: "tampa" | "beach" | "north";
  /**
   * Neighborhoods, sub-markets, and nicknames users may type (lowercase matching
   * is applied in the filter — include “st pete”, “channelside”, etc.).
   */
  areaNames?: string[];
};

export type ListingSegment = "all" | "sale" | "rent";

export type SortKey = "newest" | "priceHigh" | "priceLow";

export type RegionFilter = "all" | "tampa" | "beach" | "north" | "featured";
