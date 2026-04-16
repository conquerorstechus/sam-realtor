"use client";

import { motion } from "framer-motion";
import { useId } from "react";

type Props = {
  active?: boolean;
  hovered?: boolean;
  label: string;
  onSelect?: () => void;
  onHover?: (on: boolean) => void;
};

/**
 * Faceted “house in hexagon” pin inspired by the Tampa Realty Pros symbol:
 * deep red + orange facets, negative-space roof, subtle depth.
 */
export function CustomMarker({ active, hovered, label, onSelect, onHover }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const scale = active ? 1.08 : hovered ? 1.04 : 1;
  const gRed = `pin-red-${uid}`;
  const gOrange = `pin-orange-${uid}`;
  const gCoral = `pin-coral-${uid}`;

  return (
    <motion.button
      type="button"
      aria-label={`Property marker: ${label}`}
      aria-pressed={active}
      onClick={onSelect}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      onFocus={() => onHover?.(true)}
      onBlur={() => onHover?.(false)}
      className="relative z-10 -translate-x-1/2 -translate-y-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      animate={{ scale }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <svg width="44" height="52" viewBox="0 0 44 52" fill="none" aria-hidden className="drop-shadow-[0_10px_22px_rgba(0,0,0,0.22)]">
        <defs>
          <linearGradient id={gRed} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B1C1C" />
            <stop offset="100%" stopColor="#C63A2B" />
          </linearGradient>
          <linearGradient id={gOrange} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F28C45" />
            <stop offset="100%" stopColor="#E8642A" />
          </linearGradient>
          <linearGradient id={gCoral} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F4A582" />
            <stop offset="100%" stopColor="#E8642A" />
          </linearGradient>
        </defs>
        {/* stem */}
        <path
          d="M22 46 L18 52 L26 52 Z"
          fill={`url(#${gRed})`}
          opacity={0.92}
        />
        {/* outer faceted shell */}
        <path
          d="M22 4 L36 14 L36 30 L22 40 L8 30 L8 14 Z"
          fill={`url(#${gOrange})`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.75"
        />
        <path d="M22 4 L36 14 L22 18 Z" fill={`url(#${gRed})`} />
        <path d="M36 14 L36 30 L22 24 Z" fill={`url(#${gCoral})`} opacity={0.95} />
        <path d="M8 14 L22 18 L8 30 Z" fill="#E8642A" />
        <path d="M22 24 L36 30 L22 40 L8 30 Z" fill={`url(#${gOrange})`} opacity={0.88} />
        {/* inner house negative space (roof + body cutout illusion) */}
        <path
          d="M22 12 L28 17 L28 30 L16 30 L16 17 Z"
          fill="#FAF7F4"
          opacity={0.98}
        />
        <path d="M16 30 L22 34 L28 30" fill="#FAF7F4" opacity={0.98} />
        {active && (
          <circle cx="22" cy="22" r="14" fill="none" stroke="rgba(232,100,42,0.45)" strokeWidth="1.2" />
        )}
      </svg>
    </motion.button>
  );
}
