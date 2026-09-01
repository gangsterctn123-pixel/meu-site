import { testimonialImages } from "../data/content";
import { asset } from "../lib/asset";

export function Testimonials() {
  const track = [...testimonialImages, ...testimonialImages];

  return (
    <section className="overflow-hidden py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-lg font-semibold uppercase tracking-wider">Depoimentos</span>
          <h2 className="mt-2 text-2xl font-bold md:text-4xl">
            Quem Fez, <span className="text-primary">Se SUPEROU!</span>
          </h2>
        </div>
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent sm:w-32" />

        <div className="flex w-max animate-marquee gap-6">
          {track.map((t, i) => (
            <div
              key={`${t.image}-${i}`}
              className="w-64 shrink-0 overflow-hidden rounded-2xl border border-secondary/20 bg-white shadow-lg sm:w-80"
            >
              <img
                src={asset(t.image)}
                alt={`Depoimento de ${t.name}`}
                className="h-auto w-full object-contain"
                loading={i < testimonialImages.length ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
