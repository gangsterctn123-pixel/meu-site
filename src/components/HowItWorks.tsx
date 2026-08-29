import { steps } from "../data/content";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
            Como você recebe o acesso ao material?
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg">
            Após a confirmação do pagamento, você recebe as instruções de acesso ao material
            diretamente no WhatsApp e no e-mail informados.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              key={step.number}
              delay={i * 100 + 100}
              className="rounded-2xl bg-secondary p-6 text-center text-white transition-all duration-500 hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold">
                {step.number}
              </div>
              <h3 className="mb-2 text-lg font-bold md:text-xl">{step.title}</h3>
              <p className="text-base leading-relaxed">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
