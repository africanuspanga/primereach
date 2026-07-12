import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

type Align = "left" | "center";

/** Editorial section header: eyebrow + serif display title + supporting line. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: Align;
  onDark?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "mx-auto max-w-3xl items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "text-pretty font-display text-[2rem] font-normal leading-[1.08] sm:text-4xl lg:text-[2.85rem]",
          onDark ? "text-white" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-[1.05rem] leading-relaxed",
            align === "center" && "mx-auto",
            onDark ? "text-white/65" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
