"use client";

import { useState } from "react";
import { CASE_STUDIES, CASE_STUDY_FILTERS } from "@/data/impact";
import type { CaseStudy } from "@/types/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { CaseCard } from "@/components/impact/case-card";

/** Filterable case-study grid (client-side filter by sector). */
export function CaseStudyFilter({ items = CASE_STUDIES }: { items?: CaseStudy[] }) {
  const [active, setActive] = useState<string>("All");
  const filtered =
    active === "All"
      ? items
      : items.filter((study) => study.sector === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CASE_STUDY_FILTERS.map((filter) => (
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

      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study, i) => (
            <Reveal key={`${study.client}-${study.title}`} delay={(i % 3) * 0.05} className="h-full">
              <CaseCard study={study} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-ink/15 bg-paper p-12 text-center text-muted">
          More {active} case studies are being prepared for publication.
        </p>
      )}
    </div>
  );
}
