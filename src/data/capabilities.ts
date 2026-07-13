import type {
  Capability,
  ClosingCta,
  DeployStep,
  RegionCoverage,
  SubService,
} from "@/types/content";

/* ==========================================================================
   Capabilities — the operational muscle behind every project. Five
   capabilities, each with a detail page. Network and Rapid Deployment use
   bespoke detail renderers (regional coverage / deployment timeline).
   ========================================================================== */

export const CAPABILITIES: Capability[] = [
  {
    slug: "technology",
    number: "01",
    title: "Technology",
    href: "/capabilities/technology",
    icon: "cpu",
    summary:
      "Cameras, drones, servers, cloud, and the software licences that keep them running.",
    summaryHome: "Enterprise systems, cloud, hardware, and the emerging-tech stack.",
    heroTitle: "Technology.",
    heroTagline:
      "Enterprise systems, cloud, hardware, and the authorised partnerships that keep everything running.",
    bodyHeading: "Institutional-grade in every layer.",
    bodyCopy:
      "PrimeReach maintains one of the most complete production, cloud, and enterprise-tech stacks in East Africa. We are an authorised dealer for the world's leading brands in each category, and we hold the operator licences that many clients would otherwise need to acquire themselves.",
    bullets: [
      "Cinema cameras: Sony FX9, Canon C500 II, Blackmagic URSA Mini Pro 12K",
      "Drone fleet: DJI Inspire 3, Mavic 3 Enterprise, Matrice 350 RTK",
      "Enterprise cloud partners: Microsoft, AWS, Google Cloud",
      "Software: Microsoft CSP, Adobe Creative Cloud Enterprise, Canva Enterprise",
      "Surveillance and physical security: Hikvision authorised",
      "Hardware supply: Dell, HP, Lenovo enterprise tier",
      "AI stack: OpenAI, Anthropic Claude, Google Vertex AI, on-premise deployments",
    ],
    visualLabel: "Certifications. Warranties. Support.",
    variant: "list",
  },
  {
    slug: "creative-studio",
    number: "02",
    title: "Creative Studio",
    href: "/capabilities/creative-studio",
    icon: "clapperboard",
    summary:
      "Full production, editing, colour grade, sound design, and finishing on premises.",
    summaryHome: "Cameras, crews, edit bays, sound, and colour finishing.",
    heroTitle: "Creative Studio.",
    heroTagline:
      "Cameras, crews, edit bays, sound suite, colour finishing. Production end to end, on premises.",
    bodyHeading: "Production, editorial, finishing.",
    bodyCopy:
      "Our studio floor supports every stage of a modern content operation, from concept and directing through shoot days and post-production. Everything is under one roof, which means faster iteration, tighter creative direction, and no hand-off losses.",
    bullets: [
      "Two shoot stages with controlled lighting rigs",
      "Four editorial bays: Adobe, Final Cut, DaVinci Resolve",
      "Colour finishing with calibrated reference monitor",
      "Sound recording booth and 5.1 mix suite",
      "Motion graphics and animation team",
      "On-site photography studio",
    ],
    visualLabel: "Concept. Shoot. Post.",
    variant: "list",
  },
  {
    slug: "research",
    number: "03",
    title: "Research",
    href: "/capabilities/research",
    icon: "search",
    summary:
      "Mixed-methods research team, MEAL specialists, and publication production capability.",
    summaryHome: "MEAL, sector research, insight production, publication grade.",
    heroTitle: "Research.",
    heroTagline:
      "A mixed-methods research team supporting MEAL, sector research, and publication production for institutional clients.",
    bodyHeading: "Evidence-led, publication-ready.",
    bodyCopy:
      "Our research practice sits between traditional consultancy and academic research. We produce work that would meet a donor review, a peer publication, or a boardroom without needing translation.",
    bullets: [
      "Mixed-methods team: quantitative and qualitative researchers",
      "MEAL specialists with donor-standard frameworks",
      "Software: SPSS, Stata, R, Python, NVivo, ATLAS.ti",
      "In-country fieldwork teams across six markets",
      "Editorial and publication production for reports",
    ],
    visualLabel: "Data. Fieldwork. Publication.",
    variant: "list",
  },
  {
    slug: "network",
    number: "04",
    title: "Network",
    href: "/capabilities/network",
    icon: "network",
    summary:
      "200+ photographers, videographers, and drone pilots. 100+ vetted creators.",
    summaryHome: "200+ creators and 100+ influencers, pan-African reach.",
    heroTitle: "The nationwide network.",
    heroTagline:
      "200+ photographers, videographers, and drone pilots. 100+ vetted content creators. Deployable in every Tanzanian region.",
    bodyHeading: "Deployable in every Tanzanian region.",
    bodyCopy:
      "A verified bench of photographers, videographers, and drone pilots, backed by 100+ vetted content creators, positioned across the country and ready to move.",
    bullets: [],
    visualLabel: "Tanzania Regional Coverage",
    variant: "network",
  },
  {
    slug: "rapid-deployment",
    number: "05",
    title: "Rapid Deployment",
    href: "/capabilities/rapid-deployment",
    icon: "rocket",
    summary:
      "Crews on location within 4 to 24 hours, nationwide, whenever the brief lands.",
    summaryHome: "Crews on location within 4 to 24 hours, nationwide.",
    heroTitle: "Rapid deployment.",
    heroTagline:
      "When the story breaks, when the summit is announced, when the launch is tomorrow, PrimeReach mobilises within 4 to 24 hours nationwide.",
    bodyHeading: "What is always ready.",
    bodyCopy:
      "Standing crews, pre-positioned equipment, and licensed creative professionals in every major region, mobilised within four to twenty-four hours.",
    bullets: [],
    visualLabel: "On call. Nationwide.",
    variant: "deployment",
  },
];

export const CAPABILITIES_INDEX = {
  heroTitle: "The operational muscle behind every project.",
  heroLede:
    "Technology, teams, studios, network, and rapid-deployment infrastructure ready when the brief arrives.",
  closing: {
    eyebrow: "Ready to Deploy",
    heading: "What do you need mobilised.",
    copy: "Our capability sheet is long. Send us your brief and we will map the parts of it that apply, and price them clearly.",
    primary: { label: "Talk to our operations lead", href: "/contact" },
  } satisfies ClosingCta,
};

/* ---------- Network capability — regional coverage ---------- */

export const NETWORK_REGIONS: RegionCoverage[] = [
  { region: "Dar es Salaam", crew: "28 crew" },
  { region: "Mwanza", crew: "18 crew" },
  { region: "Arusha", crew: "17 crew" },
  { region: "Dodoma", crew: "14 crew" },
  { region: "Zanzibar", crew: "12 crew" },
  { region: "Mbeya", crew: "11 crew" },
  { region: "Morogoro", crew: "10 crew" },
  { region: "Kilimanjaro", crew: "9 crew" },
  { region: "+ 18 more regions" },
];

/* ---------- Rapid deployment — timeline + standing capabilities ---------- */

export const DEPLOY_STEPS: DeployStep[] = [
  {
    time: "0h",
    title: "Brief received",
    description: "Signed brief lands. Operations lead assigned within one hour.",
  },
  {
    time: "2h",
    title: "Team assembled",
    description: "Producers, crew, and kit assigned from the nearest regional base.",
  },
  {
    time: "4–8h",
    title: "Team en route",
    description:
      "Crew travelling to location with a producer already in touch on the ground.",
  },
  {
    time: "12–24h",
    title: "On location",
    description:
      "Crew arrived, producing to brief, first content ready for next-morning delivery.",
  },
];

export const STANDING_CAPABILITIES: SubService[] = [
  {
    title: "Multi-Camera Field Crews",
    description: "Two to eight camera setups deployable at short notice.",
  },
  {
    title: "Livestream-Ready Field Kits",
    description: "Encoders, backup uplinks, and cloud archive ready on the truck.",
  },
  {
    title: "Drone & Aerial Units",
    description: "TCAA-licensed pilots and DJI Enterprise units on rapid standby.",
  },
  {
    title: "Bilingual Field Producers",
    description: "English, Swahili, and local dialect capability across every region.",
  },
  {
    title: "Photography Teams",
    description: "Editorial and PR-grade photographers with matched gear.",
  },
  {
    title: "Same-Day Rushes",
    description: "First cuts delivered same-day. Full edit next morning.",
  },
];

export function getCapability(slug: string): Capability | undefined {
  return CAPABILITIES.find((c) => c.slug === slug);
}
