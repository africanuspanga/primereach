import { ABOUT } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageFrame } from "@/components/ui/image-frame";

export function AboutPreview() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <div className="order-2 lg:order-1">
          <Reveal>
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="mt-6 text-pretty font-display text-[2rem] font-light leading-[1.1] text-ink sm:text-4xl lg:text-[2.85rem]">
              Africa’s integrated{" "}
              <span className="serif-italic text-bronze-600">digital infrastructure</span>{" "}
              partner.
            </h2>
          </Reveal>
          <div className="mt-7 space-y-5 text-[1.05rem] leading-relaxed text-muted">
            {ABOUT.intro.map((para, i) => (
              <Reveal key={i} delay={0.05 * (i + 1)}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <figure className="mt-9 border-l-2 border-bronze pl-6">
              <blockquote className="font-display text-xl font-light italic leading-relaxed text-ink">
                {ABOUT.featuredStatement}
              </blockquote>
            </figure>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-9">
              <Button href="/about" withArrow variant="outline">
                Discover PrimeReach
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative order-1 lg:order-2">
          <ImageFrame
            src={MEDIA.aboutPortrait}
            alt="A PrimeReach cinematographer operating a gimbal-stabilised camera"
            aspect="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-ink px-7 py-5 text-white shadow-[0_24px_60px_-20px_rgba(11,20,29,0.6)] sm:block">
            <p className="font-display text-4xl font-light leading-none text-bronze-300">
              2019
            </p>
            <p className="mt-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/60">
              Building since
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
