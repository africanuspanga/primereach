import type { Metadata } from "next";
import { CONTACT_PAGE, DEPARTMENTS } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactDetails } from "@/components/contact/contact-details";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact PrimeReach Global Solutions | Dar es Salaam, Tanzania",
  description:
    "Tell us the outcome, the audience, and the timing. A member of our team will be back to you within one business day. Call, email or WhatsApp our Dar es Salaam office.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact PrimeReach"
        title={CONTACT_PAGE.heroTitle}
        description={CONTACT_PAGE.heroSupporting}
        image={MEDIA.pageHero.contact}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-5 lg:gap-14">
          <Reveal className="lg:col-span-3">
            <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(11,20,29,0.4)] sm:p-8 lg:p-10">
              <h2 className="font-display text-3xl font-light text-ink">Send us a message</h2>
              <p className="mt-2 text-sm text-muted">
                Share a few details and we&apos;ll route your enquiry to the right team.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <ContactDetails />
            <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-ink/10">
              <iframe
                title="PrimeReach Global Solutions — Mikocheni, Dar es Salaam"
                src="https://www.google.com/maps?q=Mikocheni%2C%20Dar%20es%20Salaam%2C%20Tanzania&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full"
              />
            </div>
          </Reveal>
        </div>

        <div className="container-x mt-16 lg:mt-24">
          <SectionHeading
            eyebrow={CONTACT_PAGE.directoryEyebrow}
            title={CONTACT_PAGE.directoryTitle}
            description={CONTACT_PAGE.directoryDescription}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((department, i) => (
              <Reveal key={department.email} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-2xl border border-ink/10 border-l-[3px] border-l-bronze bg-white p-6">
                  <h3 className="font-display text-lg font-normal text-ink">
                    {department.title}
                  </h3>
                  <a
                    href={`mailto:${department.email}`}
                    className="mt-1.5 block break-all text-sm font-medium text-bronze-600 transition-colors hover:text-bronze"
                  >
                    {department.email}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
