"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { slideLeft, slideRight } from "@/components/ui/MotionDiv";

const BULLETS = [
  "Proactively certified client advisors",
  "Is there a waiting list for desired",
  "Immediate 24/7 Emergency",
] as const;

export function AboutSection() {
  return (
    <section className="overflow-hidden bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── LEFT – creative house-frame image ────────────────── */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* decorative blobs */}
            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -bottom-10 -right-5 h-40 w-40 rounded-full bg-accent-2/8 blur-3xl" />

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-black/8 shadow-[var(--shadow-elevated)]"
            >
              <Image
                src="/about-creative.jpg"
                alt="Welcome To Properties"
                width={560}
                height={480}
                className="h-auto w-full object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          {/* ── RIGHT – copy ─────────────────────────────────────── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="text-xs font-extrabold uppercase tracking-widest text-accent">
              About Company
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl lg:text-5xl">
              Welcome To Properties
            </h2>
            <div className="mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-[#C63A2B] to-[#F28C45]" />

            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              It is a long established fact that a reader will be distracted by the readable content of a
              page when looking at layout the point of using Lorem Ipsum is its normal distribution of letters.
            </p>

            <ul className="mt-7 space-y-3.5">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-muted">
                  <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </ul>

            {/* stat circles + CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-accent/20 bg-accent/5">
                <span className="text-lg font-extrabold text-accent">30k+</span>
                <span className="mt-0.5 text-center text-[9px] font-bold leading-tight text-muted">
                  Satisfied<br />Client
                </span>
              </div>
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-accent-2/25 bg-accent-2/8">
                <span className="text-lg font-extrabold text-accent-2">700+</span>
                <span className="mt-0.5 text-center text-[9px] font-bold leading-tight text-muted">
                  Properties<br />Sold
                </span>
              </div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-text px-7 py-3.5 text-sm font-extrabold text-surface shadow-sm transition hover:bg-accent hover:border-accent hover:text-white"
                >
                  <Home className="h-4 w-4" />
                  Explore More
                </Link>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
