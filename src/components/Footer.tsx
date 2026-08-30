import { mapsDirectionsUrl, restaurant } from "../data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal py-10 text-cream/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-2xl tracking-wide text-white">Matuto's Grill</p>
          <p className="text-sm text-fire-light">{restaurant.tagline}</p>
          <p className="mt-3 text-sm">
            {restaurant.address.line1} — {restaurant.address.line2}
          </p>
          <p className="text-sm">CEP {restaurant.address.cep}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm sm:items-end">
          <a href={`tel:${restaurant.phoneHref}`} className="hover:text-white">
            {restaurant.phoneDisplay}
          </a>
          <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer" className="hover:text-white">
            Como chegar
          </a>
          <span>Aberto agora · Fecha às {restaurant.closingTime}</span>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-cream/40">
        © {year} Matuto's Grill - Churrasco Grego. Todos os direitos reservados.
      </div>
    </footer>
  );
}
