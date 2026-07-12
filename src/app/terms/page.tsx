import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { LegalBody } from "@/components/layout/legal-body";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms governing your use of the ${SITE.name} website.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="This is a placeholder document. Replace it with PrimeReach’s finalised terms before publishing."
      />
      <LegalBody lastUpdated="12 July 2026">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using the {SITE.name} website, you agree to these Terms of
          Use. If you do not agree, please discontinue use of the site.
        </p>

        <h2>Use of the Website</h2>
        <p>
          This website is provided for general information about PrimeReach’s services,
          network and capabilities. You agree to use it lawfully and not to attempt to
          disrupt, misuse or gain unauthorised access to any part of it.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on this website — including text, graphics, logos and layout — is
          the property of {SITE.name} or its licensors and is protected by applicable
          intellectual-property laws. It may not be reproduced without permission.
        </p>

        <h2>No Warranty</h2>
        <p>
          The website content is provided “as is” without warranties of any kind. While
          we strive for accuracy, we do not guarantee that all information is complete or
          current at all times.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE.name} shall not be liable for
          any indirect or consequential loss arising from the use of this website.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms may be sent to{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
      </LegalBody>
    </>
  );
}
