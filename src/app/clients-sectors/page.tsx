import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SECTOR_GROUPS } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { ClientLogoGrid } from "@/components/sections/client-logo-grid";
import { CallToAction } from "@/components/sections/call-to-action";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Strategic Clients, Partners & Sectors",
  description:
    "The institutions PrimeReach serves — public sector, development and multilateral partners, knowledge and health institutions, and enterprise and creator-economy clients across Africa.",
  alternates: { canonical: "/clients-sectors" },
};

export default function ClientsSectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clients & Sectors"
        title={
          <>
            Strategic clients,{" "}
            <span className="serif-italic text-bronze-300">partners & sectors.</span>
          </>
        }
        description="The institutions PrimeReach serves and the ecosystems the company works alongside."
        image={MEDIA.pageHero.clients}
      />

      {/* Sector groups */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Ecosystems We Serve"
            title="Sectors PrimeReach works across"
            description="From governments and multilaterals to universities, health systems and the creator economy."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {SECTOR_GROUPS.map((group, i) => (
              <Reveal key={group.title} delay={(i % 2) * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-bronze/40 hover:shadow-[0_30px_60px_-30px_rgba(11,20,29,0.35)]">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-bronze to-bronze-600 transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-bronze-300 transition-colors duration-300 group-hover:bg-bronze group-hover:text-white">
                      <Icon name={group.icon} className="size-6" />
                    </span>
                    <h3 className="font-display text-xl font-normal text-ink">{group.title}</h3>
                  </div>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <Check className="mt-0.5 size-4 shrink-0 text-bronze" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos */}
      <ClientLogoGrid
        variant="grid"
        eyebrow="Strategic Clients and Partners"
        heading="Organisations we’ve worked with"
        description="A selection of the institutions, foundations and brands PrimeReach has partnered with."
      />

      <CallToAction eyebrow="Join Them" heading="Let’s Build What Matters" />
    </>
  );
}
