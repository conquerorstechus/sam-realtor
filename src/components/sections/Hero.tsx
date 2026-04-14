import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-accent-2/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-40 w-[1200px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40" />
      </div>

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-extrabold tracking-wide text-accent ring-1 ring-white/10">
              TAMPA BAY • BUY • SELL • INVEST
            </div>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
              Win the home you want.
              <span className="block bg-gradient-to-r from-accent via-white to-accent-2 bg-clip-text text-transparent">
                Sell the story buyers feel.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              A high-energy team built for competitive markets: sharper pricing strategy, faster
              follow-up, and marketing that makes listings impossible to ignore.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/properties" variant="primary" className="px-6 py-3.5 text-base">
                View properties
              </Button>
              <Button href="/contact" variant="secondary" className="px-6 py-3.5 text-base">
                Book a 15-minute consult
              </Button>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-xs font-semibold text-muted">Avg. response</dt>
                <dd className="mt-1 text-lg font-extrabold text-text">&lt; 10 min</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-xs font-semibold text-muted">Offer strategy</dt>
                <dd className="mt-1 text-lg font-extrabold text-text">Battle-tested</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-1 col-span-2 sm:col-auto">
                <dt className="text-xs font-semibold text-muted">Listings marketed like</dt>
                <dd className="mt-1 text-lg font-extrabold text-text">A launch event</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-gradient-to-br from-surface to-surface-2 p-6 shadow-[var(--shadow-elevated)]">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-2xl" />
              <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent-2/20 blur-2xl" />

              <div className="relative">
                <div className="text-xs font-extrabold tracking-wide text-accent">WHAT YOU GET</div>
                <div className="mt-3 text-2xl font-extrabold text-text">A playbook - not promises.</div>
                <ul className="mt-5 space-y-3 text-sm text-muted">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-extrabold text-accent">
                      1
                    </span>
                    <span>
                      <span className="font-semibold text-text">Pricing that punishes hesitation.</span>{" "}
                      We align comps, condition, and demand - then we execute.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-extrabold text-accent">
                      2
                    </span>
                    <span>
                      <span className="font-semibold text-text">Creative that converts.</span> Staging
                      direction, photography, and a story buyers remember.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-extrabold text-accent">
                      3
                    </span>
                    <span>
                      <span className="font-semibold text-text">Negotiation with receipts.</span>{" "}
                      Clear terms, clean communication, zero drama.
                    </span>
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-semibold text-muted">Hot take</div>
                  <div className="mt-2 text-sm font-semibold text-text">
                    "Nice" doesn't win multiple offers. <span className="text-accent">Prepared</span>{" "}
                    does.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
