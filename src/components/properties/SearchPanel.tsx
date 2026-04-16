"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Tag } from "lucide-react";
import { useState } from "react";
import { fadeUp } from "@/components/ui/MotionDiv";

const TABS   = ["General", "Villa", "Apartment"] as const;
const CHIPS  = ["Commercial", "Villa", "Sales", "Luxury", "Waterfront"] as const;

export function SearchPanel() {
  const [activeTab, setActiveTab] = useState<string>("General");

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4 }}
      className="relative z-20 mx-auto -mt-20 w-full max-w-5xl px-4 sm:px-6"
    >
      {/* glass card */}
      <div className="overflow-hidden rounded-3xl border border-white/15 bg-bg/70 shadow-[0_32px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">

        {/* ── Tabs ──────────────────────────────────────────────── */}
        <div className="flex border-b border-white/10">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative px-7 py-4 text-sm font-extrabold tracking-wide transition ${
                activeTab === tab
                  ? "text-accent"
                  : "text-muted hover:text-text"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent"
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Search fields ─────────────────────────────────────── */}
        <div className="p-5">
          <div className="grid gap-3 sm:grid-cols-4">

            {/* Keyword */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 sm:col-span-1">
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Keyword</div>
                <input
                  placeholder="Looking For?"
                  className="mt-0.5 w-full bg-transparent text-sm font-semibold text-text outline-none placeholder:text-muted/50"
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5">
              <Tag className="h-4 w-4 shrink-0 text-muted" />
              <div className="w-full">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Category</div>
                <select className="mt-0.5 w-full bg-transparent text-sm font-semibold text-muted outline-none">
                  <option value="">Select Category</option>
                  <option>Single Family</option>
                  <option>Condo</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5">
              <MapPin className="h-4 w-4 shrink-0 text-muted" />
              <div className="w-full">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Location</div>
                <select className="mt-0.5 w-full bg-transparent text-sm font-semibold text-muted outline-none">
                  <option value="">Location</option>
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
                className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-xs font-extrabold text-muted transition hover:bg-white/10 hover:text-text"
              >
                <SlidersHorizontal className="h-4 w-4" />
                More
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3.5 text-sm font-extrabold text-accent-ink shadow-[0_10px_30px_rgba(245,158,11,0.35)] transition hover:brightness-110 active:scale-95"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
          </div>

          {/* ── Filter chips ──────────────────────────────────── */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Quick filters:</span>
            {CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-extrabold text-muted transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
              >
                {chip} →
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
