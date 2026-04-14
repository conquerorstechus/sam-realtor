import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getCommunities, getCommunityBySlug, getCommunitySlugs } from "@/lib/api/communities";
import { site } from "@/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getCommunitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);
  if (!community) return {};

  return {
    title: `${community.name} | Communities`,
    description: community.headline,
    openGraph: {
      title: `${community.name} | ${site.name}`,
      description: community.headline,
      url: `${site.url}/communities/${community.slug}`,
      images: [{ url: community.imageUrl }],
    },
  };
}

export default async function CommunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);
  if (!community) notFound();

  const others = (await getCommunities()).filter((c) => c.slug !== community.slug).slice(0, 2);

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="text-xs font-extrabold tracking-wide text-accent">COMMUNITY</div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-5xl">
              {community.name}
            </h1>
            <p className="mt-3 text-sm font-semibold text-muted">{community.region}</p>
            <p className="mt-6 text-lg font-semibold leading-relaxed text-text">{community.headline}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{community.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs font-extrabold text-muted">Walk score</div>
                <div className="mt-2 text-2xl font-extrabold text-text">{community.walkScore}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs font-extrabold text-muted">Price range</div>
                <div className="mt-2 text-sm font-extrabold text-text">{community.avgPriceRangeLabel}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs font-extrabold text-muted">Spotlight</div>
                <div className="mt-2 text-sm font-extrabold text-text">{community.listingCountLabel}</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-extrabold text-accent-ink hover:brightness-110"
              >
                See matching listings
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold text-text hover:bg-white/10"
              >
                Plan a neighborhood tour
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-surface/30 shadow-[var(--shadow-elevated)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={community.imageUrl}
                  alt={community.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="text-xs font-extrabold text-muted">Vibe tags</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {community.vibeTags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs font-extrabold text-text ring-1 ring-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {others.length ? (
          <div className="mt-16">
            <div className="text-sm font-extrabold text-text">More communities to compare</div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={`/communities/${c.slug}`}
                  className="group rounded-[var(--radius-2xl)] border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20"
                >
                  <div className="text-xs font-extrabold text-accent">{c.region}</div>
                  <div className="mt-2 text-xl font-extrabold text-text group-hover:text-white">{c.name}</div>
                  <div className="mt-2 text-sm text-muted">{c.headline}</div>
                  <div className="mt-4 text-sm font-extrabold text-text">
                    View profile <span aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
