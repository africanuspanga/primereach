import type { SubService } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";

/** Grid of titled sub-services / standing capabilities used across detail pages. */
export function SubServiceGrid({
  items,
  columns = 3,
}: {
  items: readonly SubService[];
  columns?: 2 | 3;
}) {
  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-4 ${cols}`}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % 3) * 0.05}>
          <div className="h-full rounded-2xl border border-ink/10 border-l-[3px] border-l-bronze bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-36px_rgba(11,20,29,0.5)]">
            <h4 className="font-display text-lg font-normal text-ink">{item.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
