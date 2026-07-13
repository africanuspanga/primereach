import type { Programme, SubService } from "@/types/content";

/* ==========================================================================
   Flagship Programmes — initiatives PrimeReach builds and stewards under its
   own name, alongside client engagements.
   ========================================================================== */

export const PROGRAMMES_INDEX = {
  heroTitle: "The programmes we own and steward.",
  heroLede:
    "The initiatives PrimeReach builds and carries under its own name, alongside client engagements.",
};

export const PROGRAMMES: Programme[] = [
  {
    slug: "tcma",
    title: "Tanzania Creative Market Access, TCMA.",
    status: "live",
    statusLabel: "Live",
    description:
      "The operating system for Tanzania's creator economy. TCMA vets and onboards creators, builds campaign infrastructure, handles contracts and distribution, and trains talent on brand-safety, editorial standards, and the business of the modern creator economy. It is our flagship, and it now serves both brand and institutional clients across East Africa.",
    stats: [
      { value: "200+", label: "Vetted Creators" },
      { value: "6", label: "Regional Hubs" },
      { value: "12+", label: "Sector Niches" },
      { value: "2026", label: "Launched" },
    ],
    cta: { label: "Explore TCMA", href: "/programmes/tcma", variant: "primary" },
  },
  {
    title: "DiraEdu.",
    status: "pilot",
    statusLabel: "Piloting",
    description:
      "An education programme designed to bring digital literacy, creator-economy, and applied-AI curricula into East African tertiary institutions. Currently piloting with three partner universities. Full launch scheduled for the 2027 academic year.",
    stats: [
      { value: "3", label: "Pilot Universities" },
      { value: "2027", label: "Full Launch" },
      { value: "Tertiary", label: "Programme Level" },
    ],
    cta: { label: "See future programmes", href: "/programmes/future", variant: "ink" },
  },
  {
    title: "Creator Safari.",
    status: "live",
    statusLabel: "Live",
    description:
      "A recurring PrimeReach production programme that mobilises TCMA creators to document Tanzanian tourism, conservation, and heritage sites for brand, government, and destination-marketing clients. In-market since 2025.",
    stats: [
      { value: "4", label: "Editions Delivered" },
      { value: "12+", label: "Sites Documented" },
    ],
    cta: { label: "Read about Creator Safari", href: "/programmes/future", variant: "ghost" },
  },
  {
    title: "Tangaza (in development).",
    status: "dev",
    statusLabel: "In Development",
    description:
      "PrimeReach's forthcoming clipping-agency vertical, adapting the global clipping-and-content-rewards model for the East African creator ecosystem. Full public roll-out targeted for the second half of 2026.",
    cta: {
      label: "Learn more when it launches",
      href: "/programmes/future",
      variant: "ghost",
    },
  },
];

/* ---------- TCMA detail ---------- */

export const TCMA = {
  heroTitle: "Tanzania Creative Market Access.",
  heroTagline:
    "The operating system for Tanzania's creator economy. Vetted creators. Institutional-grade infrastructure. Real audience results.",
  whatIs: {
    eyebrow: "What TCMA Is",
    title: "A single operating layer for brands, creators, and institutions.",
    description:
      "TCMA vets and onboards creators, builds campaign infrastructure, handles contracts and distribution, and trains talent on brand safety and the business of the modern creator economy. Brands get audience-verified reach without friction. Creators get institutional-grade opportunities without giving up their voice.",
  },
  pillars: [
    {
      title: "The Creator Bench",
      description:
        "200+ vetted creators across 12 niches. Each one has passed our editorial standard, brand-safety check, and NDA.",
    },
    {
      title: "Campaign Infrastructure",
      description:
        "Briefs, contracts, production oversight, publishing calendar, and reporting delivered on institutional templates.",
    },
    {
      title: "Training & Certification",
      description:
        "A rolling curriculum for creators on editorial standards, tax compliance, and the business of long-term creator work.",
    },
    {
      title: "Distribution",
      description:
        "Pan-Tanzania and pan-African distribution partnerships with owned and partnered channels.",
    },
  ] satisfies SubService[],
  engage: {
    eyebrow: "Two Ways to Engage",
    title: "Join the bench, or launch a campaign.",
    bench: {
      title: "Join the Bench",
      description:
        "Creators, agencies, and independent professionals can apply to join the TCMA Bench. Applications open twice a year.",
      cta: { label: "Apply to TCMA", href: "/contact" },
    },
    campaign: {
      title: "Launch a Campaign",
      description:
        "Brands and institutions can commission TCMA activations, custom creator programmes, or long-standing content-partner arrangements.",
      cta: { label: "Talk to TCMA business", href: "/contact" },
    },
  },
} as const;

/* ---------- Future programmes ---------- */

export const FUTURE_INDEX = {
  heroTitle: "What is coming next.",
  heroLede:
    "Programmes on our roadmap. Some are piloting, some are in build, all will carry the PrimeReach operating standard on launch.",
};

export const FUTURE_PROGRAMMES: Programme[] = [
  {
    title: "DiraEdu.",
    status: "pilot",
    statusLabel: "Piloting",
    description:
      "Curriculum, training programmes, and partnership operations designed to bring digital literacy, creator-economy business, and applied-AI content into East African tertiary institutions.",
  },
  {
    title: "Tangaza.",
    status: "dev",
    statusLabel: "In Development",
    description:
      "A clipping-agency vertical adapting global content-rewards and clipping models for East African creators and brands. First cohort scheduled for late 2026.",
  },
  {
    title: "Sauti ya Mazingira.",
    status: "dev",
    statusLabel: "In Development",
    description:
      "An environmental-storytelling editorial programme, in partnership with sector NGOs, foundations, and journalism partners. Editorial launch scheduled for 2027.",
  },
];
