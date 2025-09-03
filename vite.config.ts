import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";
import MultiTrackPlugin from "motion-canvas-multitrack";

export default defineConfig({
  plugins: [MultiTrackPlugin(), motionCanvas(), ffmpeg()],
  server: {
    watch: {
      ignored: ["**/audio/multi-track.json**", "**/audio/**"],
    },
  },
});
