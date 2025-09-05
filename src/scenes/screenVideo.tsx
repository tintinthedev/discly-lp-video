import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import screenVideo from "../videos/lp-video-no-audio.mp4";
import { showVideo } from "../helpers/showVideo";
import {
  all,
  createRef,
  Vector2,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const video = yield* showVideo(
    view,
    screenVideo,
    new Vector2(1920, 1080),
    Vector2.zero,
    30,
    0.9
  );

  video().play();

  yield* waitUntil("prompt");

  const promptText = createRef<Txt>();

  view.add(
    <Txt
      ref={promptText}
      fill={"white"}
      fontFamily={"Jetbrains mono"}
      opacity={0}
      y={50}
      text={`
      Crie um servidor para eu e meus amigos jogarmos
      Minecraft. Deve ter vários canais e calls para
      jogarmos e falarmos sobre diversos tópicos do 
      Minecraft, como mods, atualizações, servidores 
      e mini-games. Deve ter cargos para convidados, 
      moderadores, amigos próximos e para o 
      administrador do servidor. Deve ter uma 
      categoria apenas para membros da staff 
      (moderadores e admin).
    `}
    />
  );

  yield* all(
    promptText().opacity(1, 0.4),
    promptText().y(0, 0.4),
    video().filters.brightness(0.1, 0.5)
  );

  yield* waitFor(1.3);

  yield* all(
    promptText().y(50, 0.4),
    promptText()
      .opacity(0, 0.4)
      .do(() => promptText().remove()),
    video().filters.brightness(1, 0.4)
  );

  yield* waitUntil("cargos-to-canais");

  const textB = createRef<Txt>();

  view.add(
    <Txt
      ref={textB}
      fill={"white"}
      fontFamily={"Jetbrains Mono"}
      y={50}
      x={-500}
      opacity={0}
    >
      Canais*
    </Txt>
  );

  yield* all(textB().opacity(1, 0.5), textB().y(0, 0.5));

  yield* waitFor(1);

  yield* all(textB().opacity(0, 0.5), textB().y(50, 0.5));

  textB().remove();

  yield* waitUntil("video-end");

  yield* all(
    video().y(50, 0.5),
    video()
      .opacity(0, 0.5)
      .do(() => video().remove())
  );
});
