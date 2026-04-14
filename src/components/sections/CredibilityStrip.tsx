import { Container } from "@/components/ui/Container";

const items = [
  { k: "500+", v: "Tours coordinated" },
  { k: "24/7", v: "Offer-room readiness" },
  { k: "MRP", v: "Relocation workflows" },
  { k: "Investor", v: "Underwriting-friendly comps" },
] as const;

export function CredibilityStrip() {
  return (
    <section className="border-y border-white/10 bg-white/[0.03]">
      <Container className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.k} className="rounded-2xl border border-white/10 bg-surface/30 p-5">
            <div className="text-2xl font-extrabold tracking-tight text-text">{it.k}</div>
            <div className="mt-1 text-sm font-semibold text-muted">{it.v}</div>
          </div>
        ))}
      </Container>
    </section>
  );
}
