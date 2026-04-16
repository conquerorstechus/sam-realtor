"use client";

import type { RegionFilter } from "./types";

const CHIPS: { id: RegionFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tampa", label: "Tampa core" },
  { id: "beach", label: "Gulf beaches" },
  { id: "north", label: "North county" },
  { id: "featured", label: "Featured" },
];

type Props = {
  value: RegionFilter;
  onChange: (v: RegionFilter) => void;
};

export function FilterChips({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Quick area filters">
      {CHIPS.map((c) => (
        <button
          key={c.id}
          type="button"
          aria-pressed={value === c.id}
          onClick={() => onChange(c.id)}
          className={`rounded-full border px-3.5 py-1.5 text-[11px] font-extrabold tracking-wide transition ${
            value === c.id
              ? "border-accent/40 bg-accent text-accent-ink shadow-[0_6px_18px_rgba(232,100,42,0.22)]"
              : "border-stone-200 bg-stone-50 text-stone-600 hover:border-accent/25 hover:text-stone-900"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
