import { Reveal } from "./Reveal";

export function IntroStatement() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-lg font-bold text-white">
            MATERIAL COM 25 SESSÕES
          </div>
          <h2 className="mb-6 text-3xl font-semibold leading-tight lg:text-5xl">
            <p className="font-bold">
              Pare de improvisar exercícios sem saber como executar ou dosar.
            </p>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-primary md:text-xl">
            Consulte <span className="font-bold">posições, músculos, cinco passos e doses</span> em
            cada sessão.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
