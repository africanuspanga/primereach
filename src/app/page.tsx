import { HOME } from "@/data/site-content";
import { HeroSection } from "@/components/sections/hero-section";
import { PositionBand } from "@/components/sections/position-band";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServiceWings } from "@/components/sections/service-wings";
import { SolutionsGrid } from "@/components/sections/solutions-grid";
import { WhyChoose } from "@/components/sections/why-choose";
import { TcmaBand } from "@/components/sections/tcma-band";
import { CapabilitiesRow } from "@/components/sections/capabilities-row";
import { StatsReel } from "@/components/sections/stats-reel";
import { ClientLogoGrid } from "@/components/sections/client-logo-grid";
import { InsightsTeaser } from "@/components/sections/insights-teaser";
import { CallToAction } from "@/components/sections/call-to-action";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PositionBand />
      <AboutPreview />
      <ServiceWings
        eyebrow={HOME.wings.eyebrow}
        title={
          <>
            Three specialised wings.{" "}
            <span className="serif-italic text-bronze-600">End-to-end capability.</span>
          </>
        }
        description={HOME.wings.description}
      />
      <SolutionsGrid />
      <WhyChoose />
      <TcmaBand />
      <CapabilitiesRow />
      <StatsReel />
      <ClientLogoGrid
        variant="marquee"
        heading="Governments, universities, foundations, NGOs and global brands."
      />
      <InsightsTeaser />
      <CallToAction />
    </>
  );
}
