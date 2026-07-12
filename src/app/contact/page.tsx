import type { Metadata } from "next";
import { FINAL_CTA } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactDetails } from "@/components/contact/contact-details";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact PrimeReach Global Solutions | Dar es Salaam, Tanzania",
  description:
    "Start a strategic conversation with PrimeReach Global Solutions. Head office in Mikocheni, Dar es Salaam, Tanzania. Call, email or WhatsApp our team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s build what{" "}
            <span className="serif-italic text-bronze-300">matters.</span>
          </>
        }
        description={FINAL_CTA.copy}
        image={MEDIA.pageHero.contact}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(11,20,29,0.4)] sm:p-8 lg:p-10">
              <h2 className="font-display text-3xl font-light text-ink">Send us a message</h2>
              <p className="mt-2 text-sm text-muted">
                Share a few details and we’ll route your enquiry to the right team.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          {/* Details + map */}
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
      </section>
    </>
  );
}
