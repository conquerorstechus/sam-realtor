"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowRight } from "lucide-react";
import type { Property } from "@/lib/types";
import { formatUsd } from "@/lib/format";
import { staggerContainer, fadeUp } from "@/components/ui/MotionDiv";

const FILTERS = ["All", "Apartment", "Single Family", "Condo", "Villa"] as const;

interface Props { properties: Property[] }

export function ListingsGrid({ properties }: Props) {
  const [active, setActive] = useState<string>("All");
  const [liked,  setLiked]  = useState<Set<string>>(new Set());

  const shown = active === "All"
    ? properties
    : properties.filter((p) => p.propertyType === active);

  function toggleLike(slug: string) {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* heading row */}
        <motion.div
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div>
            <div className="text-xs font-extrabold tracking-widest text-accent">OUR LISTING</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              Find Home Listing{" "}
              <span className="text-accent-2">in Your Area</span>
            </h2>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 px-5 py-2.5 text-xs font-extrabold text-accent transition hover:bg-accent hover:text-white"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* filter chips */}
        <motion.div
          className="mt-7 flex flex-wrap gap-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full border px-5 py-2 text-xs font-extrabold tracking-wide transition ${
                active === f
                  ? "border-accent bg-gradient-to-r from-[#C63A2B] to-[#F28C45] text-white shadow-[0_6px_20px_rgba(232,100,42,0.30)]"
                  : "border-black/10 text-muted hover:border-accent/40 hover:text-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* grid */}
        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {shown.map((p) => (
            <motion.div
              key={p.slug}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: "0 24px 55px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group overflow-hidden rounded-3xl border border-black/8 bg-surface shadow-[var(--shadow-soft)] transition-all duration-300"
            >
              {/* image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px)100vw,(max-width:1200px)50vw,400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                {/* badges */}
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  {p.featured && (
                    <span className="rounded-full bg-gradient-to-r from-[#C63A2B] to-[#F28C45] px-3 py-1 text-[10px] font-extrabold text-white shadow-sm">
                      FEATURED
                    </span>
                  )}
                  <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-extrabold text-white backdrop-blur-sm">
                    {p.propertyType}
                  </span>
                </div>

                {/* heart */}
                <button
                  type="button"
                  aria-label="Save property"
                  onClick={() => toggleLike(p.slug)}
                  suppressHydrationWarning
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition hover:scale-110"
                >
                  <Heart className={`h-4 w-4 transition ${liked.has(p.slug) ? "fill-red-500 text-red-500" : "text-muted"}`} />
                </button>

                {/* price */}
                <div className="absolute bottom-4 left-4">
                  <div className="rounded-2xl bg-white/95 px-4 py-2 shadow-sm backdrop-blur-sm">
                    <div className="text-base font-extrabold text-accent">{formatUsd(p.priceUsd)}</div>
                  </div>
                </div>
              </div>

              {/* content */}
              <div className="p-5">
                <h3 className="line-clamp-1 text-base font-extrabold tracking-tight text-text transition group-hover:text-accent">
                  {p.title}
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                  <span className="truncate">{p.addressLine}, {p.city}</span>
                </div>

                {/* stats */}
                <div className="mt-4 flex items-center gap-4 border-t border-black/8 pt-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                    <Bed className="h-4 w-4 text-accent/70" />{p.beds} Beds
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                    <Bath className="h-4 w-4 text-accent/70" />{p.baths} Baths
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                    <Maximize2 className="h-4 w-4 text-accent/70" />{p.sqft.toLocaleString()} ft²
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/properties/${p.slug}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-black/8 bg-surface-2 py-3 text-xs font-extrabold text-muted transition hover:bg-gradient-to-r hover:from-[#C63A2B] hover:to-[#F28C45] hover:border-transparent hover:text-white hover:shadow-[0_6px_20px_rgba(232,100,42,0.25)]"
                >
                  View Property <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {shown.length === 0 && (
          <div className="mt-12 text-center text-sm text-muted">No properties found for this category.</div>
        )}
      </div>
    </section>
  );
}
