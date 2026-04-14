"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/communities", label: "Communities" },
  { href: "/about", label: "Expertise" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeHref = useMemo(() => {
    const exact = links.find((l) => l.href === pathname)?.href;
    if (exact) return exact;
    if (pathname.startsWith("/properties")) return "/properties";
    if (pathname.startsWith("/communities")) return "/communities";
    return pathname;
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/70 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="rounded-lg bg-white/5 px-2 py-1 text-xs font-semibold tracking-wide text-accent ring-1 ring-white/10">
            BAY CREST
          </span>
          <span className="text-sm font-semibold tracking-tight text-text group-hover:text-white">
            Realty Group
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => {
            const active = activeHref === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  active ? "bg-white/10 text-white" : "text-muted hover:bg-white/5 hover:text-text"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-2 rounded-xl bg-accent px-4 py-2 text-sm font-extrabold text-accent-ink shadow-[0_18px_45px_rgba(245,158,11,0.22)] hover:brightness-110"
          >
            Book a call
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-text md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-bg/90 md:hidden">
          <Container className="py-3">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-text hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-accent px-4 py-3 text-center text-sm font-extrabold text-accent-ink"
              >
                Book a call
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
