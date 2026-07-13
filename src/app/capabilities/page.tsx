import type { Metadata } from "next";
import Link from "next/link";
import { CAPABILITIES, CAPABILITIES_INDEX, getCapability } from "@/data/capabilities";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCtaSection } from "@/components/sections/closing-cta";
import { CapabilityBody } from "@/components/capabilities/capability-body";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Capabilities | The Muscle Behind Every Project",
  description: CAPABILITIES_INDEX.heroLede,
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  const technology = getCapability("technology");
  const studio = getCapability("creative-studio");

  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            The operational muscle{" "}
            <span className="serif-italic text-bronze-300">behind every project.</span>
          </>
        }
        description={CAPABILITIES_INDEX.heroLede}
        image={MEDIA.pageHero.capabilities}
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CAPABILITIES.map((capability, i) => (
              <Reveal key={capability.slug} delay={(i % 5) * 0.05} className="h-full">
                <Link
                  href={capability.href}
                  className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-bronze/40 hover:bg-white"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-ink text-bronze-300 transition-colors duration-300 group-hover:bg-bronze group-hover:text-white">
                    <Icon name={capability.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-normal text-ink">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {capability.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 lg:py-24">
        <div className="container-x space-y-20">
          {technology && <CapabilityBody capability={technology} />}
          {studio && <CapabilityBody capability={studio} imageLeft />}
        </div>
      </section>

      <ClosingCtaSection cta={CAPABILITIES_INDEX.closing} />
    </>
  );
}
