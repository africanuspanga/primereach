import type { Metadata } from "next";
import { getTcma } from "@/lib/content";
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

export default async function TcmaPage() {
  const tcma = ((await getTcma()) as typeof TCMA | null) ?? TCMA;

  return (
    <>
      <PageHero
        eyebrow="Flagship Programme"
        title={tcma.heroTitle}
        description={tcma.heroTagline}
        image={MEDIA.programmes.tcma}
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={tcma.whatIs.eyebrow}
            title={tcma.whatIs.title}
            description={tcma.whatIs.description}
          />
          <div className="mt-12">
            <SubServiceGrid items={tcma.pillars} columns={2} />
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading eyebrow={tcma.engage.eyebrow} title={tcma.engage.title} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-ink/10 border-t-4 border-t-bronze bg-white p-8 lg:p-11">
                <h3 className="font-display text-2xl font-normal text-ink">
                  {tcma.engage.bench.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted">
                  {tcma.engage.bench.description}
                </p>
                <div className="mt-7">
                  <Button href={tcma.engage.bench.cta.href} withArrow>
                    {tcma.engage.bench.cta.label}
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-ink/10 border-t-4 border-t-ink bg-white p-8 lg:p-11">
                <h3 className="font-display text-2xl font-normal text-ink">
                  {tcma.engage.campaign.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted">
                  {tcma.engage.campaign.description}
                </p>
                <div className="mt-7">
                  <Button href={tcma.engage.campaign.cta.href} variant="ink" withArrow>
                    {tcma.engage.campaign.cta.label}
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
