import type { Metadata } from "next";
import { TCMA } from "@/data/programmes";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { SubServiceGrid } from "@/components/sections/sub-service-grid";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tanzania Creative Market Access (TCMA) | Flagship Programme",
  description: TCMA.heroTagline,
  alternates: { canonical: "/programmes/tcma" },
};

export default function TcmaPage() {
  return (
    <>
      <PageHero
        eyebrow="Flagship Programme"
        title={TCMA.heroTitle}
        description={TCMA.heroTagline}
        image={MEDIA.programmes.tcma}
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={TCMA.whatIs.eyebrow}
            title={TCMA.whatIs.title}
            description={TCMA.whatIs.description}
          />
          <div className="mt-12">
            <SubServiceGrid items={TCMA.pillars} columns={2} />
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading eyebrow={TCMA.engage.eyebrow} title={TCMA.engage.title} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-ink/10 border-t-4 border-t-bronze bg-white p-8 lg:p-11">
                <h3 className="font-display text-2xl font-normal text-ink">
                  {TCMA.engage.bench.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted">
                  {TCMA.engage.bench.description}
                </p>
                <div className="mt-7">
                  <Button href={TCMA.engage.bench.cta.href} withArrow>
                    {TCMA.engage.bench.cta.label}
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-ink/10 border-t-4 border-t-ink bg-white p-8 lg:p-11">
                <h3 className="font-display text-2xl font-normal text-ink">
                  {TCMA.engage.campaign.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted">
                  {TCMA.engage.campaign.description}
                </p>
                <div className="mt-7">
                  <Button href={TCMA.engage.campaign.cta.href} variant="ink" withArrow>
                    {TCMA.engage.campaign.cta.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
