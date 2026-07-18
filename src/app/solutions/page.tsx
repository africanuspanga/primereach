import type { Metadata } from "next";
import { getBlock, getCrossCuttingOfferings } from "@/lib/content";
import { SOLUTIONS_INDEX } from "@/data/solutions";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { SolutionsGrid } from "@/components/sections/solutions-grid";
import { ClosingCtaSection } from "@/components/sections/closing-cta";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata(): Promise<Metadata> {
  const index = (await getBlock<typeof SOLUTIONS_INDEX>("solutions_index")) ?? SOLUTIONS_INDEX;
  return {
    title: "Solutions | Six Solutions, One Accountable Partner",
    description: index.heroLede,
    alternates: { canonical: "/solutions" },
  };
}

export default async function SolutionsPage() {
  const [index, crossCutting] = await Promise.all([
    getBlock<typeof SOLUTIONS_INDEX>("solutions_index").then((b) => b ?? SOLUTIONS_INDEX),
    getCrossCuttingOfferings(),
  ]);

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
        description={index.heroLede}
        image={MEDIA.pageHero.solutions}
      />

      <SolutionsGrid withHeading={false} className="bg-white py-20 lg:py-24" />

      <section className="bg-paper py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={index.crossCutting.eyebrow}
            title={index.crossCutting.title}
            description={index.crossCutting.description}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {crossCutting.map((offering, i) => (
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

      <ClosingCtaSection cta={index.closing} />
    </>
  );
}
