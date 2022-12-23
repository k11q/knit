import * as PIXI from "pixi.js";

export function pixiPinchZoom(event: WheelEvent) {
  event.stopPropagation();
  event.preventDefault();

  const container = pixiContainer().value as PIXI.Container;
  const mouseX = event.clientX - 296;
  const mouseY = event.clientY - 56;

  if (
    event.deltaX === 0 &&
    event.ctrlKey &&
    container.scale.x >= 0.02 &&
    container.scale.x <= 256
  ) {
    const xs = (mouseX - container.x) / container.scale.x;
    const ys = (mouseY - container.y) / container.scale.x;
    container.scale.x += event.deltaY * -0.008 * container.scale.x;
    container.scale.x = Math.max(0.02, Math.min(256, container.scale.x));
    container.scale.y += event.deltaY * -0.008 * container.scale.x;
    container.scale.y = Math.max(0.02, Math.min(256, container.scale.x));
    container.x = mouseX - xs * container.scale.x;
    container.y = mouseY - ys * container.scale.x;
  } else {
    container.x += -event.deltaX * 0.5;
    container.y += -event.deltaY * 0.5;
  }

  pixiScale().value = container.scale.x;
  if (pixiSelection().value.length || pixiNodesSelection().value.length) {
    updateSelector(
      pixiNodesSelection().value[0].x,
      pixiNodesSelection().value[0].y,
      pixiNodesSelection().value[0].width,
      pixiNodesSelection().value[0].height
    );
  }
}
