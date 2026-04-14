import Image from "next/image";
import Link from "next/link";
import type { Community } from "@/lib/types";

export function CommunityCard({ community }: { community: Community }) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-surface/35 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:border-white/20">
      <Link href={`/communities/${community.slug}`} className="block">
        <div className="relative aspect-[16/10]">
          <Image
            src={community.imageUrl}
            alt={community.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/20 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1 text-[11px] font-extrabold text-white ring-1 ring-white/15 backdrop-blur">
            Walk score {community.walkScore}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-sm font-semibold text-white/80">{community.region}</div>
            <div className="text-xl font-extrabold tracking-tight text-white">{community.name}</div>
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs font-extrabold text-accent">{community.listingCountLabel}</div>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{community.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {community.vibeTags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-text ring-1 ring-white/10"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-text">
            Explore community <span aria-hidden="true">→</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
