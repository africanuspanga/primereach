import type {
  ClientLogo,
  CoreValue,
  Department,
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
  eyebrow: "Innovate. Create. Reach.",
  // The accent word is set in italic bronze after the lead.
  headlineLead: "We build Africa’s visibility",
  headlineAccent: "infrastructure",
  supporting:
    "Strategic communication, media, research, and technology, engineered for the institutions shaping the continent’s next decade.",
  primaryCta: { label: "Explore Our Solutions", href: "/solutions" },
  secondaryCta: { label: "Speak With Our Team", href: "/contact" },
  audiences: "Governments · Development Partners · Universities · Corporates · Creators",
} as const;

/* ---------- About ---------- */

export const ABOUT = {
  pageHeroTitle: "Building Africa’s visibility, one institution at a time.",
  pageHeroSupporting:
    "We are the strategic communication, media, and technology group behind some of East Africa’s most consequential campaigns.",
  companyEyebrow: "The Company",
  company: [
    "PrimeReach Global Solutions was founded to solve one problem. African institutions, whether governments, universities, corporates, development partners, or security agencies, need a partner who can deliver communication, media, and technology work at global standards, on the ground, in country, with speed and confidence.",
    "Since our founding we have grown into three operating wings: Communication, Research, and Technology. We are supported by a network of over 200 photographers, videographers, and drone pilots, more than 100 vetted content creators, and offices and desks across Tanzania and pan-Africa. We work in six sectors and six countries. Our clients include DStv, the University of Toronto, MUHAS, Ardhi University, CI Ventures, Stichting DOEN, Anchor Foundation, Mustardseed Trust, TIRA, and NHC.",
    "Every project is delivered under a single accountable team. One contract, one point of contact, integrated capability, institutional standards. That is the operating premise, and it is why the institutions listed above return.",
  ],
  mvEyebrow: "What We Set Out To Do",
  mission: {
    kicker: "Our Mission",
    heading: "The work we exist to do.",
    body: "To build the communication, media, and technology infrastructure that empowers African institutions to project authority, modernise operations, and shape the futures they intend to define.",
  },
  vision: {
    kicker: "Our Vision",
    heading: "The position we intend to hold.",
    body: "To be Africa’s most trusted integrated digital infrastructure group. The partner institutions choose when their reputation, their reach, and their operating standard depend on getting it right.",
  },
  valuesEyebrow: "What We Stand For",
  valuesDescription:
    "Six commitments that shape every brief, every deliverable, every relationship.",
  journeyEyebrow: "Milestones",
  journeyTitle: "Our journey.",
  journeyDescription:
    "A short chronology of the moments that shaped PrimeReach into the group it is today.",
  closing: {
    eyebrow: "Ready to Work With PrimeReach",
    heading: "Bring us your brief.",
    copy: "The best PrimeReach relationships begin with a conversation. Tell us what you are building and we will show you what we can bring to it.",
  },
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

/* ---------- Home page copy (v2) ---------- */

export const HOME = {
  positionLede:
    "PrimeReach Global Solutions is Africa’s integrated digital infrastructure group, building the communication, media, research, and technology backbone that powers institutions and creators across the continent.",
  intro: {
    eyebrow: "Who We Are",
    heading: "An integrated partner for the institutions defining Africa’s future.",
    body: [
      "PrimeReach is a Tanzania-headquartered strategic communication, technology, and integrated solutions group. Governments, development partners, universities, corporates, security agencies, and creators use us to communicate, operate, and compete at global standards.",
      "Three specialised wings, one accountable team. We design narratives, build media systems, supply technology infrastructure, and deliver the operating platforms African institutions need to project authority, modernise operations, and shape their own futures.",
    ],
    cta: { label: "Discover PrimeReach", href: "/about" },
    imageCaption: "Institutional-grade production. Field-ready teams.",
  },
  wings: {
    eyebrow: "One Integrated Ecosystem",
    title: "Three specialised wings. End-to-end capability.",
    description:
      "From reputation strategy to research to technology supply, PrimeReach delivers a complete operating stack under one accountable group. One contract. One point of contact. One accountable result.",
  },
  solutions: {
    eyebrow: "What We Deliver",
    title: "Six solutions. One accountable partner.",
    description:
      "Whether you need one specialised capability or a fully integrated programme, PrimeReach delivers under a single team with one point of accountability.",
  },
  why: {
    eyebrow: "Why PrimeReach",
    title: "Why institutions trust us with their voice.",
    description:
      "Seven reasons governments, embassies, and listed corporates hand PrimeReach their visibility, their reputation, and their infrastructure.",
  },
  tcma: {
    eyebrow: "Flagship Programme",
    title: "Tanzania Creative Market Access.",
    body: [
      "Our flagship programme, TCMA, is the operating system for Tanzania’s creator economy. We vet and onboard creators, build campaign infrastructure, handle contracts and distribution, and train talent on brand-safety, editorial standards, and the business of the modern creator economy.",
      "Brands receive audience-verified reach without friction. Creators receive institutional-grade opportunities without giving up their voice. Institutions receive a governance layer they can present to boards, partners, and regulators.",
    ],
    stats: [
      { value: "200+", label: "Vetted Creators" },
      { value: "6", label: "Regional Hubs" },
      { value: "12+", label: "Sector Niches" },
    ] satisfies Stat[],
    cta: { label: "Explore TCMA", href: "/programmes/tcma" },
  },
  capabilities: {
    eyebrow: "How We Deliver",
    title: "Five capabilities behind every project.",
    description:
      "The operational muscle behind our solutions. Technology, teams, studios, network, and rapid deployment ready when the brief arrives.",
  },
  reelCaption: "Scale that shows up on time, on brief, and on standard.",
  trust: {
    eyebrow: "Trusted By",
    title: "Governments, universities, foundations, NGOs and global brands.",
  },
  insights: {
    eyebrow: "Thinking & Publishing",
    title: "Latest from the editorial desk.",
  },
} as const;

/** Home "by the numbers" reel. */
export const REEL_STATS: Stat[] = [
  { value: "200+", label: "Photographers & Videographers" },
  { value: "100+", label: "Vetted Creators & Influencers" },
  { value: "26+", label: "Tanzanian Regions" },
  { value: "12+", label: "Sector Niches" },
  { value: "6", label: "Pan-African Markets" },
];

/* ---------- Service wings (home + services overview) ---------- */

export const SERVICE_WINGS: ServiceWing[] = [
  {
    slug: "pr-media-communications",
    href: "/solutions/pr-strategic-communication",
    eyebrow: "Wing One",
    title: "PR, Media & Strategic Communication",
    shortDescription:
      "Reputation strategy, content production, media relations, executive branding, visual communication, event production, and pan-African distribution.",
    icon: "megaphone",
    areas: [
      "Strategic PR",
      "Content Studio",
      "Reputation",
      "Executive Branding",
      "Event Production",
    ],
    cta: "Explore this wing",
  },
  {
    slug: "research-training-consultancy",
    href: "/solutions/research-training-advisory",
    eyebrow: "Wing Two",
    title: "Research, Training & Advisory",
    shortDescription:
      "Evidence-led research, MEAL, institutional diagnostics, leadership training, editorial advisory, and capacity-building programmes for the sectors that build the continent.",
    icon: "search",
    areas: ["Research", "MEAL", "Training", "Advisory", "Editorial"],
    cta: "Explore this wing",
  },
  {
    slug: "technology-solutions",
    href: "/solutions/ai-innovation",
    eyebrow: "Wing Three",
    title: "Technology, Solutions & Emerging Tech",
    shortDescription:
      "Drone technology, AI, geospatial, surveillance, enterprise computing, communications infrastructure, software supply, and authorised dealership operations.",
    icon: "cpu",
    areas: [
      "Drone & GIS",
      "AI",
      "Surveillance",
      "Software Supply",
      "Authorised Dealer",
    ],
    cta: "Explore this wing",
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
      "Communication, research, training, and technology supply under a single accountable group. No hand-offs, no dropped briefs.",
    icon: "layers",
  },
  {
    title: "Institutional-Grade Standards",
    description:
      "Broadcast-quality production, editorial rigour, and governance frameworks suited to governments, embassies, and listed corporates.",
    icon: "badgeCheck",
  },
  {
    title: "Nationwide On-Call Network",
    description:
      "200 photographers, videographers, and drone pilots deployable across every Tanzanian region within a rapid mobilisation window.",
    icon: "network",
  },
  {
    title: "Creator Economy Infrastructure",
    description:
      "Over 100 vetted content creators and influencers governed by editorial standards and prepared for sector-specific campaign activation.",
    icon: "users",
  },
  {
    title: "Tanzania Execution Partner",
    description:
      "Permits, fixers, compliance, and country logistics handled for international clients working in the East African market.",
    icon: "compass",
  },
  {
    title: "Pan-African Distribution Reach",
    description:
      "Owned creator networks, institutional media partnerships, and regional desks that reach audiences well beyond one market.",
    icon: "satellite",
  },
  {
    title: "Trusted Execution Partner",
    description:
      "A discreet, dependable partner for executives, security clients, and institutions where reputation is the primary asset.",
    icon: "fingerprint",
  },
];

/* ---------- Core values ---------- */

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Integrity",
    description:
      "We handle sensitive institutional work with discretion, honesty, and consistent standards. What we say we will do is what we do.",
    icon: "badgeCheck",
  },
  {
    title: "Excellence",
    description:
      "Broadcast-quality production, editorial rigour, and operational precision on every deliverable, whether the audience is one or one million.",
    icon: "award",
  },
  {
    title: "Innovation",
    description:
      "We adopt emerging technology early, but only where it delivers real value to the client. Novelty is not a strategy.",
    icon: "lightbulb",
  },
  {
    title: "Partnership",
    description:
      "We build long-term relationships with clients, creators, suppliers, and the institutions we serve. Repeat work is the true metric.",
    icon: "handshake",
  },
  {
    title: "African Rootedness",
    description:
      "We are of Africa. Our teams, our talent, our stories, and our decisions are grounded here, and speak from here.",
    icon: "landmark",
  },
  {
    title: "Accountability",
    description:
      "One team, one point of contact, one accountable result. Every time.",
    icon: "target",
  },
];

/* ---------- Company timeline ---------- */

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2022",
    tag: "Founding",
    title: "PrimeReach opens in Dar es Salaam.",
    description:
      "Founded as a strategic communication and media production practice, with an early focus on institutional clients and the education sector.",
  },
  {
    year: "2023",
    tag: "Research Practice",
    title: "The Research, Training & Advisory wing is formed.",
    description:
      "PrimeReach begins delivering evidence-led research and capacity building for academic partners, NGOs, and multilateral clients.",
  },
  {
    year: "2024",
    tag: "Technology Wing",
    title: "Technology & Emerging Tech launches.",
    description:
      "The group formalises its technology practice, delivers its first drone and geospatial work, and begins the enterprise supply operation.",
  },
  {
    year: "2024",
    tag: "Creator Network",
    title: "Vetted creator infrastructure crosses 100 talents.",
    description:
      "PrimeReach reaches 100 vetted creators governed under editorial standards, setting the foundation for the TCMA programme.",
  },
  {
    year: "2025",
    tag: "Pan-African Expansion",
    title: "Regional partnerships established across six markets.",
    description:
      "Formal desks and creator partnerships in Kenya, Uganda, Rwanda, DRC, South Africa, and Zambia extend distribution reach.",
  },
  {
    year: "2026",
    tag: "TCMA Launched",
    title: "Tanzania Creative Market Access goes live as our flagship.",
    description:
      "TCMA becomes the group’s flagship programme, connecting creators, brands, and institutions in one operating system.",
  },
  {
    year: "2026",
    tag: "Service-Line Expansion",
    title: "Event Production, Software Supply, MEAL, and Authorised Dealer verticals added.",
    description:
      "The latest expansion widens the group’s operating catalogue while keeping the integrated three-wing architecture intact.",
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
  heading: "Let’s build what matters.",
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

/* ---------- Contact page (v2) ---------- */

export const CONTACT_PAGE = {
  heroTitle: "Let us know what you are working on.",
  heroSupporting:
    "Tell us the outcome, the audience, and the timing. A member of our team will be back to you within one business day.",
  directoryEyebrow: "Reach the Right Desk",
  directoryTitle: "Department directory.",
  directoryDescription:
    "For faster routing on specialised enquiries, contact the desk directly.",
} as const;

export const CONTACT_SECTORS = [
  "Government & Public Agency",
  "Development & Multilateral",
  "University & Research",
  "Health",
  "Enterprise & Corporate",
  "Creator Economy",
  "Other",
] as const;

export const SOLUTION_INTERESTS = [
  "PR & Strategic Communication",
  "Digital Transformation",
  "Creative Media Production",
  "AI & Innovation",
  "Drone & Geospatial",
  "Research & Advisory",
] as const;

export const DEPARTMENTS: Department[] = [
  { title: "Business Development", email: "bd@primereachglobal.co.tz" },
  { title: "Media Relations", email: "media@primereachglobal.co.tz" },
  { title: "Research & Advisory", email: "research@primereachglobal.co.tz" },
  { title: "Technology & Solutions", email: "tech@primereachglobal.co.tz" },
  { title: "TCMA & Creator Relations", email: "tcma@primereachglobal.co.tz" },
  { title: "Careers", email: "careers@primereachglobal.co.tz" },
];
