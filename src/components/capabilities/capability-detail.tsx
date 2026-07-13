import { notFound } from "next/navigation";
import type { Capability } from "@/types/content";
import {
  DEPLOY_STEPS,
  NETWORK_REGIONS,
  STANDING_CAPABILITIES,
  getCapability,
} from "@/data/capabilities";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ImageFrame } from "@/components/ui/image-frame";
import { SubServiceGrid } from "@/components/sections/sub-service-grid";
import { CapabilityBody } from "@/components/capabilities/capability-body";
import { CallToAction } from "@/components/sections/call-to-action";

/** Shared detail template for all five capability routes. */
export function CapabilityDetail({ slug }: { slug: string }) {
  const capability = getCapability(slug);
  if (!capability) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Capability ${capability.number}`}
        title={capability.heroTitle}
        description={capability.heroTagline}
        image={MEDIA.capabilities[slug]}
      />

      {capability.variant === "network" ? (
        <NetworkBody capability={capability} />
      ) : capability.variant === "deployment" ? (
        <DeploymentBody />
      ) : (
        <section className="bg-white py-20 lg:py-24">
          <div className="container-x">
            <CapabilityBody capability={capability} eyebrow="In Detail" />
          </div>
        </section>
      )}

      <CallToAction eyebrow="Ready to Deploy" heading="What do you need mobilised?" />
    </>
  );
}

function NetworkBody({ capability }: { capability: Capability }) {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Nationwide Coverage"
          title={capability.bodyHeading}
          description={capability.bodyCopy}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Reveal>
            <ImageFrame
              src={MEDIA.capabilities.network}
              alt="PrimeReach regional coverage across Tanzania"
              aspect="aspect-[5/4]"
              overlay="soft"
            >
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="font-display text-xl font-light text-white">
                  {capability.visualLabel}
                </span>
              </div>
            </ImageFrame>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-2.5">
              {NETWORK_REGIONS.map((region) => (
                <li
                  key={region.region}
                  className="flex items-center justify-between rounded-xl bg-paper px-4 py-3 text-sm"
                >
                  <span className="font-medium text-ink">{region.region}</span>
                  {region.crew && (
                    <span className="font-semibold text-bronze-600">{region.crew}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DeploymentBody() {
  return (
    <>
      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="From Brief to On Location"
            title={
              <>
                Mobilised in{" "}
                <span className="serif-italic text-bronze-600">4 to 24 hours.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DEPLOY_STEPS.map((step, i) => (
              <Reveal key={step.time} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-[1.5rem] border border-ink/10 bg-paper p-7 text-center">
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-ink font-display text-lg font-light text-bronze-300">
                    {step.time}
                  </span>
                  <h4 className="mt-5 font-display text-lg font-normal text-ink">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Standing Capabilities"
            title={
              <>
                What is <span className="serif-italic text-bronze-600">always ready.</span>
              </>
            }
          />
          <div className="mt-12">
            <SubServiceGrid items={STANDING_CAPABILITIES} />
          </div>
        </div>
      </section>
    </>
  );
}
