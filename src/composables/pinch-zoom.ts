import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCanvasStore } from "@/stores/canvas";
import { useCounterStore, Node } from "../stores/counter";

export function usePinchZoom(event: WheelEvent) {
  const addaSquare = useSquareStore();
  const canvasStore = useCanvasStore();
  const selectToi = useCounterStore();

  event.preventDefault();
  canvasStore.isPinchZoom = true;
  canvasStore.hoverData = {} as Node;
  canvasStore.hoverId = "";
  selectToi.treeHoverId = "";

  function update() {
    if (
      event.deltaX === 0 &&
      event.ctrlKey &&
      addaSquare.scale >= 0.02 &&
      addaSquare.scale <= 256
    ) {
      clearTimeout(endPinchZoom);
      let xs = (event.clientX - addaSquare.offsetLeft) / addaSquare.scale;
      let ys = (event.clientY - addaSquare.offsetTop) / addaSquare.scale;
      addaSquare.scale += event.deltaY * -0.008 * addaSquare.scale;
      addaSquare.scale = Math.max(0.02, Math.min(256, addaSquare.scale));
      addaSquare.offsetLeft = event.clientX - xs * addaSquare.scale;
      addaSquare.offsetTop = event.clientY - ys * addaSquare.scale;
    } else {
      clearTimeout(endPinchZoom);
      addaSquare.offsetLeft += -event.deltaX * 0.7;
      addaSquare.offsetTop += -event.deltaY * 0.7;
    }
    function endPinchZoom() {
      setTimeout(() => {
        canvasStore.isPinchZoom = false;
      }, "400");
    }
    measuredLines().value = [];
    endPinchZoom();
  }
  requestAnimationFrame(update);
}
