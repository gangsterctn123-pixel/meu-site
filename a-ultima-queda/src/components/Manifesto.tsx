"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { manifesto } from "@/lib/content";

const words = manifesto.text.split(" ").map((raw) => ({
  word: raw.replaceAll("*", ""),
  accent: raw.startsWith("*"),
}));

function Word({ word, accent, progress, range }: { word: string; accent: boolean; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block pr-[0.22em] ${accent ? "text-red" : ""}`}>
      {word}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.75"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="manifesto"
      aria-labelledby="manifesto-titulo"
      className="relative overflow-hidden bg-night py-24 text-white sm:py-36"
    >
      <div aria-hidden className="grain grain-animated absolute inset-0 opacity-[0.22] invert" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.75)_100%)]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between border-b border-white/40 pb-2">
          <p className="kicker text-white/80">
            <span className="text-red">V</span>
            <span className="mx-2 opacity-50">/</span>Manifesto
          </p>
          <p className="kicker hidden text-white/50 sm:block">Leia em voz alta</p>
        </div>

        <h2 id="manifesto-titulo" aria-label={manifesto.text.replaceAll("*", "")} className="display mt-12 flex flex-wrap pt-[0.2em] text-[clamp(3rem,11.5vw,10.5rem)] leading-[0.92] sm:mt-16">
          {reduce ? (
            words.map(({ word, accent }, i) => (
              <span key={i} className={`inline-block pr-[0.22em] ${accent ? "text-red" : ""}`}>
                {word}
              </span>
            ))
          ) : (
            words.map(({ word, accent }, i) => (
              <Word
                key={i}
                word={word}
                accent={accent}
                progress={scrollYProgress}
                range={[(i / words.length) * 0.8, (i / words.length) * 0.8 + 0.2]}
              />
            ))
          )}
        </h2>

        <div className="mt-14 flex items-center gap-5">
          <motion.span aria-hidden style={{ scaleX: reduce ? 1 : lineScale }} className="h-[3px] flex-1 origin-left bg-red" />
          <p className="kicker text-white/70">{manifesto.signature}</p>
        </div>
      </div>
    </section>
  );
}
