import { SparklesIcon } from "@heroicons/react/24/outline";
import { GiftIcon, ShieldCheckIcon, CheckIcon } from "@heroicons/react/24/solid";
import { bonuses, checkoutUrl } from "../data/content";
import { Reveal } from "./Reveal";

export function OfferSection() {
  return (
    <section id="oferta">
      <div className="flex items-center justify-center gap-3 bg-primary p-4 text-white">
        <SparklesIcon className="h-5 w-5" />
        <span className="text-xs font-semibold lg:text-base lg:font-bold">
          OFERTA ESPECIAL POR TEMPO LIMITADO!
        </span>
        <SparklesIcon className="h-5 w-5" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <Reveal className="mb-8 text-center md:mb-12">
          <span className="mb-6 inline-block rounded-full bg-primary px-4 py-2 text-sm font-bold text-white">
            93% DE DESCONTO SOMENTE HOJE
          </span>
          <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
            Material: 25 Sessões de Movimentos para Glúteos com Elástico Mini Band
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg">Conheça o conteúdo antes de comprar.</p>
          <p className="mx-auto max-w-2xl text-base md:text-lg">
            Você recebe acesso a um material visual, organizado e pronto para consultar.
          </p>
        </Reveal>

        <div className="mx-auto max-w-lg">
          <Reveal
            delay={100}
            className="rounded-2xl border border-primary bg-secondary p-6 text-white transition-transform duration-500 hover:scale-[1.02] md:rounded-3xl md:p-8"
          >
            <div className="mx-auto mb-8 flex w-fit items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold shadow-lg md:text-sm">
              <span>⭐ SUPER OFERTA ⭐</span>
            </div>

            <div className="relative z-10 mb-6 text-center">
              <h3 className="mb-4 flex items-center justify-center gap-2 text-xl font-bold md:text-2xl">
                <GiftIcon className="h-6 w-6" />
                MATERIAL COMPLETO
              </h3>
              <div className="mb-3 rounded-xl bg-primary p-3">
                <div className="mb-1 flex items-center justify-center gap-2">
                  <span className="text-lg line-through opacity-80">$67.99</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                    93% OFF
                  </span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold md:text-6xl">$7.99</span>
                </div>
                <p className="mt-1 text-base font-bold md:text-lg">Pagamento único</p>
              </div>
            </div>

            <div className="relative z-10 mb-6 space-y-3">
              <div className="mt-3 flex items-center justify-center border-t border-primary/40 pt-3">
                <p className="flex items-center gap-2 text-2xl font-bold">🎁 + 3 BÔNUS GRÁTIS</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {bonuses.map((b) => (
                  <div key={b.label} className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/60">
                      <CheckIcon className="h-3 w-3" />
                    </div>
                    <span className="text-xl">{b.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={checkoutUrl}
              className="animate-shaker flex w-full items-center justify-center rounded-xl bg-[#30bf00] p-4 text-center text-xl font-extrabold text-white shadow-xl transition-all duration-300"
            >
              SIM, QUERO GARANTIR MEU MATERIAL AGORA!
            </a>

            <div className="relative z-10 mt-6 flex items-center justify-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <ShieldCheckIcon className="h-4 w-4" />
                Compra Segura
              </span>
            </div>
          </Reveal>

          <Reveal delay={300} className="mt-8 text-center">
            <div className="inline-flex items-center rounded-2xl bg-primary px-6 py-3 text-xs font-bold text-white lg:text-xl">
              <span>Pagamento único, acesso vitalício e consulta em qualquer dispositivo</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
