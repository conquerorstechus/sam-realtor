import { Container } from "@/components/ui/Container";

const cards = [
  { title: "Buyers who refuse to lose",       body: "Offer strategy, escalation clarity, inspection leverage, and a team that can move as fast as the market.", tag: "Multiple offers" },
  { title: "Sellers who want max leverage",   body: "Pricing discipline + launch marketing + negotiation that protects your net — not just the headline price.",  tag: "Listings"        },
  { title: "Investors who think in spreadsheets", body: "Rent comps, rehab sensitivity, and exit scenarios — so you buy with a plan, not a hope.",               tag: "ROI focus"       },
  { title: "Military moves without chaos",    body: "PCS timelines, VA fluency, and relocation workflows that respect real-world pressure.",                       tag: "MRP mindset"     },
] as const;

export function ExpertiseGrid() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs font-extrabold tracking-wide text-accent">EXPERTISE</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            We don't "help you buy a house." We run the campaign.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Pick your lane — each one is built around outcomes, timelines, and the kind of pressure your
            transaction is under.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-[var(--radius-2xl)] border border-black/8 bg-surface p-7 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/8 blur-2xl transition group-hover:bg-accent/15" />
              <div className="relative">
                <div className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-[11px] font-extrabold text-accent ring-1 ring-accent/20">
                  {c.tag}
                </div>
                <div className="mt-4 text-xl font-extrabold text-text">{c.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
