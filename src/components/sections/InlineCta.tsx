import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function InlineCta() {
  return (
    <section className="py-10">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-gradient-to-r from-[#C63A2B] to-[#F28C45] p-8 shadow-[0_20px_50px_rgba(232,100,42,0.30)] sm:p-10">
          {/* subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="text-xs font-extrabold tracking-wide text-orange-100/80">NEXT MOVE</div>
              <div className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Want a same-day pricing read on your home?
              </div>
              <div className="mt-2 max-w-2xl text-sm text-white/75">
                Send the address + timeline. We will reply with a clear plan — not a generic market report.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-accent shadow-lg transition hover:bg-orange-50 active:scale-95"
            >
              Get a game plan
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
