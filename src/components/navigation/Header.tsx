"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/",           label: "Home"       },
  { href: "/about",      label: "About"      },
  { href: "/services",   label: "Services"   },
  { href: "/properties", label: "Properties" },
  { href: "/buyer",      label: "Buyer"      },
  { href: "/seller",     label: "Seller"     },
  { href: "/contact",    label: "Contact"    },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeHref = useMemo(() => {
    const exact = links.find((l) => l.href === pathname)?.href;
    if (exact) return exact;
    if (pathname.startsWith("/properties")) return "/properties";
    if (pathname.startsWith("/buyer"))      return "/buyer";
    if (pathname.startsWith("/seller"))     return "/seller";
    if (pathname.startsWith("/services"))   return "/services";
    return pathname;
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-white/90 shadow-sm backdrop-blur-xl">
      <Container className="flex items-center justify-between py-3">

        {/* ── Logo ──────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Tampa Realty Pros"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-extrabold tracking-tight text-text">
              Tampa Realty <span className="text-accent-2">Pros</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Tampa Bay Real Estate
            </span>
          </div>
        </Link>

        {/* ── Desktop nav ───────────────────────────────────── */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {links.map((l) => {
            const active = activeHref === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-black/5 hover:text-text"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-3 rounded-xl bg-gradient-to-r from-[#C63A2B] to-[#F28C45] px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_25px_rgba(232,100,42,0.30)] transition hover:brightness-110 active:scale-95"
          >
            Book a Call
          </Link>
        </nav>

        {/* ── Mobile hamburger ──────────────────────────────── */}
        <button
          type="button"
          suppressHydrationWarning
          className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-sm font-semibold text-text md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "Menu"}
        </button>
      </Container>

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {open && (
        <div id="mobile-nav" className="border-t border-black/8 bg-white md:hidden">
          <Container className="py-3">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-text hover:bg-black/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-gradient-to-r from-[#C63A2B] to-[#F28C45] px-4 py-3 text-center text-sm font-extrabold text-white"
              >
                Book a Call
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
