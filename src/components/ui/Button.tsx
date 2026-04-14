import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition will-change-transform focus-visible:outline-none active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_18px_45px_rgba(245,158,11,0.25)] hover:brightness-110",
  secondary:
    "border border-white/15 bg-white/5 text-text hover:bg-white/10 hover:border-white/25",
  ghost: "text-text hover:bg-white/5",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
