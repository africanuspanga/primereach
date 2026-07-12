import type { Metadata } from "next";
import { Check, MapPin } from "lucide-react";
import {
  CREATOR_NETWORK,
  NETWORK,
  NETWORK_STATS,
  PRESENCE,
  RAPID_DEPLOYMENT,
} from "@/data/site-content";
import type { FeatureList } from "@/types/content";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { CallToAction } from "@/components/sections/call-to-action";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ImageFrame } from "@/components/ui/image-frame";

export const metadata: Metadata = {
  title: "Nationwide Creative and Drone Network Tanzania",
  description:
    "A verified bench of 200+ photographers, videographers and TCAA-licensed drone pilots deployable across more than 26 Tanzanian regions, plus a 100+ vetted creator network.",
  alternates: { canonical: "/network" },
};

export default function NetworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Network & Reach"
        title={NETWORK.heroTitle}
        description={NETWORK.supporting}
        image={MEDIA.pageHero.network}
      >
        <div className="flex flex-wrap gap-3">
          {NETWORK.indicators.map((indicator, i) => (
            <Reveal
              key={indicator}
              delay={i * 0.05}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur-sm"
            >
              <Check className="size-4 text-bronze-300" />
              {indicator}
            </Reveal>
          ))}
        </div>
      </PageHero>

      {/* Network stats */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <StatsStrip stats={NETWORK_STATS} variant="light" columns={4} />
        </div>
      </section>

      {/* Rapid deployment */}
      <section
        id="rapid-deployment"
        className="relative scroll-mt-24 overflow-hidden bg-ink py-20 lg:py-28"
      >
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-15" />
        <div className="container-x relative">
          <SectionHeading
            onDark
            eyebrow="Rapid Deployment & On-Call Capability"
            title={
              <>
                Wherever the story breaks,{" "}
                <span className="serif-italic text-bronze-300">we’re on call.</span>
              </>
            }
          />
          <div className="mt-6 max-w-3xl space-y-4 text-white/70">
            {RAPID_DEPLOYMENT.fullCopy.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[RAPID_DEPLOYMENT.deploys, RAPID_DEPLOYMENT.testedFor, RAPID_DEPLOYMENT.benchOptions].map(
              (list: FeatureList, i) => (
                <Reveal key={list.title} delay={i * 0.08}>
                  <div className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7">
                    <span className="grid size-11 place-items-center rounded-xl bg-bronze/15 text-bronze-300">
                      <Icon name={list.icon ?? "layers"} className="size-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-normal text-white">
                      {list.title}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {list.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                          <Check className="mt-0.5 size-4 shrink-0 text-bronze-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Creator & influence network */}
      <section id="creators" className="scroll-mt-24 bg-white py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="The Creator & Influence Network"
            title={
              <>
                Africa’s vetted{" "}
                <span className="serif-italic text-bronze-600">creator economy</span>.
              </>
            }
            description={CREATOR_NETWORK.supporting}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-1">
              <div className="flex h-full flex-col rounded-[1.5rem] bg-ink p-8 text-white">
                <h3 className="font-display text-lg font-normal">Network capabilities</h3>
                <ul className="mt-5 space-y-3">
                  {CREATOR_NETWORK.stats.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                      <Check className="mt-0.5 size-4 shrink-0 text-bronze-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-2">
              <div className="flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-paper p-8">
                <h3 className="font-display text-lg font-normal text-ink">
                  Sectors served by the creator network
                </h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {CREATOR_NETWORK.sectors.map((sector) => (
                    <li key={sector} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-bronze" />
                      <span>{sector}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-6 rounded-[1.5rem] border border-ink/10 bg-white p-8">
              <h3 className="font-display text-lg font-normal text-ink">
                How creators are activated
              </h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CREATOR_NETWORK.activation.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-3 rounded-2xl border border-ink/10 bg-paper p-5"
                  >
                    <span className="font-display text-lg font-light text-bronze-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-ink/80">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Operational & geographic presence */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <Eyebrow>Operational & Geographic Presence</Eyebrow>
            <h2 className="mt-6 text-pretty font-display text-[2rem] font-light leading-[1.1] text-ink sm:text-4xl">
              {PRESENCE.heading}
            </h2>
            <div className="mt-5 space-y-4 text-muted">
              {PRESENCE.body.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {PRESENCE.markets.map((market) => (
                <li
                  key={market}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-sm font-medium text-ink"
                >
                  <MapPin className="size-3.5 text-bronze-600" />
                  {market}
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1}>
            <ImageFrame
              src={MEDIA.presence}
              alt="Aerial view of Dar es Salaam, Tanzania"
              aspect="aspect-[4/3]"
              overlay="soft"
              sizes="(max-width: 1024px) 100vw, 50vw"
            >
              <div className="flex h-full items-end p-6">
                <span className="rounded-full bg-ink/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  6 pan-African markets · HQ Dar es Salaam
                </span>
              </div>
            </ImageFrame>
          </Reveal>
        </div>
      </section>

      <CallToAction
        eyebrow="Deploy With PrimeReach"
        heading="Need Coverage On the Ground?"
        copy="From breaking news to ministerial summits, PrimeReach mobilises crews, drones and creators across Tanzania and the region."
      />
    </>
  );
}
