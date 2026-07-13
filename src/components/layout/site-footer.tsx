import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, CTA, SITE } from "@/lib/constants";
import { Logo } from "@/components/layout/logo";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Mission & Vision", href: "/about#mission-vision" },
  { label: "Our Values", href: "/about#values" },
  { label: "Our Journey", href: "/about#journey" },
  { label: "Clients & Sectors", href: "/impact/clients-sectors" },
  { label: "Insights", href: "/insights" },
];

const solutionsLinks = [
  { label: "PR & Strategic Communication", href: "/solutions/pr-strategic-communication" },
  { label: "Digital Transformation", href: "/solutions/digital-transformation" },
  { label: "Creative Media Production", href: "/solutions/creative-media-production" },
  { label: "AI & Innovation", href: "/solutions/ai-innovation" },
  { label: "Drone & Geospatial", href: "/solutions/drone-geospatial" },
  { label: "Research, Training & Advisory", href: "/solutions/research-training-advisory" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-bronze/50 bg-ink text-white/70">
      {/* Top band — serif invitation */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col gap-6 py-14 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl text-pretty font-display text-3xl font-light leading-tight text-white sm:text-4xl">
            Building Africa’s{" "}
            <span className="serif-italic text-bronze-300">visibility</span> infrastructure.
          </h2>
          <Link
            href={CTA.primary.href}
            className="group inline-flex items-center gap-3 self-start rounded-full bg-bronze px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-bronze-600 sm:self-auto"
          >
            {CTA.primary.label}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Logo onDark />
          <p className="mt-6 eyebrow text-bronze-300">{SITE.slogan}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            Africa’s integrated digital infrastructure group. We build the
            communication, media, research, and technology backbone that powers
            institutions and creators across the continent.
          </p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-white/45">
            Dar es Salaam, Tanzania
            <br />
            Registered under the laws of the United Republic of Tanzania
          </address>
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>Company</FooterHeading>
          <FooterList links={companyLinks} />
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Solutions</FooterHeading>
          <FooterList links={solutionsLinks} />
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Reach Us</FooterHeading>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-bronze-300" />
              <span className="text-white/55">
                {CONTACT.address.city}, {CONTACT.address.country}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-bronze-300" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="break-all text-white/55 transition-colors hover:text-white"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-bronze-300" />
              <span className="flex flex-col gap-1">
                <a href={CONTACT.phonePrimary.href} className="text-white/55 transition-colors hover:text-white">
                  {CONTACT.phonePrimary.display}
                </a>
                <a href={CONTACT.phoneSecondary.href} className="text-white/55 transition-colors hover:text-white">
                  {CONTACT.phoneSecondary.display}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-bronze-300" />
              <span className="text-white/55">
                Monday to Friday, 08:30 to 17:30 EAT
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/45 sm:flex-row">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="eyebrow text-white">{children}</h3>;
}

function FooterList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-4 space-y-3 text-sm">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-white/55 transition-colors hover:text-white">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
