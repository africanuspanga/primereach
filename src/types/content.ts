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
