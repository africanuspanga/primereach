import type { CrossCuttingOffering, Solution } from "@/types/content";

/* ==========================================================================
   Solutions — six client-facing solutions, each with a detail page, plus the
   four cross-cutting offerings shown on the Solutions index.
   Copy transcribed from the PrimeReach v2 site specification.
   ========================================================================== */

export const SOLUTIONS: Solution[] = [
  {
    slug: "pr-strategic-communication",
    number: "01",
    title: "PR & Strategic Communication",
    href: "/solutions/pr-strategic-communication",
    icon: "megaphone",
    cardDescription:
      "Reputation, narrative, media relations, executive branding, crisis response, and integrated communication for institutions that cannot afford to be misunderstood.",
    heroTagline:
      "Reputation strategy, media relations, executive branding, and integrated communication for the institutions that cannot afford to be misunderstood.",
    seoDescription:
      "Reputation strategy, media relations, executive branding, crisis response and integrated communication for institutions that cannot afford to be misunderstood.",
    deliverIntro:
      "Seven sub-services, delivered as standalone engagements or as parts of a fully integrated communication programme.",
    subServices: [
      {
        title: "Strategic Communication Advisory",
        description:
          "Positioning, messaging architecture, stakeholder mapping, and long-range communication planning.",
      },
      {
        title: "Media Relations",
        description:
          "Newsroom relationships, press briefings, editorial placement, and media-training for spokespeople.",
      },
      {
        title: "Executive Branding",
        description:
          "Personal brand strategy, executive social presence, keynote development, and public-appearance coaching.",
      },
      {
        title: "Crisis Communication",
        description:
          "Standby crisis protocols, rapid-response teams, statement drafting, and reputation-recovery programmes.",
      },
      {
        title: "Reputation Management",
        description:
          "Ongoing monitoring, sentiment reporting, issue tracking, and proactive reputation-building programmes.",
      },
      {
        title: "Content Strategy",
        description:
          "Editorial calendars, channel strategy, content-governance frameworks, and pan-platform distribution planning.",
      },
      {
        title: "Editorial & Copywriting",
        description:
          "Op-eds, speeches, board reports, annual reports, and long-form editorial for institutional voice.",
      },
    ],
    approach: [
      {
        number: "01",
        title: "Discover",
        description:
          "Stakeholder interviews, audit of current reputation and coverage, benchmarking against sector peers, and clarification of communication goals.",
      },
      {
        number: "02",
        title: "Design",
        description:
          "Messaging architecture, editorial calendar, channel strategy, spokesperson programme, and a governance model your board can review.",
      },
      {
        number: "03",
        title: "Deliver",
        description:
          "In-market execution, media placement, content production, reporting cadence, and continuous optimisation against agreed measures.",
      },
    ],
    closing: {
      eyebrow: "Ready to Talk",
      heading: "Bring us your communication brief.",
      copy: "We work best when we understand the full picture. Share the challenge and the audience, and we will show you the path.",
      primary: { label: "Contact PrimeReach", href: "/contact" },
      secondary: { label: "See related case studies", href: "/impact/case-studies" },
    },
  },
  {
    slug: "digital-transformation",
    number: "02",
    title: "Digital Transformation",
    href: "/solutions/digital-transformation",
    icon: "server",
    cardDescription:
      "System design, workflow modernisation, cloud migration, enterprise software licensing, and the digital operating capability that global-standard institutions demand.",
    heroTagline:
      "System design, workflow modernisation, cloud migration, and the enterprise software your institution needs to operate at global standard.",
    seoDescription:
      "System design, workflow modernisation, cloud migration, enterprise software licensing and the digital operating capability global-standard institutions demand.",
    subServices: [
      {
        title: "Digital Strategy",
        description:
          "Current-state audit, target operating-model design, and multi-year digital roadmap tuned to your sector.",
      },
      {
        title: "System Architecture",
        description:
          "Solution architecture, integration design, data architecture, and vendor selection for enterprise systems.",
      },
      {
        title: "Cloud Migration",
        description:
          "Azure, AWS, and Google Cloud migrations with landing-zone design, workload assessment, and cost governance.",
      },
      {
        title: "Software Licensing & Supply",
        description:
          "Microsoft CSP, Adobe, Canva Enterprise, and other institutional software with volume licensing and support.",
      },
      {
        title: "Workflow Automation",
        description:
          "Process automation across finance, HR, procurement, and communications. RPA where it makes sense.",
      },
      {
        title: "Digital Skills Training",
        description:
          "Enterprise training programmes for staff, executives, and boards on the digital tools they now depend on.",
      },
    ],
    closing: {
      eyebrow: "Ready to Modernise",
      heading: "Where should the modernisation begin.",
      copy: "Send us your current state. We will send back a phased roadmap and a fixed-scope discovery proposal.",
      primary: { label: "Request a discovery call", href: "/contact" },
      secondary: {
        label: "See our technology capabilities",
        href: "/capabilities/technology",
      },
    },
  },
  {
    slug: "creative-media-production",
    number: "03",
    title: "Creative Media Production",
    href: "/solutions/creative-media-production",
    icon: "clapperboard",
    cardDescription:
      "Broadcast-quality film, photography, animation, editorial design, livestream production, and end-to-end event production for institutional and consumer audiences.",
    heroTagline:
      "Broadcast-quality film, photography, animation, editorial design, and full end-to-end event production.",
    seoDescription:
      "Broadcast-quality film, photography, animation, editorial design, livestream and end-to-end event production for institutional and consumer audiences.",
    subServices: [
      {
        title: "Film & Video Production",
        description:
          "Concept, script, shoot, post. Corporate, documentary, brand film, executive interview, and sector reportage.",
      },
      {
        title: "Photography",
        description:
          "Editorial, environmental portrait, event, product, aerial, and stock-library production for institutional use.",
      },
      {
        title: "Animation & Motion Graphics",
        description:
          "Explainer animation, data visualisation, motion identity, and social-cut variants for pan-platform distribution.",
      },
      {
        title: "Editorial Design",
        description:
          "Annual reports, research publications, magazines, board decks, and long-form editorial layout.",
      },
      {
        title: "Livestream Production",
        description:
          "Multi-camera livestream with graphics, cutaways, sign-language interpretation, and cloud archive.",
      },
      {
        title: "Event Production & Experiences",
        description:
          "Full production for conferences, summits, product launches, and cultural events. LED walls, staging, run of show.",
      },
      {
        title: "Podcast Production",
        description:
          "Studio and remote recording, production, distribution, and audiogram promotion for institutional podcasts.",
      },
    ],
    closing: {
      eyebrow: "Ready to Produce",
      heading: "Send us the brief.",
      copy: "We deliver production at broadcast quality, on institutional standards, on schedule.",
      primary: { label: "Start a production brief", href: "/contact" },
      secondary: {
        label: "See our featured projects",
        href: "/impact/featured-projects",
      },
    },
  },
  {
    slug: "ai-innovation",
    number: "04",
    title: "AI & Innovation",
    href: "/solutions/ai-innovation",
    icon: "brainCircuit",
    cardDescription:
      "Applied AI, automation, product prototyping, and emerging-technology pilots for institutions ready to build the next generation of African platforms.",
    heroTagline:
      "Applied AI, automation, product prototyping, and emerging-technology pilots for institutions ready to build the next platform.",
    seoDescription:
      "Applied AI, automation, product prototyping and emerging-technology pilots for institutions ready to build the next generation of African platforms.",
    subServices: [
      {
        title: "AI Strategy",
        description:
          "Use-case identification, capability audit, ethics and governance framework, and multi-year AI roadmap.",
      },
      {
        title: "Custom AI & ML Solutions",
        description:
          "Model selection, fine-tuning, retrieval-augmented systems, and deployment on Azure, AWS, or on-premise.",
      },
      {
        title: "Automation & RPA",
        description:
          "Process automation across back-office and communications workflows, with clear ROI accounting.",
      },
      {
        title: "Product Prototyping",
        description:
          "Rapid MVP builds for new products, tools, and internal platforms. From napkin sketch to working demo in six weeks.",
      },
      {
        title: "Emerging Tech Pilots",
        description:
          "LLM, computer vision, voice, and generative-media pilots, structured as controlled experiments.",
      },
      {
        title: "Data Engineering",
        description:
          "Data pipelines, warehousing, BI, and analytics enablement for institutions building on their operational data.",
      },
      {
        title: "Innovation Sprints",
        description:
          "Facilitated design and build sprints for teams that need to move from idea to prototype in two to four weeks.",
      },
    ],
    closing: {
      eyebrow: "Ready to Build",
      heading: "Bring us the problem, not the solution.",
      copy: "The best AI work begins from a clear problem. Tell us what you are trying to fix, avoid, or discover.",
      primary: { label: "Talk to our AI team", href: "/contact" },
    },
  },
  {
    slug: "drone-geospatial",
    number: "05",
    title: "Drone & Geospatial Solutions",
    href: "/solutions/drone-geospatial",
    icon: "drone",
    cardDescription:
      "TCAA-licensed aerial cinematography, surveying, mapping, and full GIS deliverables from our nationwide drone fleet and geospatial team.",
    heroTagline:
      "TCAA-licensed aerial cinematography, surveying, mapping, and GIS deliverables from our nationwide drone fleet.",
    seoDescription:
      "TCAA-licensed aerial cinematography, surveying, mapping and full GIS deliverables from our nationwide drone fleet and geospatial team.",
    subServices: [
      {
        title: "Aerial Cinematography",
        description:
          "Broadcast-quality drone film for feature, documentary, corporate, and advertising work.",
      },
      {
        title: "Land Surveying",
        description:
          "Photogrammetric surveying, orthomosaics, and elevation models for construction and land planning.",
      },
      {
        title: "Volumetric Analysis",
        description:
          "Stockpile volumes, earthworks, and quarry monitoring with repeatable measurement standards.",
      },
      {
        title: "Infrastructure Inspection",
        description:
          "Powerline, tower, roof, dam, and bridge inspections with photo and thermal imaging.",
      },
      {
        title: "GIS Mapping & Deliverables",
        description:
          "Vector data, geodatabases, and full GIS deliverables aligned to institutional standards.",
      },
      {
        title: "3D Modelling",
        description:
          "Photogrammetric 3D models of sites, buildings, and terrain for planning and visualisation.",
      },
      {
        title: "Environmental Monitoring",
        description:
          "Multi-spectral flights for forestry, agriculture, coastal, and conservation monitoring programmes.",
      },
      {
        title: "Authorised DJI Reseller",
        description:
          "DJI Enterprise supply with training, warranty, and institutional support contracts.",
      },
    ],
    closing: {
      eyebrow: "Ready to Fly",
      heading: "What do you need mapped, measured, or filmed.",
      copy: "Our TCAA-licensed pilots and geospatial team mobilise nationwide within 48 hours of a signed brief.",
      primary: { label: "Request a drone mission", href: "/contact" },
    },
  },
  {
    slug: "research-training-advisory",
    number: "06",
    title: "Research, Training & Advisory",
    href: "/solutions/research-training-advisory",
    icon: "search",
    cardDescription:
      "Evidence-led research, MEAL, sector diagnostics, capacity-building programmes, and editorial advisory for institutions publishing at global standard.",
    heroTagline:
      "Evidence-led research, MEAL, sector diagnostics, capacity-building programmes, and editorial advisory for institutions.",
    seoDescription:
      "Evidence-led research, MEAL, sector diagnostics, capacity-building programmes and editorial advisory for institutions publishing at global standard.",
    subServices: [
      {
        title: "Sector & Market Research",
        description:
          "Mixed-methods research across development, health, education, agriculture, and the creator economy.",
      },
      {
        title: "MEAL",
        description:
          "Monitoring, evaluation, accountability, and learning frameworks tailored to donor and institutional standards.",
      },
      {
        title: "Institutional Diagnostics",
        description:
          "Organisational reviews, communication audits, and capability assessments for boards and leadership teams.",
      },
      {
        title: "Leadership Training",
        description:
          "Executive programmes on communication, digital, and reputation topics for boards and senior teams.",
      },
      {
        title: "Communications Capacity Building",
        description:
          "Team-level training on writing, media relations, executive presence, and modern content operations.",
      },
      {
        title: "Editorial Advisory",
        description:
          "Publication strategy, editorial standards, and long-form advisory for institutions publishing at scale.",
      },
      {
        title: "Report & Publication Production",
        description:
          "End-to-end production of annual reports, evaluations, sector studies, and institutional publications.",
      },
    ],
    closing: {
      eyebrow: "Ready to Investigate",
      heading: "What question are you trying to answer.",
      copy: "Send us the research brief. We will scope, price, and deliver against donor or institutional standards.",
      primary: { label: "Request a research proposal", href: "/contact" },
    },
  },
];

export const SOLUTIONS_INDEX = {
  heroTitle: "Six solutions. One accountable partner.",
  heroLede:
    "PR & Strategic Communication. Digital Transformation. Creative Media Production. AI & Innovation. Drone & Geospatial Solutions. Research, Training & Advisory.",
  crossCutting: {
    eyebrow: "Cross-Cutting Practices",
    title: "The offerings that sit across our three wings.",
    description:
      "Four newer verticals extend our operating catalogue: event production, software supply, MEAL and editorial, and authorised dealership operations.",
  },
  closing: {
    eyebrow: "Need Help Scoping",
    heading: "Not sure which solution fits.",
    copy: "Tell us what you are trying to achieve. Our team will map it to the right combination of PrimeReach solutions in one conversation.",
    primary: { label: "Contact PrimeReach", href: "/contact" },
    secondary: { label: "Browse case studies", href: "/impact/case-studies" },
  },
} as const;

export const CROSS_CUTTING: CrossCuttingOffering[] = [
  {
    number: "07",
    title: "Event Production & Experiences",
    description:
      "Full-service event production for corporate conferences, government summits, product launches, and cultural events. Multi-camera crews, livestream, LED, on-site editing.",
    cta: "Talk to our events team",
  },
  {
    number: "08",
    title: "Software & Digital Tools Supply",
    description:
      "Licensed reseller of Microsoft, Adobe, Canva Enterprise, and other institutional creative and productivity software. Volume licensing, training, support.",
    cta: "Request a quote",
  },
  {
    number: "09",
    title: "MEAL & Editorial Advisory",
    description:
      "Monitoring, evaluation, accountability, and learning; publication and editorial advisory for institutions publishing reports and evaluations at global standard.",
    cta: "Speak with our advisory",
  },
  {
    number: "10",
    title: "Authorised Dealer Operations",
    description:
      "DJI, Microsoft CSP, Adobe, Hikvision, Dell, HP, Lenovo, Sony, Canon, Blackmagic. Institutional supply with warranty and support.",
    cta: "Browse partnerships",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
