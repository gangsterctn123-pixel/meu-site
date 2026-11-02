import { Player } from "@remotion/player";
import { MushroomVideo } from "../video/MushroomVideo";
import { FPS, HEIGHT, TIMELINE, WIDTH } from "../video/timing";

export const VideoPage = () => (
  <main
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      padding: 16,
      boxSizing: "border-box",
      fontFamily: "system-ui, sans-serif",
      color: "#eef4f0",
    }}
  >
    <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
      O cogumelo que faz ver pessoas pequenas
    </h1>
    <Player
      component={MushroomVideo}
      durationInFrames={TIMELINE.durationInFrames}
      fps={FPS}
      compositionWidth={WIDTH}
      compositionHeight={HEIGHT}
      controls
      style={{ width: "100%", maxWidth: 1280, aspectRatio: "16 / 9" }}
    />
  </main>
);
