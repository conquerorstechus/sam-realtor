import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-surface/40">
      <Container className="grid gap-10 py-14 md:grid-cols-3">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Tampa Realty Pros"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-extrabold tracking-tight text-text">
                Tampa Realty <span className="text-accent-2">Pros</span>
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-muted uppercase">
                Tampa Bay Real Estate
              </span>
            </div>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            High-energy representation for buyers, sellers, and investors across
            Tampa Bay — built on speed, strategy, and obsessive follow-through.
          </p>
        </div>

        {/* Links */}
        <div>
          <div className="text-sm font-extrabold text-text">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { href: "/",           label: "Home"       },
              { href: "/about",      label: "About"      },
              { href: "/services",   label: "Services"   },
              { href: "/properties", label: "Properties" },
              { href: "/buyer",      label: "Buyer"      },
              { href: "/seller",     label: "Seller"     },
              { href: "/contact",    label: "Contact"    },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-muted transition hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Lead capture */}
        <div>
          <div className="text-sm font-extrabold text-text">Get in Touch</div>
          <p className="mt-3 text-sm text-muted">
            Want listings that match your lifestyle — not just your budget? Tell
            us your move timeline and we'll route the right opportunities fast.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-xl bg-accent px-5 py-3 text-sm font-extrabold text-accent-ink shadow-[0_8px_25px_rgba(232,100,42,0.25)] transition hover:brightness-110"
          >
            Start the Conversation
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Tampa Realty Pros. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/properties" className="hover:text-accent transition">Properties</Link>
            <Link href="/contact"    className="hover:text-accent transition">Contact</Link>
            <Link href="/about"      className="hover:text-accent transition">About</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
