import type { Metadata } from "next";
import Image from "next/image";
import { FEATURED_PROJECTS } from "@/data/impact";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { CallToAction } from "@/components/sections/call-to-action";
import { ImpactTabs } from "@/components/impact/impact-tabs";

export const metadata: Metadata = {
  title: "Featured Projects | Impact",
  description:
    "A gallery of production, event coverage, and campaign work delivered across the last twelve months.",
  alternates: { canonical: "/impact/featured-projects" },
};

const ASPECTS = ["aspect-[4/3]", "aspect-[4/5]", "aspect-[16/10]"];

export default function FeaturedProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Featured Projects"
        title={
          <>
            Selected <span className="serif-italic text-bronze-300">visual work.</span>
          </>
        }
        description="A gallery of production, event coverage, and campaign work delivered across the last twelve months."
        image={MEDIA.pageHero.impact}
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <ImpactTabs />
          <div className="mt-12 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
            {FEATURED_PROJECTS.map((project, i) => (
              <figure
                key={project.title}
                className="group mb-5 break-inside-avoid overflow-hidden rounded-[1.25rem] border border-ink/10 bg-white"
              >
                <div className={`relative overflow-hidden bg-ink-800 ${ASPECTS[i % ASPECTS.length]}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <strong className="block font-display text-base font-normal text-ink">
                    {project.title}
                  </strong>
                  <span className="mt-1 block text-sm text-muted">{project.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CallToAction eyebrow="Start a Brief" heading="Bring us your next production." />
    </>
  );
}
