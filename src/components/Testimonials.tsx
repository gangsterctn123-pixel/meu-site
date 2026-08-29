import { testimonials } from "../data/content";
import { Reveal } from "./Reveal";
import { TestimonialCard } from "./TestimonialCard";

export function Testimonials() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-lg font-semibold uppercase tracking-wider">Depoimentos</span>
          <h2 className="mt-2 text-2xl font-bold md:text-4xl">
            Quem Fez, <span className="text-primary">Se SUPEROU!</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <TestimonialCard {...t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
