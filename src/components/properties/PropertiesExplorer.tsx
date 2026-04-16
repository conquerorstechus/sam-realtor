"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Container } from "@/components/ui/Container";
import type { Property } from "@/lib/types";

/* ── Property type category data ──────────────────────────────── */
const CATEGORIES = [
  {
    label: "Single Family",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M6 20L24 5l18 15v22a2 2 0 01-2 2H8a2 2 0 01-2-2V20z" />
        <path d="M18 42V28h12v14" />
      </svg>
    ),
  },
  {
    label: "Condo",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <rect x="8" y="8" width="14" height="34" rx="1" />
        <rect x="26" y="16" width="14" height="26" rx="1" />
        <path d="M8 42h32" />
        <path d="M14 16h2M14 22h2M14 28h2M14 34h2" />
        <path d="M32 24h2M32 30h2M32 36h2" />
      </svg>
    ),
  },
  {
    label: "Villa",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M4 22L24 6l20 16" />
        <path d="M8 22v18h32V22" />
        <path d="M18 40V30h12v10" />
        <path d="M8 28h6M34 28h6" />
      </svg>
    ),
  },
  {
    label: "Apartment",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <rect x="6" y="6" width="36" height="36" rx="2" />
        <path d="M6 18h36M6 30h36M18 6v36M30 6v36" />
      </svg>
    ),
  },
  {
    label: "Waterfront",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M6 20L24 5l18 15v14H6V20z" />
        <path d="M6 34c3 3 6 3 9 0s6-3 9 0 6 3 9 0" />
        <path d="M6 40c3 3 6 3 9 0s6-3 9 0 6 3 9 0" />
      </svg>
    ),
  },
] as const;

const STATS = [
  { val: "500+", label: "Properties Listed" },
  { val: "30k+", label: "Satisfied Clients" },
  { val: "12yrs", label: "Market Experience" },
  { val: "98%",  label: "Success Rate" },
];

/* ── Main component ────────────────────────────────────────────── */
export function PropertiesExplorer({ properties }: { properties: Property[] }) {
  const [q, setQ]       = useState("");
  const [type, setType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");

  const types = useMemo(() => {
    const set = new Set(properties.map((p) => p.propertyType));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [properties]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return properties.filter((p) => {
      const matchesType = type === "all" ? true : p.propertyType === type;
      if (!query) return matchesType;
      const hay = `${p.title} ${p.addressLine} ${p.city} ${p.state} ${p.postalCode} ${p.propertyType}`.toLowerCase();
      return matchesType && hay.includes(query);
    });
  }, [properties, q, type]);

  /* count per category for badges */
  const countFor = (label: string) =>
    properties.filter((p) => p.propertyType === label).length;

  return (
    <div className="relative overflow-hidden">

      {/* ══════════════════════════════════════════════
          HERO SEARCH BANNER
          ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        {/* background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-surface via-bg to-surface-2" />
          <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-accent/12 blur-[100px]" />
          <div className="absolute -right-32 bottom-0 h-[350px] w-[350px] rounded-full bg-accent-2/10 blur-[90px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />
        </div>

        <Container>
          {/* label */}
          <div className="text-center text-xs font-extrabold tracking-widest text-accent">
            PROPERTY BY REQUIREMENT
          </div>

          {/* headline */}
          <h1 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Find Your{" "}
            <span className="bg-gradient-to-r from-accent via-yellow-300 to-accent-2 bg-clip-text text-transparent">
              Dream Property
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted">
            Browse premium Tampa Bay listings — filter by type, keyword, or location to find your perfect match.
          </p>

          {/* type tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setActiveTab(t); setType(t); }}
                className={`rounded-full px-5 py-2 text-xs font-extrabold tracking-wide transition ${
                  activeTab === t
                    ? "bg-accent text-accent-ink shadow-[0_8px_24px_rgba(245,158,11,0.30)]"
                    : "border border-white/15 bg-white/5 text-muted hover:border-accent/40 hover:text-text"
                }`}
              >
                {t === "all" ? "All Types" : t}
              </button>
            ))}
          </div>

          {/* search bar */}
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/12 bg-surface/60 p-3 shadow-[var(--shadow-elevated)] backdrop-blur-md sm:flex-row sm:items-center">
              {/* keyword */}
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search address, city, keyword..."
                  className="w-full bg-transparent text-sm font-semibold text-text outline-none placeholder:text-muted/60"
                />
              </div>
              {/* location chip */}
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 sm:w-40">
                <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-semibold text-muted">Tampa Bay</span>
              </div>
              {/* search btn */}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-extrabold text-accent-ink shadow-[0_8px_24px_rgba(245,158,11,0.28)] transition hover:brightness-110 active:scale-95"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* quick tags */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {["Commercial", "Waterfront", "Villa", "New Construction", "Luxury"].map((tag) => (
              <span
                key={tag}
                className="cursor-pointer rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-[11px] font-extrabold text-muted transition hover:border-accent/40 hover:text-accent"
              >
                {tag} &rarr;
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          EXPLORE PROPERTY TYPES
          ══════════════════════════════════════════════ */}
      <section className="border-y border-white/8 bg-surface/30 py-14">
        <Container>
          <div className="mb-10 text-center">
            <div className="text-xs font-extrabold tracking-widest text-accent">BROWSE BY CATEGORY</div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
              Explore Property{" "}
              <span className="text-accent">Types</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((cat) => {
              const count = countFor(cat.label);
              const isActive = type === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => { setType(isActive ? "all" : cat.label); setActiveTab(isActive ? "all" : cat.label); }}
                  className={`group flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition duration-200 hover:-translate-y-1 ${
                    isActive
                      ? "border-accent/50 bg-accent/10 shadow-[0_12px_35px_rgba(245,158,11,0.18)]"
                      : "border-white/10 bg-surface/40 hover:border-accent/30 hover:bg-surface"
                  }`}
                >
                  <div className={`transition duration-200 ${isActive ? "text-accent" : "text-muted group-hover:text-accent"}`}>
                    {cat.icon}
                  </div>
                  <div>
                    <div className={`text-sm font-extrabold ${isActive ? "text-accent" : "text-text"}`}>
                      {cat.label}
                    </div>
                    <div className="mt-0.5 text-[11px] font-semibold text-muted">
                      {count} {count === 1 ? "Property" : "Properties"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          LISTING GRID
          ══════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="text-xs font-extrabold tracking-widest text-accent">OUR LISTING</div>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
                Find Home Listing{" "}
                <span className="text-accent">In Your Area</span>
              </h2>
            </div>
            <div className="text-sm font-semibold text-muted">
              Showing{" "}
              <span className="font-extrabold text-text">{filtered.length}</span>
              {" "}of{" "}
              <span className="font-extrabold text-text">{properties.length}</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-[var(--radius-2xl)] border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
              <div className="text-lg font-extrabold text-text">No matches found</div>
              <p className="mt-2 text-sm text-muted">Try adjusting your search or reset filters.</p>
              <button
                type="button"
                onClick={() => { setQ(""); setType("all"); setActiveTab("all"); }}
                className="mt-5 inline-flex rounded-xl bg-accent px-6 py-2.5 text-sm font-extrabold text-accent-ink hover:brightness-110"
              >
                Reset filters
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          CTA BANNER — "Welcome To Our Luxurious Properties"
          ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16">
        <Container>
          <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-gradient-to-r from-surface via-surface-2 to-[#0d1628] shadow-[var(--shadow-elevated)]">
            {/* accent blobs */}
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-accent-2/12 blur-3xl" />

            <div className="relative flex flex-col items-start justify-between gap-8 p-8 sm:p-10 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <div className="text-xs font-extrabold tracking-widest text-accent">PROPERTIES</div>
                <h2 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-text sm:text-3xl">
                  Welcome To Our{" "}
                  <span className="text-accent">Luxurious Properties</span>{" "}
                  With All The Conveniences.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Premium listings across Tampa Bay — each marketed with professional photography,
                  pricing strategy, and a launch plan that attracts the right buyers fast.
                </p>
              </div>

              {/* stats grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 lg:gap-5">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-extrabold tabular-nums text-text">{s.val}</div>
                    <div className="mt-1 text-center text-[11px] font-semibold text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* bottom CTA */}
            <div className="relative border-t border-white/8 px-8 py-5 sm:px-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-extrabold text-accent-ink shadow-[0_10px_30px_rgba(245,158,11,0.25)] transition hover:brightness-110 active:scale-95"
              >
                View All Properties
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════
          WELCOME / ABOUT STRIP
          ══════════════════════════════════════════════ */}
      <section className="border-t border-white/8 py-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* left – image block */}
            <div className="relative">
              <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-surface/40 shadow-[var(--shadow-elevated)]">
                <div
                  className="aspect-[4/3] bg-gradient-to-br from-surface via-surface-2 to-[#0d1628]"
                  style={{
                    backgroundImage: "url('/hero-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
              {/* floating stat card */}
              <div className="absolute -bottom-5 -right-4 flex items-center gap-4 rounded-2xl border border-white/15 bg-surface/85 px-5 py-4 shadow-[var(--shadow-elevated)] backdrop-blur-xl">
                <div className="text-center">
                  <div className="text-xl font-extrabold text-text">30k+</div>
                  <div className="text-[10px] font-semibold text-muted">Satisfied Clients</div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-xl font-extrabold text-text">700+</div>
                  <div className="text-[10px] font-semibold text-muted">Houses Sold</div>
                </div>
              </div>
            </div>

            {/* right – copy */}
            <div>
              <div className="text-xs font-extrabold tracking-widest text-accent">ABOUT COMPANY</div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
                Welcome To{" "}
                <span className="text-accent">Properties</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Tampa Realty Pros is a results-driven team with a sharp eye for detail, a flair
                for creative marketing, and an obsession with helping clients find — and win — their
                perfect home across Tampa Bay.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Proactively certified client advisors",
                  "No waiting — immediate offer strategy on request",
                  "Immediate 24/7 emergency support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold text-text transition hover:bg-white/10 active:scale-95"
              >
                Explore More
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
