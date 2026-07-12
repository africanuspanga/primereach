import type { Metadata } from "next";
import { CAPABILITY_STATS } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceWings } from "@/components/sections/service-wings";
import { StatsStrip } from "@/components/sections/stats-strip";
import { CallToAction } from "@/components/sections/call-to-action";

export const metadata: Metadata = {
  title: "Strategic Communication, Research & Technology Services",
  description:
    "One integrated ecosystem. Three specialised wings covering thirteen capability areas — strategic communication, research & advisory, and technology solutions.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Service Divisions"
        title={
          <>
            One ecosystem.{" "}
            <span className="serif-italic text-bronze-300">Three specialised wings.</span>
          </>
        }
        description="PrimeReach brings strategy, production, research and technology supply under one accountable group — three integrated wings covering thirteen specialised capability areas."
        image={MEDIA.pageHero.services}
      >
        <StatsStrip stats={CAPABILITY_STATS} variant="glass" columns={6} />
      </PageHero>

      <ServiceWings
        eyebrow="End-to-End Capability"
        title={
          <>
            Three wings.{" "}
            <span className="serif-italic text-bronze-600">One accountable partner.</span>
          </>
        }
        description="Explore each division below, then dive into its specialised capability areas."
      />

      <CallToAction
        eyebrow="Scope Your Mandate"
        heading="Not Sure Which Wing You Need?"
        copy="Tell us the outcome you’re after and we’ll assemble the right mix of communication, research and technology capability."
      />
    </>
  );
}
