import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/content";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { CallToAction } from "@/components/sections/call-to-action";
import { ImpactTabs } from "@/components/impact/impact-tabs";
import { CaseStudyFilter } from "@/components/impact/case-study-filter";

export const metadata: Metadata = {
  title: "Case Studies | Impact",
  description:
    "Case studies of programmes delivered for governments, universities, foundations, corporates, and creators.",
  alternates: { canonical: "/impact/case-studies" },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={
          <>
            Full-length stories from our{" "}
            <span className="serif-italic text-bronze-300">engagements.</span>
          </>
        }
        description="Case studies of programmes delivered for governments, universities, foundations, corporates, and creators."
        image={MEDIA.pageHero.impact}
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <ImpactTabs />
          <div className="mt-12">
            <CaseStudyFilter items={caseStudies} />
          </div>
        </div>
      </section>

      <CallToAction eyebrow="Let's Add Yours" heading="What could your case study look like?" />
    </>
  );
}
