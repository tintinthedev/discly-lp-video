import { Line, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  createRef,
  sequence,
  Vector2,
  waitFor,
} from "@motion-canvas/core";
import DisclyLogo from "../images/discly-logo.png";
import { showImage } from "../helpers/showImage";

export default makeScene2D(function* (view) {
  const text = createRef<Txt>();

  view.add(
    <Txt fontFamily="Jetbrains Mono" fill={"white"} ref={text}>
      Oi! 👋
    </Txt>
  );

  // text fading out and moving down
  yield* all(text().opacity(0, 0.3), text().y(100, 0.3));
  const logoImage = yield* showImage(view, DisclyLogo, new Vector2(300, 300));

  const textA = createRef<Txt>();
  view.add(
    <Txt
      fontFamily={"Jetbrains Mono"}
      fill={"white"}
      bottom={() => logoImage().top()}
      opacity={0}
      ref={textA}
    >
      Discly
    </Txt>
  );

  yield* textA().opacity(1, 0.3);

  yield* all(logoImage().y(-200, 1));

  const featuresBox = createRef<Rect>();
  view.add(
    <Rect ref={featuresBox} radius={10} smoothCorners padding={60}></Rect>
  );

  const arrow = createRef<Line>();
  const arrowPoints = [logoImage().bottom, featuresBox().top];

  view.add(
    <Line
      ref={arrow}
      endArrow
      stroke={"#bbb"}
      lineDash={[20, 20]}
      points={arrowPoints}
      lineWidth={10}
      arrowSize={20}
      end={0}
    />
  );

  const lastBoxText = createRef<Txt>();

  featuresBox()
    .layout(true)
    .smoothCorners(true)
    .radius(10)
    .fill("#363636")
    .direction("column")
    .gap(50)
    .opacity(0)
    .top(new Vector2(logoImage().bottom().x, logoImage().bottom().y + 250))
    .children(
      <>
        <Txt fill={"white"} fontFamily={"Jetbrains Mono"} fontSize={40}>
          - Criar servers com IA
        </Txt>
        <Txt fill={"white"} fontFamily={"Jetbrains Mono"} fontSize={40}>
          - Editar servers com IA
        </Txt>
        <Txt
          fill={"white"}
          fontFamily={"Jetbrains Mono"}
          fontSize={40}
          scale={0}
          ref={lastBoxText}
        >
          - Como colocar o bot no seu server
        </Txt>
      </>
    );

  yield* sequence(0.3, arrow().end(1, 1), featuresBox().opacity(1, 1));
  yield* waitFor(1);
  yield* lastBoxText().scale(1, 0.5);

  yield* waitFor(2);

  // ending view transition
  yield* view.opacity(0, 0.5);
});
