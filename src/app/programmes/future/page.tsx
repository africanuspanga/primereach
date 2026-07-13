import type { Metadata } from "next";
import { FUTURE_INDEX, FUTURE_PROGRAMMES } from "@/data/programmes";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { CallToAction } from "@/components/sections/call-to-action";
import { ProgrammeCard } from "@/components/programmes/programme-card";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Future Programmes | Roadmap",
  description: FUTURE_INDEX.heroLede,
  alternates: { canonical: "/programmes/future" },
};

export default function FutureProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Roadmap"
        title={
          <>
            What is <span className="serif-italic text-bronze-300">coming next.</span>
          </>
        }
        description={FUTURE_INDEX.heroLede}
        image={MEDIA.pageHero.programmes}
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x grid gap-6">
          {FUTURE_PROGRAMMES.map((programme, i) => (
            <Reveal key={programme.title} delay={(i % 2) * 0.06}>
              <ProgrammeCard programme={programme} />
            </Reveal>
          ))}
        </div>
      </section>

      <CallToAction eyebrow="Collaborate With Us" heading="Help shape what comes next." />
    </>
  );
}
