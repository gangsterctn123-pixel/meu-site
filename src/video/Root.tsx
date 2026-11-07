import { Composition } from "remotion";
import { MotorReels } from "../reels-motor/MotorReels";
import * as Motor from "../reels-motor/timing";
import { MushroomVideo } from "./MushroomVideo";
import { FPS, HEIGHT, TIMELINE, WIDTH } from "./timing";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="CogumeloLiliputiano"
      component={MushroomVideo}
      durationInFrames={TIMELINE.durationInFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
    <Composition
      id="MotorReels"
      component={MotorReels}
      durationInFrames={Motor.TIMELINE.durationInFrames}
      fps={Motor.FPS}
      width={Motor.WIDTH}
      height={Motor.HEIGHT}
    />
  </>
);
