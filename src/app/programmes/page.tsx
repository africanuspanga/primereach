import type { Metadata } from "next";
import { getProgrammes, getBlock } from "@/lib/content";
import { PROGRAMMES_INDEX } from "@/data/programmes";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { CallToAction } from "@/components/sections/call-to-action";
import { ProgrammeCard } from "@/components/programmes/programme-card";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Flagship Programmes | TCMA & Beyond",
  description: PROGRAMMES_INDEX.heroLede,
  alternates: { canonical: "/programmes" },
};

export default async function ProgrammesPage() {
  const [programmes, index] = await Promise.all([
    getProgrammes(),
    getBlock<typeof PROGRAMMES_INDEX>("programmes_index"),
  ]);
  const programmesIndex = index ?? PROGRAMMES_INDEX;

  return (
    <>
      <PageHero
        eyebrow="Flagship Programmes"
        title={
          <>
            The programmes we{" "}
            <span className="serif-italic text-bronze-300">own and steward.</span>
          </>
        }
        description={programmesIndex.heroLede}
        image={MEDIA.pageHero.programmes}
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x grid gap-6">
          {programmes.map((programme, i) => (
            <Reveal key={programme.title} delay={(i % 2) * 0.06}>
              <ProgrammeCard programme={programme} />
            </Reveal>
          ))}
        </div>
      </section>

      <CallToAction eyebrow="Partner With a Programme" heading="Build the next one with us." />
    </>
  );
}
