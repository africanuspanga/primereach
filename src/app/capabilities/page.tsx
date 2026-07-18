import type { Metadata } from "next";
import Link from "next/link";
import { getBlock, getCapabilities, getCapability } from "@/lib/content";
import { CAPABILITIES_INDEX } from "@/data/capabilities";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCtaSection } from "@/components/sections/closing-cta";
import { CapabilityBody } from "@/components/capabilities/capability-body";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export async function generateMetadata(): Promise<Metadata> {
  const index = (await getBlock<typeof CAPABILITIES_INDEX>("capabilities_index")) ?? CAPABILITIES_INDEX;
  return {
    title: "Capabilities | The Muscle Behind Every Project",
    description: index.heroLede,
    alternates: { canonical: "/capabilities" },
  };
}

export default async function CapabilitiesPage() {
  const [index, capabilities, technology, studio] = await Promise.all([
    getBlock<typeof CAPABILITIES_INDEX>("capabilities_index").then((b) => b ?? CAPABILITIES_INDEX),
    getCapabilities(),
    getCapability("technology"),
    getCapability("creative-studio"),
  ]);

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
        description={index.heroLede}
        image={MEDIA.pageHero.capabilities}
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map((capability, i) => (
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

      <ClosingCtaSection cta={index.closing} />
    </>
  );
}
