import { checkoutHref, siteConfig } from "@/lib/config";
import { oferta } from "@/lib/content";
import { CtaButton } from "./CtaButton";
import { Reveal, RevealTitle } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Oferta() {
  return (
    <section id="oferta" aria-labelledby="oferta-titulo" className="paper relative scroll-mt-0 py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeader numeral="VI" label="A Decisão" aside="Inscrição" />

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 id="oferta-titulo" className="display text-[clamp(3.2rem,12vw,9rem)] lg:col-span-7">
            <RevealTitle lines={["A decisão", "é sua."]} />
          </h2>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="font-serif text-xl leading-relaxed text-ink-soft sm:text-2xl">{oferta.subtitle}</p>
          </Reveal>
        </div>

        {/* Ficha de inscrição: moldura de fio duplo, como um cupom de jornal */}
        <Reveal className="mx-auto mt-14 max-w-4xl">
          <div className="border-2 border-ink bg-paper-light p-1.5">
            <div className="border border-ink px-5 py-8 sm:px-12 sm:py-12">
              <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-2">
                <p className="kicker">Treinamento digital</p>
                <p className="kicker text-red-deep">Edição 001</p>
              </div>

              <p className="display mt-8 pt-[0.1em] text-[clamp(3.2rem,13vw,7rem)] text-ink">{oferta.product.toUpperCase()}</p>
              <span aria-hidden className="mt-3 block h-2 w-28 bg-red-tarja sm:h-3 sm:w-40" />
              <p className="mt-4 font-serif text-xl italic">{oferta.description}</p>

              <ul className="mt-8 grid border-t border-ink sm:grid-cols-2">
                {oferta.includes.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-4 border-b border-ink/40 py-4 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6">
                    <span className="display text-xl text-red">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-[1.08rem]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-stretch gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="kicker text-ink-soft">Investimento</p>
                  {siteConfig.price ? (
                    <>
                      <p className="display mt-1 text-6xl sm:text-7xl">{siteConfig.price}</p>
                      {siteConfig.priceNote ? <p className="mt-1 font-serif text-base italic">{siteConfig.priceNote}</p> : null}
                    </>
                  ) : (
                    <p className="mt-2 max-w-xs font-serif text-lg italic">{oferta.priceFallback}</p>
                  )}
                </div>
                <CtaButton href={checkoutHref} className="w-full sm:w-auto">
                  {oferta.cta}
                </CtaButton>
              </div>

              {siteConfig.accessInfo || siteConfig.refundPolicy ? (
                <div className="mt-8 space-y-1 border-t border-ink/40 pt-4 font-serif text-sm text-ink-soft">
                  {siteConfig.accessInfo ? <p>{siteConfig.accessInfo}</p> : null}
                  {siteConfig.refundPolicy ? <p>{siteConfig.refundPolicy}</p> : null}
                </div>
              ) : null}
            </div>
          </div>
          <p className="mt-4 text-center font-serif text-sm italic text-ink-soft">
            Conteúdo educacional. Não substitui acompanhamento profissional quando necessário.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
