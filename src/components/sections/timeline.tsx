import type { TimelineEntry } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";

/** Editorial company-journey timeline with serif years and a bronze rail. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative mx-auto max-w-3xl">
      <span
        className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-bronze via-ink/15 to-transparent sm:left-[calc(7rem+7px)]"
        aria-hidden="true"
      />
      {entries.map((entry, i) => (
        <li key={entry.year} className="relative">
          <Reveal delay={i * 0.05} className="flex gap-6 pb-9 last:pb-0 sm:gap-9">
            <span className="hidden w-28 shrink-0 pt-0.5 text-right font-display text-2xl font-light text-ink sm:block">
              {entry.year}
            </span>
            <span className="relative mt-1.5 grid size-4 shrink-0 place-items-center">
              <span className="absolute inset-0 rounded-full bg-bronze/25" />
              <span className="size-2 rounded-full bg-bronze ring-4 ring-paper" />
            </span>
            <div className="flex-1 rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(11,20,29,0.5)]">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-lg font-light text-bronze-600 sm:hidden">
                  {entry.year}
                </span>
                {entry.tag && (
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-bronze-600">
                    {entry.tag}
                  </span>
                )}
              </div>
              {entry.title && (
                <h4 className="mt-1.5 font-display text-lg font-normal text-ink">
                  {entry.title}
                </h4>
              )}
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70 sm:text-base">
                {entry.description}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
