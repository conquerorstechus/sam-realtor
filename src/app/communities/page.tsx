import type { Metadata } from "next";
import { CommunityCard } from "@/components/communities/CommunityCard";
import { Container } from "@/components/ui/Container";
import { getCommunities } from "@/lib/api/communities";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Communities",
  description: `Explore Tampa Bay neighborhoods with lifestyle-first context from ${site.name}.`,
  openGraph: {
    title: `Communities | ${site.name}`,
    description: "Neighborhood spotlights with walk scores, vibe tags, and price-range framing.",
    url: `${site.url}/communities`,
  },
};

export default async function CommunitiesPage() {
  const communities = await getCommunities();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs font-extrabold tracking-wide text-accent">LOCAL INTEL</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Communities that match how you actually live.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            These spotlights are designed for fast decisions: vibe, walkability, and realistic price
            framing - then we validate with live inventory.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {communities.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}
