"use client";
export { motion } from "framer-motion";

export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: "easeOut" as const } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55 } },
};

export const slideLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.65, ease: "easeOut" as const } },
};

export const slideRight = {
  hidden:  { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.65, ease: "easeOut" as const } },
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const cardHover = {
  rest:  { y: 0,  scale: 1,    boxShadow: "0 8px 30px rgba(0,0,0,0.3)" },
  hover: { y: -6, scale: 1.01, boxShadow: "0 24px 55px rgba(245,158,11,0.18)" },
};
