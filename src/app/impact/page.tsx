import type { Metadata } from "next";
import { CASE_STUDIES_FEATURED, IMPACT_INDEX } from "@/data/impact";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCtaSection } from "@/components/sections/closing-cta";
import { ImpactTabs } from "@/components/impact/impact-tabs";
import { CaseCard } from "@/components/impact/case-card";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Impact | Case Studies, Projects, Clients & Testimonials",
  description: IMPACT_INDEX.heroLede,
  alternates: { canonical: "/impact" },
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title={
          <>
            Where we have shown up, and{" "}
            <span className="serif-italic text-bronze-300">what we left behind.</span>
          </>
        }
        description={IMPACT_INDEX.heroLede}
        image={MEDIA.pageHero.impact}
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <ImpactTabs />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDIES_FEATURED.map((study, i) => (
              <Reveal key={study.client} delay={(i % 3) * 0.05} className="h-full">
                <CaseCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCtaSection cta={IMPACT_INDEX.closing} />
    </>
  );
}
