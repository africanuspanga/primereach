import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

/**
 * Cinematic inner-page hero. A photograph sits under a heavy navy wash so the
 * transparent site header and white type stay legible.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pt-32 pb-16 lg:pt-44 lg:pb-24">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover opacity-60"
        />
      )}
      <div className="overlay-ink absolute inset-0" />
      <div className="absolute inset-0 bg-ink-900/40" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
      <div
        className="pointer-events-none absolute -right-40 top-10 size-[26rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #b87c42 0%, transparent 70%)" }}
      />

      <div className="container-x relative">
        <Reveal className="max-w-3xl">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-pretty font-display text-4xl font-light leading-[1.04] text-white sm:text-5xl lg:text-[4.25rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {description}
            </p>
          )}
        </Reveal>
        {children && <div className="relative mt-12">{children}</div>}
      </div>
    </section>
  );
}
