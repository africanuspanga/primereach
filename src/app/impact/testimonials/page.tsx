import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { getTestimonials } from "@/lib/content";
import { MEDIA } from "@/lib/images";
import { PageHero } from "@/components/sections/page-hero";
import { CallToAction } from "@/components/sections/call-to-action";
import { ImpactTabs } from "@/components/impact/impact-tabs";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Testimonials | Impact",
  description:
    "Named testimonials from real institutional clients. Every quote is on the record.",
  alternates: { canonical: "/impact/testimonials" },
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHero
        eyebrow="In Their Own Words"
        title={
          <>
            What our clients <span className="serif-italic text-bronze-300">say.</span>
          </>
        }
        description="Named testimonials from real institutional clients. Every quote below is on the record."
        image={MEDIA.pageHero.clients}
      />

      <section className="bg-paper py-16 lg:py-24">
        <div className="container-x">
          <ImpactTabs />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial, i) => (
              <Reveal key={`${testimonial.initials}-${testimonial.org}`} delay={(i % 2) * 0.06} className="h-full">
                <figure className="flex h-full flex-col rounded-[1.5rem] border border-ink/10 border-l-4 border-l-bronze bg-white p-8 lg:p-10">
                  <Quote className="size-8 text-bronze/30" />
                  <blockquote className="mt-4 flex-1 font-display text-lg font-light italic leading-relaxed text-ink/85">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-4 border-t border-ink/10 pt-6">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink font-display text-lg font-normal text-bronze-300">
                      {testimonial.initials}
                    </span>
                    <span>
                      <strong className="block font-medium text-ink">{testimonial.role}</strong>
                      <span className="text-sm text-muted">{testimonial.org}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallToAction eyebrow="Ready to Talk" heading="Let's write the next one together." />
    </>
  );
}
