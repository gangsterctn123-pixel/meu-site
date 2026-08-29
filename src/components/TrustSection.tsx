import { HeartIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { trustCards } from "../data/content";
import { Reveal } from "./Reveal";

const icons = { heart: HeartIcon, lock: LockClosedIcon };

export function TrustSection() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
            Sua Confiança é Nossa Prioridade
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg">
            Conteúdo transparente e uma compra sem surpresas
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {trustCards.map((card, i) => {
            const Icon = icons[card.icon as keyof typeof icons];
            return (
              <Reveal
                key={card.title}
                delay={i * 100 + 100}
                className="rounded-2xl border border-primary p-4 text-center md:p-6"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white md:mb-4 md:h-16 md:w-16">
                  <Icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="mb-1 text-sm font-bold md:mb-2 md:text-lg">{card.title}</h3>
                <p className="text-xs md:text-sm">{card.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
