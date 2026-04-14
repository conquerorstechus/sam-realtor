import { Container } from "@/components/ui/Container";

const tiles = [
  {
    title: "Instagram",
    body: "New listings, walkthroughs, and market truth - fast.",
    href: "https://instagram.com",
    cta: "Follow @baycrestrealty",
  },
  {
    title: "YouTube",
    body: "Neighborhood breakdowns, negotiation tactics, and buyer/seller playbooks.",
    href: "https://youtube.com",
    cta: "Subscribe to the channel",
  },
] as const;

export function SocialProofStrip() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs font-extrabold tracking-wide text-accent">SOCIAL PROOF</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            We publish like a media brand - because attention is leverage.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Backend wiring can connect your real feeds later. For now, this is the conversion layout
            your brand should own.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {tiles.map((t) => (
            <a
              key={t.title}
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-surface/35 p-7 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:border-white/20"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/15" />
              <div className="relative">
                <div className="text-xs font-extrabold tracking-wide text-accent">{t.title}</div>
                <div className="mt-3 text-xl font-extrabold text-text">{t.cta}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t.body}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-text">
                  Open link <span aria-hidden="true">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 rounded-[var(--radius-2xl)] border border-dashed border-white/15 bg-white/[0.02] p-6">
          <div className="text-sm font-extrabold text-text">Instagram embed placeholder</div>
          <p className="mt-2 text-sm text-muted">
            Drop in your official embed or API-driven reel grid when you connect the backend. The
            section spacing is already optimized for a 3-column reel strip.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-accent/25 via-white/5 to-accent-2/20 ring-1 ring-white/10"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
