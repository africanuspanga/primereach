import type { Stat } from "@/types/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { StatCounter } from "@/components/ui/stat-counter";

/**
 * Editorial statistics row. Values in serif display, hairline dividers between
 * cells. Collapses to two / one column on small screens.
 */
export function StatsStrip({
  stats,
  variant = "light",
  columns = 6,
  className,
}: {
  stats: Stat[];
  variant?: "light" | "dark" | "glass";
  columns?: 3 | 4 | 6;
  className?: string;
}) {
  const colClass = {
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  }[columns];

  const onDark = variant !== "light";
  const divide =
    variant === "light"
      ? "divide-ink/10 border-ink/10"
      : "divide-white/12 border-white/12";

  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-[1.5rem] border divide-x divide-y",
        colClass,
        divide,
        variant === "glass" && "bg-white/[0.04] backdrop-blur-md",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <Reveal
          key={stat.label}
          delay={i * 0.05}
          className="flex flex-col items-center justify-center gap-2 px-4 py-9 text-center"
        >
          <StatCounter
            value={stat.value}
            className={cn(
              "font-display text-[2.75rem] font-light leading-none tracking-tight lg:text-5xl",
              onDark ? "text-bronze-300" : "text-ink",
            )}
          />
          <span
            className={cn(
              "mt-1 text-[0.72rem] font-medium uppercase tracking-[0.14em]",
              onDark ? "text-white/55" : "text-muted",
            )}
          >
            {stat.label}
          </span>
        </Reveal>
      ))}
    </div>
  );
}
