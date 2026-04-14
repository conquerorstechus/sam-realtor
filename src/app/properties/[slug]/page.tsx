import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { formatDate, formatUsd } from "@/lib/format";
import { getPropertyBySlug, getPropertySlugs } from "@/lib/api/properties";
import { site } from "@/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};

  return {
    title: property.title,
    description: property.tagline ?? `${property.title} in ${property.city}, ${property.state}`,
    openGraph: {
      title: `${property.title} | ${site.name}`,
      description: property.tagline ?? "Listing details and next steps.",
      url: `${site.url}/properties/${property.slug}`,
      images: [{ url: property.imageUrl }],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: property.title,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.addressLine,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.postalCode,
      addressCountry: "US",
    },
    numberOfRooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    floorSize: { "@type": "QuantitativeValue", value: property.sqft, unitText: "sqft" },
  };

  return (
    <section className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-extrabold tracking-wide text-accent">LISTING</div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              {property.title}
            </h1>
            <div className="mt-2 text-sm font-semibold text-muted">
              {property.addressLine}, {property.city}, {property.state} {property.postalCode}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="text-3xl font-extrabold tracking-tight text-text">
              {formatUsd(property.priceUsd)}
            </div>
            <div className="text-xs font-semibold text-muted">Listed {formatDate(property.listedAtIso)}</div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-surface/30 shadow-[var(--shadow-elevated)]">
          <div className="relative aspect-[21/9]">
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {property.tagline ? (
                <p className="text-lg font-semibold leading-relaxed text-text">{property.tagline}</p>
              ) : null}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-extrabold text-muted">Home facts</div>
                  <div className="mt-3 space-y-2 text-sm font-semibold text-text">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted">Beds</span>
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted">Baths</span>
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted">Garages</span>
                      <span>{property.garages}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted">Sqft</span>
                      <span>{property.sqft.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted">Type</span>
                      <span>{property.propertyType}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-extrabold text-muted">Highlights</div>
                  <ul className="mt-3 space-y-2 text-sm font-semibold text-text">
                    {property.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[var(--radius-2xl)] border border-white/10 bg-gradient-to-br from-surface to-surface-2 p-6 shadow-[var(--shadow-soft)]">
                <div className="text-sm font-extrabold text-text">Next step</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Want a private tour or a same-day offer strategy brief? Send the timeline and we will
                  move fast.
                </p>
                <Link
                  href={`/contact?property=${encodeURIComponent(property.slug)}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-extrabold text-accent-ink hover:brightness-110"
                >
                  Book a tour / consult
                </Link>
                <Link
                  href="/properties"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-extrabold text-text hover:bg-white/10"
                >
                  Back to listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
