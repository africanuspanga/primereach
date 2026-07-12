import { Check } from "lucide-react";
import { CREATOR_NETWORK, NETWORK_STATS } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { StatCounter } from "@/components/ui/stat-counter";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";

export function CreatorNetworkPreview() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Creator Economy Infrastructure"
          title={
            <>
              The creator &{" "}
              <span className="serif-italic text-bronze-600">influence</span> network.
            </>
          }
          description={CREATOR_NETWORK.supporting}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Feature image */}
          <Reveal className="lg:col-span-5">
            <ImageFrame
              src={MEDIA.creators[0]}
              alt="Creators and communities featured by PrimeReach"
              aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </Reveal>

          {/* Capabilities + stats */}
          <div className="grid gap-6 lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {NETWORK_STATS.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 0.06}
                  className="rounded-2xl border border-ink/10 bg-white p-5 text-center"
                >
                  <StatCounter
                    value={stat.value}
                    className="font-display text-3xl font-light text-ink"
                  />
                  <p className="mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-muted">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="rounded-[1.5rem] border border-ink/10 bg-white p-8">
                <h3 className="font-display text-xl font-normal text-ink">
                  Network capabilities
                </h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {CREATOR_NETWORK.stats.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-bronze" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button href="/network#creators" variant="outline" withArrow>
                    Explore the Creator Network
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
