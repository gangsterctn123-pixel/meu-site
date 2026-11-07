import type React from "react";
import { createContext, useContext } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Visual } from "./script";
import { BODY_FONT, C, TITLE_FONT } from "./theme";

type VP = { duration: number };

// Verdadeiro quando a cena tem uma foto do Pexels ao fundo: os desenhos
// que concorrem com a foto (mesa, cogumelo, olho, livro) ficam escondidos.
export const PhotoContext = createContext(false);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const useEnter = (delay = 0, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
};

/* ------------------------------------------------------------------ */
/* Elementos reutilizáveis                                            */
/* ------------------------------------------------------------------ */

// Pessoinha andando, desenhada a partir da linha dos pés (x, y).
const Figure: React.FC<{
  x: number;
  y: number;
  h: number;
  phase: number;
  walking: boolean;
  flip?: boolean;
  opacity?: number;
}> = ({ x, y, h, phase, walking, flip, opacity = 1 }) => {
  const swing = walking ? Math.sin(phase) * 28 : Math.sin(phase * 0.3) * 4;
  const bob = walking ? Math.abs(Math.cos(phase)) * h * 0.03 : 0;
  const hip = -h * 0.45;
  const shoulder = -h * 0.78;
  const leg = h * 0.45;
  const arm = h * 0.32;
  const rad = (d: number) => (d * Math.PI) / 180;
  const limb = (ox: number, oy: number, len: number, deg: number) =>
    `M ${ox} ${oy} L ${ox + Math.sin(rad(deg)) * len} ${oy + Math.cos(rad(deg)) * len}`;
  return (
    <g
      transform={`translate(${x} ${y - bob}) scale(${flip ? -1 : 1} 1)`}
      opacity={opacity}
      stroke={C.glow}
      strokeWidth={h * 0.07}
      strokeLinecap="round"
      fill="none"
      style={{ filter: `drop-shadow(0 0 ${h * 0.12}px ${C.glow})` }}
    >
      <path d={limb(0, hip, leg, swing)} />
      <path d={limb(0, hip, leg, -swing)} />
      <path d={`M 0 ${hip} L 0 ${shoulder}`} />
      <path d={limb(0, shoulder + h * 0.04, arm, -swing * 0.8)} />
      <path d={limb(0, shoulder + h * 0.04, arm, swing * 0.8)} />
      <circle cx={0} cy={-h * 0.9} r={h * 0.1} fill={C.glow} />
    </g>
  );
};

const Mushroom: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const breathe = 1 + Math.sin(frame / 40) * 0.015;
  return (
    <g transform={`scale(${scale * breathe})`}>
      <defs>
        <radialGradient id="aura">
          <stop offset="0%" stopColor={C.amber} stopOpacity={0.35} />
          <stop offset="60%" stopColor={C.violet} stopOpacity={0.08} />
          <stop offset="100%" stopColor={C.violet} stopOpacity={0} />
        </radialGradient>
        <radialGradient id="cap" cx="40%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#e08a52" />
          <stop offset="45%" stopColor={C.cap} />
          <stop offset="100%" stopColor="#3a170c" />
        </radialGradient>
        <linearGradient id="stem" x1="0" x2="1">
          <stop offset="0%" stopColor="#6b4a2c" />
          <stop offset="50%" stopColor="#d9b98a" />
          <stop offset="100%" stopColor="#5a3c22" />
        </linearGradient>
      </defs>
      <circle r={420} fill="url(#aura)" />
      <path
        d="M -70 20 C -85 120 -100 220 -95 300 Q 0 330 95 300 C 100 220 85 120 70 20 Z"
        fill="url(#stem)"
      />
      <path d="M -230 10 Q 0 70 230 10 Q 0 40 -230 10 Z" fill="#e6c53a" opacity={0.9} />
      <path
        d="M -240 15 C -250 -150 -110 -220 0 -220 C 110 -220 250 -150 240 15 Q 0 45 -240 15 Z"
        fill="url(#cap)"
        style={{ filter: `drop-shadow(0 0 40px ${C.amber}55)` }}
      />
      <path
        d="M -150 -150 C -90 -195 -20 -205 40 -200"
        stroke="#ffd2a8"
        strokeOpacity={0.35}
        strokeWidth={14}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
};

const Label: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  font?: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 64, color = C.text, font = TITLE_FONT, delay = 0, style }) => {
  const p = useEnter(delay);
  return (
    <div
      style={{
        fontFamily: font,
        fontSize: size,
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
        filter: `blur(${(1 - p) * 8}px)`,
        textShadow: `0 0 30px ${color}66`,
        lineHeight: 1.15,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Label
    size={34}
    font={BODY_FONT}
    color={C.glow}
    delay={delay}
    style={{ letterSpacing: 8, textTransform: "uppercase", fontWeight: 600 }}
  >
    {children}
  </Label>
);

const Stage: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <AbsoluteFill
    style={{
      paddingBottom: 230,
      justifyContent: "center",
      alignItems: "center",
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* Visuais                                                            */
/* ------------------------------------------------------------------ */

const Table: React.FC<VP & { variant: "dinner" | "cloth" }> = ({ variant, duration }) => {
  const frame = useCurrentFrame();
  const photo = useContext(PhotoContext);
  const appear = interpolate(frame, [30, 75], [0, 1], clamp);
  const plates = [
    [520, 560],
    [960, 640],
    [1400, 560],
  ];

  const walkers = Array.from({ length: 9 }, (_, i) => {
    const lane = 470 + random(`lane${i}`) * 260;
    const fast = random(`fast${i}`) > 0.6;
    const talking = i === 3 || i === 4;
    const dir = random(`dir${i}`) > 0.5 ? 1 : -1;
    const speed = (fast ? 4.2 : 1.8) * dir;
    const span = 1500;
    const x0 = random(`x${i}`) * span;
    let x = 210 + ((((x0 + frame * speed) % span) + span) % span);
    if (talking) x = i === 3 ? 1150 : 1215;
    const h = 80 + (lane - 470) * 0.25;
    const phase = frame * (fast ? 0.42 : 0.22) + i;
    return { x, y: lane, h, phase, walking: !talking, flip: talking ? i === 4 : dir < 0 };
  });

  const bumps = Array.from({ length: 11 }, (_, i) => ({
    x: 160 + ((i * 150 + frame * 1.7) % 1640),
    a: 26 + Math.abs(Math.sin(frame * 0.25 + i * 1.3)) * 14,
  }));
  const clothTop = (x: number) =>
    600 -
    bumps.reduce((s, b) => s + b.a * Math.exp(-((x - b.x) ** 2) / (2 * 28 ** 2)), 0);
  const clothPath = (() => {
    let d = `M 160 ${clothTop(160)}`;
    for (let x = 170; x <= 1760; x += 8) d += ` L ${x} ${clothTop(x).toFixed(1)}`;
    return `${d} L 1840 900 L 80 900 Z`;
  })();

  const push = interpolate(frame, [0, duration], [1, 1.08]);

  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="wood" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#3b2416" />
            <stop offset="70%" stopColor="#170c06" />
            <stop offset="100%" stopColor={C.bg} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="candle">
            <stop offset="0%" stopColor={C.amber} stopOpacity={0.55} />
            <stop offset="100%" stopColor={C.amber} stopOpacity={0} />
          </radialGradient>
          <linearGradient id="cloth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d9d2e6" />
            <stop offset="100%" stopColor="#4b4560" />
          </linearGradient>
        </defs>
        {!photo && <ellipse cx={960} cy={620} rx={940} ry={360} fill="url(#wood)" />}
        <circle cx={960} cy={330} r={260} fill="url(#candle)" opacity={photo ? 0.4 : 1} />
        {variant === "dinner" &&
          !photo &&
          plates.map(([x, y]) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx={170} ry={62} fill="#d8d3c8" opacity={0.85} />
              <ellipse cx={x} cy={y} rx={120} ry={42} fill="#b9b2a6" opacity={0.9} />
            </g>
          ))}
        {variant === "dinner" &&
          walkers.map((w, i) => <Figure key={i} {...w} opacity={appear} />)}
        {variant === "cloth" && (
          <g>
            <path d={clothPath} fill="url(#cloth)" opacity={photo ? 0.75 : 0.9} />
            {[0.25, 0.5, 0.75].map((t) => (
              <path
                key={t}
                d={`M ${80 + t * 1760} 900 L ${160 + t * 1600} 620`}
                stroke="#2a2638"
                strokeOpacity={0.25}
                strokeWidth={6}
              />
            ))}
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

const MushroomVisual: React.FC<VP & { caption?: string }> = ({ caption }) => {
  const p = useEnter(0, 120);
  const photo = useContext(PhotoContext);
  return (
    <Stage>
      <svg
        viewBox="-480 -340 960 720"
        width={900}
        height={675}
        style={{
          opacity: p,
          transform: `translateY(${(1 - p) * 60}px)`,
          display: photo ? "none" : undefined,
        }}
      >
        <Mushroom />
      </svg>
      {caption && (
        <div style={{ position: "absolute", top: 90 }}>
          <Kicker delay={25}>{caption}</Kicker>
        </div>
      )}
    </Stage>
  );
};

const Title: React.FC<VP & { kicker: string; title: string }> = ({ kicker, title }) => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [20, 70], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <Stage style={{ flexDirection: "column", gap: 36, textAlign: "center" }}>
      <Kicker>{kicker}</Kicker>
      <Label size={128} delay={10} style={{ fontWeight: 700, maxWidth: 1600 }}>
        {title}
      </Label>
      <div
        style={{
          width: 900 * line,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${C.glow}, transparent)`,
        }}
      />
    </Stage>
  );
};

const Location: React.FC<VP & { place: string; detail: string; coords: string }> = ({
  place,
  detail,
  coords,
}) => {
  const frame = useCurrentFrame();
  const pulse = (frame % 50) / 50;
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute" }}>
        {Array.from({ length: 14 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={(i * 160 + frame * 0.6) % 1920}
            y1={0}
            x2={(i * 160 + frame * 0.6) % 1920}
            y2={1080}
            stroke={C.glow}
            strokeOpacity={0.07}
          />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 150 + 40} x2={1920} y2={i * 150 + 40} stroke={C.glow} strokeOpacity={0.07} />
        ))}
        <g transform="translate(560 430)">
          <circle r={40 + pulse * 160} fill="none" stroke={C.glow} strokeOpacity={1 - pulse} strokeWidth={3} />
          <circle r={18} fill={C.glow} style={{ filter: `drop-shadow(0 0 20px ${C.glow})` }} />
        </g>
      </svg>
      <Stage style={{ alignItems: "flex-start", paddingLeft: 760, flexDirection: "column", gap: 20 }}>
        <Kicker>{detail}</Kicker>
        <Label size={92} delay={8} style={{ fontWeight: 700 }}>
          {place}
        </Label>
        <Label size={36} font="monospace" color={C.muted} delay={18}>
          {coords}
        </Label>
      </Stage>
    </AbsoluteFill>
  );
};

const Species: React.FC<VP & { name: string; detail: string; unknown?: boolean }> = ({
  name,
  detail,
  unknown,
}) => {
  const frame = useCurrentFrame();
  const p = useEnter(0, 120);
  const photo = useContext(PhotoContext);
  return (
    <AbsoluteFill>
      <Stage style={{ flexDirection: "row", gap: 60 }}>
        <svg
          viewBox="-480 -340 960 720"
          width={760}
          height={570}
          style={{ opacity: p, display: photo && !unknown ? "none" : undefined }}
        >
          {!photo && <Mushroom />}
          {unknown && (
            <text
              x={0}
              y={-20 + Math.sin(frame / 20) * 10}
              textAnchor="middle"
              fontFamily={TITLE_FONT}
              fontSize={260}
              fill={C.glow}
              opacity={0.85}
              style={{ filter: `drop-shadow(0 0 30px ${C.glow})` }}
            >
              ?
            </text>
          )}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 820 }}>
          <Kicker delay={10}>{unknown ? "Ainda sem resposta" : "Nome científico"}</Kicker>
          <Label size={96} delay={18} style={{ fontStyle: "italic" }}>
            {name}
          </Label>
          <Label size={40} font={BODY_FONT} color={C.muted} delay={28}>
            {detail}
          </Label>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};

const Statement: React.FC<VP & { text: string; accent?: string }> = ({ text, accent }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  const accentWords = new Set((accent ?? "").split(" "));
  return (
    <Stage>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 28px",
          maxWidth: 1500,
          fontFamily: TITLE_FONT,
          fontSize: 104,
          fontWeight: 700,
          lineHeight: 1.2,
          textAlign: "center",
        }}
      >
        {words.map((w, i) => {
          const p = interpolate(frame, [i * 5, i * 5 + 18], [0, 1], clamp);
          const hot = accentWords.has(w);
          return (
            <span
              key={i}
              style={{
                opacity: p,
                filter: `blur(${(1 - p) * 10}px)`,
                color: hot ? C.glow : C.text,
                textShadow: hot ? `0 0 40px ${C.glow}` : "none",
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    </Stage>
  );
};

const Book: React.FC<VP & { title: string; detail: string }> = ({ title, detail }) => {
  const frame = useCurrentFrame();
  const open = interpolate(frame, [0, 40], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const photo = useContext(PhotoContext);
  return (
    <Stage style={{ flexDirection: "column", gap: 10 }}>
      <svg
        viewBox="-600 -260 1200 520"
        width={1100}
        height={477}
        style={{ display: photo ? "none" : undefined }}
      >
        <defs>
          <linearGradient id="page" x1="0" x2="1">
            <stop offset="0%" stopColor="#cbbf9f" />
            <stop offset="100%" stopColor="#efe5c8" />
          </linearGradient>
        </defs>
        <path d="M 0 -170 Q -250 -220 -520 -170 L -520 200 Q -250 160 0 210 Z" fill="url(#page)" opacity={0.9} transform={`scale(${open} 1)`} />
        <path d="M 0 -170 Q 250 -220 520 -170 L 520 200 Q 250 160 0 210 Z" fill="url(#page)" opacity={0.9} transform={`scale(${open} 1)`} />
        {[-1, 1].map((s) =>
          Array.from({ length: 6 }, (_, i) => (
            <line
              key={`${s}${i}`}
              x1={s * 80}
              x2={s * 440}
              y1={-100 + i * 45}
              y2={-110 + i * 45}
              stroke="#6d6048"
              strokeOpacity={0.35 * open}
              strokeWidth={6}
            />
          )),
        )}
        {[-300, -220, 180, 260, 330].map((x, i) => (
          <Figure key={x} x={x} y={-150} h={34} phase={frame * 0.25 + i} walking={i % 2 === 0} opacity={interpolate(frame, [40, 70], [0, 1], clamp)} />
        ))}
      </svg>
      <Label size={84} delay={20} style={{ fontWeight: 700 }}>
        {title}
      </Label>
      <Label size={40} font={BODY_FONT} color={C.muted} delay={30}>
        {detail}
      </Label>
    </Stage>
  );
};

const Question: React.FC<VP & { text: string; items?: string[] }> = ({ text, items, duration }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 200 }}>
        <div
          style={{
            fontFamily: TITLE_FONT,
            fontSize: 820,
            color: C.violet,
            opacity: 0.13,
            transform: `rotate(${Math.sin(frame / 50) * 4}deg)`,
            textShadow: `0 0 120px ${C.violet}`,
          }}
        >
          ?
        </div>
      </AbsoluteFill>
      <Stage style={{ flexDirection: "column", gap: 40 }}>
        <Label size={items ? 76 : 96} style={{ fontWeight: 700, textAlign: "center", maxWidth: 1500 }}>
          {text}
        </Label>
        {items?.map((it, i) => (
          <Label
            key={it}
            size={52}
            font={BODY_FONT}
            color={C.glow}
            delay={Math.round(duration * (0.18 + i * 0.27))}
          >
            {it}
          </Label>
        ))}
      </Stage>
    </AbsoluteFill>
  );
};

const Dna: React.FC<VP & { label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const n = 42;
  const reveal = interpolate(frame, [0, 60], [0, n], clamp);
  return (
    <Stage style={{ flexDirection: "column", gap: 30 }}>
      <Kicker>Análise genética</Kicker>
      <svg viewBox="0 0 1600 420" width={1600} height={420}>
        {Array.from({ length: n }, (_, i) => {
          if (i > reveal) return null;
          const x = 40 + i * 37;
          const ph = i * 0.38 + frame * 0.05;
          const y1 = 210 + Math.sin(ph) * 140;
          const y2 = 210 - Math.sin(ph) * 140;
          const depth = (Math.cos(ph) + 1) / 2;
          return (
            <g key={i}>
              <line x1={x} y1={y1} x2={x} y2={y2} stroke={C.muted} strokeOpacity={0.25} strokeWidth={4} />
              <circle cx={x} cy={y1} r={7 + depth * 6} fill={C.glow} opacity={0.4 + depth * 0.6} />
              <circle cx={x} cy={y2} r={13 - depth * 6} fill={C.violet} opacity={1 - depth * 0.6} />
            </g>
          );
        })}
      </svg>
      <Label size={72} delay={20} style={{ fontWeight: 700 }}>
        {label}
      </Label>
    </Stage>
  );
};

const Molecule: React.FC<VP & { label: string; mode: "known" | "crossed" | "unknown" }> = ({
  label,
  mode,
  duration,
}) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, 70], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
    });
  const rings =
    mode === "known"
      ? [
          [[-120, -60], [0, -60], [0, 60], [-120, 60]],
          [[0, -60], [110, -100], [180, 0], [110, 100], [0, 60]],
        ]
      : [
          hex(-90, 0, 100),
          [[-3.4, -50], [91.7, -81], [150.5, 0], [91.7, 81], [-3.4, 50]],
        ];
  const atoms = rings.flat();
  const cross = interpolate(frame, [duration * 0.55, duration * 0.55 + 25], [0, 1], clamp);
  const spin = mode === "unknown" ? frame * 0.25 : Math.sin(frame / 60) * 6;
  const color = mode === "known" ? C.amber : mode === "unknown" ? C.violet : C.glow;
  return (
    <Stage style={{ flexDirection: "column", gap: 30 }}>
      <svg viewBox="-400 -260 800 520" width={900} height={585}>
        <g transform={`rotate(${spin})`} style={{ filter: `drop-shadow(0 0 18px ${color})` }}>
          {rings.map((ring, r) => (
            <polygon
              key={r}
              points={ring.map((p) => p.join(",")).join(" ")}
              fill="none"
              stroke={color}
              strokeWidth={8}
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - draw}
            />
          ))}
          {atoms.map(([x, y], i) => {
            const flicker = mode === "unknown" ? 0.4 + random(`a${i}${Math.floor(frame / 6)}`) * 0.6 : 1;
            return (
              <g key={i} opacity={draw * flicker}>
                <circle cx={x} cy={y} r={20} fill={C.bg} stroke={color} strokeWidth={6} />
                {mode === "unknown" && (
                  <text x={x} y={y + 11} textAnchor="middle" fontSize={30} fill={C.text} fontFamily={BODY_FONT} transform={`rotate(${-spin} ${x} ${y})`}>
                    ?
                  </text>
                )}
              </g>
            );
          })}
        </g>
        {mode === "crossed" && (
          <g stroke={C.danger} strokeWidth={16} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 20px ${C.danger})` }}>
            <line x1={-300} y1={-220} x2={-300 + 600 * cross} y2={-220 + 440 * cross} />
            <line x1={300} y1={-220} x2={300 - 600 * cross} y2={-220 + 440 * cross} />
          </g>
        )}
      </svg>
      <Label size={80} delay={15} style={{ fontWeight: 700 }}>
        {label}
      </Label>
    </Stage>
  );
};

const Eye: React.FC<VP & { variant: "camera" | "glitch" | "open"; label?: string }> = ({
  variant,
  label,
  duration,
}) => {
  const frame = useCurrentFrame();
  const photo = useContext(PhotoContext);
  const open = variant === "open" ? interpolate(frame, [0, 35], [0.02, 1], { ...clamp, easing: Easing.out(Easing.cubic) }) : 1;
  const look = Math.sin(frame / 45) * 50;
  const pupil = 52 + Math.sin(frame / 30) * 8;
  const network = interpolate(frame, [duration * 0.35, duration * 0.8], [0, 1], clamp);
  const nodes = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    return [Math.cos(a) * (560 + random(`r${i}`) * 120), Math.sin(a) * (300 + random(`s${i}`) * 60)];
  });
  const jitter = variant === "glitch" && random(`g${Math.floor(frame / 3)}`) > 0.55;
  const off = jitter ? (random(`o${frame}`) - 0.5) * 30 : 0;

  const eye = (dx: number, color: string | null) => (
    <g transform={`translate(${dx} 0)`} opacity={color ? 0.55 : 1}>
      <clipPath id={`lid${dx}`}>
        <path d={`M -420 0 Q 0 ${-280 * open} 420 0 Q 0 ${280 * open} -420 0 Z`} />
      </clipPath>
      <path
        d={`M -420 0 Q 0 ${-280 * open} 420 0 Q 0 ${280 * open} -420 0 Z`}
        fill={color ? "none" : "#dfe6e2"}
        stroke={color ?? C.text}
        strokeWidth={6}
      />
      {!color && (
        <g clipPath={`url(#lid${dx})`}>
          <circle cx={look} cy={0} r={130} fill="url(#iris)" />
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return (
              <line key={i} x1={look + Math.cos(a) * 60} y1={Math.sin(a) * 60} x2={look + Math.cos(a) * 125} y2={Math.sin(a) * 125} stroke="#0d3b2a" strokeOpacity={0.5} strokeWidth={3} />
            );
          })}
          <circle cx={look} cy={0} r={pupil} fill="#020303" />
          {variant === "glitch" && (
            <Figure x={look - 6} y={22} h={46} phase={frame * 0.3} walking opacity={0.9} />
          )}
          <circle cx={look + 40} cy={-45} r={18} fill="#fff" opacity={0.85} />
        </g>
      )}
    </g>
  );

  return (
    <Stage style={{ flexDirection: "column", gap: 30 }}>
      <svg
        viewBox="-800 -380 1600 760"
        width={1400}
        height={665}
        style={{ display: photo ? "none" : undefined }}
      >
        <defs>
          <radialGradient id="iris">
            <stop offset="30%" stopColor="#1f8f5f" />
            <stop offset="100%" stopColor="#0a2a20" />
          </radialGradient>
        </defs>
        {variant === "camera" && (
          <g stroke={C.glow} strokeOpacity={0.6} strokeWidth={2}>
            {nodes.map(([x, y], i) => {
              const [nx, ny] = nodes[(i + 3) % nodes.length];
              const show = i / nodes.length < network;
              return show ? (
                <g key={i}>
                  <line x1={x} y1={y} x2={nx} y2={ny} />
                  <line x1={x} y1={y} x2={0} y2={0} strokeOpacity={0.15} />
                  <circle cx={x} cy={y} r={9} fill={C.glow} />
                </g>
              ) : null;
            })}
            {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) => (
              <path key={`${sx}${sy}`} d={`M ${sx * 520} ${sy * 230} l ${-sx * 70} 0 M ${sx * 520} ${sy * 230} l 0 ${-sy * 70}`} strokeWidth={6} strokeOpacity={1 - network} />
            ))}
          </g>
        )}
        {jitter && eye(-off, C.danger)}
        {jitter && eye(off, "#3fd2ff")}
        {eye(0, null)}
      </svg>
      {label && (
        <Label size={64} delay={20} style={{ fontWeight: 700, textAlign: "center", maxWidth: 1500 }}>
          {label}
        </Label>
      )}
    </Stage>
  );
};

const Warning: React.FC<VP & { title: string; lines: string[] }> = ({ title, lines, duration }) => {
  const frame = useCurrentFrame();
  const pulse = 0.7 + Math.sin(frame / 8) * 0.3;
  return (
    <Stage style={{ flexDirection: "column", gap: 34 }}>
      <svg viewBox="-150 -140 300 270" width={260} height={234} style={{ filter: `drop-shadow(0 0 ${30 * pulse}px ${C.danger})` }}>
        <path d="M 0 -120 L 130 110 L -130 110 Z" fill="none" stroke={C.danger} strokeWidth={14} strokeLinejoin="round" />
        <line x1={0} y1={-40} x2={0} y2={40} stroke={C.danger} strokeWidth={16} strokeLinecap="round" />
        <circle cx={0} cy={78} r={10} fill={C.danger} />
      </svg>
      <Label size={88} color={C.text} style={{ fontWeight: 700 }}>
        {title}
      </Label>
      {lines.map((l, i) => (
        <Label key={l} size={44} font={BODY_FONT} color={C.muted} delay={Math.round(duration * (0.3 + i * 0.3))}>
          {l}
        </Label>
      ))}
    </Stage>
  );
};

const Timeline: React.FC<VP & { steps: string[] }> = ({ steps, duration }) => {
  const frame = useCurrentFrame();
  const at = (i: number) => duration * (0.15 + i * 0.28);
  const line = interpolate(frame, [at(0), at(steps.length - 1)], [0, 1], clamp);
  return (
    <Stage>
      <div style={{ position: "relative", width: 1500, height: 360 }}>
        <div style={{ position: "absolute", top: 80, left: 150, height: 4, width: 1200 * line, background: C.glow, boxShadow: `0 0 20px ${C.glow}` }} />
        {steps.map((s, i) => {
          const p = interpolate(frame, [at(i), at(i) + 18], [0, 1], clamp);
          return (
            <div key={s} style={{ position: "absolute", left: 150 + i * 600 - 200, width: 400, top: 52, display: "flex", flexDirection: "column", alignItems: "center", gap: 40, opacity: p }}>
              <div style={{ width: 60, height: 60, borderRadius: 30, background: C.bg, border: `6px solid ${C.glow}`, boxShadow: `0 0 30px ${C.glow}`, transform: `scale(${p})` }} />
              <div style={{ fontFamily: BODY_FONT, fontSize: 44, fontWeight: 600, color: C.text, textAlign: "center" }}>{s}</div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

export const VisualView: React.FC<{ visual: Visual; duration: number }> = ({ visual, duration }) => {
  switch (visual.kind) {
    case "table":
      return <Table {...visual} duration={duration} />;
    case "mushroom":
      return <MushroomVisual {...visual} duration={duration} />;
    case "title":
      return <Title {...visual} duration={duration} />;
    case "location":
      return <Location {...visual} duration={duration} />;
    case "species":
      return <Species {...visual} duration={duration} />;
    case "statement":
      return <Statement {...visual} duration={duration} />;
    case "book":
      return <Book {...visual} duration={duration} />;
    case "question":
      return <Question {...visual} duration={duration} />;
    case "dna":
      return <Dna {...visual} duration={duration} />;
    case "molecule":
      return <Molecule {...visual} duration={duration} />;
    case "eye":
      return <Eye {...visual} duration={duration} />;
    case "warning":
      return <Warning {...visual} duration={duration} />;
    case "timeline":
      return <Timeline {...visual} duration={duration} />;
  }
};
