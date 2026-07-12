import { HeroSection } from "@/components/sections/hero-section";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServiceWings } from "@/components/sections/service-wings";
import { WhyChoose } from "@/components/sections/why-choose";
import { RapidDeploymentPreview } from "@/components/sections/rapid-deployment-preview";
import { CreatorNetworkPreview } from "@/components/sections/creator-network-preview";
import { ClientLogoGrid } from "@/components/sections/client-logo-grid";
import { CallToAction } from "@/components/sections/call-to-action";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
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
