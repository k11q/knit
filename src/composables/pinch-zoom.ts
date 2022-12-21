import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCanvasStore } from "@/stores/canvas";
import { useCounterStore, Node } from "../stores/counter";

let endPinchZoom: NodeJS.Timeout;

export function usePinchZoom(event: WheelEvent) {
  event.stopImmediatePropagation();

  const addaSquare = useSquareStore();
  const canvasStore = useCanvasStore();
  const selectToi = useCounterStore();

  const canvas = document.querySelector(`[data-id="canvas"]`) as HTMLElement;

  if (!canvasStore.isPinchZoom) {
    if (canvas) {
      canvas.style.willChange = "auto";
    }
    canvasStore.isPinchZoom = true;
    canvasStore.hoverId = "";
    selectToi.treeHoverId = "";
    measuredLines().value = [];
  }

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

  clearTimeout(endPinchZoom);

  endPinchZoom = setTimeout(() => {
    canvasStore.isPinchZoom = false;
    if (canvas) {
      canvas.style.willChange = "transform";
    }
  }, 200);
}
