import { makeProject } from "@motion-canvas/core";

import intro from "./scenes/intro?scene";
import introExplanation from "./scenes/introExplanation?scene";
import screenVideo from "./scenes/screenVideo?scene";
import editServerExplanation from "./scenes/editServerExplanation?scene";
import finalScene from "./scenes/finalScene?scene";
import MultiTrack from "motion-canvas-multitrack/editor-plugin";
import "./global.css";

export default makeProject({
  scenes: [
    intro,
    introExplanation,
    screenVideo,
    editServerExplanation,
    finalScene,
  ],
  plugins: [MultiTrack()],
  experimentalFeatures: true,
});
