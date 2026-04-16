import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Seller Guide",
  description: `Sell faster and for more — pricing strategy, launch marketing, and negotiation from ${site.name}.`,
  openGraph: {
    title: `Seller Guide | ${site.name}`,
    url: `${site.url}/seller`,
  },
};

const pillars = [
  {
    tag: "Pricing",
    title: "Price it to dominate — not to sit.",
    body: "We run a forensic comp analysis: recency, condition delta, and absorption rate. Your list price is a strategy, not a guess.",
  },
  {
    tag: "Presentation",
    title: "Every listing is a launch event.",
    body: "Staging direction, pro photography, video walkthroughs, and a distribution plan that puts your home in front of the right buyers first.",
  },
  {
    tag: "Negotiation",
    title: "Protect your net — not just the headline number.",
    body: "Offer review, counter strategy, appraisal gaps, and repair credits — we fight for your proceeds at every stage.",
  },
  {
    tag: "Timeline",
    title: "Close on your schedule.",
    body: "Whether you need 14 days or 90, we build the plan around your life — not the market's convenience.",
  },
] as const;

export default function SellerPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs font-extrabold tracking-wide text-accent">SELLER GUIDE</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-5xl">
            List smart. Sell fast. Keep more.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Selling is not just putting a sign in the yard. It is pricing, positioning, and pressure
            management — and we run all three.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-gradient-to-br from-surface to-surface-2 p-7 shadow-[var(--shadow-soft)]"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
              <div className="relative">
                <div className="inline-flex rounded-full bg-white/5 px-3 py-1 text-[11px] font-extrabold text-accent ring-1 ring-white/10">
                  {p.tag}
                </div>
                <div className="mt-4 text-lg font-extrabold leading-snug text-text">{p.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[var(--radius-2xl)] border border-white/10 bg-white/[0.03] p-8">
          <div className="text-sm font-extrabold text-text">Want a same-day pricing read on your home?</div>
          <p className="mt-2 text-sm text-muted">
            Send the address and your move timeline. We reply with a clear plan — not a generic market report.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-extrabold text-accent-ink hover:brightness-110"
          >
            Request a pricing strategy
          </Link>
        </div>
      </Container>
    </section>
  );
}
