"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Tag } from "lucide-react";
import { useState } from "react";
import { fadeUp, staggerContainer } from "@/components/ui/MotionDiv";

const TABS  = ["General", "Villa", "Apartment"] as const;
const CHIPS = ["Commercial", "Villa", "Apartment", "Sales"] as const;

export function PropertiesHero() {
  const [activeTab, setActiveTab] = useState<string>("General");

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden pb-0">

      {/* ── Background – dark luxury villa ──────────────────────── */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 9, ease: "easeOut" }}
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      {/* overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/80 via-bg/55 to-bg/95" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bg/70 via-transparent to-transparent" />

      {/* ── Headline area ────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pt-24 sm:px-6 sm:pt-28">
        <div className="flex items-start justify-between gap-8">

          {/* Left heading */}
          <motion.div
            className="max-w-xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-xl sm:text-6xl lg:text-7xl"
            >
              Let's Find Your
              <span className="mt-1 block text-white">Dream House.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
            >
              Discover hand-picked luxury listings across Tampa Bay — expertly marketed and ready to compete.
            </motion.p>
          </motion.div>

        </div>
      </div>

      {/* ── Search Panel embedded at hero bottom ─────────────────── */}
      <motion.div
        className="mx-auto w-full max-w-6xl px-4 pb-0 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        {/* glass card */}
        <div className="overflow-hidden rounded-t-3xl border border-white/15 bg-surface/80 shadow-[0_-10px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl">

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-7 py-4 text-sm font-extrabold tracking-wide transition ${
                  activeTab === tab ? "text-white" : "text-muted hover:text-text"
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

          {/* Fields row */}
          <div className="p-5">
            <div className="grid gap-3 sm:grid-cols-4">

              {/* Keyword */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:col-span-1">
                <Search className="h-4 w-4 shrink-0 text-muted" />
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted/70">Keyword</div>
                  <input
                    placeholder="Looking For?"
                    suppressHydrationWarning
                    className="mt-0.5 w-full bg-transparent text-sm font-semibold text-text outline-none placeholder:text-muted/50"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Tag className="h-4 w-4 shrink-0 text-muted" />
                <div className="w-full">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted/70">Category</div>
                  <select className="mt-0.5 w-full bg-transparent text-sm font-semibold text-muted outline-none">
                    <option>Select Category</option>
                    <option>Single Family</option>
                    <option>Condo</option>
                    <option>Villa</option>
                    <option>Apartment</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <MapPin className="h-4 w-4 shrink-0 text-muted" />
                <div className="w-full">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted/70">Location</div>
                  <select className="mt-0.5 w-full bg-transparent text-sm font-semibold text-muted outline-none">
                    <option>Location</option>
                    <option>South Tampa</option>
                    <option>Downtown</option>
                    <option>Westchase</option>
                    <option>Hyde Park</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-extrabold text-muted transition hover:bg-white/10 hover:text-text"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  More
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-extrabold text-accent-ink shadow-[0_8px_25px_rgba(245,158,11,0.40)] transition hover:brightness-110 active:scale-95"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </div>

            {/* Filter chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-extrabold text-muted/80 transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
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
