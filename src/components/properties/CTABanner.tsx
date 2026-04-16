"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { slideLeft, slideRight } from "@/components/ui/MotionDiv";

export function CTABanner() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-surface shadow-[0_32px_80px_rgba(0,0,0,0.5)]">

          {/* subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* glow */}
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative flex flex-col items-center justify-between gap-0 lg:flex-row">

            {/* Left text */}
            <motion.div
              className="max-w-lg p-10 sm:p-12 lg:p-14"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="text-xs font-extrabold uppercase tracking-widest text-accent">
                Properties
              </div>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-text sm:text-4xl">
                Welcome To Our{" "}
                <span className="text-[#4ade80]">Luxurious Properties</span>{" "}
                With All The Conveniences.
              </h2>

              <motion.div
                className="mt-7"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-extrabold text-text transition hover:bg-accent hover:text-accent-ink hover:border-accent"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  View Properties
                </Link>
              </motion.div>
            </motion.div>

            {/* Right – 3D house model floating */}
            <motion.div
              className="relative flex shrink-0 items-end justify-center self-end px-8 pb-0 lg:px-12"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="relative"
              >
                {/* floor shadow */}
                <div className="absolute -bottom-2 left-1/2 h-6 w-48 -translate-x-1/2 rounded-full bg-black/35 blur-xl" />
                <Image
                  src="/properties-hero.jpg"
                  alt="3D house model"
                  width={380}
                  height={340}
                  className="h-auto w-72 object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] lg:w-80"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
