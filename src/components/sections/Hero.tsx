import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Full-width hero from `public/hero-home-banner.png` with live headline + CTAs.
 */
export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F2EDE8]" aria-label="Hero banner">
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div className="relative aspect-[16/10] min-h-[min(88dvh,900px)] w-full sm:aspect-[16/9]">
          {/* Sharp source: high quality + no mix-blend (those stack soft). Light contrast/hue only. */}
          <div className="absolute inset-0 isolate">
            <Image
              src="/hero-home-banner.png"
              alt="Luxury home with pool and Tampa Bay skyline at golden hour."
              fill
              priority
              quality={95}
              sizes="100vw"
              className="object-cover object-center [transform:translateZ(0)] [filter:brightness(1.02)_contrast(1.12)_saturate(1.05)_hue-rotate(-3deg)]"
            />
            {/* Tiny warm veil — opacity only, no blend mode, keeps edges crisp */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-amber-900/[0.06]"
              aria-hidden
            />
          </div>

          {/* Left scrim so headline and buttons stay readable on any photo */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-stone-950/75 via-stone-950/40 to-transparent sm:from-stone-950/65 sm:via-stone-950/30"
            aria-hidden
          />

          <div className="absolute inset-0 z-10 flex flex-col justify-center px-5 pb-8 pt-20 sm:px-10 sm:pb-10 sm:pt-24 md:px-14 lg:px-16">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                Tampa Bay · Tampa Realty Pros
              </p>
              <h1 className="mt-3 text-balance text-3xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                Find a home that fits your life—not just your checklist.
              </h1>
              <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-white/90 sm:text-lg">
                Browse curated listings and book a short call when you are ready to talk strategy, neighborhoods, and next steps.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button
                  href="/properties"
                  variant="primary"
                  className="no-underline min-h-12 px-6 py-3.5 text-base hover:no-underline"
                >
                  View properties
                </Button>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-base font-semibold text-white no-underline shadow-sm transition hover:border-white/45 hover:bg-white/18 focus-visible:outline-none active:translate-y-px"
                >
                  Book a 15-minute consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
