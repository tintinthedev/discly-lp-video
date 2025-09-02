import { Video, View2D } from "@motion-canvas/2d";
import { createRef, easeOutCubic, tween, Vector2 } from "@motion-canvas/core";

/**
 *
 * @param parent the parent view to place the image
 * @param video the source of the video
 * @param size the desired image size
 * @param position the desired image position (defaults to 0,0)
 * @param radius the radius of the image
 * @param scale the scale of the video
 * @returns a ref to the created image
 */
export function* showVideo(
  parent: View2D,
  video: string,
  size: Vector2,
  position: Vector2 = Vector2.zero,
  radius: number = 0,
  scale: number = 1
) {
  const videoRef = createRef<Video>();

  yield parent.add(
    <Video
      ref={videoRef}
      src={video}
      width={size.x}
      height={size.y}
      opacity={0}
      radius={radius}
      scale={scale}
    />
  );

  videoRef().y(200);

  yield* tween(0.5, (value) => {
    const imageOpacity = easeOutCubic(value, 0, 1);
    const imagePos = new Vector2(
      easeOutCubic(value, 0, position.x),
      easeOutCubic(value, 200, position.y)
    );

    videoRef().opacity(imageOpacity);
    videoRef().position(imagePos);
  });

  return videoRef;
}
