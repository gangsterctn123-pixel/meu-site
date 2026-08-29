import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { reviewQuotes, reviewSummary } from "../data/content";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section className="bg-cream-dark py-20">
      <div className="mx-auto w-full max-w-5xl px-4">
        <Reveal className="text-center">
          <span className="text-sm font-bold tracking-widest text-fire uppercase">
            Por que os clientes voltam
          </span>
          <p className="mt-4 text-balance text-xl leading-relaxed text-ink sm:text-2xl">
            “{reviewSummary}”
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {reviewQuotes.map((quote, i) => (
            <Reveal key={quote} delay={i * 100}>
              <div className="flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-card">
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-fire/70" />
                <p className="text-sm leading-relaxed text-ink/80 italic">“{quote}”</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
