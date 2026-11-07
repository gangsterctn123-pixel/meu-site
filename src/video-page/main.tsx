import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { VideoPage } from "./VideoPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VideoPage />
  </StrictMode>,
);
