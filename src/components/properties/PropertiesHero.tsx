"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, MapPin, Tag } from "lucide-react";
import { useState } from "react";
import { fadeUp, staggerContainer } from "@/components/ui/MotionDiv";

const TABS = ["General", "Villa", "Apartment"] as const;
const CHIPS = ["Commercial", "Villa", "Apartment", "Sales"] as const;

export function PropertiesHero() {
  const [activeTab, setActiveTab] = useState<string>("General");

  return (
    <section className="relative flex min-h-[min(92dvh,880px)] flex-col justify-between overflow-hidden bg-bg pb-0">

      {/* soft brand wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute -left-20 bottom-32 h-[320px] w-[320px] rounded-full bg-accent-2/10 blur-[90px]" />
      </div>

      {/* ── Headline + art ───────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pt-24 sm:px-6 sm:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          <motion.div
            className="max-w-xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent"
            >
              Tampa Bay · Urban &amp; luxury
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-3 text-pretty text-4xl font-extrabold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-[2.75rem] xl:text-6xl"
            >
              Find your center in the heart of Tampa.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg"
            >
              From high-rise condos with skyline views to modern townhomes in the city&apos;s most vibrant
              neighborhoods, Tampa Realty Pros connects you to the pulse of the bay.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/properties#listings"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-extrabold text-accent-ink shadow-[0_14px_40px_rgba(232,100,42,0.28)] transition hover:brightness-110 active:scale-[0.98]"
              >
                Explore urban listings
              </Link>
              <Link
                href="/properties#listings"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-extrabold text-text shadow-[var(--shadow-soft)] transition hover:border-accent/35 hover:text-accent"
              >
                View downtown properties
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
          >
            <div className="relative aspect-[5/4] w-full sm:aspect-[4/3]">
              <Image
                src="/properties-urban-hero.png"
                alt="Stylized house silhouette framing Tampa skyline, open doors, and urban highways—representing city living and new possibilities."
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain object-center drop-shadow-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Search panel ─────────────────────────────────────────── */}
      <motion.div
        className="mx-auto w-full max-w-6xl px-4 pb-0 sm:px-6"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.65 }}
      >
        <div className="overflow-hidden rounded-t-3xl border border-border bg-surface shadow-[var(--shadow-elevated)]">
          <div className="flex border-b border-border">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-7 py-4 text-sm font-extrabold tracking-wide transition ${
                  activeTab === tab ? "text-accent-ink" : "text-muted hover:text-text"
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="hero-tab"
                    className="absolute inset-0 rounded-t-xl bg-accent"
                    style={{ zIndex: -1 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          <div className="p-5">
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2 px-4 py-3 sm:col-span-1">
                <Search className="h-4 w-4 shrink-0 text-muted" />
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Keyword</div>
                  <input
                    placeholder="Looking for?"
                    suppressHydrationWarning
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-text outline-none placeholder:text-muted/60"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2 px-4 py-3">
                <Tag className="h-4 w-4 shrink-0 text-muted" />
                <div className="w-full">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Category</div>
                  <select className="mt-0.5 w-full cursor-pointer bg-transparent text-sm font-semibold text-text outline-none">
                    <option>Select category</option>
                    <option>Single family</option>
                    <option>Condo</option>
                    <option>Villa</option>
                    <option>Apartment</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2 px-4 py-3">
                <MapPin className="h-4 w-4 shrink-0 text-muted" />
                <div className="w-full">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Location</div>
                  <select className="mt-0.5 w-full cursor-pointer bg-transparent text-sm font-semibold text-text outline-none">
                    <option>Location</option>
                    <option>South Tampa</option>
                    <option>Downtown</option>
                    <option>Westchase</option>
                    <option>Hyde Park</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-2xl border border-border bg-surface-2 px-4 py-3 text-xs font-extrabold text-muted transition hover:border-accent/30 hover:text-text"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  More
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-extrabold text-accent-ink shadow-[0_8px_25px_rgba(232,100,42,0.35)] transition hover:brightness-110 active:scale-[0.98]"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="rounded-full border border-border bg-surface-2 px-4 py-1.5 text-[11px] font-extrabold text-muted transition hover:border-accent/40 hover:bg-accent/8 hover:text-accent"
                >
                  {chip} →
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
