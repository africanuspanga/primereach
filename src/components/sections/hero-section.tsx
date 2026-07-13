import { HERO } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Cinematic homepage hero. Looping brand video under a navy cinematic wash,
 * with a short serif headline (≤5 words, italic bronze accent) and a tight line.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink-900">
      {/* Background video */}
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={MEDIA.hero.poster}
        aria-hidden="true"
      >
        <source src={MEDIA.hero.video} type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div className="overlay-side absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/30" />
      <div className="vignette pointer-events-none absolute inset-0" />

      {/* Editorial index rail */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="text-[0.7rem] font-medium tracking-[0.3em] text-white/50 [writing-mode:vertical-rl]">
          COMMUNICATION · MEDIA · TECHNOLOGY
        </span>
        <span className="h-16 w-px bg-white/25" />
      </div>

      <div className="container-x relative w-full pb-16 pt-32 lg:pb-24">
        <div className="max-w-4xl">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-bronze-300">
              <span className="h-px w-8 bg-bronze-300/70" />
              {HERO.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-7 font-display text-[3.25rem] font-light leading-[0.98] tracking-[-0.02em] text-white sm:text-7xl lg:text-[6.5rem]">
              {HERO.headlineLead}{" "}
              <span className="serif-italic text-bronze-300">{HERO.headlineAccent}.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              {HERO.supporting}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={HERO.primaryCta.href} size="lg" withArrow>
                {HERO.primaryCta.label}
              </Button>
              <Button href={HERO.secondaryCta.href} size="lg" variant="onDark">
                {HERO.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-11 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-white/45">
              {HERO.audiences}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="size-1.5 animate-bounce rounded-full bg-bronze" />
        </span>
      </div>
    </section>
  );
}
