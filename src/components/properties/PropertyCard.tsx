import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatUsd } from "@/lib/format";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group overflow-hidden rounded-[var(--radius-2xl)] border border-black/8 bg-surface shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            {property.featured && (
              <span className="rounded-full bg-gradient-to-r from-[#C63A2B] to-[#F28C45] px-3 py-1 text-[11px] font-extrabold text-white shadow-sm">
                Featured
              </span>
            )}
            <span className="rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
              {property.propertyType}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-lg font-extrabold tracking-tight text-white">{formatUsd(property.priceUsd)}</div>
            <div className="mt-1 line-clamp-1 text-xs font-semibold text-white/85">{property.addressLine}</div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold text-muted">
            <span>{property.beds} beds</span>
            <span className="text-black/20">•</span>
            <span>{property.baths} baths</span>
            <span className="text-black/20">•</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
          {property.tagline && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text">{property.tagline}</p>
          )}
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-accent-2">
            View details <span aria-hidden="true">→</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
