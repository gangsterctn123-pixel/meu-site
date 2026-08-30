import { FireIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { menuHighlights, menuNotes } from "../data/content";
import { Reveal } from "./Reveal";

export function MenuHighlights() {
  return (
    <section id="cardapio" className="bg-cream py-20">
      <div className="mx-auto w-full max-w-7xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-widest text-fire uppercase">Cardápio</span>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-ink sm:text-5xl">
            Destaques da casa
          </h2>
          <p className="mt-3 text-ink/70">
            Os pratos mais pedidos por quem visita o Matuto's Grill — churrasco grego feito do jeito
            que o cliente já conhece e recomenda.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {menuHighlights.map((item, i) => (
            <Reveal key={item.name} delay={i * 100}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-card">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-fire/10 text-fire">
                  <FireIcon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-2xl tracking-wide text-ink">{item.name}</h3>
                <p className="text-sm leading-relaxed text-ink/70">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mx-auto mt-12 max-w-3xl rounded-2xl bg-charcoal p-8">
          <p className="mb-4 text-sm font-bold tracking-widest text-gold-light uppercase">
            O que mais tem por aqui
          </p>
          <ul className="space-y-3">
            {menuNotes.map((note) => (
              <li key={note} className="flex items-start gap-3 text-cream/90">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-fire-light" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
