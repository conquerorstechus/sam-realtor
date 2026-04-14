import { mockCommunities } from "@/lib/mock/communities";
import type { Community } from "@/lib/types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCommunities(): Promise<Community[]> {
  await sleep(35);
  return mockCommunities;
}

export async function getCommunityBySlug(slug: string): Promise<Community | null> {
  await sleep(25);
  return mockCommunities.find((c) => c.slug === slug) ?? null;
}

export async function getCommunitySlugs(): Promise<string[]> {
  return mockCommunities.map((c) => c.slug);
}
