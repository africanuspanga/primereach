import Image from "next/image";
import { Phone } from "lucide-react";
import { getFinalCta, getContact } from "@/lib/content";
import { CONTACT } from "@/lib/constants";
import type { ContactSettings } from "@/lib/content/settings";
import { FINAL_CTA } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

export async function CallToAction({
  heading,
  copy,
  eyebrow = "Let’s Work Together",
}: {
  heading?: string;
  copy?: string;
  eyebrow?: string;
}) {
  const [finalCta, contact] = await Promise.all([getFinalCta(), getContact()]);
  const cta = (finalCta as typeof FINAL_CTA | null) ?? FINAL_CTA;
  const siteContact = (contact as ContactSettings | null) ?? (CONTACT as unknown as ContactSettings);

  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 lg:py-32">
      <Image
        src={MEDIA.ctaBand}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="overlay-ink absolute inset-0" />
      <div className="absolute inset-0 bg-ink-900/40" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <div className="container-x relative">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h2 className="mt-6 text-pretty font-display text-4xl font-light leading-[1.05] text-white sm:text-5xl lg:text-[3.75rem]">
            {heading ?? cta.heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            {copy ?? cta.copy}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg" withArrow>
              Contact PrimeReach
            </Button>
            <Button href={siteContact.phonePrimary.href} size="lg" variant="onDark">
              <Phone className="size-4" />
              Call our office
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
