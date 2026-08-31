import { GiftIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { bonusFootnote, bonusIntro, bonuses } from "../data/content";
import { BonusVisual } from "./BonusVisual";
import { Reveal } from "./Reveal";

export function BonusSection() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-8 text-center md:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-white">
            <GiftIcon className="h-5 w-5" />
            <span className="text-sm font-bold">BÔNUS EXCLUSIVOS</span>
          </div>
          <h2 className="mx-auto max-w-3xl text-2xl font-bold md:text-3xl lg:text-4xl">
            {bonusIntro}
          </h2>
        </Reveal>

        <div className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-3">
          {bonuses.map((bonus, i) => (
            <Reveal
              key={bonus.label}
              delay={i * 100}
              className="overflow-hidden rounded-xl border-2 border-primary/50 bg-white text-foreground shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="relative">
                <div className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-sm font-bold text-white">
                  {bonus.label}
                </div>
                <BonusVisual icon={bonus.icon} tone={bonus.tone} />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{bonus.title}</h3>
                <div className="my-3 border-t border-primary/30" />
                <div>{bonus.text}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-8 text-center">
          <div className="mx-auto inline-flex max-w-2xl items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md md:text-base">
            <SparklesIcon className="h-5 w-5 shrink-0" />
            <span>{bonusFootnote}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
