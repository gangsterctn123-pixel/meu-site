import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { mapsDirectionsUrl, restaurant } from "../data/content";
import { Reveal } from "./Reveal";

export function CTABanner() {
  return (
    <section className="bg-fire py-16 text-white">
      <Reveal className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="font-display text-4xl tracking-wide sm:text-5xl">
          Bora saborear um churrasco grego?
        </h2>
        <p className="max-w-xl text-white/85">
          Peça no local, para viagem ou combine sua entrega — o Matuto's Grill está esperando por
          você em Caruaru.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${restaurant.phoneHref}`}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-bold text-white shadow-card transition hover:bg-charcoal-light"
          >
            <PhoneIcon className="h-5 w-5" />
            {restaurant.phoneDisplay}
          </a>
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            <MapPinIcon className="h-5 w-5" />
            Ver rotas
          </a>
        </div>
      </Reveal>
    </section>
  );
}
