import type { Insight } from "@/types/content";
import { MEDIA } from "@/lib/images";

/* ==========================================================================
   Insights — editorial pieces, research reports, newsroom updates, and event
   coverage from the PrimeReach editorial desk.
   ========================================================================== */

export const INSIGHTS_INDEX = {
  heroTitle: "Articles, reports, news, and events.",
  heroLede:
    "Editorial pieces, research reports, newsroom updates, and event coverage from the PrimeReach editorial desk.",
  filters: ["All", "Articles", "Reports", "News", "Events"] as const,
};

export const FEATURED_INSIGHT = {
  tag: "Featured Article",
  title: "The institutional case for a vetted creator infrastructure in East Africa.",
  excerpt:
    "Why the next generation of brand, government, and multilateral communication in East Africa will run through a governed creator layer, and what that operating model looks like inside TCMA.",
  meta: "By the PrimeReach Editorial Desk · 08 July 2026 · 9 min read",
  cta: "Read the article",
  image: MEDIA.gallery[8],
} as const;

export const INSIGHTS: Insight[] = [
  {
    type: "Report",
    title:
      "Africa Drone Economy 2026. Where the value pools sit and what regulators are doing about them.",
    meta: "01 July 2026 · Download PDF",
    image: MEDIA.techGallery[3],
  },
  {
    type: "News",
    title:
      "PrimeReach announced as media partner for the African Investment Trade Forum 2026.",
    meta: "28 June 2026",
    image: MEDIA.gallery[5],
  },
  {
    type: "Event",
    title: "Data Tamasha Africa 2026. Programme and PrimeReach speaker line-up announced.",
    meta: "22 July 2026",
    image: MEDIA.techGallery[6],
  },
  {
    type: "Article",
    title:
      "An editorial standard for African newsrooms adopting generative AI in production.",
    meta: "14 June 2026 · 7 min read",
    image: MEDIA.gallery[6],
  },
  {
    type: "Article",
    title:
      "Field notes from Creator Safari 2026. Ten days, four regions, one production standard.",
    meta: "02 June 2026 · 11 min read",
    image: MEDIA.gallery[1],
  },
  {
    type: "Report",
    title: "Tanzania Creator Economy 2026. A benchmark study of scale, sectors, and money.",
    meta: "20 May 2026 · Download PDF",
    image: MEDIA.gallery[3],
  },
];

/** Three-item teaser used on the home page. */
export const INSIGHTS_TEASER: Insight[] = [
  {
    type: "Article",
    title:
      "The institutional case for a vetted creator infrastructure in East Africa.",
    meta: "08 July 2026 · 9 min read",
    image: MEDIA.gallery[8],
  },
  {
    type: "Report",
    title:
      "Africa Drone Economy 2026. Where the value pools sit and what regulators are doing about them.",
    meta: "01 July 2026 · Downloadable PDF",
    image: MEDIA.techGallery[3],
  },
  {
    type: "News",
    title:
      "PrimeReach announced as media partner for the African Investment Trade Forum 2026.",
    meta: "28 June 2026 · Newsroom",
    image: MEDIA.gallery[5],
  },
];

export const NEWSLETTER = {
  eyebrow: "Stay Informed",
  title: "Subscribe to the PrimeReach dispatch.",
  copy: "Monthly, no more than one email. Editorial, research, and programme updates from the PrimeReach desk.",
} as const;
