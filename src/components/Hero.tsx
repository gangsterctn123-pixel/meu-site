import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { mapsDirectionsUrl, restaurant } from "../data/content";
import { StarRating } from "./StarRating";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="bg-ember-pattern bg-charcoal pt-16 pb-20 text-cream">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light uppercase">
            {restaurant.category} · Caruaru - PE
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display text-balance text-6xl leading-none tracking-wide text-white sm:text-7xl">
            {restaurant.name}
          </h1>
          <p className="mt-2 font-display text-2xl tracking-widest text-fire-light sm:text-3xl">
            {restaurant.tagline.toUpperCase()}
          </p>
        </Reveal>

        <Reveal delay={140} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-2">
            <StarRating rating={restaurant.rating} />
            <span className="font-bold text-white">{restaurant.rating.toString().replace(".", ",")}</span>
            <span className="text-sm text-cream/60">({restaurant.reviewCount} avaliações)</span>
          </div>
          <span className="h-1 w-1 rounded-full bg-cream/30" />
          <span className="text-sm text-cream/80">
            {restaurant.priceRange} por pessoa
          </span>
          <span className="h-1 w-1 rounded-full bg-cream/30" />
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Aberto agora · Fecha {restaurant.closingTime}
          </span>
        </Reveal>

        <Reveal delay={200} className="flex items-center gap-2 text-sm text-cream/70">
          <MapPinIcon className="h-4 w-4 shrink-0 text-fire-light" />
          {restaurant.address.line1} — {restaurant.address.line2}
        </Reveal>

        <Reveal delay={260} className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-fire px-6 py-3 text-sm font-bold text-white shadow-card transition hover:bg-fire-dark"
          >
            <MapPinIcon className="h-5 w-5" />
            Ver rotas
          </a>
          <a
            href={`tel:${restaurant.phoneHref}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
          >
            <PhoneIcon className="h-5 w-5" />
            {restaurant.phoneDisplay}
          </a>
          <a
            href="#cardapio"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-gold-light underline decoration-gold/40 underline-offset-4 transition hover:text-gold"
          >
            Ver cardápio
          </a>
        </Reveal>
      </div>
    </section>
  );
}
