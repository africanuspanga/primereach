import Image from "next/image";
import type { ClosingCta } from "@/types/content";
import { MEDIA } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

/** Cinematic closing call-to-action driven by a ClosingCta content object. */
export function ClosingCtaSection({ cta }: { cta: ClosingCta }) {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 lg:py-32">
      <Image
        src={MEDIA.ctaBand}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="overlay-ink absolute inset-0" />
      <div className="absolute inset-0 bg-ink-900/40" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="container-x relative">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow onDark>{cta.eyebrow}</Eyebrow>
          <h2 className="mt-6 text-pretty font-display text-4xl font-light leading-[1.05] text-white sm:text-5xl lg:text-[3.4rem]">
            {cta.heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{cta.copy}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={cta.primary.href} size="lg" withArrow>
              {cta.primary.label}
            </Button>
            {cta.secondary && (
              <Button href={cta.secondary.href} size="lg" variant="onDark">
                {cta.secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
