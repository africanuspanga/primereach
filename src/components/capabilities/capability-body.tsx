import { Check } from "lucide-react";
import type { Capability } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Two-column capability body: copy + bullet list beside a cinematic label
 * panel. Reused on the Capabilities index (Technology, Creative Studio) and on
 * the list-variant detail pages.
 */
export function CapabilityBody({
  capability,
  eyebrow,
  imageLeft = false,
}: {
  capability: Capability;
  eyebrow?: string;
  imageLeft?: boolean;
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
      <Reveal className={imageLeft ? "lg:order-2" : undefined}>
        <Eyebrow>{eyebrow ?? `Capability ${capability.number}`}</Eyebrow>
        <h3 className="mt-5 font-display text-[1.9rem] font-light leading-tight text-ink">
          {capability.bodyHeading}
        </h3>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{capability.bodyCopy}</p>
        <ul className="mt-6 grid gap-2.5">
          {capability.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-[0.95rem] text-ink/80">
              <Check className="mt-0.5 size-4 shrink-0 text-bronze" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1} className={imageLeft ? "lg:order-1" : undefined}>
        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.75rem] bg-ink-900 p-8 text-center">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle,#b87c42,transparent 70%)" }}
          />
          <span className="relative font-display text-2xl font-light text-bronze-300 lg:text-3xl">
            {capability.visualLabel}
          </span>
        </div>
      </Reveal>
    </div>
  );
}
