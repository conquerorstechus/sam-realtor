import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const HERO_BACKGROUND_SRC = "/hero-symbol-no-frame.png";
const HERO_BIRDS = ["hero-bird-1", "hero-bird-2", "hero-bird-3", "hero-bird-4", "hero-bird-5"];

/**
 * Full-width hero with generated brand-symbol real estate banner + live headline + CTAs.
 */
export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F2EDE8]" aria-label="Hero banner">
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div className="relative aspect-[16/10] min-h-[min(88dvh,900px)] w-full sm:aspect-[16/9]">
          <Image
            src={HERO_BACKGROUND_SRC}
            alt="Modern luxury home exterior at golden hour."
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[58%_center]"
          />

          <div className="hero-door-scene" aria-hidden="true">
            <div className="hero-bird-flock">
              {HERO_BIRDS.map((birdClass) => (
                <span key={birdClass} className={`hero-bird ${birdClass}`}>
                  <svg viewBox="0 0 48 24" role="presentation" focusable="false">
                    <path d="M2 18c8-11 16-11 22 0 6-11 14-11 22 0-8-5-15-5-22 0-7-5-14-5-22 0Z" />
                  </svg>
                </span>
              ))}
            </div>
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
                  suppressHydrationWarning
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
