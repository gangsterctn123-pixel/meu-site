import type React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BODY_FONT, TITLE_FONT } from "../video/theme";
import { Engine3D, type EngineFx } from "./Engine3D";
import { NARRATION, segmentAt, type Step, TIMELINE, timedWords } from "./timing";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const STEPS: { id: Exclude<Step, null>; label: string; color: string }[] = [
  { id: "admissao", label: "Admissão", color: "#5fb8ff" },
  { id: "compressao", label: "Compressão", color: "#7df0c8" },
  { id: "explosao", label: "Explosão", color: "#ff9a2e" },
  { id: "escape", label: "Escape", color: "#b8c0cc" },
];

const CALLOUTS: Record<string, { text: string; color: string } | undefined> = {
  faisca: { text: "Vela de ignição", color: "#8fd3ff" },
  biela: { text: "Biela", color: "#38c6ff" },
  virabrequim: { text: "Virabrequim", color: "#ffb02e" },
  rodas: { text: "Transmissão → rodas", color: "#e8edf2" },
};

const WORDS = timedWords();

// Badge com o tempo do motor (1 a 4) no topo, fora da área da interface do Instagram.
const StepBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { segment } = segmentAt(frame);
  if (!segment.step) return null;
  const idx = STEPS.findIndex((s) => s.id === segment.step);
  const step = STEPS[idx];
  // anima só quando o tempo muda
  const firstSeg = TIMELINE.segments.find((s) => s.step === segment.step)!;
  const pop = spring({ frame: frame - firstSeg.from, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 250 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, transform: `scale(${0.8 + pop * 0.2})`, opacity: pop }}>
        <div style={{ display: "flex", gap: 14 }}>
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              style={{
                width: 70,
                height: 10,
                borderRadius: 5,
                background: i <= idx ? s.color : "rgba(255,255,255,0.18)",
                boxShadow: i === idx ? `0 0 18px ${s.color}` : "none",
              }}
            />
          ))}
        </div>
        <div style={{ fontFamily: BODY_FONT, fontWeight: 800, fontSize: 64, color: step.color, letterSpacing: 2, textShadow: `0 0 30px ${step.color}88` }}>
          {idx + 1} · {step.label.toUpperCase()}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const second = TIMELINE.segments[1];
  if (frame > second.from + second.duration) return null;
  const p = spring({ frame: frame - 4, fps, config: { damping: 12 } });
  const out = interpolate(frame, [second.from + second.duration - 10, second.from + second.duration], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 240 }}>
      <div
        style={{
          fontFamily: TITLE_FONT,
          fontWeight: 700,
          fontSize: 88,
          lineHeight: 1.1,
          textAlign: "center",
          color: "#fff",
          maxWidth: 920,
          opacity: p * out,
          transform: `translateY(${(1 - p) * -40}px)`,
          textShadow: "0 0 40px rgba(110,190,255,0.7)",
        }}
      >
        Uma faísca move <span style={{ color: "#8fd3ff" }}>um carro?</span>
      </div>
    </AbsoluteFill>
  );
};

const Callout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { segment } = segmentAt(frame);
  const c = CALLOUTS[segment.id];
  if (!c) return null;
  const p = spring({ frame: frame - segment.from - 8, fps, config: { damping: 13 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 270 }}>
      <div
        style={{
          fontFamily: BODY_FONT,
          fontWeight: 800,
          fontSize: 70,
          color: "#06121c",
          background: c.color,
          padding: "14px 40px",
          borderRadius: 999,
          boxShadow: `0 0 50px ${c.color}99`,
          transform: `scale(${p})`,
        }}
      >
        {c.text}
      </div>
    </AbsoluteFill>
  );
};

// Legendas palavra a palavra, estilo Reels: até 3 palavras, a atual em destaque.
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const all = WORDS.flat();
  const i = all.findIndex((w) => frame >= w.start && frame < w.end);
  if (i < 0) return null;
  // grupo de até 3 palavras dentro do mesmo trecho
  const segWords = WORDS.find((ws) => ws.includes(all[i]))!;
  const local = segWords.indexOf(all[i]);
  const groupStart = Math.floor(local / 3) * 3;
  const group = segWords.slice(groupStart, groupStart + 3);
  const groupFrame = frame - group[0].start;
  const enter = spring({ frame: groupFrame, fps, config: { damping: 15 } });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 470 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 34px",
          maxWidth: 940,
          transform: `scale(${0.85 + enter * 0.15})`,
          opacity: enter,
        }}
      >
        {group.map((w) => {
          const active = w === all[i];
          return (
            <span
              key={`${w.start}`}
              style={{
                fontFamily: BODY_FONT,
                fontWeight: 900,
                fontSize: 92,
                textTransform: "uppercase",
                color: active ? "#ffd54a" : "#ffffff",
                WebkitTextStroke: "3px #000",
                paintOrder: "stroke",
                textShadow: "0 6px 0 rgba(0,0,0,0.65), 0 0 30px rgba(0,0,0,0.5)",
                transform: active ? "scale(1.05)" : "none",
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const useFx = (): EngineFx => {
  const frame = useCurrentFrame();
  const { segment, progress } = segmentAt(frame);
  const id = segment.id;
  const local = frame - segment.from;
  const hookSpark = id === "gancho" ? Math.max(0, Math.sin((local / 18) * Math.PI)) ** 3 : 0;
  const pulse = 0.55 + Math.sin(frame / 5) * 0.45;
  return {
    hookSpark,
    plugGlow: id === "faisca" ? pulse : 0,
    rodGlow: id === "biela" ? pulse : id === "virabrequim" ? 0.3 : 0,
    crankGlow: id === "virabrequim" ? pulse : 0,
    wheel: id === "rodas" ? Math.min(1, progress * 2.5) : 0,
  };
};

export const MotorReels: React.FC = () => {
  const frame = useCurrentFrame();
  const fx = useFx();
  const end = TIMELINE.durationInFrames;
  const fade = interpolate(frame, [0, 8, end - 15, end], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, #10233a 0%, #050a12 65%, #020407 100%)" }}>
      <AbsoluteFill style={{ opacity: fade }}>
        <Engine3D fx={fx} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(2,4,8,0.85) 0%, rgba(2,4,8,0.55) 18%, transparent 30%)" }} />
      <Hook />
      <StepBadge />
      <Callout />
      <Captions />
      {NARRATION.src && <Audio src={staticFile(NARRATION.src)} />}
    </AbsoluteFill>
  );
};
