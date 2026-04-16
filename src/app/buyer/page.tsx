import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Buyer Guide",
  description: `Everything Tampa Bay buyers need to compete and win — strategy, financing, and execution from ${site.name}.`,
  openGraph: {
    title: `Buyer Guide | ${site.name}`,
    url: `${site.url}/buyer`,
  },
};

const steps = [
  { n: "01", title: "Define your must-haves vs. nice-to-haves", body: "Lifestyle, location, budget ceiling, and deal-breakers — we pressure-test them before the search starts." },
  { n: "02", title: "Get financing locked before you fall in love", body: "Pre-approval vs. pre-qualification — we know the difference and why it matters in a multi-offer situation." },
  { n: "03", title: "Search with strategy, not volume", body: "We filter the noise, tour with purpose, and flag red flags early so you never fall for the wrong home." },
  { n: "04", title: "Offer architecture that wins", body: "Price, terms, contingencies, and escalation — every lever has a purpose and we use them all." },
  { n: "05", title: "Inspection, appraisal, and closing", body: "We guide every step, coordinate every vendor, and keep you informed without the stress spiral." },
] as const;

export default function BuyerPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs font-extrabold tracking-wide text-accent">BUYER GUIDE</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-5xl">
            Win the home you want — not just the one left.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Tampa Bay is a competitive market. Every step of the buyer journey is a decision point.
            Here is how we make sure each one goes your way.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex gap-5 rounded-[var(--radius-2xl)] border border-white/10 bg-surface/40 p-6"
            >
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/12 text-xs font-extrabold text-accent ring-1 ring-accent/25">
                {s.n}
              </span>
              <div>
                <div className="font-extrabold text-text">{s.title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-extrabold text-accent-ink hover:brightness-110"
          >
            Browse listings
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold text-text hover:bg-white/10"
          >
            Talk to a buyer agent
          </Link>
        </div>
      </Container>
    </section>
  );
}
