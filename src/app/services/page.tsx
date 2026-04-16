import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Specialties from ${site.name} — relocation, buying, selling, investments, market analysis, residential, and property management across Tampa Bay.`,
  openGraph: {
    title: `Services | ${site.name}`,
    url: `${site.url}/services`,
  },
};

const stroke = {
  className: "h-9 w-9" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none" as const,
  viewBox: "0 0 48 48" as const,
};

const specialties = [
  {
    title: "Relocation Services",
    body: "Smooth transition support for clients moving to or from the Tampa Bay area.",
    href: "/contact",
    cta: "Plan your move",
    icon: (
      <svg {...stroke}>
        <path d="M8 36V20l4-8h24l4 8v16" />
        <path d="M4 36h40" />
        <circle cx="16" cy="32" r="3" />
        <circle cx="32" cy="32" r="3" />
        <path d="M20 12h8v8h-8z" />
      </svg>
    ),
  },
  {
    title: "Home Buying Services",
    body: "Expert guidance for buyers from search to closing with market insights and negotiation support.",
    href: "/buyer",
    cta: "Buyer resources",
    icon: (
      <svg {...stroke}>
        <path d="M6 20L24 5l18 15v22a2 2 0 01-2 2H8a2 2 0 01-2-2V20z" />
        <path d="M18 42V28h12v14" />
      </svg>
    ),
  },
  {
    title: "First-Time Home Buyers",
    body: "Step-by-step support and education for first-time buyers entering the real estate market.",
    href: "/buyer",
    cta: "Get guidance",
    icon: (
      <svg {...stroke}>
        <circle cx="24" cy="20" r="6" />
        <path d="M14 38c2-8 8-12 10-12s8 4 10 12" />
        <path d="M30 16l4-4" />
      </svg>
    ),
  },
  {
    title: "Home Selling Services",
    body: "Strategic pricing, professional marketing, and strong negotiation to sell your home faster and for top value.",
    href: "/seller",
    cta: "Sell with us",
    icon: (
      <svg {...stroke}>
        <path d="M6 20L24 5l18 15v22a2 2 0 01-2 2H8a2 2 0 01-2-2V20z" />
        <path d="M16 26h16M16 32h12" />
      </svg>
    ),
  },
  {
    title: "Real Estate Investment",
    body: "Helping investors identify profitable opportunities and maximize returns in the Tampa market.",
    href: "/contact",
    cta: "Investor consult",
    icon: (
      <svg {...stroke}>
        <rect x="8" y="18" width="12" height="24" rx="1" />
        <rect x="18" y="10" width="12" height="32" rx="1" />
        <rect x="28" y="22" width="12" height="20" rx="1" />
        <path d="M4 42h40" />
      </svg>
    ),
  },
  {
    title: "Market Analysis",
    body: "Accurate comparative market analysis to determine the right property value and pricing strategy.",
    href: "/contact",
    cta: "Request analysis",
    icon: (
      <svg {...stroke}>
        <path d="M8 38V10" />
        <path d="M8 38h32" />
        <path d="M14 30l8-10 6 6 10-14" />
      </svg>
    ),
  },
  {
    title: "Residential Real Estate",
    body: "Single-family homes, condos, townhomes, and luxury residential properties.",
    href: "/properties",
    cta: "View listings",
    icon: (
      <svg {...stroke}>
        <path d="M10 22L24 10l14 12v20a2 2 0 01-2 2H12a2 2 0 01-2-2V22z" />
        <path d="M18 42V30h12v12" />
      </svg>
    ),
  },
  {
    title: "Property Management",
    body: "Comprehensive rental management services including tenant placement and property oversight.",
    href: "/contact",
    cta: "Management inquiry",
    icon: (
      <svg {...stroke}>
        <rect x="10" y="12" width="28" height="30" rx="2" />
        <path d="M16 12V8a8 8 0 0116 0v4" />
        <path d="M16 24h16M16 32h10" />
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
            Specialties
          </h1>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/60 sm:w-24" />
        </div>
        <p className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
          Full-service Tampa Bay real estate—from relocation and first-time purchases to investments,
          pricing strategy, and rental management.
        </p>

        {/* ── Specialty cards ───────────────────────────── */}
        <div className="mt-14 grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((s) => (
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
                {s.cta}
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
