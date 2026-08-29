import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { faqItems } from "../data/content";
import { Reveal } from "./Reveal";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl shadow-lg">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between bg-primary px-4 py-4 text-left text-base font-semibold text-white md:px-6 md:py-6 md:text-lg"
        aria-expanded={open}
      >
        <div>{question}</div>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`bg-surface px-4 py-4 text-sm text-foreground transition-opacity duration-300 md:px-6 md:text-base ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-10 text-center md:mb-12">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">Perguntas Frequentes</h2>
            <p className="text-base md:text-lg">Tire suas dúvidas sobre o material</p>
          </Reveal>

          <div className="space-y-3 md:space-y-4">
            {faqItems.map((item) => (
              <FaqItem key={item.question} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
