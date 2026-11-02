import { SCENES } from "./script";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Narração. Enquanto não existir, o tempo de cada cena é estimado pelo
// número de palavras. Quando a narração for gerada:
//  - coloque o MP3 em public/video/narracao.mp3 e preencha `src`;
//  - preencha `sceneStarts` com o segundo em que cada cena começa na fala
//    (um valor por cena, na mesma ordem de SCENES) e `totalSeconds`.
export const NARRATION: {
  src: string | null;
  sceneStarts: number[] | null;
  totalSeconds: number | null;
} = {
  src: null,
  sceneStarts: null,
  totalSeconds: null,
};

const WORDS_PER_SECOND = 2.45; // ritmo calmo de documentário
const PAUSE_SECONDS = 0.8; // respiro entre parágrafos
export const TAIL_SECONDS = 3; // final com a tela de encerramento

const countWords = (text: string) => text.trim().split(/\s+/).length;

export type TimedScene = (typeof SCENES)[number] & {
  from: number;
  durationInFrames: number;
};

const estimateStarts = (): { starts: number[]; total: number } => {
  const starts: number[] = [];
  let t = 0;
  for (const scene of SCENES) {
    starts.push(t);
    t += countWords(scene.text) / WORDS_PER_SECOND + PAUSE_SECONDS;
  }
  return { starts, total: t };
};

const buildTimeline = (): { scenes: TimedScene[]; durationInFrames: number } => {
  const fromNarration =
    NARRATION.sceneStarts && NARRATION.totalSeconds !== null
      ? { starts: NARRATION.sceneStarts, total: NARRATION.totalSeconds }
      : null;
  const { starts, total } = fromNarration ?? estimateStarts();
  const totalFrames = Math.ceil((total + TAIL_SECONDS) * FPS);

  const scenes = SCENES.map((scene, i) => {
    const from = Math.round(starts[i] * FPS);
    const next =
      i + 1 < SCENES.length ? Math.round(starts[i + 1] * FPS) : totalFrames;
    return { ...scene, from, durationInFrames: Math.max(1, next - from) };
  });
  return { scenes, durationInFrames: totalFrames };
};

export const TIMELINE = buildTimeline();

// Divide o texto da cena em blocos curtos de legenda, com tempo proporcional
// ao número de palavras de cada bloco.
export type CaptionChunk = { text: string; start: number; end: number };

export const splitCaptions = (
  text: string,
  durationInFrames: number,
  maxWords = 11,
): CaptionChunk[] => {
  const sentences = text.match(/[^.!?:]+[.!?:]+|[^.!?:]+$/g) ?? [text];
  const chunks: string[] = [];
  for (const raw of sentences) {
    const words = raw.trim().split(/\s+/);
    const parts = Math.ceil(words.length / maxWords);
    const size = Math.ceil(words.length / parts);
    for (let i = 0; i < words.length; i += size) {
      chunks.push(words.slice(i, i + size).join(" "));
    }
  }
  const speaking = durationInFrames - PAUSE_SECONDS * FPS;
  const totalWords = chunks.reduce((n, c) => n + countWords(c), 0);
  let cursor = 0;
  return chunks.map((c) => {
    const len = (countWords(c) / totalWords) * speaking;
    const chunk = { text: c, start: cursor, end: cursor + len };
    cursor += len;
    return chunk;
  });
};
