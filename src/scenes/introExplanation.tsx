import { Line, makeScene2D, Txt } from "@motion-canvas/2d";
import ChatGPT from "../images/chatgpt-logo.webp";
import Discly from "../images/discly-logo.png";
import Discord from "../images/discord-logo.jpg";
import { showImage } from "../helpers/showImage";
import {
  all,
  createRef,
  useDuration,
  Vector2,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const textA = createRef<Txt>();
  const textB = createRef<Txt>();

  yield* waitUntil("showDiscly");

  const discly = yield* showImage(
    view,
    Discly,
    new Vector2(200, 200),
    new Vector2(-200, 0)
  );

  view.add(
    <Txt
      ref={textB}
      bottom={discly().top().sub([0, 40])}
      opacity={0}
      fill={"white"}
      fontFamily={"Jetbrains Mono"}
    >
      Bot
    </Txt>
  );

  yield* waitUntil("showAI");

  const chatGpt = yield* showImage(
    view,
    ChatGPT,
    new Vector2(200, 200),
    new Vector2(200, 0),
    30
  );

  view.add(
    <Txt
      ref={textA}
      bottom={chatGpt().top().sub([0, 40])}
      opacity={0}
      fill={"white"}
      fontFamily={"Jetbrains Mono"}
    >
      IA
    </Txt>
  );

  yield* all(textA().opacity(1, 0.5), textB().opacity(1, 0.5));

  const plus = createRef<Txt>();

  view.add(
    <Txt
      fontFamily={"Jetbrains Mono"}
      fill={"white"}
      fontSize={120}
      ref={plus}
      opacity={0}
      y={30}
    >
      +
    </Txt>
  );

  yield* all(plus().opacity(1, 0.3), plus().y(0, 0.3));

  yield* waitUntil("discord-talk");

  yield* all(
    plus().opacity(0, 1),
    chatGpt().opacity(0, 1),
    discly().opacity(0, 1),
    textA().opacity(0, 1),
    textB().opacity(0, 1)
  );

  const discord = yield* showImage(view, Discord, new Vector2(400, 400));
  const lineA = createRef<Line>();
  const lineB = createRef<Line>();

  view.add(
    <>
      <Line
        ref={lineA}
        points={[discord().topRight, discord().bottomLeft()]}
        stroke={"red"}
        lineWidth={15}
        end={0}
      />

      <Line
        ref={lineB}
        points={[discord().topLeft, discord().bottomRight()]}
        stroke={"red"}
        lineWidth={15}
        end={0}
      />
    </>
  );

  yield* waitUntil("idk-discord");

  const endIdkDiscordDur = useDuration("end-idk-discord");

  yield* all(
    discord().filters.grayscale(1, endIdkDiscordDur),
    lineA().end(1, endIdkDiscordDur),
    lineB().end(1, endIdkDiscordDur)
  );

  yield* all(
    discord().opacity(0, 1),
    lineA().opacity(0, 1),
    lineB().opacity(0, 1)
  );
});
