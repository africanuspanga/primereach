import { SERVICE_WINGS } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ServiceWingCard } from "@/components/services/service-wing-card";

export function ServiceWings({
  eyebrow = "One Integrated Ecosystem",
  title,
  description,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow={eyebrow}
          title={
            title ?? (
              <>
                Three specialised wings.{" "}
                <span className="serif-italic text-bronze-600">End-to-end capability.</span>
              </>
            )
          }
          description={description}
        />
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {SERVICE_WINGS.map((wing, i) => (
            <Reveal key={wing.slug} delay={i * 0.1} className="h-full">
              <ServiceWingCard wing={wing} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
