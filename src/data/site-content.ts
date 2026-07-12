import type {
  ClientLogo,
  CoreValue,
  FeatureList,
  SectorGroup,
  ServiceOption,
  ServiceWing,
  ServiceWingDetail,
  Stat,
  TimelineEntry,
  WhyChooseReason,
} from "@/types/content";

/* ==========================================================================
   PrimeReach Global Solutions — Single source of truth for site copy.
   Wording reflects the corrections in the brief (section 24):
   - "Since 2019" rather than "a decade"
   - Rapid deployment "typically within 4–24 hours"
   - "200+ creative professionals, including 100+ vetted creators"
   - "more than 26 Tanzanian regions"
   - "Three integrated wings covering thirteen capability areas"
   - Corrected spellings (Strategic Intelligence / Visibility / Discretion, etc.)
   ========================================================================== */

/* ---------- Hero ---------- */

export const HERO = {
  eyebrow: "Innovate · Create · Reach",
  // ≤ 5 words; the accent word is set in italic bronze.
  headlineLead: "We Build Africa’s",
  headlineAccent: "Visibility",
  // ≤ 15 words.
  supporting:
    "Strategic communication, media, research and technology — built for the institutions shaping Africa.",
  primaryCta: { label: "Explore Our Capabilities", href: "/services" },
  secondaryCta: { label: "Start a Conversation", href: "/contact" },
} as const;

/* ---------- About ---------- */

export const ABOUT = {
  previewHeading: "Africa’s Integrated Digital Infrastructure Partner",
  intro: [
    "PrimeReach Global Solutions is a Tanzania-headquartered strategic communication, technology, and integrated solutions group that enables governments, development partners, universities, corporates, security agencies, and creators to communicate, operate, and compete at global standards.",
    "PrimeReach sits at the intersection of communication, technology, and emerging digital systems in Africa and globally. We design narratives, build media systems, supply technology infrastructure, and deliver the foundational platforms African institutions need to project authority, modernise operations, and shape the futures they intend to define.",
  ],
  featuredStatement:
    "PrimeReach is building Africa’s integrated digital infrastructure, powering institutions, creators, and communities through strategic communication, technology supply, and integrated operational solutions.",
  pageHeroTitle:
    "Building the Systems Through Which African Institutions Speak, Persuade and Lead",
  pageHeroSupporting:
    "PrimeReach operates at the intersection of strategic communication, technology, research, media production and emerging digital systems.",
  vision: {
    heading: "Our Vision",
    body: [
      "To become Africa’s leading integrated digital infrastructure group.",
      "To shape the future of communication, storytelling, institutional visibility, and digital presence by building the systems through which African institutions speak, persuade, and lead.",
    ],
  },
  mission: {
    heading: "Our Mission",
    body: [
      "To empower businesses, individuals, and organisations with creative, research-driven, and technology-focused services that foster sustainable growth and development.",
      "PrimeReach brings strategy, production, research, and technology supply under a single accountable group designed for governments, embassies, corporates, NGOs, and creators across Africa and beyond.",
    ],
  },
  journeySubtitle: "Building the Continent’s Visibility Infrastructure Since 2019",
} as const;

/* ---------- Statistics ---------- */

export const CAPABILITY_STATS: Stat[] = [
  { value: "03", label: "Operations Wings" },
  { value: "12+", label: "Sectors Served" },
  { value: "200+", label: "Creative Professionals in Network" },
  { value: "06", label: "Pan-African Markets" },
  { value: "24/7", label: "Livestream Capability" },
  { value: "AI", label: "Enhanced Workflows" },
];

export const NETWORK_STATS: Stat[] = [
  { value: "200+", label: "Photographers & Videographers" },
  { value: "26+", label: "Regions Covered" },
  { value: "100+", label: "Vetted Creators" },
  { value: "10+", label: "Sector Niches" },
];

/* ---------- Service wings (home + services overview) ---------- */

export const SERVICE_WINGS: ServiceWing[] = [
  {
    slug: "pr-media-communications",
    href: "/services/pr-media-communications",
    eyebrow: "Wing One",
    title: "PR, Media & Strategic Communication",
    shortDescription:
      "Strategy, content production, reputation management, visual communication, media relations and pan-African distribution.",
    icon: "megaphone",
    areas: [
      "Strategic PR & Communications",
      "Content & Distribution",
      "Branding & Visibility",
      "Executive Branding",
    ],
    cta: "Explore Communication Services",
  },
  {
    slug: "research-training-consultancy",
    href: "/services/research-training-consultancy",
    eyebrow: "Wing Two",
    title: "Research, Training & Consultancy",
    shortDescription:
      "Evidence-led research, institutional diagnostics, leadership training, communication advisory and capacity-building programmes.",
    icon: "search",
    areas: [
      "Research & Insights",
      "Training & Capacity Building",
      "Consultancy & Advisory",
    ],
    cta: "Explore Research & Advisory",
  },
  {
    slug: "technology-solutions",
    href: "/services/technology-solutions",
    eyebrow: "Wing Three",
    title: "Technology, Solutions & Emerging Tech",
    shortDescription:
      "Drone technology, surveillance, enterprise computing, communications infrastructure, emerging technology and complete systems integration.",
    icon: "cpu",
    areas: [
      "Drone Technology Supply",
      "Security & Surveillance Systems",
      "Computer & Computing",
      "Communications Infrastructure",
      "Advanced & Emerging Tech",
      "Solutions Integration",
    ],
    cta: "Explore Technology Solutions",
  },
];

/* ---------- Service wing detail pages ---------- */

export const SERVICE_WING_DETAILS: Record<string, ServiceWingDetail> = {
  "pr-media-communications": {
    ...SERVICE_WINGS[0],
    seoTitle: "PR, Media & Strategic Communication",
    seoDescription:
      "Strategy, media production, reputation management, executive visibility, branding and pan-African distribution through one integrated communication operation.",
    heroTitle: "PR, Media & Strategic Communication",
    intro:
      "PrimeReach combines strategic thinking, media production, reputation management, executive visibility, branding, and distribution through one integrated communication operation.",
    positioningLine: "Strategy, Full Production and Distribution",
    categories: [
      {
        title: "Strategic PR & Communications",
        services: [
          "Media Relations & Press Coordination",
          "Crisis Communication & Reputation Management",
          "Stakeholder Engagement & Public Affairs",
          "Executive Visibility & Thought Leadership",
          "Government Relations & Narrative Architecture",
        ],
      },
      {
        title: "Content & Distribution",
        services: [
          "Documentary, Film & Institutional Video",
          "Photography, Drone & Visual Documentation",
          "Livestreaming & Hybrid Event Systems",
          "Social Media Content & Post-Production",
          "Creator Economy & Pan-African Distribution",
        ],
      },
      {
        title: "Branding & Visibility",
        services: [
          "Visual Identity & Brand Systems",
          "Corporate Presentations & Annual Reports",
          "Creative Design & Print Solutions",
          "Infographics & Data Visualisation",
          "Event Collateral & Brand Environments",
        ],
      },
      {
        title: "Executive Branding",
        services: [
          "Personal Narrative Development",
          "Thought Leadership Positioning",
          "Cinematic Photography & Video",
          "Stakeholder Engagement Strategy",
          "Reputation & Crisis Architecture",
        ],
      },
    ],
  },
  "research-training-consultancy": {
    ...SERVICE_WINGS[1],
    seoTitle: "Research, Training & Consultancy",
    seoDescription:
      "Evidence-led research, institutional diagnostics, leadership training, communication advisory and capacity-building programmes across Africa.",
    heroTitle: "Research, Training & Consultancy",
    intro: "Evidence-led knowledge work that builds institutional capacity.",
    positioningLine: "Evidence-Led Research, Training and Advisory",
    categories: [
      {
        title: "Research & Insights",
        services: [
          "Strategic Research & Market Intelligence",
          "Stakeholder & Audience Studies",
          "Knowledge, Attitudes & Practices Surveys — KAP Surveys",
          "Monitoring, Evaluation & Learning — MEL",
          "Communications Audit & Benchmarking",
        ],
      },
      {
        title: "Training & Capacity Building",
        services: [
          "Executive & Leadership Training",
          "Institutional Communications Training",
          "Media & Public-Speaking Training",
          "Crisis Communication Workshops",
          "Customised Capacity-Building Programmes",
        ],
      },
      {
        title: "Consultancy & Advisory",
        services: [
          "Communications & Brand Strategy Consultancy",
          "Digital Transformation & Visibility Advisory",
          "Sector-Specific Institutional Diagnostics",
          "Donor & Stakeholder Engagement Strategy",
          "Programme Design & Communication Architecture",
        ],
      },
    ],
  },
  "technology-solutions": {
    ...SERVICE_WINGS[2],
    seoTitle: "Technology, Solutions & Emerging Tech",
    seoDescription:
      "Drone technology, security & surveillance, enterprise computing, communications infrastructure and complete systems integration for institutions.",
    heroTitle: "Technology, Solutions & Emerging Tech",
    intro:
      "PrimeReach supplies, installs, integrates and supports technologies that strengthen institutional operations, security, communications and field capability.",
    positioningLine: "Supply, Integrate, Support",
    categories: [
      {
        title: "Drone Technology Supply",
        services: [
          "Commercial drones",
          "Surveillance drones",
          "Mapping and inspection",
          "Pilot training",
          "TCAA compliance",
        ],
      },
      {
        title: "Security & Surveillance Systems",
        services: [
          "CCTV systems",
          "Access control",
          "Intrusion detection",
          "Perimeter security",
          "Command rooms",
        ],
      },
      {
        title: "Computer & Computing",
        services: [
          "Workstations and servers",
          "Networking equipment",
          "Enterprise hardware",
          "Procurement and installation",
          "Managed support",
        ],
      },
      {
        title: "Communications Infrastructure",
        services: [
          "Connectivity systems",
          "Broadcast equipment",
          "Livestream rigs",
          "Conferencing systems",
          "Event AV infrastructure",
        ],
      },
      {
        // NOTE: The supplied profile duplicated the "Computer & Computing" list here.
        // Placeholder emerging-tech areas are shown pending PrimeReach confirmation.
        // Confirm the intended services before publishing this section.
        title: "Advanced & Emerging Technology",
        services: [
          "AI systems & automation (pending confirmation)",
          "Data platforms & advanced analytics (pending confirmation)",
          "Internet of Things & smart infrastructure (pending confirmation)",
          "Extended reality solutions (pending confirmation)",
          "Custom emerging-technology deployments (pending confirmation)",
        ],
      },
      {
        title: "Solutions Integration",
        services: [
          "Cross-vendor integration",
          "Commissioning",
          "Technical support",
          "Lifecycle management",
          "Estate audits",
        ],
      },
    ],
  },
};

/* ---------- Why choose PrimeReach ---------- */

export const WHY_CHOOSE: WhyChooseReason[] = [
  {
    title: "Integrated Capability",
    description:
      "Communication, research, training, and technology supply under a single accountable group.",
    icon: "layers",
  },
  {
    title: "Institutional-Grade Standards",
    description:
      "Broadcast-quality production, editorial rigour, and governance frameworks suitable for governments, embassies, and listed corporates.",
    icon: "badgeCheck",
  },
  {
    title: "Nationwide On-Call Network",
    description:
      "A network of 200 photographers, videographers, and drone pilots deployable across Tanzanian regions.",
    icon: "network",
  },
  {
    title: "Creator Economy Infrastructure",
    description:
      "More than 100 vetted content creators and influencers governed by editorial standards and prepared for sector-specific campaign activation.",
    icon: "users",
  },
  {
    title: "Tanzania Execution Partner",
    description:
      "Permits, fixers, compliance, and country logistics handled for international clients.",
    icon: "compass",
  },
  {
    title: "Pan-African Distribution Reach",
    description:
      "Owned creator networks, institutional media partnerships, and regional desks capable of reaching audiences beyond a single market.",
    icon: "satellite",
  },
  {
    title: "Trusted Execution Partner",
    description:
      "A confidential, discreet, and dependable partner for executives, security clients, and institutions where reputation is the asset.",
    icon: "fingerprint",
  },
];

/* ---------- Core values ---------- */

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Integrity",
    description:
      "Honesty, transparency, and accountability in every mandate. Trust is the currency of our work.",
    icon: "badgeCheck",
  },
  {
    title: "Strategic Intelligence",
    description:
      "Every initiative is aligned with institutional objectives, market realities, and long-term positioning.",
    icon: "brainCircuit",
  },
  {
    title: "Innovation",
    description:
      "Continuous integration of AI, emerging technology, and new creative systems to expand reach and impact.",
    icon: "lightbulb",
  },
  {
    title: "Excellence",
    description:
      "Broadcast-grade production, editorial rigour, and premium execution across every touchpoint.",
    icon: "award",
  },
  {
    title: "Impact",
    description:
      "Our work strengthens reputations, amplifies development outcomes, and accelerates Africa’s transformation.",
    icon: "target",
  },
  {
    title: "African Excellence",
    description:
      "Africa deserves communication and technology systems capable of representing its people at global standards.",
    icon: "landmark",
  },
  {
    title: "Discretion",
    description:
      "Confidential, NDA-grade handling of sensitive institutional, executive, and government engagements.",
    icon: "fingerprint",
  },
  {
    title: "Partnership",
    description:
      "Long-term relationships, shared accountability, and structured governance — not vendor transactions.",
    icon: "handshake",
  },
];

/* ---------- Company timeline ---------- */

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2019",
    description:
      "Founded in Dar es Salaam as a strategic communications and digital storytelling firm.",
  },
  {
    year: "2021",
    description: "Expanded into integrated media production and event coverage.",
  },
  {
    year: "2022",
    description: "Launched creator economy and talent representation services.",
  },
  {
    year: "2023",
    description:
      "Established livestream, hybrid event, and digital distribution capabilities.",
  },
  {
    year: "2024",
    description: "Introduced AI-driven content systems and media infrastructure solutions.",
  },
  {
    year: "2025",
    description:
      "Repositioned as an integrated digital infrastructure group with multiple specialised service divisions.",
  },
  {
    year: "2026",
    description:
      "Scaling pan-African partnerships, executive branding, and enterprise visibility platforms.",
  },
];

/* ---------- Rapid deployment ---------- */

export const RAPID_DEPLOYMENT = {
  heading: "Rapid Deployment & On-Call Capability",
  previewCopy:
    "Wherever the story breaks and whoever the client, PrimeReach is on call across Tanzania. The company maintains standing crews, pre-positioned equipment, and licensed creative professionals in major regions, ready to move within a rapid deployment window.",
  fullCopy: [
    "Wherever the story breaks and whoever the client, PrimeReach is on call across Tanzania.",
    "PrimeReach maintains standing crews, pre-positioned equipment, and licensed creative professionals in every major region of Tanzania, and crews are typically mobilised within four to twenty-four hours.",
  ],
  deploys: {
    title: "What PrimeReach Deploys On Call",
    items: [
      "Multi-camera production teams",
      "Livestream-ready field kits",
      "Drone and aerial coverage units",
      "Bilingual field producers",
      "Photography teams for stills and PR",
      "Same-day rushes and next-day editing options",
    ],
    icon: "camera",
  } satisfies FeatureList,
  testedFor: {
    title: "Tested For",
    items: [
      "Breaking news and investigative coverage",
      "Donor and embassy visits",
      "Ministerial launches and summits",
      "NGO programme milestones",
      "Conference walk-ups and last-minute events",
      "International broadcast pickups",
    ],
    icon: "badgeCheck",
  } satisfies FeatureList,
  benchOptions: {
    title: "Dedicated Bench Options",
    items: [
      "Dedicated creator on retainer",
      "Dedicated photographer on retainer",
      "Quarterly on-call subscription",
      "Annual country-partnership retainer",
      "Per-day rapid coverage day rates",
      "Pre-paid crisis-response packages",
    ],
    icon: "handshake",
  } satisfies FeatureList,
} as const;

/* ---------- Creator & influence network ---------- */

export const CREATOR_NETWORK = {
  heading: "The Creator & Influence Network",
  supporting:
    "Africa’s vetted creator economy infrastructure, delivering authentic reach across every sector.",
  stats: [
    "100+ vetted creators",
    "Pan-Tanzania reach",
    "Coverage across Tanzanian regions",
    "10+ sector niches",
    "English, Swahili and local dialects",
    "Brand-safe governance and NDAs",
  ],
  sectors: [
    "Health, wellness and public-health behaviour change",
    "Education, edutainment and youth voice",
    "Banking, fintech and financial inclusion",
    "Tourism, hospitality and destination storytelling",
    "Lifestyle, fashion, beauty and culture",
    "Sports, music, comedy and entertainment",
    "Climate, agriculture and rural impact",
    "Civic, governance and national campaigns",
  ],
  activation: [
    "Vetted matching by brand, sector and region",
    "Editorial direction and brand-safety review",
    "Rights, licensing and content governance",
    "Performance dashboards covering reach, engagement and sentiment",
    "Cross-platform amplification and paid-boost integration",
    "Crisis-response protocols for sensitive mandates",
  ],
} as const;

/* ---------- Network & reach page ---------- */

export const NETWORK = {
  heroTitle: "PrimeReach Global Creative Network",
  supporting:
    "A verified bench of photographers, videographers, and drone pilots deployed nationwide.",
  indicators: [
    "200+ photographers and videographers",
    "26+ regions covered",
    "Rapid deployment capability",
    "TCAA-licensed drone pilots",
    "English and Swahili bilingual crews",
  ],
} as const;

/* ---------- Operational & geographic presence ---------- */

export const PRESENCE = {
  heading: "Built to Deploy. Built to Scale. Built to Deliver.",
  body: [
    "Headquartered in Dar es Salaam, Tanzania, PrimeReach operates editorial teams, broadcast-grade camera and drone units, livestream control infrastructure, post-production pipelines, AI-assisted content systems, a vetted pan-African creator network, and technology supply and integration capabilities.",
  ],
  markets: [
    "Tanzania",
    "Kenya",
    "Uganda",
    "Rwanda",
    "Southern Africa corridors",
    "West Africa corridors",
  ],
} as const;

/* ---------- Clients & sectors page ---------- */

export const SECTOR_GROUPS: SectorGroup[] = [
  {
    title: "Public Sector",
    icon: "landmark",
    items: [
      "Government Ministries & Agencies",
      "Public-Sector Institutions",
      "Security, Defence & Surveillance",
      "Regulators & Apex Institutions",
    ],
  },
  {
    title: "Development & Multilateral",
    icon: "satellite",
    items: [
      "International NGOs & INGO Networks",
      "UN Agencies & Multilateral Partners",
      "Major Foundations & Bilateral Bodies",
      "Embassies & Cultural Institutes",
    ],
  },
  {
    title: "Knowledge & Health",
    icon: "graduationCap",
    items: [
      "Universities, Research & Academia",
      "Hospitals, Health Systems & Pharma",
      "Think Tanks & Policy Institutes",
      "Capacity-Building Programmes",
    ],
  },
  {
    title: "Enterprise & Creator Economy",
    icon: "building",
    items: [
      "Banking, Insurance & Financial Services",
      "Telecoms, Technology Vendors & ICT",
      "Real Estate, Tourism & Hospitality",
      "Foreign Media, Brands & Creator Networks",
    ],
  },
];

/* ---------- Client logos ---------- */

// Real logo files supplied in /public/clients.
export const CLIENTS: ClientLogo[] = [
  { name: "DStv", logo: "/clients/dstv.png" },
  { name: "University of Toronto", logo: "/clients/university-of-toronto.png" },
  {
    name: "Muhimbili University of Health and Allied Sciences — MUHAS",
    logo: "/clients/muhas.png",
  },
  { name: "Ardhi University", logo: "/clients/ardhi-university.png" },
  { name: "CI Ventures", logo: "/clients/ci-ventures.png" },
  { name: "Stichting DOEN / Postcode Loterij", logo: "/clients/doen-postcode-loterij.png" },
  { name: "Anchor Foundation", logo: "/clients/anchor-foundation.png" },
  { name: "Women in Ocean Food", logo: "/clients/women-in-ocean-food.png" },
  { name: "Mustardseed Trust", logo: "/clients/mustardseed-trust.png" },
  {
    name: "Tanzania Insurance Regulatory Authority — TIRA",
    logo: "/clients/tira.png",
  },
  { name: "National Housing Corporation — NHC", logo: "/clients/nhc.png" },
];

/* ---------- Final CTA ---------- */

export const FINAL_CTA = {
  heading: "Let’s Build What Matters",
  copy: "We welcome strategic conversations with institutions, partners, and collaborators across Africa and beyond.",
} as const;

/* ---------- Contact form service options ---------- */

export const SERVICE_OPTIONS: ServiceOption[] = [
  { value: "strategic-pr", label: "Strategic PR & Communications" },
  { value: "content-production", label: "Content Production & Distribution" },
  { value: "branding-visibility", label: "Branding & Visibility" },
  { value: "executive-branding", label: "Executive Branding" },
  { value: "research-insights", label: "Research & Insights" },
  { value: "training", label: "Training & Capacity Building" },
  { value: "consultancy", label: "Consultancy & Advisory" },
  { value: "drone", label: "Drone Technology" },
  { value: "security", label: "Security & Surveillance" },
  { value: "computing", label: "Computer & Enterprise Hardware" },
  { value: "comms-infrastructure", label: "Communications Infrastructure" },
  { value: "advanced-tech", label: "Advanced Technology" },
  { value: "solutions-integration", label: "Solutions Integration" },
  { value: "creator-campaign", label: "Creator & Influencer Campaign" },
  { value: "rapid-deployment", label: "Rapid Deployment Coverage" },
  { value: "general", label: "General Enquiry" },
];

export const CONTACT_METHODS = ["Email", "Telephone", "WhatsApp"] as const;
