"use client";

import { motion } from "framer-motion";
import { Building2, Warehouse, Home, Building, TreePalm, Hotel } from "lucide-react";
import { staggerContainer, fadeUp } from "@/components/ui/MotionDiv";

const TYPES = [
  { label: "Commercial",  count: 6,  icon: Building2, color: "from-red-50    to-orange-50",  ring: "group-hover:ring-red-300"    },
  { label: "Warehouse",   count: 4,  icon: Warehouse,  color: "from-orange-50 to-amber-50",   ring: "group-hover:ring-orange-300"  },
  { label: "Villa",       count: 8,  icon: TreePalm,   color: "from-green-50  to-emerald-50", ring: "group-hover:ring-green-300"   },
  { label: "Apartment",   count: 12, icon: Building,   color: "from-red-50    to-pink-50",    ring: "group-hover:ring-red-200"     },
  { label: "Homestay",    count: 5,  icon: Home,       color: "from-orange-50 to-red-50",     ring: "group-hover:ring-orange-200"  },
  { label: "Hotel",       count: 3,  icon: Hotel,      color: "from-amber-50  to-orange-50",  ring: "group-hover:ring-amber-300"   },
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
          <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#C63A2B] to-[#F28C45]" />
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
                  className={`group relative w-full overflow-hidden rounded-3xl border border-black/8 bg-gradient-to-b ${t.color} p-6 text-center shadow-[var(--shadow-soft)] ring-2 ring-transparent transition-all duration-300 hover:shadow-[var(--shadow-elevated)] ${t.ring}`}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* icon */}
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/8 transition duration-300 group-hover:bg-accent/10 group-hover:ring-accent/30">
                    <Icon className="h-6 w-6 text-muted transition group-hover:text-accent" />
                  </div>
                  <div className="mt-4 text-sm font-extrabold text-text">{t.label}</div>
                  <div className="mt-1 text-[11px] font-semibold text-muted">{t.count} Properties</div>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
