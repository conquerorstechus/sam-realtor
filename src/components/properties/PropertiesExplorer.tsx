"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Container } from "@/components/ui/Container";
import type { Property } from "@/lib/types";

export function PropertiesExplorer({ properties }: { properties: Property[] }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("all");

  const types = useMemo(() => {
    const set = new Set(properties.map((p) => p.propertyType));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [properties]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return properties.filter((p) => {
      const matchesType = type === "all" ? true : p.propertyType === type;
      if (!query) return matchesType;

      const hay = `${p.title} ${p.addressLine} ${p.city} ${p.state} ${p.postalCode} ${p.propertyType}`
        .toLowerCase();
      return matchesType && hay.includes(query);
    });
  }, [properties, q, type]);

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs font-extrabold tracking-wide text-accent">INVENTORY</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Properties built to compete.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Filter fast - then open the listing for the full story, highlights, and next steps.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-12 md:items-end">
          <label className="md:col-span-7">
            <div className="text-xs font-extrabold text-muted">Search</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by address, city, or keyword..."
              className="mt-2 w-full rounded-xl border border-white/10 bg-bg/40 px-4 py-3 text-sm font-semibold text-text outline-none placeholder:text-muted/70 focus:border-accent/60"
            />
          </label>
          <label className="md:col-span-5">
            <div className="text-xs font-extrabold text-muted">Property type</div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-bg/40 px-4 py-3 text-sm font-semibold text-text outline-none focus:border-accent/60"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "All types" : t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 text-sm font-semibold text-muted">
          Showing{" "}
          <span className="font-extrabold text-text">{filtered.length}</span> of{" "}
          <span className="font-extrabold text-text">{properties.length}</span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-[var(--radius-2xl)] border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
            <div className="text-lg font-extrabold text-text">No matches yet</div>
            <p className="mt-2 text-sm text-muted">Try a wider search or reset filters.</p>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
