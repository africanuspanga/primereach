import { getHome } from "@/lib/content";
import { HOME } from "@/data/site-content";
import { Reveal } from "@/components/ui/reveal";

export async function PositionBand() {
  const home = (await getHome()) as typeof HOME | null;
  const data = home ?? HOME;

  return (
    <section className="border-y border-ink/10 bg-paper-dim py-16 lg:py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-pretty font-display text-[1.5rem] font-light italic leading-snug text-ink sm:text-3xl lg:text-[2.15rem]">
            {data.positionLede}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
