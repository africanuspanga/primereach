import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS, getSolution } from "@/data/solutions";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { SubServiceGrid } from "@/components/sections/sub-service-grid";
import { ClosingCtaSection } from "@/components/sections/closing-cta";

/** Shared detail template for all six solution routes. */
export function SolutionDetail({ slug }: { slug: string }) {
  const solution = getSolution(slug);
  if (!solution) notFound();

  const others = SOLUTIONS.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={`Solution ${solution.number}`}
        title={solution.title}
        description={solution.heroTagline}
        image={MEDIA.solutions[slug]}
      />

      {/* What we deliver */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Deliver"
            title={
              <>
                The specific work <span className="serif-italic text-bronze-600">we do.</span>
              </>
            }
            description={solution.deliverIntro}
          />
          <div className="mt-12">
            <SubServiceGrid items={solution.subServices} />
          </div>
        </div>
      </section>

      {/* Engagement approach (optional) */}
      {solution.approach && (
        <section className="bg-paper py-20 lg:py-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="How We Work"
              title={
                <>
                  Our engagement{" "}
                  <span className="serif-italic text-bronze-600">approach.</span>
                </>
              }
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {solution.approach.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-[1.5rem] border border-ink/10 bg-white p-8">
                    <span className="font-display text-5xl font-light leading-none text-bronze/40">
                      {step.number}
                    </span>
                    <h4 className="mt-5 font-display text-xl font-normal text-ink">
                      {step.title}
                    </h4>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-links to other solutions */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <p className="eyebrow text-bronze-600">Explore Other Solutions</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={other.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-paper p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze/40 hover:bg-white"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink text-bronze-300 transition-colors group-hover:bg-bronze group-hover:text-white">
                    <Icon name={other.icon} className="size-5" />
                  </span>
                  <span className="font-display text-[0.98rem] font-normal text-ink">
                    {other.title}
                  </span>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bronze-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCtaSection cta={solution.closing} />
    </>
  );
}
