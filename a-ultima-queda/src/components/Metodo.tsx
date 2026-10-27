import { metodo } from "@/lib/content";
import { CtaButton } from "./CtaButton";
import { Reveal, RevealTitle } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Metodo() {
  return (
    <section id="metodo" aria-labelledby="metodo-titulo" className="relative scroll-mt-4 bg-paper-light py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeader numeral="III" label="O Método" aside="Quatro etapas, uma direção" />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="metodo-titulo" className="display text-[clamp(2.9rem,10vw,7.5rem)] lg:col-span-8">
            <RevealTitle lines={["Disciplina não", "nasce do acaso."]} />
          </h2>
          <Reveal className="lg:col-span-4" delay={0.2}>
            <p className="font-serif text-xl italic text-red-deep sm:text-2xl">{metodo.subtitle}</p>
            <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-ink-soft">{metodo.intro}</p>
          </Reveal>
        </div>

        <ol className="mt-14 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
          {metodo.pillars.map((pillar, i) => (
            <Reveal
              as="li"
              key={pillar.n}
              delay={i * 0.12}
              className="group relative border-b border-ink/50 py-8 sm:px-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:px-6 lg:py-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <div className="flex items-start justify-between">
                <span aria-hidden className="display text-[5.5rem] leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)] transition-colors duration-500 group-hover:text-red sm:text-[7rem]">
                  {pillar.n}
                </span>
                <span aria-hidden className="mt-3 h-3 w-3 bg-red" />
              </div>
              <h3 className="display mt-6 text-4xl tracking-wide">
                <span className="sr-only">{pillar.n} — </span>
                {pillar.title}
              </h3>
              <div className="my-4 h-px w-12 bg-red" />
              <p className="font-serif text-[1.08rem] leading-relaxed">{pillar.text}</p>
              <p className="mt-3 font-serif text-sm italic text-ink-soft">{pillar.detail}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-col items-start gap-4 border-t border-ink pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-masthead text-lg font-bold uppercase leading-snug">
            Cada etapa é uma decisão. A primeira é começar.
          </p>
          <CtaButton href="#oferta" size="md" className="w-full sm:w-auto">
            Ver a oferta
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
