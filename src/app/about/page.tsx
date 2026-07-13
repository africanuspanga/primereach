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
    "We are the strategic communication, media, and technology group behind some of East Africa's most consequential campaigns — three operating wings, one accountable team.",
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

      {/* The Company */}
      <section id="company" className="scroll-mt-28 bg-white py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={ABOUT.companyEyebrow}
              title={
                <>
                  The company behind the{" "}
                  <span className="serif-italic text-bronze-600">campaigns.</span>
                </>
              }
            />
          </div>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted">
            {ABOUT.company.map((para, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p
                  className={
                    i === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:font-light first-letter:leading-[0.7] first-letter:text-bronze-600"
                      : undefined
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission-vision" className="scroll-mt-28 bg-paper py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow={ABOUT.mvEyebrow}
            title={
              <>
                Mission &amp; <span className="serif-italic text-bronze-600">Vision.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-ink/10 border-l-4 border-l-bronze bg-white p-8 lg:p-11">
                <Eyebrow>{ABOUT.mission.kicker}</Eyebrow>
                <h3 className="mt-5 font-display text-2xl font-light text-ink">
                  {ABOUT.mission.heading}
                </h3>
                <p className="mt-4 font-display text-lg font-light italic leading-relaxed text-ink/80">
                  {ABOUT.mission.body}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ink-900 p-8 text-white lg:p-11">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full opacity-30 blur-3xl"
                  style={{ background: "radial-gradient(circle,#b87c42,transparent 70%)" }}
                />
                <Eyebrow onDark>{ABOUT.vision.kicker}</Eyebrow>
                <h3 className="mt-5 font-display text-2xl font-light text-white">
                  {ABOUT.vision.heading}
                </h3>
                <p className="mt-4 font-display text-lg font-light italic leading-relaxed text-white/80">
                  {ABOUT.vision.body}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section id="values" className="scroll-mt-28 bg-white py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow={ABOUT.valuesEyebrow}
            title={
              <>
                Our core <span className="serif-italic text-bronze-600">values.</span>
              </>
            }
            description={ABOUT.valuesDescription}
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, i) => (
              <Reveal
                key={value.title}
                delay={(i % 3) * 0.05}
                className="group flex flex-col bg-white p-8 transition-colors duration-300 hover:bg-paper"
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-sm font-light tracking-[0.2em] text-bronze-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-11 place-items-center rounded-xl bg-paper-dim text-bronze-600 transition-colors duration-300 group-hover:bg-ink group-hover:text-bronze-300">
                    <Icon name={value.icon} className="size-5" />
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-normal text-ink">
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

      {/* Our Journey */}
      <section id="journey" className="scroll-mt-28 bg-paper py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow={ABOUT.journeyEyebrow}
            title={ABOUT.journeyTitle}
            description={ABOUT.journeyDescription}
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

      <CallToAction
        eyebrow={ABOUT.closing.eyebrow}
        heading={ABOUT.closing.heading}
        copy={ABOUT.closing.copy}
      />
    </>
  );
}
