import { galleryGroups, galleryImageSize } from "../data/content";
import { asset } from "../lib/asset";
import { Reveal } from "./Reveal";

export function ContentShowcase() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
            What's Inside the G4 Method
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-base md:text-lg">
            A complete 25-page PDF guide: 25 glute sessions, how-to instructions, and safety tips.
          </p>
          <p className="mx-auto max-w-2xl text-base font-semibold text-special md:text-2xl">
            EVERY MOVEMENT BROKEN DOWN STEP BY STEP
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 text-foreground md:grid-cols-3">
          {galleryGroups.map((group, i) => (
            <Reveal
              key={group.caption}
              delay={i * 100}
              className="overflow-hidden rounded-2xl border-2 border-primary/60 bg-surface shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-1.5 p-2.5">
                {group.images.map((src) => (
                  <img
                    key={src}
                    src={asset(src)}
                    alt={group.caption}
                    width={galleryImageSize.width}
                    height={galleryImageSize.height}
                    loading="lazy"
                    className="h-auto w-full rounded-lg object-contain"
                  />
                ))}
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{group.caption}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
