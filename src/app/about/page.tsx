import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Meet ${site.name} — a high-energy Tampa Bay real estate team built on strategy, speed, and obsessive follow-through.`,
  openGraph: {
    title: `About Us | ${site.name}`,
    description: "Strategy-first real estate: pricing, negotiation, marketing, and relocation execution.",
    url: `${site.url}/about`,
  },
};

const pillars = [
  {
    title: "Offer Strategy That Survives Scrutiny",
    body: "We build offers with clean terms, defensible timelines, and negotiation leverage — not desperation. Every deal is engineered to close.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" />
      </svg>
    ),
  },
  {
    title: "Listing Marketing That Feels Like a Launch",
    body: "Positioning, presentation, and distribution — so the right buyers show up fast and compete. We don't list homes, we launch them.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Relocation Workflows for Real Pressure",
    body: "PCS timelines, VA loan fluency, and the kind of calm execution that only comes from having lived the move firsthand.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 010 20M2 12h20" />
      </svg>
    ),
  },
] as const;

const stats = [
  { val: "500+", label: "Deals closed" },
  { val: "12yrs", label: "Market expertise" },
  { val: "98%",  label: "Client satisfaction" },
  { val: "<10m", label: "Avg. response" },
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">

      {/* ── ambient background orbs ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute -right-20 top-20 h-[320px] w-[320px] rounded-full bg-accent-2/6 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[280px] w-[600px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — About Us  (reference layout)
          ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* ── LEFT – heading + icon list ─────────────────── */}
            <div>
              {/* heading with accent underline */}
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
                  About Us
                </h1>
                {/* accent underline — mirrors reference yellow bar */}
                <div className="mt-3 h-1 w-14 rounded-full bg-accent" />
              </div>

              <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                Bay Crest Realty Group is a high-energy Tampa Bay team built on three things:
                speed, strategy, and obsessive follow-through. We don't "help you buy a house" —
                we run the campaign.
              </p>

              {/* icon feature list */}
              <ul className="mt-10 space-y-8">
                {pillars.map((p) => (
                  <li key={p.title} className="flex items-start gap-5">
                    {/* circular icon — accent filled, mirrors reference yellow circles */}
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[0_8px_24px_rgba(245,158,11,0.30)]">
                      {p.icon}
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-text">{p.title}</div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3.5 text-sm font-extrabold text-accent-ink shadow-[0_12px_35px_rgba(245,158,11,0.25)] transition hover:brightness-110 active:scale-95"
                >
                  Book a consult
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-extrabold text-text transition hover:bg-white/10 active:scale-95"
                >
                  Our services
                </Link>
              </div>
            </div>

            {/* ── RIGHT – circular image + accent blob ──────────── */}
            <div className="relative flex items-center justify-center">

              {/* accent blob top-right — mirrors reference yellow shape */}
              <div
                className="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent/20 blur-[2px]"
                aria-hidden="true"
              />
              {/* smaller accent blob bottom-right */}
              <div
                className="absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-accent/30"
                aria-hidden="true"
              />

              {/* circular image frame */}
              <div className="relative z-10 h-[380px] w-[380px] overflow-hidden rounded-full border-4 border-accent/30 shadow-[0_30px_70px_rgba(0,0,0,0.55)] sm:h-[440px] sm:w-[440px]">
                <Image
                  src="/about-agent.jpg"
                  alt="Bay Crest Realty agent"
                  fill
                  sizes="(max-width: 640px) 380px, 440px"
                  className="object-cover object-top"
                  priority
                />
                {/* subtle inner overlay for depth */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
              </div>

              {/* floating credential badge */}
              <div className="absolute -bottom-4 left-4 z-20 flex items-center gap-3 rounded-2xl border border-white/15 bg-surface/80 px-5 py-3 shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:left-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-ink">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-extrabold text-text">Licensed Realtor®</div>
                  <div className="text-[11px] text-muted">Tampa Bay, FL</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Stats strip
          ══════════════════════════════════════════════════════ */}
      <section className="border-y border-white/8 bg-white/[0.02]">
        <Container className="py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.val} className="text-center">
                <div className="text-3xl font-extrabold tabular-nums text-text">{s.val}</div>
                <div className="mt-1 text-xs font-semibold text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Process steps
          ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold tracking-widest text-accent">HOW WE WORK</div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
              What working together looks like
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { n: "01", title: "Clarify", body: "Define goals, constraints, and timeline in one focused sitting — no wasted time." },
              { n: "02", title: "Strategize", body: "Build a market plan with scenarios, not a single fragile guess." },
              { n: "03", title: "Execute", body: "Daily communication until keys are in hand or closing docs are signed." },
            ].map((step) => (
              <div
                key={step.n}
                className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-gradient-to-br from-surface to-surface-2 p-7 shadow-[var(--shadow-soft)]"
              >
                <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-accent/8 blur-2xl" />
                <div className="relative">
                  <div className="text-3xl font-extrabold text-accent/25">{step.n}</div>
                  <div className="mt-3 text-base font-extrabold text-text">{step.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3.5 text-sm font-extrabold text-accent-ink shadow-[0_12px_35px_rgba(245,158,11,0.22)] transition hover:brightness-110 active:scale-95"
            >
              Start the conversation
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-extrabold text-text transition hover:bg-white/10 active:scale-95"
            >
              Browse properties
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
