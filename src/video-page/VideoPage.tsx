import { Player } from "@remotion/player";
import { MotorReels } from "../reels-motor/MotorReels";
import * as Motor from "../reels-motor/timing";
import { MushroomVideo } from "../video/MushroomVideo";
import { FPS, HEIGHT, TIMELINE, WIDTH } from "../video/timing";

const title = { fontSize: 20, fontWeight: 600, margin: 0 } as const;

export const VideoPage = () => (
  <main
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
      padding: 16,
      boxSizing: "border-box",
      fontFamily: "system-ui, sans-serif",
      color: "#eef4f0",
    }}
  >
    <h1 style={title}>Como funciona o motor (Reels 9:16)</h1>
    <Player
      component={MotorReels}
      durationInFrames={Motor.TIMELINE.durationInFrames}
      fps={Motor.FPS}
      compositionWidth={Motor.WIDTH}
      compositionHeight={Motor.HEIGHT}
      controls
      style={{ width: "100%", maxWidth: 400, aspectRatio: "9 / 16" }}
    />
    <h1 style={title}>O cogumelo que faz ver pessoas pequenas (YouTube 16:9)</h1>
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
