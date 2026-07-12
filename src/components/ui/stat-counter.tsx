"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated statistic. Parses a leading integer (e.g. "200+", "03", "24/7") and
 * counts up to it once when scrolled into view. Non-numeric values (e.g. "AI")
 * render as-is. Uses a plain IntersectionObserver so the animation fires
 * reliably and never restarts mid-count.
 */
export function StatCounter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  const match = value.match(/^(\d+)(.*)$/);
  const pad = match ? match[1].length : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const parsed = value.match(/^(\d+)(.*)$/);
    if (!parsed) return;
    const goal = parseInt(parsed[1], 10);
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    // Respect reduced-motion: jump to the final number (via rAF so we don't
    // set state synchronously inside the effect body).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setDisplay(goal));
      return () => cancelAnimationFrame(raf);
    }

    let started = false;

    const animate = () => {
      const duration = 1500;
      let start: number | null = null;
      const tick = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setDisplay(Math.round(eased * goal));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            io.disconnect();
            animate();
          }
        }
      },
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

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
