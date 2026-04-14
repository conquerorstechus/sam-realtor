export type Property = {
  slug: string;
  title: string;
  priceUsd: number;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  beds: number;
  baths: number;
  garages: number;
  sqft: number;
  propertyType: string;
  featured: boolean;
  imageUrl: string;
  tagline?: string;
  listedAtIso: string;
  highlights: string[];
};

export type Community = {
  slug: string;
  name: string;
  region: string;
  headline: string;
  description: string;
  avgPriceRangeLabel: string;
  walkScore: number;
  vibeTags: string[];
  imageUrl: string;
  listingCountLabel: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  roleLabel: string;
};

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactResult =
  | { ok: true; ticketId: string }
  | { ok: false; error: string };
