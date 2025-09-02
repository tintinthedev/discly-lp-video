import { Circle, Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { createRef, makeRef, sequence, waitFor } from "@motion-canvas/core";

const editServerFeatures = [
  "Criar, modificar e remover cargos",
  "Criar, modificar e remover canais",
  "Criar, modificar e remover categorias",
];

const createServerFeatures = [
  "Configurar permissões",
  "Configurar canais",
  "Configurar cargos",
];

const allFeatures = [
  {
    featureTitle: "Criar servidor",
    features: createServerFeatures,
  },
  {
    featureTitle: "Editar servidor",
    features: editServerFeatures,
  },
];

export default makeScene2D(function* (view) {
  const boxes: Rect[] = [];

  allFeatures.forEach((featureData, i) => (
    <Rect
      layout
      gap={30}
      direction={"column"}
      ref={makeRef(boxes, i)}
      opacity={0}
    >
      <Txt fill={"white"} fontFamily={"Jetbrains Mono"} alignSelf={"center"}>
        {featureData.featureTitle}
      </Txt>

      <Rect
        layout
        direction={"column"}
        gap={15}
        fill={"#313131ff"}
        padding={30}
        smoothCorners
        radius={10}
      >
        {featureData.features.map((feature) => (
          <Txt
            fill={"#ddd"}
            alignSelf={"start"}
            fontFamily={"Jetbrains Mono"}
            fontSize={35}
          >
            {feature}
          </Txt>
        ))}
      </Rect>
    </Rect>
  ));

  const layout = createRef<Layout>();

  view.add(<Layout ref={layout} layout direction={"column"} gap={100} />);

  boxes.forEach((box) => {
    layout().add(box);
  });

  yield* sequence(0.2, ...boxes.map((box) => box.opacity(1, 0.5)));

  const circle = createRef<Circle>();

  view.add(<Circle ref={circle} fill={"#5865F2"} />);

  yield* waitFor(2);

  yield* circle().size(4000, 1);
});
