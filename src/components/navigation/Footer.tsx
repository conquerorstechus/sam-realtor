import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-surface/40">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="text-sm font-extrabold tracking-wide text-text">Bay Crest Realty Group</div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            High-energy representation for buyers, sellers, and investors across Tampa Bay - built on
            speed, strategy, and obsessive follow-through.
          </p>
        </div>

        <div>
          <div className="text-sm font-extrabold text-text">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-muted hover:text-text" href="/properties">
                Properties
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-text" href="/communities">
                Communities
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-text" href="/about">
                Expertise
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-text" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-extrabold text-text">Lead capture</div>
          <p className="mt-3 text-sm text-muted">
            Want listings that match your lifestyle—not just your budget? Tell us your move timeline
            and we will route the right opportunities fast.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-xl bg-white/5 px-4 py-3 text-sm font-extrabold text-text ring-1 ring-white/10 hover:bg-white/10"
          >
            Start the conversation
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Bay Crest Realty Group. All rights reserved.</div>
          <div className="text-muted">
            UI demo content - connect your CRM/MLS backend when ready.
          </div>
        </Container>
      </div>
    </footer>
  );
}
