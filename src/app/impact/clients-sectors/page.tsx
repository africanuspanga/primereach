import type { Metadata } from "next";
import Image from "next/image";
import { CLIENT_ROSTER, IMPACT_SECTORS } from "@/data/impact";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { CallToAction } from "@/components/sections/call-to-action";
import { ImpactTabs } from "@/components/impact/impact-tabs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Clients & Sectors | Impact",
  description:
    "Six sectors, one operating standard. From national government to the emerging creator economy.",
  alternates: { canonical: "/impact/clients-sectors" },
};

export default function ClientsSectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clients & Sectors"
        title={
          <>
            Who we <span className="serif-italic text-bronze-300">serve.</span>
          </>
        }
        description="Six sectors, one operating standard. From national government to the emerging creator economy."
        image={MEDIA.pageHero.clients}
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <ImpactTabs />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT_SECTORS.map((sector, i) => (
              <Reveal key={sector.title} delay={(i % 3) * 0.05} className="h-full">
                <div className="group flex h-full flex-col rounded-[1.5rem] border border-ink/10 border-t-[3px] border-t-ink/15 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-t-bronze hover:shadow-[0_24px_50px_-36px_rgba(11,20,29,0.5)]">
                  <h3 className="font-display text-xl font-normal text-ink">{sector.title}</h3>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-muted">
                    {sector.description}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-bronze-600">
                    {sector.count}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20">
            <SectionHeading
              align="center"
              eyebrow="The Client Roster"
              title={
                <>
                  Institutions <span className="serif-italic text-bronze-600">we serve.</span>
                </>
              }
            />
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {CLIENT_ROSTER.map((client, i) => (
                <Reveal
                  key={`${client.name}-${i}`}
                  delay={(i % 6) * 0.04}
                  title={client.name}
                  className="flex h-24 items-center justify-center rounded-2xl border border-ink/8 bg-white px-4 transition-colors duration-300 hover:border-bronze/30"
                >
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={150}
                      height={56}
                      className="max-h-12 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-center font-display text-sm font-normal text-ink">
                      {client.name}
                    </span>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CallToAction eyebrow="Work With Us" heading="Join the institutions we serve." />
    </>
  );
}
