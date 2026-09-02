import { CheckCircleIcon, TagIcon, UsersIcon } from "@heroicons/react/20/solid";
import { benefits } from "../data/content";
import { asset } from "../lib/asset";

export function Hero() {
  return (
    <section className="pt-10 pb-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 p-4 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="flex items-center justify-center">
            <div className="mb-6 inline-block rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white">
              SPECIAL OFFER — 93% OFF
            </div>
          </div>

          <h1 className="mb-6 text-center text-3xl font-bold lg:text-4xl">
            Build Rounder, Stronger Glutes at Home — Using Just a Mini Band
          </h1>
          <h2 className="mb-6 text-center text-xl font-bold text-special lg:text-2xl">
            The G4 Method is a simple at-home system designed to target your glutes from every
            angle — without a gym, heavy weights, or complicated workouts.
          </h2>

          <div className="my-8 flex items-center justify-center lg:hidden">
            <img
              src={asset("mockup.webp")}
              alt="The G4 Glute Method — mockup with movement cards, phone, and tablet"
              width={1024}
              height={1536}
              loading="eager"
              fetchPriority="high"
              className="h-auto w-[90%] rounded-2xl object-contain"
            />
          </div>

          <div className="mb-6 flex items-center text-special">
            <UsersIcon className="mr-2 h-5 w-5 shrink-0" />
            <span className="leading-snug">25 targeted sessions, 100 movements included</span>
          </div>

          <div className="mb-6 space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start">
                <CheckCircleIcon className="mr-3 mt-1 h-5 w-5 shrink-0 text-special" />
                <span className="leading-snug">{b}</span>
              </div>
            ))}
          </div>

          <a
            href="#oferta"
            className="mb-6 block rounded-lg bg-primary p-6 text-white shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
              <span>Was:</span>
              <span className="ml-2 text-2xl font-bold line-through">$67.99</span>
              <span className="ml-4">Now:</span>
              <span className="ml-2 text-4xl font-bold">$7.99</span>
              <span className="ml-4 animate-pulse rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-white">
                93% OFF
              </span>
            </div>
          </a>

          <div className="flex items-center justify-center text-base text-special lg:text-lg">
            <TagIcon className="mr-2 h-5 w-5 shrink-0" />
            <span>PDF guide delivered by email — no subscription required</span>
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex lg:w-1/2">
          <img
            src={asset("mockup.webp")}
            alt="The G4 Glute Method — mockup with movement cards, phone, and tablet"
            width={1024}
            height={1536}
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full max-w-xl rounded-2xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}
