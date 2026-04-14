import Link from "next/link";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Container } from "@/components/ui/Container";
import type { Property } from "@/lib/types";

export function FeaturedProperties({ properties }: { properties: Property[] }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold tracking-wide text-accent">EXCLUSIVE LISTINGS</div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              Properties engineered to stop the scroll.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Featured inventory rotates fast - if you want first look, tell us your must-haves and we
              will route matches the moment they hit.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex rounded-xl bg-white/5 px-5 py-3 text-sm font-extrabold text-text ring-1 ring-white/10 hover:bg-white/10"
          >
            Browse all listings
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
