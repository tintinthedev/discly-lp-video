import { makeScene2D, Path, Rect, Txt } from "@motion-canvas/2d";
import { all, chain, createRef, waitFor, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fill("#5865F2");

  const text = createRef<Rect>();

  view.add(
    <Rect layout gap={15} ref={text} y={-50} opacity={0}>
      <Txt fontFamily={"Jetbrains Mono"} fill={"white"}>
        Obrigado!
      </Txt>
      <Txt fontFamily={"Jetbrains Mono"} fill={"red"}>
        ❤
      </Txt>
    </Rect>
  );

  yield* all(text().opacity(1, 0.4), text().y(0, 0.4));

  yield* waitUntil("final");
});
