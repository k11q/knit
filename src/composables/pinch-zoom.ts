import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCanvasStore } from "@/stores/canvas";
import { useCounterStore, Node } from "../stores/counter";

let startPinchZoom = false;
let scheduledAnimationFrame = false;

export function usePinchZoom(event: WheelEvent) {
  const addaSquare = useSquareStore();
  const canvasStore = useCanvasStore();
  const selectToi = useCounterStore();

  let canvas = document.querySelector(`[data-id="canvas"]`) as HTMLElement;

  event.preventDefault();
  canvasStore.isPinchZoom = true;
  canvasStore.hoverData = {} as Node;
  canvasStore.hoverId = "";
  selectToi.treeHoverId = "";

  canvas.style.willChange = "transform";

  if (
    event.deltaX === 0 &&
    event.ctrlKey &&
    addaSquare.scale >= 0.02 &&
    addaSquare.scale <= 256
  ) {
    let xs = (event.clientX - addaSquare.offsetLeft) / addaSquare.scale;
    let ys = (event.clientY - addaSquare.offsetTop) / addaSquare.scale;
    addaSquare.scale += event.deltaY * -0.008 * addaSquare.scale;
    addaSquare.scale = Math.max(0.02, Math.min(256, addaSquare.scale));
    addaSquare.offsetLeft = event.clientX - xs * addaSquare.scale;
    addaSquare.offsetTop = event.clientY - ys * addaSquare.scale;
  } else {
    addaSquare.offsetLeft += -event.deltaX * 0.5;
    addaSquare.offsetTop += -event.deltaY * 0.5;
  }

  function transformCanvas() {
    canvas.style.transform = `translate(${addaSquare.offsetLeft}px, ${addaSquare.offsetTop}px) scale(${addaSquare.scale})`;

    scheduledAnimationFrame = false;
  }

  function update() {
    clearTimeout(endPinchZoom);

    startPinchZoom = true;

    measuredLines().value = [];

    endPinchZoom = setTimeout(() => {
      canvasStore.isPinchZoom = false;
      canvas.style.willChange = "";

      startPinchZoom = false;
    }, "400");
  }

  var endPinchZoom;

  if (!startPinchZoom) {
    update();
  }

  if (!scheduledAnimationFrame) {
    scheduledAnimationFrame = true;
    requestAnimationFrame(transformCanvas);
  }
}
