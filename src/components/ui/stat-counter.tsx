"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Animated statistic. Parses a leading integer (e.g. "200+", "03", "24/7")
 * and counts up to it on scroll-in, preserving any prefix padding and suffix.
 * Non-numeric values (e.g. "AI") are rendered as-is.
 */
export function StatCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduceMotion = useReducedMotion();

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const pad = match ? match[1].length : 0;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(match && !reduceMotion ? 0 : target);

  useEffect(() => {
    if (!match || reduceMotion) return;
    if (!inView) return;

    let frame = 0;
    const duration = 1400;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutExpo for a decisive settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, match, reduceMotion, target]);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {String(display).padStart(pad, "0")}
      {suffix}
    </span>
  );
}
