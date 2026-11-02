import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fontes embutidas em public/video/fonts (fontes variáveis, faixa latina),
// para o vídeo renderizar igual com ou sem acesso ao Google Fonts.
export const TITLE_FONT = "Cinzel";
export const BODY_FONT = "Inter";

loadFont({
  family: TITLE_FONT,
  url: staticFile("video/fonts/cinzel-latin.woff2"),
  weight: "400 900",
  format: "woff2",
});
loadFont({
  family: BODY_FONT,
  url: staticFile("video/fonts/inter-latin.woff2"),
  weight: "100 900",
  format: "woff2",
});

export const C = {
  bg: "#04060a",
  bg2: "#0b1016",
  text: "#eef4f0",
  muted: "#93a39b",
  glow: "#7dffb2",
  violet: "#a98bff",
  amber: "#ffb45e",
  cap: "#a4532e",
  danger: "#ff6b5e",
};
