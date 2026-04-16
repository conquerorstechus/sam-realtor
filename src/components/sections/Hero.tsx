"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

/* ── count-up hook ─────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600, active = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, duration, target]);
  return v;
}

/* ── mouse-parallax hook ───────────────────────────────────────── */
function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      setPos({
        x: ((e.clientX - cx) / cx) * 100,
        y: ((e.clientY - cy) / cy) * 100,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

const TICKER = [
  "South Tampa","Downtown","Westchase","Seminole Heights",
  "Hyde Park","Channelside","New Tampa","Ybor City","Davis Islands","Bayshore",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const mouse = useMouseParallax();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const deals  = useCountUp(500,  1800, started);
  const years  = useCountUp(12,   1200, started);
  const rating = useCountUp(98,   1600, started);

  /* parallax offset multipliers per layer */
  const bg  = { x: mouse.x * 0.018, y: mouse.y * 0.014 };
  const mid = { x: mouse.x * 0.035, y: mouse.y * 0.025 };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[95vh] flex-col justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >

      {/* ════════════════════════════════════════════
          LAYER 0 – background photograph (3D drift)
          ════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          transform: `translateX(${bg.x}px) translateY(${bg.y}px)`,
          transition: "transform 0.12s linear",
        }}
      >
        {/* the actual image — overscale so parallax never reveals edges */}
        <div
          className="hero-bg-layer absolute inset-[-8%]"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* deep cinematic overlay — red-orange brand gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0800]/92 via-[#C63A2B]/60 to-[#F28C45]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0800]/85 via-transparent to-[#1a0800]/40" />

        {/* moving spotlight sweep */}
        <div className="hero-spotlight absolute inset-y-0 w-[220px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* sky shimmer haze */}
        <div className="hero-sky-shimmer absolute inset-0 bg-gradient-to-b from-orange-400/8 via-transparent to-transparent" />
      </div>

      {/* ════════════════════════════════════════════
          LAYER 1 – mid-depth atmospheric particles
          ════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          transform: `translateX(${mid.x}px) translateY(${mid.y}px) translateZ(30px)`,
          transition: "transform 0.18s linear",
        }}
      >
        {/* orange orb top-left */}
        <div className="absolute -left-32 top-12 h-[480px] w-[480px] rounded-full bg-orange-500/15 blur-[120px]" />
        {/* red orb top-right */}
        <div className="absolute -right-28 top-24 h-[380px] w-[380px] rounded-full bg-red-600/10 blur-[100px]" />
        {/* green orb bottom */}
        <div className="absolute bottom-0 left-1/2 h-[260px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-400/8 blur-[90px]" />

        {/* floating ambient dots */}
        {[
          { top:"14%", left:"8%",  s:"7px", delay:"0s" },
          { top:"62%", left:"5%",  s:"4px", delay:"0.9s" },
          { top:"30%", left:"90%", s:"5px", delay:"0.4s" },
          { top:"78%", left:"82%", s:"4px", delay:"1.3s" },
          { top:"8%",  left:"55%", s:"6px", delay:"0.7s" },
        ].map((d, i) => (
          <div
            key={i}
            className="hero-dot-ping absolute rounded-full bg-amber-400"
            style={{ top:d.top, left:d.left, width:d.s, height:d.s, animationDelay:d.delay }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════
          LAYER 2 – foreground grid lines
          ════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
          backgroundSize: "70px 70px",
          transform: `translateX(${mid.x * 0.6}px) translateY(${mid.y * 0.6}px)`,
          transition: "transform 0.22s linear",
        }}
      />

      {/* ════════════════════════════════════════════
          CONTENT
          ════════════════════════════════════════════ */}
      <Container className="relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ── LEFT – copy ───────────────────────────────────── */}
          <div className="lg:col-span-8">

            {/* location badge */}
            <div className="hero-animate-badge inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-500/15 px-4 py-1.5 backdrop-blur-sm">
              <span className="hero-dot-ping h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[11px] font-extrabold tracking-[0.14em] text-accent">
                TAMPA BAY &nbsp;•&nbsp; BUY &nbsp;•&nbsp; SELL &nbsp;•&nbsp; INVEST
              </span>
            </div>

            {/* h1 */}
            <h1 className="mt-6">
              <span className="hero-animate-h1a block text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl">
                Win the home
              </span>
              <span className="hero-animate-h1a block text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl">
                you want.
              </span>
              <span
                className="hero-animate-h1b hero-grad-text mt-1 block text-3xl font-extrabold tracking-tight drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-6xl"
              >
                Sell the story buyers feel.
              </span>
            </h1>

            {/* subtitle */}
            <p className="hero-animate-sub mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 drop-shadow sm:text-lg">
              A high-energy team built for competitive markets: sharper pricing
              strategy, faster follow-up, and marketing that makes listings{" "}
              <span className="font-semibold text-white">impossible to ignore.</span>
            </p>

            {/* CTAs */}
            <div className="hero-animate-cta mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/properties"
                className="hero-glow-btn inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 text-base font-extrabold text-accent-ink transition hover:brightness-110 active:scale-[0.97]"
              >
                View properties
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="hero-border-pulse inline-flex items-center justify-center gap-2 rounded-xl border bg-white/8 px-7 py-4 text-base font-extrabold text-white backdrop-blur-sm transition hover:bg-white/15 active:scale-[0.97]"
              >
                Book a 15-min consult
              </Link>
            </div>

            {/* social media icons */}
            <div className="hero-animate-cta mt-8 flex items-center gap-3">
              <span className="text-[11px] font-extrabold tracking-widest text-white/35 uppercase">Follow us</span>
              <div className="h-px w-6 bg-white/20" />
              {[
                {
                  label: "Instagram",
                  href: "https://instagram.com",
                  color: "hover:bg-gradient-to-br hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  href: "https://facebook.com",
                  color: "hover:bg-[#1877F2]",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  href: "https://youtube.com",
                  color: "hover:bg-[#FF0000]",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                  color: "hover:bg-[#0A66C2]",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: "X / Twitter",
                  href: "https://x.com",
                  color: "hover:bg-black",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-white/60 backdrop-blur-sm transition duration-200 ${s.color} hover:scale-110 hover:border-transparent hover:text-white active:scale-95`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* stats */}
            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {[
                { cls: "hero-animate-stat-1", val: `${deals}+`,   label: "Deals closed" },
                { cls: "hero-animate-stat-2", val: `${years}yrs`, label: "Market expertise" },
                { cls: "hero-animate-stat-3", val: `${rating}%`,  label: "Client satisfaction" },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`${s.cls} relative overflow-hidden rounded-2xl border border-white/20 bg-black/40 p-4 backdrop-blur-md`}
                >
                  {/* inner shimmer sweep */}
                  <div className="hero-spotlight absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent" />
                  <dd className="text-xl font-extrabold tabular-nums text-white">{s.val}</dd>
                  <dt className="mt-1 text-[11px] font-semibold text-white/55">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </Container>

      {/* ════════════════════════════════════════════
          TICKER STRIP
          ════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-t border-white/10 bg-black/40 py-3 backdrop-blur-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#1a0800]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#1a0800]/80 to-transparent" />
        <div className="hero-ticker-track flex w-max gap-0">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="flex items-center gap-4 px-6 text-[11px] font-extrabold tracking-[0.13em] uppercase text-white/40">
              <span className="h-1 w-1 rounded-full bg-accent/70" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
