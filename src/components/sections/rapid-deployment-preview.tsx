import { Timer } from "lucide-react";
import { RAPID_DEPLOYMENT } from "@/data/site-content";
import { MEDIA } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ImageFrame } from "@/components/ui/image-frame";

export function RapidDeploymentPreview() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-15" />
      <div className="container-x relative grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <ImageFrame
            src={MEDIA.deployment[0]}
            alt="A PrimeReach videographer filming in the field"
            aspect="aspect-[5/4]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute -right-3 -top-3 hidden rounded-2xl bg-bronze px-5 py-4 text-white shadow-lg sm:block">
            <p className="font-display text-3xl font-light leading-none">4–24h</p>
            <p className="mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white/85">
              Mobilised
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow onDark>On-Call Nationwide</Eyebrow>
            <h2 className="mt-6 text-pretty font-display text-[2rem] font-light leading-[1.1] text-white sm:text-4xl lg:text-[2.75rem]">
              Wherever the story breaks,{" "}
              <span className="serif-italic text-bronze-300">we’re already there.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-white/70">
              {RAPID_DEPLOYMENT.previewCopy}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {RAPID_DEPLOYMENT.deploys.items.map((item, i) => (
              <Reveal
                key={item}
                delay={i * 0.05}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
              >
                <Icon
                  name={RAPID_DEPLOYMENT.deploys.icon}
                  className="mt-0.5 size-4 shrink-0 text-bronze-300"
                />
                <span className="text-sm text-white/80">{item}</span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href="/network" withArrow>
                Explore Our Nationwide Network
              </Button>
              <span className="inline-flex items-center gap-2 text-sm text-white/60">
                <Timer className="size-4 text-bronze-300" />
                Crews typically mobilised in 4–24 hours
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
