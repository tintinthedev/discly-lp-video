import { Img, View2D } from "@motion-canvas/2d";
import { createRef, easeOutCubic, tween, Vector2 } from "@motion-canvas/core";

/**
 *
 * @param parent the parent view to place the image
 * @param image the source of the image
 * @param size the desired image size
 * @param position the desired image position (defaults to 0,0)
 * @param radius the radius of the image
 * @returns a ref to the created image
 */
export function* showImage(
  parent: View2D,
  image: string,
  size: Vector2,
  position: Vector2 = Vector2.zero,
  radius: number = 10
) {
  const imageRef = createRef<Img>();

  yield parent.add(
    <Img
      ref={imageRef}
      src={image}
      width={size.x}
      height={size.y}
      opacity={0}
      radius={radius}
    />
  );

  imageRef().y(200);

  yield* tween(0.5, (value) => {
    const imageOpacity = easeOutCubic(value, 0, 1);
    const imagePos = new Vector2(
      easeOutCubic(value, 0, position.x),
      easeOutCubic(value, 200, position.y)
    );

    imageRef().opacity(imageOpacity);
    imageRef().position(imagePos);
  });

  return imageRef;
}
