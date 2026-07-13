"use client";

import { useState } from "react";
import { INSIGHTS, INSIGHTS_INDEX } from "@/data/insights";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { InsightCard } from "@/components/insights/insight-card";

const FILTER_TO_TYPE: Record<string, string> = {
  Articles: "Article",
  Reports: "Report",
  News: "News",
  Events: "Event",
};

/** Filterable insights grid (client-side filter by type). */
export function InsightsFilter() {
  const [active, setActive] = useState<string>("All");
  const filtered =
    active === "All"
      ? INSIGHTS
      : INSIGHTS.filter((insight) => insight.type === FILTER_TO_TYPE[active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {INSIGHTS_INDEX.filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === filter
                ? "border-ink bg-ink text-white"
                : "border-ink/15 bg-white text-muted hover:border-ink/30 hover:text-ink",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((insight, i) => (
          <Reveal key={insight.title} delay={(i % 3) * 0.05} className="h-full">
            <InsightCard insight={insight} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
