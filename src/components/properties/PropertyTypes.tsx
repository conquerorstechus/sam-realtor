"use client";

import { motion } from "framer-motion";
import { Building2, Warehouse, Home, Building, TreePalm, Hotel } from "lucide-react";
import { staggerContainer, fadeUp } from "@/components/ui/MotionDiv";

const TYPES = [
  { label: "Commercial",   count: 6, icon: Building2,  color: "from-blue-500/20 to-blue-600/5"  },
  { label: "Warehouse",    count: 4, icon: Warehouse,   color: "from-purple-500/20 to-purple-600/5" },
  { label: "Villa",        count: 8, icon: TreePalm,    color: "from-accent/20 to-accent/5"     },
  { label: "Apartment",    count: 12, icon: Building,   color: "from-rose-500/20 to-rose-600/5"  },
  { label: "Homestay",     count: 5, icon: Home,        color: "from-emerald-500/20 to-emerald-600/5" },
  { label: "Hotel",        count: 3, icon: Hotel,       color: "from-cyan-500/20 to-cyan-600/5"  },
] as const;

export function PropertyTypes() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* heading */}
        <motion.div
          className="mb-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="text-xs font-extrabold tracking-widest text-accent">PROPERTY BY REQUIREMENT</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Explore Property{" "}
            <span className="text-accent">Types</span>
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-accent/50" />
        </motion.div>

        {/* cards */}
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {TYPES.map((t) => {
            const Icon = t.icon;
            return (
              <motion.div key={t.label} variants={fadeUp}>
                <motion.button
                  type="button"
                  className={`group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b ${t.color} p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-accent/50`}
                  whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(245,158,11,0.18)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* icon */}
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/15 transition duration-300 group-hover:bg-accent/20 group-hover:ring-accent/40">
                    <Icon className="h-6 w-6 text-muted transition group-hover:text-accent" />
                  </div>
                  <div className="mt-4 text-sm font-extrabold text-text">{t.label}</div>
                  <div className="mt-1 text-[11px] font-semibold text-muted">{t.count} Properties</div>

                  {/* hover glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.5)] transition duration-300 group-hover:opacity-100" />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
