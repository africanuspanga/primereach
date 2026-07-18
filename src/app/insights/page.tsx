import type { Metadata } from "next";
import Image from "next/image";
import { FEATURED_INSIGHT, INSIGHTS_INDEX, NEWSLETTER } from "@/data/insights";
import {
  getBlock,
  getFeaturedInsight,
  getInsights,
  getNewsletter,
} from "@/lib/content";
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

export default async function InsightsPage() {
  const [insights, featuredData, newsletterData, indexData] = await Promise.all([
    getInsights(),
    getFeaturedInsight(),
    getNewsletter(),
    getBlock<typeof INSIGHTS_INDEX>("insights_index"),
  ]);

  const index = indexData ?? INSIGHTS_INDEX;
  const featured = (featuredData ?? FEATURED_INSIGHT) as typeof FEATURED_INSIGHT;
  const newsletter = (newsletterData ?? NEWSLETTER) as typeof NEWSLETTER;

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
        description={index.heroLede}
        image={MEDIA.pageHero.insights}
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <Reveal>
            <article className="grid overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white lg:grid-cols-[1.3fr_1fr]">
              <div className="relative min-h-[15rem] bg-ink-800 lg:order-2">
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 lg:order-1 lg:p-11">
                <span className="self-start rounded-full bg-bronze px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white">
                  {featured.tag}
                </span>
                <h2 className="font-display text-2xl font-normal leading-snug text-ink lg:text-3xl">
                  {featured.title}
                </h2>
                <p className="leading-relaxed text-muted">{featured.excerpt}</p>
                <span className="text-sm text-muted">{featured.meta}</span>
                <div className="mt-2">
                  <Button href="/insights" variant="ink">
                    {featured.cta}
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="mt-14">
            <InsightsFilter insights={insights} filters={index.filters} />
          </div>

          <NewsletterSignup content={newsletter} />
        </div>
      </section>
    </>
  );
}
