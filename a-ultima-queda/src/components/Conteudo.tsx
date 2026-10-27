import Image from "next/image";
import { conteudo } from "@/lib/content";
import { CtaButton } from "./CtaButton";
import { Reveal, RevealTitle } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Conteudo() {
  return (
    <section id="conteudo" aria-labelledby="conteudo-titulo" className="paper relative scroll-mt-4 overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeader numeral="IV" label="O que você recebe" aside="Sumário do treinamento" />

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative">
              <span
                aria-hidden
                className="display block text-[clamp(11rem,52vw,22rem)] leading-[0.78] text-ink [text-shadow:6px_6px_0_var(--color-red)]"
              >
                30
              </span>
              <h2 id="conteudo-titulo" className="display mt-8 text-[clamp(2.6rem,9vw,5.2rem)]">
                <RevealTitle lines={conteudo.title.map((l) => l.toUpperCase())} />
              </h2>
            </div>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md font-serif text-[1.1rem] leading-relaxed text-ink-soft">{conteudo.intro}</p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-3">
              <Reveal as="figure">
                <div className="relative aspect-[250/324] overflow-hidden bg-ink">
                  <Image src="/images/detalhe-gravata.webp" alt="Detalhe da gravata e do colete" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
                </div>
                <figcaption className="mt-2 font-serif text-xs italic">Fig. 04a — Postura.</figcaption>
              </Reveal>
              <Reveal as="figure" delay={0.1} className="mt-10">
                <div className="relative aspect-[330/404] overflow-hidden bg-ink">
                  <Image src="/images/detalhe-casaco.webp" alt="Textura do casaco de lã em preto e branco" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
                  <span aria-hidden className="absolute inset-x-0 bottom-[22%] h-2 bg-red-tarja" />
                </div>
                <figcaption className="mt-2 font-serif text-xs italic">Fig. 04b — Constância.</figcaption>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <p className="kicker flex justify-between border-b-2 border-ink pb-2">
              <span>Conteúdo</span>
              <span>Etapa</span>
            </p>
            <ol>
              {conteudo.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.n}
                  delay={i * 0.06}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-b border-ink/40 py-6 sm:gap-x-8"
                >
                  <span aria-hidden className="display text-5xl text-red transition-transform duration-500 ease-editorial group-hover:-translate-y-1 sm:text-7xl">
                    {item.n}
                  </span>
                  <div>
                    <h3 className="display text-2xl tracking-wide sm:text-[2.1rem]">{item.title}</h3>
                    <p className="mt-2 font-serif text-[1.02rem] leading-relaxed text-ink-soft">{item.text}</p>
                  </div>
                  <span aria-hidden className="kicker hidden text-ink/60 sm:block">
                    {String(i + 1).padStart(2, "0")}/06
                  </span>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-10">
              <CtaButton href="#oferta" className="w-full sm:w-auto">{conteudo.cta}</CtaButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
