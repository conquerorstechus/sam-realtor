import Link from "next/link";
import { CommunityCard } from "@/components/communities/CommunityCard";
import { Container } from "@/components/ui/Container";
import type { Community } from "@/lib/types";

export function CommunitiesPreview({ communities }: { communities: Community[] }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold tracking-wide text-accent">COMMUNITIES</div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              Neighborhood intel that actually changes decisions.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              We map lifestyle fit - not just zip codes. Start with a shortlist, then we pressure-test it
              with real inventory and real numbers.
            </p>
          </div>
          <Link
            href="/communities"
            className="inline-flex rounded-xl bg-white/5 px-5 py-3 text-sm font-extrabold text-text ring-1 ring-white/10 hover:bg-white/10"
          >
            Explore all communities
          </Link>
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
