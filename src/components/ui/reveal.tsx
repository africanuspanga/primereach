"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance in px for the rise. */
  y?: number;
};

/**
 * Fade-and-rise entrance used across sections. Animates once on scroll-in.
 * Fully collapses to a static element when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
