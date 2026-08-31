import { showcaseCards } from "../data/content";
import { BoldText } from "./BoldText";
import { FichaMock } from "./FichaMock";
import { Reveal } from "./Reveal";

export function ContentShowcase() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
            O que você encontra no acesso ao material
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-base md:text-lg">
            Material em PDF com 25 páginas: 25 sessões de movimentos, orientações de uso e cuidados
            importantes.
          </p>
          <p className="mx-auto max-w-2xl text-base font-semibold text-special md:text-2xl">
            CADA MOVIMENTO TEM DUAS FASES E CINCO PASSOS
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 text-foreground md:grid-cols-3">
          {showcaseCards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 100}
              className="overflow-hidden rounded-2xl border-2 border-primary/60 bg-surface shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-1.5 bg-primary/10 p-2.5">
                {card.fichas.map((number) => (
                  <FichaMock key={number} number={number} />
                ))}
              </div>
              <div className="p-4 text-center">
                <h3 className="mb-4 text-xl font-semibold">{card.title}</h3>
                <div className="my-3 border-t border-primary/30" />
                <p>
                  <BoldText text={card.text} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
