"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [idx, setIdx] = useState(0);
  const active = useMemo(() => testimonials[idx], [idx, testimonials]);

  function prev() {
    setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  function next() {
    setIdx((i) => (i + 1) % testimonials.length);
  }

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs font-extrabold tracking-wide text-accent">TESTIMONIALS</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Proof beats promises.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Real clients, real timelines, real market pressure - told without the fluff.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[var(--radius-2xl)] border border-black/8 bg-surface p-8 shadow-[var(--shadow-elevated)] sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <blockquote className="max-w-3xl text-lg font-semibold leading-relaxed text-text sm:text-xl">
              "{active.quote}"
            </blockquote>

            <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
              <div className="text-right">
                <div className="text-sm font-extrabold text-text">{active.name}</div>
                <div className="mt-1 text-xs font-semibold text-muted">{active.roleLabel}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-xl border border-black/10 bg-black/5 px-4 py-2 text-sm font-extrabold text-text hover:bg-black/10"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-xl border border-black/10 bg-black/5 px-4 py-2 text-sm font-extrabold text-text hover:bg-black/10"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setIdx(i)}
                className={`rounded-full px-3 py-1 text-[11px] font-extrabold ring-1 ${
                  i === idx
                    ? "bg-accent text-accent-ink ring-accent/40"
                    : "bg-black/5 text-muted ring-black/10 hover:bg-black/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
