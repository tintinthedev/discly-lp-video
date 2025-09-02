import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import screenVideo from "../videos/video-lp.mp4";
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

  const rect = createRef<Rect>();

  view.add(
    <Rect ref={rect} opacity={0} stroke={"red"} lineWidth={5} radius={10} />
  );

  rect().position([240, -355]).width(80).height(30);

  yield* waitUntil("login");

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("add");

  rect().position([-450, 20]).width(120);

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("add2");

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("add3");

  rect().position([125, 280]).width(50).height(50);

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("invite");

  rect().position([89, 120]).width(150).height(50);

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("admin");

  rect().position([-100, 20]).width(150).height(50);

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("prompt");

  video().pause();

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

  yield* all(
    promptText().y(50, 0.4),
    promptText()
      .opacity(0, 0.4)
      .do(() => promptText().remove()),
    video().filters.brightness(1, 0.4)
  );

  video().play();

  yield* waitUntil("command1");

  rect().position([-380, 120]).width(250).height(60);

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("server-creation");

  rect().position([-670, 90]).width(250).height(600);

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("channel-roles");

  rect().position([-400, 330]).width(320).height(60);

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("edit-server");

  rect().position([-380, 70]).width(250).height(60);

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("finish-typing");

  video().pause();

  const textA = createRef<Txt>();

  view.add(
    <Txt
      ref={textA}
      fill={"white"}
      fontFamily={"Jetbrains mono"}
      opacity={0}
      y={50}
      text={`Remova todos os emojis dos nomes dos canais`}
    />
  );

  yield* all(
    textA().opacity(1, 0.4),
    textA().y(0, 0.4),
    video().filters.brightness(0.1, 0.5)
  );

  yield* all(
    textA().y(50, 0.4),
    textA()
      .opacity(0, 0.4)
      .do(() => promptText().remove()),
    video().filters.brightness(1, 0.4)
  );

  video().play();

  yield* waitUntil("emojis");

  rect().position([-670, 90]).width(250).height(600);

  yield* rect().opacity(1, 0.3).to(0, 0.3);

  yield* waitUntil("video-end");

  yield* all(
    video().y(50, 0.5),
    video()
      .opacity(0, 0.5)
      .do(() => video().remove())
  );

  yield* waitFor(2);
});
