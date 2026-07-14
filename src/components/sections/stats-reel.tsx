import { getHome, getReelStats } from "@/lib/content";
import { HOME, REEL_STATS } from "@/data/site-content";
import { Reveal } from "@/components/ui/reveal";
import { StatCounter } from "@/components/ui/stat-counter";

export async function StatsReel() {
  const [home, stats] = await Promise.all([getHome(), getReelStats()]);
  const data = (home as typeof HOME | null) ?? HOME;

  return (
    <section className="bg-ink py-16 lg:py-20">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-3 lg:grid-cols-5">
          {(stats.length > 0 ? stats : REEL_STATS).map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.05}
              className="last:col-span-2 sm:last:col-span-1"
            >
              <StatCounter
                value={stat.value}
                className="font-display text-[2.6rem] font-light leading-none text-bronze-300 lg:text-[3.25rem]"
              />
              <p className="mt-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white/55">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-center font-display text-lg font-light italic text-white/70 lg:text-xl">
          {data.reelCaption}
        </p>
      </div>
    </section>
  );
}
