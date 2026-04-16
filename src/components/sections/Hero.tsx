"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── count-up hook ──────────────────────────────────────────── */
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

/* ── sparkle particles ──────────────────────────────────────── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: 20 + Math.random() * 75,
  y: 10 + Math.random() * 80,
  size: 3 + Math.random() * 7,
  delay: 0.3 + Math.random() * 2.2,
  dur: 1.4 + Math.random() * 1.8,
  color: i % 3 === 0 ? "#FFD97D" : i % 3 === 1 ? "#F28C45" : "#FFFFFF",
}));

/* ── birds ──────────────────────────────────────────────────── */
const BIRDS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: 38 + Math.random() * 35,
  y: 18 + Math.random() * 40,
  delay: 1.0 + i * 0.22,
}));

const TICKER = [
  "South Tampa","Downtown","Westchase","Seminole Heights",
  "Hyde Park","Channelside","New Tampa","Ybor City","Davis Islands","Bayshore",
];

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [started,   setStarted]   = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          setTimeout(() => setAnimating(true), 500);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const deals  = useCountUp(500, 1800, started);
  const years  = useCountUp(12,  1200, started);
  const rating = useCountUp(98,  1600, started);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[92vh] flex-col overflow-hidden bg-[#F2EDE8]"
    >
      {/* ═══════════════════════════════════════════════════════
          MAIN SPLIT LAYOUT
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row">

        {/* ── LEFT – copy (clean white zone) ───────────────── */}
        <div className="relative z-10 flex flex-col justify-center px-8 py-16 lg:w-[48%] lg:px-16 lg:py-0">

          {/* logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mb-10 flex items-center gap-3"
          >
            <Image
              src="/logo.png"
              alt="Tampa Realty Pros"
              width={46}
              height={46}
              className="h-11 w-11 object-contain"
              priority
            />
            <div>
              <div className="text-sm font-extrabold tracking-tight text-[#1C1917]">
                Tampa <span className="text-[#1FA463]">Realty Pros</span>
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[#78716C]">
                Tampa Bay Real Estate
              </div>
            </div>
          </motion.div>

          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            <h1 className="text-5xl font-extrabold leading-[1.06] tracking-tight text-[#E8642A] sm:text-6xl lg:text-[4.2rem]">
              Win the home<br />you want.
            </h1>
            <h2 className="mt-2 text-4xl font-extrabold leading-[1.06] tracking-tight text-[#E8642A] sm:text-5xl lg:text-[3.4rem]">
              Sell the story<br />buyers feel.
            </h2>
          </motion.div>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-sm font-medium text-[#78716C] sm:text-base"
          >
            High-energy agents &nbsp;|&nbsp; Sharper pricing &nbsp;|&nbsp; Faster results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.56 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C63A2B] to-[#F28C45] px-7 py-4 text-base font-extrabold text-white shadow-[0_14px_35px_rgba(232,100,42,0.38)] transition hover:brightness-110 active:scale-95"
            >
              View properties →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[#1C1917]/15 bg-white/80 px-7 py-4 text-base font-extrabold text-[#1C1917] shadow-sm backdrop-blur-sm transition hover:border-[#E8642A]/50 hover:text-[#E8642A] active:scale-95"
            >
              Book a 15-min consult
            </Link>
          </motion.div>

          {/* stats */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="mt-10 grid max-w-sm grid-cols-3 gap-3"
          >
            {[
              { val: `${deals}+`,   label: "Deals closed"        },
              { val: `${years}yrs`, label: "Market expertise"    },
              { val: `${rating}%`,  label: "Client satisfaction" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#1C1917]/8 bg-white p-4 shadow-sm"
              >
                <dd className="text-xl font-extrabold tabular-nums text-[#E8642A]">{s.val}</dd>
                <dt className="mt-1 text-[11px] font-semibold text-[#78716C]">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── RIGHT – hero image + overlaid animations ─────── */}
        <div className="relative flex-1 overflow-hidden lg:w-[52%]">

          {/* the exact hero image — fills entire right panel */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/hero-door-bg.jpg"
              alt="Luxury real estate door scene — Tampa Realty Pros"
              fill
              className="object-cover object-left-top"
              priority
            />
          </motion.div>

          {/* soft left-edge fade so it blends into the white left panel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#F2EDE8] via-[#F2EDE8]/60 to-transparent" />

          {/* ── sparkle particles layered on image ─────────── */}
          <AnimatePresence>
            {animating && PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="pointer-events-none absolute rounded-full"
                style={{
                  left:   `${p.x}%`,
                  top:    `${p.y}%`,
                  width:  p.size,
                  height: p.size,
                  background: `radial-gradient(circle, ${p.color}, transparent)`,
                  boxShadow:  `0 0 ${p.size * 2}px ${p.color}`,
                }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  scale:   [0, 1, 0.7, 0],
                  y: [0, -(25 + Math.random() * 45)],
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 1.5 + Math.random() * 2,
                }}
              />
            ))}
          </AnimatePresence>

          {/* ── birds flying out ─────────────────────────── */}
          <AnimatePresence>
            {animating && BIRDS.map((b) => (
              <motion.div
                key={b.id}
                className="pointer-events-none absolute"
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.85, 0.5, 0],
                  x: [0, -(55 + b.id * 28)],
                  y: [0, -(35 + b.id * 12)],
                  scale: [0.5, 0.8, 0.55, 0.3],
                }}
                transition={{ duration: 3, delay: b.delay, ease: "easeOut" }}
              >
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                  <path
                    d="M10 5 C7 2 3 0 0 1.5 C3.5 2.5 6 4.5 10 5 C14 4.5 16.5 2.5 20 1.5 C17 0 13 2 10 5Z"
                    fill="rgba(80,30,10,0.50)"
                  />
                </svg>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ── light ray pulse from door opening ────────── */}
          <motion.div
            className="pointer-events-none absolute"
            style={{ left: "42%", top: "55%" }}
            initial={{ opacity: 0 }}
            animate={animating ? { opacity: [0, 0.7, 0.3, 0.6, 0] } : {}}
            transition={{ duration: 3, delay: 0.6, ease: "easeInOut" }}
          >
            {[0, 40, 80, 120, 160, 200, 240, 300].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute h-px origin-left rounded-full"
                style={{ transform: `rotate(${angle}deg)` }}
                initial={{ width: 0, opacity: 0 }}
                animate={animating ? { width: [0, 50 + (i % 3) * 25, 0], opacity: [0, 0.5, 0] } : {}}
                transition={{ duration: 2.5, delay: 0.8 + i * 0.07, ease: "easeOut" }}
              >
                <div
                  className="h-full w-full rounded-full"
                  style={{ background: "linear-gradient(90deg, rgba(255,217,125,0.9), transparent)" }}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          TICKER STRIP
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 overflow-hidden border-t border-black/8 bg-white py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
        <div className="hero-ticker-track flex w-max gap-0">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-4 px-6 text-[11px] font-extrabold tracking-[0.13em] uppercase text-[#78716C]"
            >
              <span className="h-1 w-1 rounded-full bg-[#E8642A]/60" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
