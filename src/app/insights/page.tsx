import type { Metadata } from "next";
import Image from "next/image";
import { FEATURED_INSIGHT, INSIGHTS_INDEX } from "@/data/insights";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { InsightsFilter } from "@/components/insights/insights-filter";
import { NewsletterSignup } from "@/components/insights/newsletter-signup";

export const metadata: Metadata = {
  title: "Insights | Articles, Reports, News & Events",
  description: INSIGHTS_INDEX.heroLede,
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Articles, reports,{" "}
            <span className="serif-italic text-bronze-300">news, and events.</span>
          </>
        }
        description={INSIGHTS_INDEX.heroLede}
        image={MEDIA.pageHero.insights}
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <Reveal>
            <article className="grid overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white lg:grid-cols-[1.3fr_1fr]">
              <div className="relative min-h-[15rem] bg-ink-800 lg:order-2">
                {FEATURED_INSIGHT.image && (
                  <Image
                    src={FEATURED_INSIGHT.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 lg:order-1 lg:p-11">
                <span className="self-start rounded-full bg-bronze px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white">
                  {FEATURED_INSIGHT.tag}
                </span>
                <h2 className="font-display text-2xl font-normal leading-snug text-ink lg:text-3xl">
                  {FEATURED_INSIGHT.title}
                </h2>
                <p className="leading-relaxed text-muted">{FEATURED_INSIGHT.excerpt}</p>
                <span className="text-sm text-muted">{FEATURED_INSIGHT.meta}</span>
                <div className="mt-2">
                  <Button href="/insights" variant="ink">
                    {FEATURED_INSIGHT.cta}
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="mt-14">
            <InsightsFilter />
          </div>

          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
