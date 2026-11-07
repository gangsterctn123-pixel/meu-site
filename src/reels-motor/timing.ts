// Roteiro do Reels "Como funciona o motor", com o tempo de cada trecho.
//
// Enquanto não houver narração, o tempo vem do número de palavras.
// Quando o áudio existir: coloque o arquivo em public/reels-motor/narracao.mp3,
// preencha `src` e, em `starts`, o segundo em que cada trecho começa na fala.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const NARRATION: {
  src: string | null;
  starts: number[] | null;
  totalSeconds: number | null;
} = { src: null, starts: null, totalSeconds: null };

export type Step = "admissao" | "compressao" | "explosao" | "escape" | null;

export type Segment = {
  id: string;
  text: string;
  step: Step;
  // Ângulo do ciclo (graus, 0–720) no início e no fim do trecho.
  // 0–180 admissão, 180–360 compressão, 360–540 explosão, 540–720 escape.
  phi: [number, number];
};

export const SEGMENTS: Segment[] = [
  { id: "gancho", text: "Como uma faísca desse tamanho consegue mover um carro inteiro?", step: null, phi: [700, 712] },
  { id: "dentro", text: "Olha aqui dentro.", step: null, phi: [712, 720] },
  { id: "admissao", text: "O pistão desce, o ar entra no cilindro e se mistura com o combustível.", step: "admissao", phi: [720, 900] },
  { id: "compressao", text: "Depois, o pistão sobe e comprime essa mistura.", step: "compressao", phi: [900, 1050] },
  { id: "faisca", text: "Quando ele tá quase no topo, a vela solta uma faísca.", step: "explosao", phi: [1050, 1080] },
  { id: "explosao", text: "A mistura queima, os gases se expandem e empurram o pistão pra baixo.", step: "explosao", phi: [1080, 1260] },
  { id: "escape", text: "Na próxima subida, o pistão expulsa os gases pela válvula de escape.", step: "escape", phi: [1260, 1440] },
  { id: "biela", text: "Viu essa haste? É a biela.", step: null, phi: [1440, 1800] },
  { id: "virabrequim", text: "Ela liga o pistão ao virabrequim, que transforma esse sobe e desce em giro.", step: null, phi: [1800, 3240] },
  { id: "rodas", text: "A transmissão leva esse giro até as rodas.", step: null, phi: [3240, 6120] },
];

const WORDS_PER_SECOND = 2.7;
const PAUSE = 0.35;
export const TAIL = 1.5;

const words = (t: string) => t.trim().split(/\s+/);

export type TimedSegment = Segment & { from: number; duration: number };

const build = () => {
  let starts: number[];
  let total: number;
  if (NARRATION.starts && NARRATION.totalSeconds !== null) {
    starts = NARRATION.starts;
    total = NARRATION.totalSeconds;
  } else {
    starts = [];
    let t = 0.3;
    for (const s of SEGMENTS) {
      starts.push(t);
      t += words(s.text).length / WORDS_PER_SECOND + PAUSE;
    }
    total = t;
  }
  const durationInFrames = Math.ceil((total + TAIL) * FPS);
  const segments: TimedSegment[] = SEGMENTS.map((s, i) => {
    const from = Math.round(starts[i] * FPS);
    const next = i + 1 < SEGMENTS.length ? Math.round(starts[i + 1] * FPS) : durationInFrames;
    return { ...s, from, duration: next - from };
  });
  return { segments, durationInFrames };
};

export const TIMELINE = build();

export const segmentAt = (frame: number) => {
  const segs = TIMELINE.segments;
  let i = 0;
  while (i + 1 < segs.length && frame >= segs[i + 1].from) i++;
  const s = segs[i];
  const p = Math.min(1, Math.max(0, (frame - s.from) / s.duration));
  return { index: i, segment: s, progress: p };
};

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

// Ângulo do ciclo no frame atual. Nos tempos do motor o pistão anda com
// suavidade; a partir da biela o motor gira em velocidade constante.
export const phiAt = (frame: number) => {
  const { index, segment, progress } = segmentAt(frame);
  const [a, b] = segment.phi;
  const t = index >= 7 ? progress : easeInOut(Math.min(1, progress * 1.15));
  return a + (b - a) * t;
};

// Palavras com tempo, para as legendas palavra a palavra.
export type TimedWord = { text: string; start: number; end: number };

export const timedWords = (): TimedWord[][] =>
  TIMELINE.segments.map((s) => {
    const ws = words(s.text);
    const speaking = s.duration - PAUSE * FPS;
    const totalChars = ws.reduce((n, w) => n + w.length + 2, 0);
    let t = s.from;
    return ws.map((w) => {
      const len = ((w.length + 2) / totalChars) * speaking;
      const word = { text: w, start: t, end: t + len };
      t += len;
      return word;
    });
  });
