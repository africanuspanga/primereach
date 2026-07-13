import Link from "next/link";
import Image from "next/image";
import type { Insight } from "@/types/content";

/** Shared editorial card for the Insights grid and the home teaser. */
export function InsightCard({
  insight,
  href = "/insights",
}: {
  insight: Insight;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-bronze/40 hover:shadow-[0_30px_60px_-40px_rgba(11,20,29,0.5)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
        {insight.image && (
          <Image
            src={insight.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="self-start rounded-full bg-ink px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-bronze-300">
          {insight.type}
        </span>
        <h3 className="font-display text-lg font-normal leading-snug text-ink">
          {insight.title}
        </h3>
        <span className="mt-auto text-xs text-muted">{insight.meta}</span>
      </div>
    </Link>
  );
}
