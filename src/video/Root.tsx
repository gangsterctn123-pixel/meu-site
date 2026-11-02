import { Composition } from "remotion";
import { MushroomVideo } from "./MushroomVideo";
import { FPS, HEIGHT, TIMELINE, WIDTH } from "./timing";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="CogumeloLiliputiano"
    component={MushroomVideo}
    durationInFrames={TIMELINE.durationInFrames}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
