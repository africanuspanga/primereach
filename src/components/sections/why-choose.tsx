import { getWhyChooseReasons } from "@/lib/content";
import { WHY_CHOOSE } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";
import { Icon } from "@/components/ui/icon";

export async function WhyChoose() {
  const reasons = await getWhyChooseReasons();
  const data = reasons.length > 0 ? reasons : WHY_CHOOSE;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Sticky intro + image */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Why PrimeReach</Eyebrow>
            <h2 className="mt-6 text-pretty font-display text-[2rem] font-light leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
              Why institutions trust us with their{" "}
              <span className="serif-italic text-bronze-600">voice</span>.
            </h2>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-muted">
              Seven reasons governments, embassies, and listed corporates hand PrimeReach
              their visibility, their reputation, and their infrastructure.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageFrame
              src={MEDIA.gallery[2]}
              alt="PrimeReach field crew documenting a programme"
              aspect="aspect-[5/4]"
              className="mt-9 hidden lg:block"
              sizes="40vw"
            />
            <div className="mt-8">
              <Button href="/about" variant="outline" withArrow>
                Discover Our Standards
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Reasons list */}
        <div>
          {data.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 3) * 0.05}>
              <article className="group flex gap-6 border-t border-ink/10 py-7 first:border-t-0 first:pt-0">
                <span className="mt-1 font-display text-2xl font-light text-bronze/50 transition-colors duration-300 group-hover:text-bronze">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <Icon name={reason.icon} className="size-5 text-bronze-600" />
                    <h3 className="font-display text-xl font-normal text-ink">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                    {reason.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
