/**
 * Shared content types for PrimeReach Global Solutions.
 * All site copy lives in `src/data/site-content.ts` and is typed against these.
 */

export type IconName = string; // maps to a lucide-react icon key in `lib/icon-map.ts`

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface ServiceCategory {
  title: string;
  services: string[];
}

export interface ServiceWing {
  slug: string;
  href: string;
  eyebrow: string;
  title: string;
  shortDescription: string;
  icon: IconName;
  areas: string[];
  cta: string;
}

export interface ServiceWingDetail extends ServiceWing {
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  intro: string;
  positioningLine?: string;
  categories: ServiceCategory[];
  image?: string;
}

export interface WhyChooseReason {
  title: string;
  description: string;
  icon: IconName;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: IconName;
}

export interface TimelineEntry {
  year: string;
  /** Short phase label shown beside the year, e.g. "Founding". */
  tag?: string;
  /** Bold headline for the milestone. */
  title?: string;
  description: string;
}

export interface FeatureList {
  title: string;
  items: string[];
  icon?: IconName;
}

export interface SectorGroup {
  title: string;
  icon: IconName;
  items: string[];
}

export interface ClientLogo {
  name: string;
  /** Path under /public/clients — file may not exist yet (empty container). */
  logo: string;
}

export interface ServiceOption {
  value: string;
  label: string;
}

/* ==========================================================================
   v2 information architecture — Solutions · Impact · Capabilities ·
   Flagship Programmes · Insights
   ========================================================================== */

export interface LinkRef {
  label: string;
  href: string;
}

/** Closing call-to-action block used on solution / capability detail pages. */
export interface ClosingCta {
  eyebrow: string;
  heading: string;
  copy: string;
  primary: LinkRef;
  secondary?: LinkRef;
}

export interface SubService {
  title: string;
  description: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

/** One of the six Solutions (with its detail page). */
export interface Solution {
  slug: string;
  number: string;
  title: string;
  href: string;
  icon: IconName;
  /** Short line for the home + index cards. */
  cardDescription: string;
  /** Lede on the detail-page hero. */
  heroTagline: string;
  seoDescription: string;
  /** Optional line under the "What we deliver" heading. */
  deliverIntro?: string;
  subServices: SubService[];
  approach?: ApproachStep[];
  closing: ClosingCta;
  image?: string;
}

/** Cross-cutting offering (07–10) shown on the Solutions index only. */
export interface CrossCuttingOffering {
  number: string;
  title: string;
  description: string;
  cta: string;
}

export interface CaseStudy {
  sector: string;
  client: string;
  title: string;
  summary?: string;
  image: string;
}

export interface FeaturedProject {
  title: string;
  caption: string;
  image: string;
}

export interface ImpactSector {
  title: string;
  description: string;
  count: string;
}

export interface Testimonial {
  quote: string;
  initials: string;
  role: string;
  org: string;
}

export interface RosterClient {
  name: string;
  logo?: string;
}

/** One of the five Capabilities (with its detail page). */
export interface Capability {
  slug: string;
  number: string;
  title: string;
  href: string;
  icon: IconName;
  /** Tile copy on the Capabilities index. */
  summary: string;
  /** Tile copy on the home "five capabilities" row. */
  summaryHome: string;
  /** Lede on the detail-page hero. */
  heroTagline: string;
  heroTitle: string;
  bodyHeading: string;
  bodyCopy: string;
  bullets: string[];
  visualLabel: string;
  /** Special detail renderer. */
  variant?: "list" | "network" | "deployment";
  image?: string;
}

export interface RegionCoverage {
  region: string;
  crew?: string;
}

export interface DeployStep {
  time: string;
  title: string;
  description: string;
}

export type ProgrammeStatus = "live" | "pilot" | "dev";

export interface Programme {
  slug?: string;
  title: string;
  status: ProgrammeStatus;
  statusLabel: string;
  description: string;
  stats?: Stat[];
  cta?: LinkRef & { variant?: "primary" | "ink" | "ghost" };
  image?: string;
}

export type InsightType = "Article" | "Report" | "News" | "Event";

export interface Insight {
  type: InsightType;
  title: string;
  meta: string;
  image?: string;
  is_teaser?: boolean;
  is_featured?: boolean;
}

export interface Department {
  title: string;
  email: string;
}
