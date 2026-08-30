import { restaurant, reviews, visitorUpdate } from "../data/content";
import { StarRating } from "./StarRating";
import { Reveal } from "./Reveal";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Reviews() {
  return (
    <section id="avaliacoes" className="bg-charcoal py-20 text-cream">
      <div className="mx-auto w-full max-w-6xl px-4">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <p className="font-display text-7xl leading-none text-white">
            {restaurant.rating.toString().replace(".", ",")}
          </p>
          <StarRating rating={restaurant.rating} starClassName="h-6 w-6" />
          <p className="text-sm text-cream/60">{restaurant.reviewCount} avaliações no Google</p>
        </Reveal>

        <Reveal delay={100} className="mt-10 rounded-2xl border border-gold/20 bg-white/5 p-6">
          <p className="text-xs font-bold tracking-widest text-gold-light uppercase">
            Atualização de visitantes · {visitorUpdate.time}
          </p>
          <p className="mt-2 italic text-cream/90">“{visitorUpdate.text}”</p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={150 + i * 100}>
              <div className="flex h-full flex-col gap-4 rounded-2xl bg-white/5 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fire font-bold text-white">
                    {initials(review.name)}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-cream/50">{review.badge}</p>
                  </div>
                </div>
                <StarRating rating={5} starClassName="h-4 w-4" />
                <p className="flex-1 text-sm leading-relaxed text-cream/85">{review.text}</p>
                <p className="text-xs text-cream/40">{review.time}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
