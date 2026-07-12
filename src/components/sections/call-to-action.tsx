import Image from "next/image";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { FINAL_CTA } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Cinematic closing call-to-action over a golden-hour cityscape.
 * Defaults to the site-wide "Let's Build What Matters" copy.
 */
export function CallToAction({
  heading = FINAL_CTA.heading,
  copy = FINAL_CTA.copy,
  eyebrow = "Let’s Work Together",
}: {
  heading?: string;
  copy?: string;
  eyebrow?: string;
}) {
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
            {heading}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            {copy}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg" withArrow>
              Start a Conversation
            </Button>
            <Button href={CONTACT.phonePrimary.href} size="lg" variant="onDark">
              <Phone className="size-4" />
              Call PrimeReach
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
