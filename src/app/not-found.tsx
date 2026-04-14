import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-20">
      <Container>
        <div className="max-w-xl">
          <div className="text-xs font-extrabold tracking-wide text-accent">404</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            This page took a wrong turn.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Let's get you back to listings, communities, or a direct line to the team.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-extrabold text-accent-ink hover:brightness-110"
            >
              View properties
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold text-text hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
