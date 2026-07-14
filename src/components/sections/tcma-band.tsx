import Image from "next/image";
import { getHome } from "@/lib/content";
import { HOME } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StatCounter } from "@/components/ui/stat-counter";

export async function TcmaBand() {
  const home = (await getHome()) as typeof HOME | null;
  const data = home ?? HOME;

  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 lg:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-15" />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #b87c42 0%, transparent 70%)" }}
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-bronze/25">
            <Image
              src={MEDIA.programmes.tcma}
              alt="Tanzania Creative Market Access — vetted creators on assignment"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="overlay-ink absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="font-display text-2xl font-light text-white">
                Tanzania Creative Market Access
              </span>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow onDark>{data.tcma.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-pretty font-display text-[2rem] font-light leading-[1.1] text-white sm:text-4xl lg:text-[2.75rem]">
              {data.tcma.title}
            </h2>
          </Reveal>
          {data.tcma.body.map((paragraph, i) => (
            <Reveal key={i} delay={0.06 * (i + 1)}>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-white/70">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-6">
              {data.tcma.stats.map((stat) => (
                <div key={stat.label}>
                  <StatCounter
                    value={stat.value}
                    className="font-display text-3xl font-light leading-none text-bronze-300"
                  />
                  <p className="mt-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-9">
              <Button href={data.tcma.cta.href} withArrow>
                {data.tcma.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
