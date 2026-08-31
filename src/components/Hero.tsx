import { CheckCircleIcon, TagIcon, UsersIcon } from "@heroicons/react/20/solid";
import { benefits } from "../data/content";
import { asset } from "../lib/asset";

export function Hero() {
  return (
    <section className="pt-10 pb-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 p-4 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="flex items-center justify-center">
            <div className="mb-6 inline-block rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white">
              OFERTA ESPECIAL - 93% DE DESCONTO
            </div>
          </div>

          <h1 className="mb-6 text-center text-3xl font-bold lg:text-4xl">
            Construa Glúteos Maiores, Redondos e Fortes em Casa Usando Apenas Uma Mini Band
          </h1>
          <h2 className="mb-6 text-center text-xl font-bold text-special lg:text-2xl">
            Transforme uma única mini band em um sistema completo de treino, com 25 sessões
            prontas e 100 movimentos estratégicos para trabalhar seus glúteos de diferentes formas
            e ângulos.
          </h2>

          <div className="my-8 flex items-center justify-center lg:hidden">
            <img
              src={asset("mockup.png")}
              alt="The G4 Glute Method — mockup do material com cards de movimentos, celular e tablet"
              className="h-auto w-[90%] rounded-2xl object-contain"
            />
          </div>

          <div className="mb-6 flex items-center text-special">
            <UsersIcon className="mr-2 h-5 w-5 shrink-0" />
            <span className="leading-snug">25 sessões prontas e 100 movimentos</span>
          </div>

          <div className="mb-6 space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start">
                <CheckCircleIcon className="mr-3 mt-1 h-5 w-5 shrink-0 text-special" />
                <span className="leading-snug">{b}</span>
              </div>
            ))}
          </div>

          <a
            href="#oferta"
            className="mb-6 block rounded-lg bg-primary p-6 text-white shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
              <span>De:</span>
              <span className="ml-2 text-2xl font-bold line-through">R$&nbsp;47,90</span>
              <span className="ml-4">Por apenas:</span>
              <span className="ml-2 text-4xl font-bold">R$&nbsp;14,90</span>
              <span className="ml-4 animate-pulse rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-white">
                93% OFF
              </span>
            </div>
          </a>

          <div className="flex items-center justify-center text-base text-special lg:text-lg">
            <TagIcon className="mr-2 h-5 w-5 shrink-0" />
            <span>Material em PDF, acesso pelo e-mail, sem mensalidades</span>
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex lg:w-1/2">
          <img
            src={asset("mockup.png")}
            alt="The G4 Glute Method — mockup do material com cards de movimentos, celular e tablet"
            className="h-auto w-full max-w-xl rounded-2xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}
