import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Full-service real estate representation from ${site.name} — buying, selling, investing, and relocation across Tampa Bay.`,
  openGraph: {
    title: `Services | ${site.name}`,
    url: `${site.url}/services`,
  },
};

const services = [
  {
    title: "Buying a Home",
    body: "From first search to closed keys — offer strategy, inspection leverage, and lender coordination built for competitive markets.",
    href: "/properties",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 20L24 5l18 15v22a2 2 0 01-2 2H8a2 2 0 01-2-2V20z" />
        <path d="M18 42V28h12v14" />
      </svg>
    ),
  },
  {
    title: "Selling Your Home",
    body: "Pricing discipline, launch-quality photography, and distribution that brings the right buyers fast - not just any buyers.",
    href: "/seller",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 20L24 5l18 15v22a2 2 0 01-2 2H8a2 2 0 01-2-2V20z" />
        <rect x="17" y="10" width="14" height="8" rx="1" />
        <text x="24" y="17" textAnchor="middle" fontSize="6" fill="currentColor" stroke="none" fontWeight="700">SOLD</text>
      </svg>
    ),
  },
  {
    title: "Military Relocation",
    body: "PCS workflows, VA loan fluency, and timelines that respect real-world pressure. We have lived the move.",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4l5.09 10.26L41 15.27l-8.5 8.28 2 11.72L24 30l-10.5 5.27 2-11.72L7 15.27l11.91-1.01L24 4z" />
      </svg>
    ),
  },
  {
    title: "Investment Property",
    body: "Rent comps, rehab sensitivity, and exit scenarios so every acquisition has a plan - not just a hope.",
    href: "/properties",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="18" width="12" height="24" rx="1" />
        <rect x="18" y="10" width="12" height="32" rx="1" />
        <rect x="28" y="22" width="12" height="20" rx="1" />
        <path d="M4 42h40" />
      </svg>
    ),
  },
] as const;

const locations = ["Downtown", "Waterfront", "Suburban", "Luxury", "New Construction"];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden py-20 sm:py-24">

      {/* ── background ambient orbs matching site theme ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -right-40 top-32 h-[400px] w-[400px] rounded-full bg-accent-2/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-accent/6 blur-[100px]" />
      </div>

      <div className="flex flex-col items-center px-4">

        {/* ── Section heading ─────────────────────────── */}
        <div className="flex items-center gap-5">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/60 sm:w-24" />
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-text sm:text-4xl lg:text-5xl">
            My Services
          </h1>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/60 sm:w-24" />
        </div>
        <p className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
          Experience premier real estate - we go with property expertise to solve your every need,
          right to your mind.
        </p>

        {/* ── Service cards ───────────────────────────── */}
        <div className="mt-14 grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative flex flex-col items-start overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-gradient-to-b from-surface to-surface-2 p-7 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1.5 hover:border-accent/35 hover:shadow-[0_20px_55px_rgba(245,158,11,0.14)]"
            >
              {/* inner accent glow */}
              <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-accent/8 blur-3xl transition duration-300 group-hover:bg-accent/18" />

              {/* diamond icon */}
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
                <div
                  className="absolute inset-0 rotate-45 border border-accent/30 bg-gradient-to-br from-accent/10 to-accent-2/5 transition duration-300 group-hover:border-accent/65 group-hover:from-accent/18"
                  style={{ borderRadius: "6px" }}
                />
                <div className="relative text-accent">
                  {s.icon}
                </div>
              </div>

              {/* text */}
              <h2 className="text-base font-extrabold leading-snug text-text">{s.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.body}</p>

              {/* CTA */}
              <Link
                href={s.href}
                className="mt-6 inline-flex items-center justify-center rounded-xl border border-accent/30 bg-accent/10 px-5 py-2.5 text-xs font-extrabold tracking-wide text-accent transition duration-200 hover:bg-accent hover:text-accent-ink active:scale-95"
              >
                View Listings
              </Link>
            </div>
          ))}
        </div>

        {/* ── Location strip ──────────────────────────── */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {locations.map((loc, i) => (
            <span key={loc} className="flex items-center gap-3 text-sm font-semibold text-muted">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-accent/50" />}
              {loc}
            </span>
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────── */}
        <Container className="mt-14">
          <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-gradient-to-r from-surface via-surface-2 to-surface p-8 text-center shadow-[var(--shadow-soft)]">
            <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-accent/12 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-accent-2/10 blur-3xl" />
            <div className="relative">
              <div className="text-base font-extrabold text-text">Not sure which service fits?</div>
              <p className="mt-2 text-sm text-muted">
                Tell us your situation in one message and we will map the right strategy for you.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-xl bg-accent px-8 py-3 text-sm font-extrabold text-accent-ink shadow-[0_12px_35px_rgba(245,158,11,0.25)] transition hover:brightness-110 active:scale-95"
              >
                Get a game plan
              </Link>
            </div>
          </div>
        </Container>

      </div>
    </div>
  );
}
