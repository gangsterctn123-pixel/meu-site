import type { ComponentType } from "react";
import {
  BookOpenIcon,
  CameraIcon,
  FireIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { galleryCategories } from "../data/content";
import { Reveal } from "./Reveal";

type CategoryIcon = "menu" | "food" | "place" | "owner";

const icons: Record<CategoryIcon, ComponentType<{ className?: string }>> = {
  menu: BookOpenIcon,
  food: FireIcon,
  place: CameraIcon,
  owner: UserGroupIcon,
};

const gradients: Record<CategoryIcon, string> = {
  menu: "from-fire to-fire-dark",
  food: "from-gold to-fire",
  place: "from-ember to-charcoal-light",
  owner: "from-fire-light to-ember",
};

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
            Enquanto reunimos o álbum completo de fotos do local, aqui vai um gostinho do que te
            espera por lá.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {galleryCategories.map((cat, i) => {
            const Icon = icons[cat.icon];
            return (
              <Reveal key={cat.label} delay={i * 80}>
                <div
                  className={`flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br p-6 text-center text-white shadow-card ${gradients[cat.icon]}`}
                >
                  <Icon className="h-9 w-9" />
                  <span className="font-semibold">{cat.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
