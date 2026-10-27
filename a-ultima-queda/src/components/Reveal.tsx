"use client";

import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "figure" | "header";
}

/** Fade-in discreto ao entrar na viewport, executado uma única vez. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

/** Revelação de título por máscara: o texto sobe de dentro de uma linha recortada. */
export function RevealTitle({ lines, className, lineClassName }: { lines: string[]; className?: string; lineClassName?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line} className="-mb-[0.06em] block overflow-hidden pt-[0.24em] pb-[0.06em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
