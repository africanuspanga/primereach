import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, SITE } from "@/lib/constants";
import { Logo } from "@/components/layout/logo";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Vision", href: "/about#vision" },
  { label: "Our Mission", href: "/about#mission" },
  { label: "Our Journey", href: "/about#journey" },
  { label: "Clients & Sectors", href: "/clients-sectors" },
];

const serviceLinks = [
  { label: "PR, Media & Strategic Communication", href: "/services/pr-media-communications" },
  { label: "Research, Training & Consultancy", href: "/services/research-training-consultancy" },
  { label: "Technology, Solutions & Emerging Tech", href: "/services/technology-solutions" },
  { label: "Creator Network", href: "/network#creators" },
  { label: "Rapid Deployment", href: "/network#rapid-deployment" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink-900 text-white/70">
      {/* Top band — serif invitation */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col gap-6 py-14 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl text-pretty font-display text-3xl font-light leading-tight text-white sm:text-4xl">
            Let’s build what <span className="serif-italic text-bronze-300">matters</span>.
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 self-start rounded-full bg-bronze px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-bronze-600 sm:self-auto"
          >
            Start a Conversation
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Logo onDark />
          <p className="mt-6 eyebrow text-bronze-300">{SITE.slogan}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            PrimeReach Global Solutions builds communication, media, research and
            technology infrastructure that powers institutions and communities across
            Africa.
          </p>
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>Company</FooterHeading>
          <FooterList links={companyLinks} />
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Services</FooterHeading>
          <FooterList links={serviceLinks} />
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Contact</FooterHeading>
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
