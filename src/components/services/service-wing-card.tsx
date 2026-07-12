import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ServiceWing } from "@/types/content";
import { MEDIA } from "@/lib/images";
import { Icon } from "@/components/ui/icon";

/** Editorial, image-led card for one of the three service wings. */
export function ServiceWingCard({ wing }: { wing: ServiceWing }) {
  const image = MEDIA.wings[wing.slug];

  return (
    <Link
      href={wing.href}
      className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink-800 p-8 text-white lg:min-h-[34rem]"
    >
      {/* Photo */}
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
      <div className="overlay-ink absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent transition-colors duration-500 group-hover:from-ink-900" />

      {/* Top row: index + arrow */}
      <div className="absolute inset-x-8 top-8 flex items-center justify-between">
        <span className="eyebrow text-bronze-300">{wing.eyebrow}</span>
        <span className="grid size-11 place-items-center rounded-full border border-white/25 text-white transition-all duration-300 group-hover:border-bronze group-hover:bg-bronze">
          <ArrowUpRight className="size-5" />
        </span>
      </div>

      {/* Content */}
      <div className="relative">
        <span className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 text-bronze-300 backdrop-blur-sm">
          <Icon name={wing.icon} className="size-6" />
        </span>
        <h3 className="font-display text-[1.6rem] font-normal leading-tight">
          {wing.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
          {wing.shortDescription}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {wing.areas.slice(0, 4).map((area) => (
            <span
              key={area}
              className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-white/75"
            >
              {area}
            </span>
          ))}
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-bronze-300">
          {wing.cta}
        </span>
      </div>
    </Link>
  );
}
