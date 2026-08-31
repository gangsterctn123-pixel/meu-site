import { galleryCards } from "../data/content";
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

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 text-foreground sm:grid-cols-2 lg:grid-cols-3">
          {galleryCards.map((card, i) => (
            <Reveal
              key={card.image}
              delay={i * 80}
              className="overflow-hidden rounded-2xl border-2 border-primary/60 bg-surface shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <img src={card.image} alt={card.caption} className="w-full h-auto object-contain" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{card.caption}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
