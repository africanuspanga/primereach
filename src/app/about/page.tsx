import type { Metadata } from "next";
import { ABOUT, CORE_VALUES, TIMELINE } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { Timeline } from "@/components/sections/timeline";
import { CallToAction } from "@/components/sections/call-to-action";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ImageFrame } from "@/components/ui/image-frame";

export const metadata: Metadata = {
  title: "About PrimeReach | Integrated African Digital Infrastructure",
  description:
    "PrimeReach operates at the intersection of strategic communication, technology, research, media production and emerging digital systems — building the systems through which African institutions speak, persuade and lead.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About PrimeReach"
        title={ABOUT.pageHeroTitle}
        description={ABOUT.pageHeroSupporting}
        image={MEDIA.pageHero.about}
      />

      {/* Full introduction */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Who We Are" title={ABOUT.previewHeading} />
          </div>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted">
            {ABOUT.intro.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{para}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <figure className="border-l-2 border-bronze pl-6">
                <blockquote className="font-display text-xl font-light italic text-ink">
                  {ABOUT.featuredStatement}
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal id="vision" className="scroll-mt-28">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ink-900 p-8 text-white lg:p-11">
              <div
                className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full opacity-30 blur-3xl"
                style={{ background: "radial-gradient(circle,#b87c42,transparent 70%)" }}
              />
              <Eyebrow onDark>Our Vision</Eyebrow>
              <h2 className="mt-6 font-display text-3xl font-light">{ABOUT.vision.heading}</h2>
              <div className="mt-5 space-y-4 text-white/70">
                {ABOUT.vision.body.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal id="mission" delay={0.08} className="scroll-mt-28">
            <div className="flex h-full flex-col rounded-[1.75rem] border border-ink/10 bg-white p-8 lg:p-11">
              <Eyebrow>Our Mission</Eyebrow>
              <h2 className="mt-6 font-display text-3xl font-light text-ink">
                {ABOUT.mission.heading}
              </h2>
              <div className="mt-5 space-y-4 text-muted">
                {ABOUT.mission.body.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="What Guides Us"
            title={
              <>
                Our core <span className="serif-italic text-bronze-600">values</span>.
              </>
            }
            description="The principles that govern every mandate PrimeReach accepts."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((value, i) => (
              <Reveal
                key={value.title}
                delay={(i % 4) * 0.05}
                className="group flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-paper"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-paper-dim text-bronze-600 transition-colors duration-300 group-hover:bg-ink group-hover:text-bronze-300">
                  <Icon name={value.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-normal text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section id="journey" className="scroll-mt-28 bg-paper py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Our Journey"
            title={ABOUT.journeySubtitle}
          />
          <div className="mt-14">
            <Timeline entries={TIMELINE} />
          </div>
        </div>
      </section>

      {/* Presence media band */}
      <section className="bg-white pb-8 pt-4 lg:pb-12">
        <div className="container-x">
          <ImageFrame
            src={MEDIA.aboutWide}
            alt="Dar es Salaam waterfront skyline"
            aspect="aspect-[21/9]"
            sizes="100vw"
            overlay="soft"
          />
        </div>
      </section>

      <CallToAction eyebrow="Partner With Us" />
    </>
  );
}
