import type React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  random,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BODY_FONT, C } from "./theme";
import {
  FPS,
  NARRATION,
  splitCaptions,
  TAIL_SECONDS,
  TIMELINE,
  type TimedScene,
} from "./timing";
import photosJson from "./photos.json";
import { PhotoContext, VisualView } from "./Visuals";

type Photo = { file: string; photographer: string; url: string };
const PHOTOS = photosJson as Record<string, Photo | undefined>;

// Foto do Pexels em tela cheia, escurecida e com movimento lento (Ken Burns).
const PhotoLayer: React.FC<{ photo: Photo; duration: number; seed: string }> = ({
  photo,
  duration,
  seed,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, duration], [0, 1]);
  const zoomIn = random(`zoom-${seed}`) > 0.5;
  const scale = zoomIn ? 1.05 + t * 0.12 : 1.17 - t * 0.12;
  const panX = (random(`pan-${seed}`) - 0.5) * 60 * (t - 0.5);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile(photo.file)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${panX}px)`,
          filter: "brightness(0.42) saturate(0.75) contrast(1.1)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${C.bg}66 0%, transparent 35%, ${C.bg}cc 100%)`,
          mixBlendMode: "multiply",
        }}
      />
      <AbsoluteFill style={{ background: `${C.glow}`, opacity: 0.05, mixBlendMode: "overlay" }} />
    </AbsoluteFill>
  );
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Esporos brilhantes subindo no fundo, iguais em todas as cenas.
const Spores: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%">
        {Array.from({ length: 70 }, (_, i) => {
          const speed = 0.3 + random(`sp${i}`) * 0.9;
          const x = random(`x${i}`) * 1920 + Math.sin(frame / 60 + i) * 20;
          const y = 1100 - ((random(`y${i}`) * 1200 + frame * speed) % 1200);
          const r = 1.5 + random(`r${i}`) * 3.5;
          const tw = 0.3 + Math.abs(Math.sin(frame / 25 + i)) * 0.7;
          const color = i % 3 === 0 ? C.violet : C.glow;
          return <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={tw * 0.6} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

const Background: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at 50% 40%, ${C.bg2} 0%, ${C.bg} 70%)`,
    }}
  />
);

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)",
      pointerEvents: "none",
    }}
  />
);

const Captions: React.FC<{ text: string; speakingFrames: number }> = ({
  text,
  speakingFrames,
}) => {
  const frame = useCurrentFrame();
  const chunks = splitCaptions(text, speakingFrames);
  const current = chunks.find((c) => frame >= c.start && frame < c.end);
  if (!current) return null;
  const local = frame - current.start;
  const opacity = interpolate(local, [0, 6], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 90 }}>
      <div
        style={{
          maxWidth: 1500,
          padding: "16px 34px",
          borderRadius: 14,
          background: "rgba(0,0,0,0.55)",
          fontFamily: BODY_FONT,
          fontWeight: 600,
          fontSize: 50,
          lineHeight: 1.3,
          color: C.text,
          textAlign: "center",
          opacity,
        }}
      >
        {current.text}
      </div>
    </AbsoluteFill>
  );
};

const SceneView: React.FC<{ scene: TimedScene; isLast: boolean }> = ({ scene, isLast }) => {
  const frame = useCurrentFrame();
  const d = scene.durationInFrames;
  const fade = 12;
  const opacity = interpolate(frame, [0, fade, d - fade, d], [0, 1, 1, isLast ? 1 : 0], clamp);
  const drift = interpolate(frame, [0, d], [1, 1.04]);
  const speakingFrames = d - (isLast ? TAIL_SECONDS * FPS : 0);
  const photo = PHOTOS[scene.id];
  return (
    <AbsoluteFill>
      {photo && (
        <AbsoluteFill style={{ opacity }}>
          <PhotoLayer photo={photo} duration={d} seed={scene.id} />
        </AbsoluteFill>
      )}
      <AbsoluteFill style={{ opacity, transform: `scale(${drift})` }}>
        <PhotoContext.Provider value={Boolean(photo)}>
          <VisualView visual={scene.visual} duration={d} />
        </PhotoContext.Provider>
      </AbsoluteFill>
      <Captions text={scene.text} speakingFrames={speakingFrames} />
    </AbsoluteFill>
  );
};

export const MushroomVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const end = TIMELINE.durationInFrames;
  const fadeOut = interpolate(frame, [end - 30, end], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, opacity: fadeOut }}>
      <Background />
      {TIMELINE.scenes.map((scene, i) => (
        <Sequence
          key={scene.id}
          name={scene.id}
          from={scene.from}
          durationInFrames={scene.durationInFrames}
        >
          <SceneView scene={scene} isLast={i === TIMELINE.scenes.length - 1} />
        </Sequence>
      ))}
      <Spores />
      <Vignette />
      {NARRATION.src && <Audio src={staticFile(NARRATION.src)} />}
    </AbsoluteFill>
  );
};
