import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_WINGS, SERVICE_WING_DETAILS } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { CallToAction } from "@/components/sections/call-to-action";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ImageFrame } from "@/components/ui/image-frame";
import { Icon } from "@/components/ui/icon";
import { ServiceCategoryCard } from "@/components/services/service-category-card";

/** Full detail template shared by all three service-wing routes. */
export function ServiceWingPage({ slug }: { slug: string }) {
  const wing = SERVICE_WING_DETAILS[slug];
  if (!wing) notFound();

  const others = SERVICE_WINGS.filter((w) => w.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={wing.eyebrow}
        title={wing.heroTitle}
        description={wing.intro}
        image={MEDIA.wings[slug]}
      >
        {wing.positioningLine && (
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-sm">
              <Icon name={wing.icon} className="size-4 text-bronze-300" />
              {wing.positioningLine}
            </span>
          </Reveal>
        )}
      </PageHero>

      {/* Intro band with feature image */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SectionHeading
            eyebrow="Capability Overview"
            title={
              <>
                What this wing{" "}
                <span className="serif-italic text-bronze-600">delivers</span>.
              </>
            }
            description={wing.intro}
          />
          <Reveal delay={0.1}>
            <ImageFrame
              src={MEDIA.wings[slug]}
              alt={`${wing.title} in action`}
              aspect="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Category cards */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Service Areas"
            title="Specialised capability areas"
            description={`${wing.categories.length} focused areas within ${wing.title}.`}
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {wing.categories.map((category, i) => (
              <Reveal key={category.title} delay={(i % 2) * 0.06}>
                <ServiceCategoryCard category={category} icon={wing.icon} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links to the other wings */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <p className="eyebrow text-bronze-600">Explore the Other Wings</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={other.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-paper p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze/40 hover:bg-white"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-bronze-300 transition-colors group-hover:bg-bronze group-hover:text-white">
                    <Icon name={other.icon} className="size-6" />
                  </span>
                  <span className="font-display text-lg font-normal text-ink">
                    {other.title}
                  </span>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bronze-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CallToAction eyebrow="Ready to Begin" heading="Let’s Build What Matters" />
    </>
  );
}
