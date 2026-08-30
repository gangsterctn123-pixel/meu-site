import { galleryPhotos } from "../data/content";
import { Reveal } from "./Reveal";

export function Gallery() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto w-full max-w-7xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-widest text-fire uppercase">Fotos e vídeos</span>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-ink sm:text-5xl">
            O clima do Matuto's
          </h2>
          <p className="mt-3 text-ink/70">
            Fotos reais do prato e dos sanduíches do Matuto's Grill, direto de quem já provou.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryPhotos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 80}
              className={`group relative overflow-hidden rounded-2xl shadow-card ${
                i === 0 ? "col-span-2 sm:col-span-1 sm:row-span-2" : ""
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                  i === 0 ? "aspect-[4/5] sm:h-full sm:aspect-auto" : "aspect-[4/5]"
                }`}
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-transparent p-4 pt-10">
                <span className="text-sm font-semibold text-white">{photo.caption}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
