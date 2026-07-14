import Link from "next/link";
import { getCapabilities, getHome } from "@/lib/content";
import { CAPABILITIES } from "@/data/capabilities";
import { HOME } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";

export async function CapabilitiesRow() {
  const [capabilities, home] = await Promise.all([getCapabilities(), getHome()]);
  const data = (home as typeof HOME | null) ?? HOME;

  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow={data.capabilities.eyebrow}
          title={
            <>
              Five capabilities{" "}
              <span className="serif-italic text-bronze-600">behind every project.</span>
            </>
          }
          description={data.capabilities.description}
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {(capabilities.length > 0 ? capabilities : CAPABILITIES).map((capability, i) => (
            <Reveal key={capability.slug} delay={(i % 5) * 0.05} className="h-full">
              <Link
                href={capability.href}
                className="group flex h-full flex-col items-center rounded-2xl border border-ink/10 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-bronze/40 hover:shadow-[0_24px_50px_-36px_rgba(11,20,29,0.5)]"
              >
                <span className="grid size-14 place-items-center rounded-full bg-paper-dim text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-bronze-300">
                  <Icon name={capability.icon} className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-normal text-ink">
                  {capability.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {capability.summaryHome}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
