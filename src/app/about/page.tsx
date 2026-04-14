import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Expertise",
  description: `How ${site.name} wins competitive offers, sells listings like launches, and supports relocation with discipline.`,
  openGraph: {
    title: `Expertise | ${site.name}`,
    description: "Strategy-first real estate: pricing, negotiation, marketing, and relocation execution.",
    url: `${site.url}/about`,
  },
};

const pillars = [
  {
    title: "Offer strategy that survives scrutiny",
    body: "We build offers with clean terms, defensible timelines, and negotiation leverage - not desperation.",
  },
  {
    title: "Listing marketing that feels like a launch",
    body: "Positioning, presentation, and distribution - so the right buyers show up fast and compete.",
  },
  {
    title: "Relocation workflows for real pressure",
    body: "PCS timelines and financing complexity need operators - not generic checklists.",
  },
] as const;

export default function AboutPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs font-extrabold tracking-wide text-accent">THE STANDARD</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-5xl">
            Expertise you can feel in the first conversation.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            This is a UI-forward demo brand with a real-world playbook: speed, clarity, and execution
            under pressure. When you connect your backend, keep the story - upgrade the proof.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-[var(--radius-2xl)] border border-white/10 bg-gradient-to-br from-surface to-surface-2 p-7 shadow-[var(--shadow-soft)]"
            >
              <div className="text-lg font-extrabold text-text">{p.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[var(--radius-2xl)] border border-white/10 bg-white/[0.03] p-8">
          <div className="text-sm font-extrabold text-text">What working together looks like</div>
          <ol className="mt-4 space-y-3 text-sm font-semibold text-muted">
            <li>1) Clarify goals, constraints, and timeline in one sitting.</li>
            <li>2) Build a market plan with scenarios - not a single fragile guess.</li>
            <li>3) Execute with daily communication until keys or closing docs are done.</li>
          </ol>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-extrabold text-accent-ink hover:brightness-110"
          >
            Book a consult
          </Link>
        </div>
      </Container>
    </section>
  );
}
