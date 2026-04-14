import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function InlineCta() {
  return (
    <section className="py-10">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-gradient-to-r from-surface via-surface-2 to-surface p-8 shadow-[var(--shadow-soft)] sm:p-10">
          <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-accent-2/15 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="text-xs font-extrabold tracking-wide text-accent">NEXT MOVE</div>
              <div className="mt-2 text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
                Want a same-day pricing read on your home?
              </div>
              <div className="mt-2 max-w-2xl text-sm text-muted">
                Send the address + timeline. We will reply with a clear plan - not a generic market
                report.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-extrabold text-accent-ink shadow-[0_18px_45px_rgba(245,158,11,0.22)] hover:brightness-110"
            >
              Get a game plan
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
