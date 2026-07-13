import type { Programme, ProgrammeStatus } from "@/types/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const STATUS_STYLES: Record<ProgrammeStatus, string> = {
  live: "bg-bronze/12 text-bronze-600",
  pilot: "bg-ink/8 text-ink",
  dev: "bg-paper-dim text-muted",
};

function StatusChip({ status, label }: { status: ProgrammeStatus; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em]",
        STATUS_STYLES[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

/** Card for a flagship / roadmap programme with status chip, stats and CTA. */
export function ProgrammeCard({ programme }: { programme: Programme }) {
  const variant =
    programme.cta?.variant === "ink"
      ? "ink"
      : programme.cta?.variant === "ghost"
        ? "outline"
        : "primary";

  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 border-t-4 border-t-bronze bg-white p-8 lg:p-11">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full opacity-[0.06] blur-2xl"
        style={{ background: "radial-gradient(circle,#b87c42,transparent 70%)" }}
      />
      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <h3 className="font-display text-2xl font-normal text-ink">{programme.title}</h3>
        <StatusChip status={programme.status} label={programme.statusLabel} />
      </div>
      <p className="relative mt-5 max-w-3xl leading-relaxed text-muted">
        {programme.description}
      </p>

      {programme.stats && (
        <div className="relative mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-6">
          {programme.stats.map((stat) => (
            <div key={stat.label}>
              <span className="font-display text-2xl font-light text-ink">{stat.value}</span>
              <p className="mt-1 text-[0.66rem] font-medium uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {programme.cta && (
        <div className="relative mt-7">
          <Button href={programme.cta.href} variant={variant} withArrow>
            {programme.cta.label}
          </Button>
        </div>
      )}
    </article>
  );
}
