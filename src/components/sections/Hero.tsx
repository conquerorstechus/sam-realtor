import Image from "next/image";
import Link from "next/link";

/**
 * Full-width hero artwork unchanged; transparent hit-zones over the two CTAs in the image.
 */
export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F2EDE8]" aria-label="Tampa Realty Pros hero">
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div className="relative aspect-[16/10] min-h-[min(88dvh,900px)] w-full sm:aspect-[16/9]">
          <Image
            src="/hero-full.png"
            alt="Tampa Realty Pros — Win the home you want. Sell the story buyers feel."
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Clickable regions over baked-in CTAs (no visual change) */}
          <div className="absolute inset-0 z-20">
            <div className="absolute left-[3%] top-[52%] flex flex-wrap items-center gap-3 sm:left-[5%] sm:top-[54%] sm:gap-4 md:left-[4%] md:top-[56%] lg:top-[58%]">
              <Link
                href="/properties"
                aria-label="View properties"
                className="block min-h-[44px] min-w-[10.5rem] rounded-xl bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C63A2B] sm:min-h-[48px] sm:min-w-[12rem] md:min-h-[52px] md:min-w-[13rem]"
              />
              <Link
                href="/contact"
                aria-label="Book a 15-minute consultation"
                className="block min-h-[44px] min-w-[12.5rem] rounded-xl bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C63A2B] sm:min-h-[48px] sm:min-w-[14rem] md:min-h-[52px] md:min-w-[15rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
