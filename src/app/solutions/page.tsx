import type { Metadata } from "next";
import { CROSS_CUTTING, SOLUTIONS_INDEX } from "@/data/solutions";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { SolutionsGrid } from "@/components/sections/solutions-grid";
import { ClosingCtaSection } from "@/components/sections/closing-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Solutions | Six Solutions, One Accountable Partner",
  description: SOLUTIONS_INDEX.heroLede,
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Six solutions.{" "}
            <span className="serif-italic text-bronze-300">One accountable partner.</span>
          </>
        }
        description={SOLUTIONS_INDEX.heroLede}
        image={MEDIA.pageHero.solutions}
      />

      <SolutionsGrid withHeading={false} className="bg-white py-20 lg:py-24" />

      <section className="bg-paper py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={SOLUTIONS_INDEX.crossCutting.eyebrow}
            title={SOLUTIONS_INDEX.crossCutting.title}
            description={SOLUTIONS_INDEX.crossCutting.description}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {CROSS_CUTTING.map((offering, i) => (
              <Reveal key={offering.number} delay={(i % 2) * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-white p-8">
                  <span className="font-display text-3xl font-light text-bronze/50">
                    {offering.number}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-normal text-ink">
                    {offering.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                    {offering.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-bronze-600">
                    {offering.cta} &rarr;
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCtaSection cta={SOLUTIONS_INDEX.closing} />
    </>
  );
}
