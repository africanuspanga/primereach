import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSolutions, getHome } from "@/lib/content";
import { SOLUTIONS } from "@/data/solutions";
import { HOME } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export async function SolutionsGrid({
  withHeading = true,
  className = "bg-white py-20 lg:py-28",
}: {
  withHeading?: boolean;
  className?: string;
}) {
  const [solutions, home] = await Promise.all([getSolutions(), getHome()]);
  const data = (home as typeof HOME | null) ?? HOME;

  return (
    <section className={className}>
      <div className="container-x">
        {withHeading && (
          <SectionHeading
            align="center"
            eyebrow={data.solutions.eyebrow}
            title={
              <>
                Six solutions.{" "}
                <span className="serif-italic text-bronze-600">One accountable partner.</span>
              </>
            }
            description={data.solutions.description}
          />
        )}
        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${withHeading ? "mt-14" : ""}`}>
          {(solutions.length > 0 ? solutions : SOLUTIONS).map((solution, i) => (
            <Reveal key={solution.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={solution.href}
                className="group flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-bronze/40 hover:bg-white hover:shadow-[0_30px_60px_-40px_rgba(11,20,29,0.5)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-light text-bronze/50">
                    {solution.number}
                  </span>
                  <span className="grid size-11 place-items-center rounded-full bg-ink text-bronze-300 transition-colors duration-300 group-hover:bg-bronze group-hover:text-white">
                    <Icon name={solution.icon} className="size-5" />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-normal text-ink">
                  {solution.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                  {solution.cardDescription}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-bronze-600">
                  Explore
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
