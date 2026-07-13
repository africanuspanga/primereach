import Image from "next/image";
import type { CaseStudy } from "@/types/content";

/** Editorial case-study card with image, sector, client and headline. */
export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-bronze/40 hover:shadow-[0_30px_60px_-40px_rgba(11,20,29,0.5)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
        <Image
          src={study.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-bronze-600">
          {study.sector}
        </span>
        <span className="text-sm font-medium text-muted">{study.client}</span>
        <h3 className="font-display text-lg font-normal leading-snug text-ink">
          {study.title}
        </h3>
        {study.summary && (
          <p className="mt-1 text-sm leading-relaxed text-muted">{study.summary}</p>
        )}
      </div>
    </article>
  );
}
