"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero } from "@/lib/content";
import { CtaButton } from "./CtaButton";
import { Tarja } from "./Tarja";

const ease = [0.22, 1, 0.36, 1] as const;

// Posição da linha dos olhos na fotografia (hero.webp, 736×884), em % da altura.
const EYE_LINE = "34.2%";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-1.5%", "4%"]);

  return (
    <header ref={ref} className="paper relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
        <div className="rule-double flex items-baseline justify-between gap-4 pt-3 pb-2">
          <p className="kicker text-[0.62rem] sm:text-xs">{hero.edition}</p>
          <p className="kicker text-right text-[0.62rem] sm:text-xs">{hero.tagline}</p>
        </div>
        <div className="border-t border-ink" />

        <h1 className="display mt-1 text-white [container-type:inline-size] lg:mt-1">
          {hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pt-[0.24em] lg:inline-block lg:align-top">
              <motion.span
                className={`block ${i === 0 ? "text-[calc(100cqw/3.52)]" : "text-[calc(100cqw/2.42)]"} lg:text-[calc(100cqw/6.2)]`}
                initial={{ y: "102%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease }}
              >
                {line.toUpperCase()}
                {i === 0 ? <span className="hidden lg:inline">&nbsp;</span> : null}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="rule-double mt-2 lg:mt-3" />

        <div className="grid gap-x-10 lg:grid-cols-12 lg:pt-8">
          {/* Coluna editorial (desktop) */}
          <motion.aside
            className="hidden lg:col-span-3 lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <p className="kicker text-red-deep">Nº 001 · Autogoverno</p>
            <p className="mt-4 font-masthead text-[1.65rem] leading-[1.12] font-bold uppercase">{hero.lead}</p>
            <p className="mt-4 border-y border-ink/60 py-1.5 font-serif text-xs italic">Por A Última Queda — Edição de abertura</p>
            <div className="mt-4 space-y-3 text-justify font-serif text-[0.92rem] leading-[1.55] hyphens-auto">
              {hero.column.map((p, i) => (
                <p key={i} className={i === 0 ? "drop-cap" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </motion.aside>

          {/* Fotografia central com a tarja */}
          <div className="relative -mx-4 sm:-mx-6 lg:col-span-6 lg:mx-0">
            <div className="relative max-h-[58svh] overflow-hidden sm:max-h-none lg:overflow-visible">
              <motion.div className="relative aspect-[736/884] scale-[1.06] lg:scale-100" style={{ y: photoY }}>
                <div className="absolute inset-0 lg:[mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent),linear-gradient(to_bottom,transparent,#000_14%)] lg:[mask-composite:intersect]">
                  <Image
                    src="/images/hero.webp"
                    alt="Homem de terno escuro, em preto e branco, diante de uma página de jornal"
                    fill
                    preload
                    quality={85}
                    sizes="(min-width: 1400px) 660px, (min-width: 1024px) 48vw, 100vw"
                    className="object-cover object-top brightness-[0.9] contrast-[1.06]"
                  />
                </div>
                <motion.div
                  className="absolute left-1/2 w-[92%] -translate-x-1/2 -translate-y-1/2 lg:w-[108%]"
                  style={{ top: EYE_LINE }}
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.9, delay: 0.55, ease }}
                >
                  <Tarja text={hero.tarja} />
                </motion.div>
              </motion.div>
            </div>

            {/* CTA sobre o casaco, garantindo o botão na primeira dobra do celular */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pt-20 pb-5 sm:px-6 lg:hidden">
              <CtaButton href="#oferta" className="w-full">
                {hero.cta}
              </CtaButton>
            </div>
          </div>

          {/* Subheadline + CTA */}
          <motion.div
            className="py-8 lg:col-span-3 lg:flex lg:flex-col lg:py-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease }}
          >
            <p className="kicker hidden text-red-deep lg:block">O despertar</p>
            <p className="font-serif text-[1.18rem] leading-[1.5] text-ink sm:text-xl lg:mt-4 lg:text-[1.15rem]">
              <span className="font-semibold">{hero.subheadline.split(". ")[0]}.</span>{" "}
              {hero.subheadline.split(". ").slice(1).join(". ")}
            </p>
            <div className="mt-7 hidden lg:block">
              <CtaButton href="#oferta" size="md" className="w-full">
                {hero.cta}
              </CtaButton>
            </div>

            <nav aria-label="Nesta edição" className="mt-10 hidden lg:block">
              <p className="kicker border-b border-ink pb-1.5">Nesta edição</p>
              <ul>
                {hero.index.map((item) => (
                  <li key={item.href} className="border-b border-ink/30">
                    <a
                      href={item.href}
                      className="group flex items-baseline gap-3 py-2 font-masthead text-sm uppercase tracking-wider transition-colors hover:text-red-deep"
                    >
                      <span className="w-6 text-red-deep">{item.n}</span>
                      <span className="flex-1">{item.label}</span>
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </div>
      </div>
      <div className="border-t-2 border-ink" />
    </header>
  );
}
