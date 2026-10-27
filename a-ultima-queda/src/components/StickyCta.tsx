"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Barra discreta no celular: aparece depois da primeira dobra e some quando a
 * oferta (ou o rodapé) está na tela. Sem pop-up, sem bloquear o conteúdo.
 */
export function StickyCta({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("header");
    const targets = [document.getElementById("oferta"), document.querySelector("footer")].filter(Boolean) as Element[];
    const state = { pastHero: false, nearOffer: false };
    const sync = () => setVisible(state.pastHero && !state.nearOffer);

    const heroObserver = new IntersectionObserver(([entry]) => {
      state.pastHero = !entry.isIntersecting;
      sync();
    });
    const seen = new Set<Element>();
    const offerObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      state.nearOffer = seen.size > 0;
      sync();
    });

    if (hero) heroObserver.observe(hero);
    targets.forEach((t) => offerObserver.observe(t));
    return () => {
      heroObserver.disconnect();
      offerObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden"
        >
          <a
            href="#oferta"
            className="flex min-h-12 items-center justify-between bg-red px-5 font-display text-base uppercase tracking-[0.06em] text-white active:bg-red-deep"
          >
            <span>{label}</span>
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
