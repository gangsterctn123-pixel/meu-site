import { CheckCircleIcon, ClockIcon, TagIcon, UsersIcon } from "@heroicons/react/20/solid";
import { benefits, heroFichas } from "../data/content";
import { FichaMock } from "./FichaMock";

function HeroMosaic() {
  return (
    <div className="relative">
      <div className="grid w-full max-w-[420px] grid-cols-4 gap-2 rounded-lg bg-white p-3 shadow-lg sm:max-w-[520px]">
        {heroFichas.map((f) => (
          <FichaMock key={f.number} {...f} />
        ))}
      </div>
      <div className="absolute -top-4 -right-4 animate-bounce-slow rounded-full bg-primary px-4 py-2 font-bold text-white shadow-lg">
        93% OFF
      </div>
      <div className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 flex-col items-center rounded-full bg-primary/90 px-4 py-2 text-center text-xs text-white shadow-lg">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <span>Somente Hoje!</span>
        </div>
        <span className="mt-1 whitespace-nowrap">25 exercícios ilustrados</span>
      </div>
    </div>
  );
}

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
            25 Fichas de Exercícios para Glúteos com Elástico Mini Band
          </h1>
          <h2 className="mb-6 text-center text-xl font-bold text-special lg:text-2xl">
            Execução ilustrada, doses e progressão para treinar em casa ou na academia
          </h2>

          <div className="my-8 flex items-center justify-center lg:hidden">
            <HeroMosaic />
          </div>

          <div className="mb-6 flex items-center text-special">
            <UsersIcon className="mr-2 h-5 w-5 shrink-0" />
            <span className="leading-snug">28 páginas com 25 fichas práticas</span>
          </div>

          <div className="mb-6 space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start">
                <CheckCircleIcon className="mr-3 mt-1 h-5 w-5 shrink-0 text-special" />
                <span className="leading-snug">{b}</span>
              </div>
            ))}
          </div>

          <div className="mb-6 rounded-lg bg-primary p-6 text-white">
            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
              <span>De:</span>
              <span className="ml-2 text-2xl font-bold line-through">$87.00</span>
              <span className="ml-4">Por apenas:</span>
              <span className="ml-2 text-4xl font-bold">$7.90</span>
              <span className="ml-4 animate-pulse rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-white">
                93% OFF
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center text-base text-special lg:text-lg">
            <TagIcon className="mr-2 h-5 w-5 shrink-0" />
            <span>Material em PDF, acesso por WhatsApp e e-mail, sem mensalidades</span>
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex lg:w-1/2">
          <HeroMosaic />
        </div>
      </div>
    </section>
  );
}
