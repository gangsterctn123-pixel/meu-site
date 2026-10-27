import Image from "next/image";
import { confronto } from "@/lib/content";
import { Reveal, RevealTitle } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Confronto() {
  return (
    <section id="confronto" aria-labelledby="confronto-titulo" className="paper relative scroll-mt-4 py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeader numeral="II" label="O Confronto" aside="Sobre intenção e comportamento" />

        <h2 id="confronto-titulo" className="display mt-8 text-[clamp(2.9rem,10.5vw,8.5rem)] text-ink">
          <RevealTitle lines={["O maior confronto", "não acontece", "lá fora."]} />
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl font-serif text-xl italic text-red-deep sm:text-2xl">{confronto.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 border-t border-ink pt-10 lg:grid-cols-12 lg:gap-12">
          <Reveal as="figure" className="lg:col-span-5 lg:sticky lg:top-8 lg:self-start">
            <div className="relative aspect-[500/504] overflow-hidden bg-ink">
              <Image
                src="/images/confronto.webp"
                alt="Detalhe em preto e branco do rosto e do colarinho de um homem em silêncio"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover grayscale"
              />
              <span aria-hidden className="absolute left-0 top-[18%] h-[7%] w-[38%] bg-red-tarja mix-blend-multiply" />
            </div>
            <figcaption className="mt-3 flex justify-between border-b border-ink/50 pb-2 font-serif text-sm italic">
              <span>{confronto.caption}</span>
              <span className="kicker not-italic">P. 02</span>
            </figcaption>
          </Reveal>

          <div className="lg:col-span-7">
            <ol className="divide-y divide-ink/40 border-y border-ink/40">
              {confronto.paragraphs.map((p, i) => (
                <Reveal as="li" key={p.n} delay={i * 0.05} className="grid grid-cols-[3.25rem_1fr] gap-x-4 py-7 sm:grid-cols-[5rem_1fr] sm:gap-x-6">
                  <span className="display text-4xl text-red sm:text-6xl" aria-hidden>
                    {p.n}
                  </span>
                  <div>
                    <h3 className="kicker text-[0.78rem]">{p.heading}</h3>
                    <p className={`mt-2 font-serif text-[1.08rem] leading-[1.7] text-ink-soft sm:text-[1.15rem] ${i === 0 ? "drop-cap" : ""}`}>
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              <blockquote className="mt-10 border-l-4 border-red pl-5 font-masthead text-2xl leading-snug font-bold uppercase sm:text-3xl">
                A liberdade começa quando você para de negociar consigo mesmo.
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
