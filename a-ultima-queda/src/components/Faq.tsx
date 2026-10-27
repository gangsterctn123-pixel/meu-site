"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { siteConfig } from "@/lib/config";
import { faq } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

type Item = { q: string; a: string };

function buildItems(): Item[] {
  const items: Item[] = faq.items.map((item) => {
    const extra = "configKey" in item && item.configKey ? siteConfig[item.configKey] : "";
    return { q: item.q, a: extra ? `${item.a} ${extra}` : item.a };
  });
  // Política de reembolso só aparece quando configurada (nada é inventado).
  if (siteConfig.refundPolicy) {
    items.splice(items.length - 1, 0, { q: "Qual é a política de reembolso?", a: siteConfig.refundPolicy });
  }
  return items;
}

const items = buildItems();

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-titulo" className="relative scroll-mt-4 bg-paper-light py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionHeader numeral="VII" label="Perguntas frequentes" aside="Correspondência do leitor" />
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <h2 id="faq-titulo" className="display text-[clamp(2.8rem,9vw,6rem)] lg:col-span-4">
            Antes de
            <br />
            decidir.
          </h2>

          <ul className="border-t-2 border-ink lg:col-span-8">
            {items.map((item, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-painel-${i}`;
              const buttonId = `${baseId}-botao-${i}`;
              return (
                <li key={item.q} className="border-b border-ink/50">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-6 text-left sm:grid-cols-[3.5rem_1fr_auto]"
                    >
                      <span className="display text-2xl text-red sm:text-3xl">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-masthead text-lg font-bold uppercase leading-snug transition-colors group-hover:text-red-deep sm:text-xl">
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className={`relative ml-2 block h-4 w-4 self-center transition-transform duration-500 ease-editorial ${isOpen ? "rotate-45" : ""}`}
                      >
                        <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-ink" />
                        <span className="absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2 bg-ink" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pl-[3.25rem] pr-6 font-serif text-[1.06rem] leading-[1.7] text-ink-soft sm:pl-[4.25rem]">{item.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
