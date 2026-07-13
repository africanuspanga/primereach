import type {
  CaseStudy,
  FeaturedProject,
  ImpactSector,
  RosterClient,
  Testimonial,
} from "@/types/content";
import { MEDIA } from "@/lib/images";

/* ==========================================================================
   Impact — case studies, featured projects, clients & sectors, testimonials.
   ========================================================================== */

/** Richer cards shown on the Impact index. */
export const CASE_STUDIES_FEATURED: CaseStudy[] = [
  {
    sector: "Corporate · Media",
    client: "DStv",
    title: "How DStv launched its Tanzania premium sports proposition through PrimeReach.",
    summary:
      "An eight-week campaign combining creator activation, executive interviews, and pan-market distribution.",
    image: MEDIA.gallery[0],
  },
  {
    sector: "University · Health",
    client: "Muhimbili University",
    title: "Translating a decade of health research into a public communication programme.",
    summary: "Editorial design, film production, and executive-briefing programme for MUHAS.",
    image: MEDIA.gallery[7],
  },
  {
    sector: "Development",
    client: "Stichting DOEN",
    title: "Fieldwork across Tanzania, Kenya, and Uganda for a foundation's next-cycle strategy.",
    summary:
      "Mixed-methods research and film production across three countries in twelve weeks.",
    image: MEDIA.gallery[2],
  },
  {
    sector: "Government · Housing",
    client: "National Housing Corporation",
    title: "Refreshing the visual identity and executive presence of a national housing agency.",
    summary:
      "Brand refresh, executive photography, and a national campaign for the Corporation.",
    image: MEDIA.gallery[3],
  },
  {
    sector: "Government · Insurance",
    client: "Tanzania Insurance Regulatory Authority",
    title: "Producing the sector's flagship annual report to institutional standard.",
    summary: "Editorial, design, and photography programme for the TIRA annual publication.",
    image: MEDIA.gallery[4],
  },
  {
    sector: "Investment",
    client: "CI Ventures",
    title: "A portfolio film capturing five ventures across four East African countries.",
    summary:
      "Location production, executive interviews, and a launch-ready portfolio narrative.",
    image: MEDIA.gallery[8],
  },
];

/** Condensed cards for the Case Studies listing page. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    sector: "Corporate",
    client: "DStv Tanzania",
    title: "An eight-week integrated launch across creator, editorial, and executive channels.",
    image: MEDIA.gallery[0],
  },
  {
    sector: "University",
    client: "Muhimbili University",
    title: "Publication of a decade of health research for a general audience.",
    image: MEDIA.gallery[7],
  },
  {
    sector: "Development",
    client: "Stichting DOEN",
    title: "Multi-country research and film across three East African markets.",
    image: MEDIA.gallery[2],
  },
  {
    sector: "Government",
    client: "NHC",
    title: "Visual and communication refresh for a national housing institution.",
    image: MEDIA.gallery[3],
  },
  {
    sector: "Government",
    client: "TIRA",
    title: "Sector annual report to institutional publishing standard.",
    image: MEDIA.gallery[4],
  },
  {
    sector: "Investment",
    client: "CI Ventures",
    title: "Portfolio film capturing five ventures across four countries.",
    image: MEDIA.gallery[8],
  },
];

export const CASE_STUDY_FILTERS = [
  "All",
  "Government",
  "Development",
  "University",
  "Corporate",
  "Health",
  "Creator Economy",
] as const;

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: "Anchor Foundation Gala 2026",
    caption: "Event production · 8-camera film · livestream",
    image: MEDIA.gallery[0],
  },
  {
    title: "Ardhi University Aerial Series",
    caption: "Drone cinematography · 4K aerial photography",
    image: MEDIA.techGallery[3],
  },
  {
    title: "DStv Executive Portrait Series",
    caption: "Studio photography · corporate identity",
    image: MEDIA.gallery[5],
  },
  {
    title: "MUHAS Public Health Documentary",
    caption: "Long-form film · broadcast delivery",
    image: MEDIA.gallery[7],
  },
  {
    title: "Creator Safari 2026",
    caption: "Multi-week production · TCMA activation",
    image: MEDIA.gallery[1],
  },
  {
    title: "NHC National Campaign",
    caption: "Photography · film · national rollout",
    image: MEDIA.gallery[3],
  },
  {
    title: "Mustardseed Trust Beneficiary Portrait Series",
    caption: "Documentary photography",
    image: MEDIA.gallery[8],
  },
  {
    title: "Women in Ocean Food Editorial",
    caption: "Editorial design · long-form publication",
    image: MEDIA.gallery[6],
  },
  {
    title: "TIRA Insurance Summit",
    caption: "Livestream · event production · delegate video",
    image: MEDIA.techGallery[5],
  },
];

export const IMPACT_SECTORS: ImpactSector[] = [
  {
    title: "Government & Public Agencies",
    description:
      "Ministries, regulatory authorities, parastatals, and public agencies working at national and regional scale.",
    count: "18+ engagements",
  },
  {
    title: "Development & Multilateral",
    description:
      "Foundations, bilateral donors, and multilateral bodies commissioning research, evaluation, and communication.",
    count: "22+ engagements",
  },
  {
    title: "Universities & Research",
    description:
      "Academic institutions building their research communication, publication, and public-engagement capability.",
    count: "14+ engagements",
  },
  {
    title: "Health",
    description:
      "Health regulators, hospitals, and research institutions communicating on health topics to public audiences.",
    count: "9+ engagements",
  },
  {
    title: "Enterprise & Corporate",
    description:
      "Listed and private corporates building brand, reputation, event, and integrated communication programmes.",
    count: "27+ engagements",
  },
  {
    title: "Creator Economy",
    description:
      "Creators, agencies, and brands using our TCMA infrastructure for creator activation at scale.",
    count: "100+ creators",
  },
];

export const CLIENT_ROSTER: RosterClient[] = [
  { name: "DStv", logo: "/clients/dstv.png" },
  { name: "University of Toronto", logo: "/clients/university-of-toronto.png" },
  { name: "MUHAS", logo: "/clients/muhas.png" },
  { name: "Ardhi University", logo: "/clients/ardhi-university.png" },
  { name: "CI Ventures", logo: "/clients/ci-ventures.png" },
  { name: "Stichting DOEN", logo: "/clients/doen-postcode-loterij.png" },
  { name: "Anchor Foundation", logo: "/clients/anchor-foundation.png" },
  { name: "Women in Ocean Food", logo: "/clients/women-in-ocean-food.png" },
  { name: "Mustardseed Trust", logo: "/clients/mustardseed-trust.png" },
  { name: "TIRA", logo: "/clients/tira.png" },
  { name: "NHC", logo: "/clients/nhc.png" },
  { name: "Postcode Loterij", logo: "/clients/doen-postcode-loterij.png" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "PrimeReach handled our national campaign with the discipline of a government contractor and the polish of a broadcast studio. That combination is unusually hard to find in this market.",
    initials: "MK",
    role: "Managing Director",
    org: "National Housing Corporation",
  },
  {
    quote:
      "Our research needed to reach both a peer-reviewed audience and a public one, at the same time, without contradicting itself. The PrimeReach team produced both cuts and made it look effortless.",
    initials: "DR",
    role: "Director of Research",
    org: "Muhimbili University of Health and Allied Sciences",
  },
  {
    quote:
      "They arrived when they said they would, filmed what they said they would film, and delivered on the timeline we agreed. In a three-country fieldwork programme, that reliability was the difference between a good report and a completed one.",
    initials: "SL",
    role: "Programme Lead",
    org: "Stichting DOEN",
  },
  {
    quote:
      "Our brief was ambiguous. The team reframed it, wrote back within a week with a scoped proposal, and executed inside the number we agreed. That is a professional operator.",
    initials: "JN",
    role: "Head of Communications",
    org: "CI Ventures",
  },
];

export const IMPACT_INDEX = {
  heroTitle: "Where we have shown up, and what we left behind.",
  heroLede:
    "Case studies, featured projects, clients and sectors, and the words of the institutions we serve.",
  closing: {
    eyebrow: "Let's Add Yours",
    heading: "What could your case study look like.",
    copy: "Talk to us about the outcome you want to document. We will design a programme worth writing about.",
    primary: { label: "Contact PrimeReach", href: "/contact" },
  },
} as const;
