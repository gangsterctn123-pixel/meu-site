"use client";

import { MotionConfig } from "framer-motion";

/** Respeita `prefers-reduced-motion`: com ele ativo, animações de transformação são desligadas. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
