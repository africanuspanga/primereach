import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { LegalBody } from "@/components/layout/legal-body";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects the information you share with us.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="This is a placeholder policy. Replace it with PrimeReach’s finalised privacy information before publishing."
      />
      <LegalBody lastUpdated="12 July 2026">
        <h2>Overview</h2>
        <p>
          {SITE.name} (“PrimeReach”, “we”, “us”) respects your privacy. This policy
          explains what information we collect through this website, how we use it, and
          the choices available to you. It will be updated once the company’s finalised
          legal text is provided.
        </p>

        <h2>Information We Collect</h2>
        <p>
          When you contact us through the enquiry form, by email, by telephone or via
          WhatsApp, we collect the details you choose to provide — such as your name,
          organisation, email address, telephone number, country, and the content of
          your enquiry.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use the information you provide solely to respond to your enquiry, to
          scope potential engagements, and to maintain our professional relationship. We
          do not sell your personal information.
        </p>

        <h2>Data Retention & Security</h2>
        <p>
          We retain enquiry information only for as long as necessary to serve the
          purpose for which it was provided, and we apply reasonable measures to protect
          it. Sensitive institutional and executive engagements are handled under
          NDA-grade discretion.
        </p>

        <h2>Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of the personal
          information you have shared with us at any time by contacting us.
        </p>

        <h2>Contact</h2>
        <p>
          For any privacy questions, email{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
          <a href={CONTACT.phonePrimary.href}>{CONTACT.phonePrimary.display}</a>.
        </p>
      </LegalBody>
    </>
  );
}
