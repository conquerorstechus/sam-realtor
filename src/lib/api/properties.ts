import { mockProperties } from "@/lib/mock/properties";
import type { Property } from "@/lib/types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProperties(): Promise<Property[]> {
  // Simulate network latency for future API parity.
  await sleep(35);
  return mockProperties;
}

export async function getFeaturedProperties(limit = 6): Promise<Property[]> {
  const featured = mockProperties.filter((p) => p.featured);
  return featured.slice(0, limit);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  await sleep(25);
  return mockProperties.find((p) => p.slug === slug) ?? null;
}

export async function getPropertySlugs(): Promise<string[]> {
  return mockProperties.map((p) => p.slug);
}
