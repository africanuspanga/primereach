import type { NavItem } from "@/types/content";

/**
 * Core site + organisation constants.
 * Frontend-only build — no backend endpoints are wired yet.
 */

export const SITE = {
  name: "PrimeReach Global Solutions",
  shortName: "PrimeReach",
  slogan: "Innovate. Create. Reach.",
  positioning:
    "Building Communication, Media, and Visibility Infrastructure that Powers Institutions and Communities.",
  url: "https://www.primereachglobal.co.tz",
  domain: "www.primereachglobal.co.tz",
  // v2 site copy dates the founding to 2022 (see About › Our Journey).
  foundedYear: "2022",
} as const;

export const CONTACT = {
  email: "info@primereachglobal.co.tz",
  phonePrimary: {
    display: "+255 740 223 545",
    href: "tel:+255740223545",
  },
  phoneSecondary: {
    display: "+255 752 213 012",
    href: "tel:+255752213012",
  },
  // WhatsApp uses the primary line until PrimeReach confirms a dedicated number.
  whatsapp: {
    display: "+255 740 223 545",
    href: "https://wa.me/255740223545",
  },
  address: {
    lines: [
      "Plot 451, Prince Street",
      "Mwai Kibaki Road",
      "Mikocheni",
      "Dar es Salaam, Tanzania",
    ],
    city: "Dar es Salaam",
    country: "Tanzania",
  },
  website: {
    display: "www.primereachglobal.co.tz",
    href: "https://www.primereachglobal.co.tz",
  },
} as const;

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "The Company", href: "/about#company" },
      { label: "Mission & Vision", href: "/about#mission-vision" },
      { label: "Our Core Values", href: "/about#values" },
      { label: "Our Journey", href: "/about#journey" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "PR & Strategic Communication", href: "/solutions/pr-strategic-communication" },
      { label: "Digital Transformation", href: "/solutions/digital-transformation" },
      { label: "Creative Media Production", href: "/solutions/creative-media-production" },
      { label: "AI & Innovation", href: "/solutions/ai-innovation" },
      { label: "Drone & Geospatial Solutions", href: "/solutions/drone-geospatial" },
      { label: "Research, Training & Advisory", href: "/solutions/research-training-advisory" },
    ],
  },
  {
    label: "Impact",
    href: "/impact",
    children: [
      { label: "Case Studies", href: "/impact/case-studies" },
      { label: "Featured Projects", href: "/impact/featured-projects" },
      { label: "Clients & Sectors", href: "/impact/clients-sectors" },
      { label: "Testimonials", href: "/impact/testimonials" },
    ],
  },
  {
    label: "Capabilities",
    href: "/capabilities",
    children: [
      { label: "Technology", href: "/capabilities/technology" },
      { label: "Creative Studio", href: "/capabilities/creative-studio" },
      { label: "Research", href: "/capabilities/research" },
      { label: "Network", href: "/capabilities/network" },
      { label: "Rapid Deployment", href: "/capabilities/rapid-deployment" },
    ],
  },
  {
    label: "Flagship",
    href: "/programmes",
    children: [
      { label: "Tanzania Creative Market Access", href: "/programmes/tcma" },
      { label: "Future Programmes", href: "/programmes/future" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const CTA = {
  primary: { label: "Start a Brief", href: "/contact" },
  explore: { label: "Explore Our Solutions", href: "/solutions" },
  conversation: { label: "Contact PrimeReach", href: "/contact" },
} as const;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}
