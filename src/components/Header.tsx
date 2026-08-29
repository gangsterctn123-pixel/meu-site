import { useState } from "react";
import { Bars3Icon, PhoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { restaurant } from "../data/content";

const links = [
  { href: "#cardapio", label: "Cardápio" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#localizacao", label: "Localização" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <a href="#top" className="flex items-baseline gap-2 font-display text-2xl tracking-wide text-ink">
          Matuto's Grill
          <span className="hidden text-xs font-sans font-semibold tracking-normal text-fire sm:inline">
            {restaurant.tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink/80 transition hover:text-fire"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${restaurant.phoneHref}`}
            className="hidden items-center gap-2 rounded-full bg-fire px-5 py-2.5 text-sm font-bold text-white shadow-card transition hover:bg-fire-dark sm:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            Ligar agora
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-cream px-4 py-3 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-cream-dark hover:text-fire"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${restaurant.phoneHref}`}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-fire px-5 py-2.5 text-sm font-bold text-white"
          >
            <PhoneIcon className="h-4 w-4" />
            Ligar agora
          </a>
        </nav>
      )}
    </header>
  );
}
