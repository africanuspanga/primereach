import { CAPABILITY_STATS } from "@/data/site-content";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutPreview } from "@/components/sections/about-preview";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ServiceWings } from "@/components/sections/service-wings";
import { WhyChoose } from "@/components/sections/why-choose";
import { RapidDeploymentPreview } from "@/components/sections/rapid-deployment-preview";
import { CreatorNetworkPreview } from "@/components/sections/creator-network-preview";
import { ClientLogoGrid } from "@/components/sections/client-logo-grid";
import { CallToAction } from "@/components/sections/call-to-action";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />

      {/* Capability statistics */}
      <section className="relative overflow-hidden bg-ink py-16 lg:py-24">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="container-x relative">
          <SectionHeading
            align="center"
            onDark
            eyebrow="Capability at a Glance"
            title={
              <>
                Built to deploy. Built to scale.{" "}
                <span className="serif-italic text-bronze-300">Built to deliver.</span>
              </>
            }
          />
          <div className="mt-12">
            <StatsStrip stats={CAPABILITY_STATS} variant="glass" columns={6} />
          </div>
        </div>
      </section>

      <ServiceWings description="From strategic communication to research and technology supply, PrimeReach delivers a complete operating stack under one accountable group." />
      <WhyChoose />
      <RapidDeploymentPreview />
      <CreatorNetworkPreview />
      <ClientLogoGrid
        variant="marquee"
        description="Governments, universities, foundations, NGOs and global brands partner with PrimeReach."
      />
      <CallToAction />
    </>
  );
}
