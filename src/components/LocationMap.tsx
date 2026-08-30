import { ClockIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { mapsDirectionsUrl, mapsEmbedUrl, restaurant } from "../data/content";
import { Reveal } from "./Reveal";

export function LocationMap() {
  return (
    <section id="localizacao" className="bg-cream-dark py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="text-sm font-bold tracking-widest text-fire uppercase">Localização</span>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-ink sm:text-5xl">
            Onde nos encontrar
          </h2>

          <div className="mt-6 space-y-5">
            <div className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-fire" />
              <div>
                <p className="font-semibold text-ink">
                  {restaurant.address.line1} — {restaurant.address.line2}
                </p>
                <p className="text-sm text-ink/60">CEP {restaurant.address.cep}</p>
                <p className="mt-1 text-xs text-ink/40">Código Plus: {restaurant.plusCode}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-fire" />
              <div>
                <p className="font-semibold text-ink">Aberto agora · Fecha às {restaurant.closingTime}</p>
                <p className="text-sm text-ink/60">Confirme horários especiais por telefone.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-fire" />
              <a href={`tel:${restaurant.phoneHref}`} className="font-semibold text-ink hover:text-fire">
                {restaurant.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
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
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-bold text-ink transition hover:bg-white"
            >
              <PhoneIcon className="h-5 w-5" />
              Ligar
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="overflow-hidden rounded-2xl shadow-card">
          <iframe
            title={`Mapa - ${restaurant.name}`}
            src={mapsEmbedUrl}
            className="h-80 w-full border-0 lg:h-[26rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
