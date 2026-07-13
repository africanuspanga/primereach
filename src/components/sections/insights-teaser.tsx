import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INSIGHTS_TEASER } from "@/data/insights";
import { HOME } from "@/data/site-content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { InsightCard } from "@/components/insights/insight-card";

/** "Latest from the editorial desk" — three-item insights teaser. */
export function InsightsTeaser() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <Eyebrow>{HOME.insights.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-pretty font-display text-[2rem] font-light text-ink sm:text-4xl">
              {HOME.insights.title}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-sm font-medium text-bronze-600"
            >
              View all insights
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {INSIGHTS_TEASER.map((insight, i) => (
            <Reveal key={insight.title} delay={i * 0.08} className="h-full">
              <InsightCard insight={insight} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
