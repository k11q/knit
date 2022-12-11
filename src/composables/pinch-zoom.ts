import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCanvasStore } from "@/stores/canvas";

export function usePinchZoom(event: WheelEvent) {
  const addaSquare = useSquareStore();
  const canvasStore = useCanvasStore();

  event.preventDefault();
  canvasStore.isPinchZoom = true;

  function update() {
    if (
      event.deltaX === 0 &&
      event.ctrlKey &&
      addaSquare.scale >= 0.02 &&
      addaSquare.scale <= 25.6
    ) {
      clearTimeout(endPinchZoom);
      let xs = (event.clientX - addaSquare.offsetLeft) / addaSquare.scale;
      let ys = (event.clientY - addaSquare.offsetTop) / addaSquare.scale;
      addaSquare.scale += event.deltaY * -0.008 * addaSquare.scale;
      addaSquare.scale = Math.max(0.02, Math.min(25.6, addaSquare.scale));
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
    endPinchZoom();
  }
  requestAnimationFrame(update);
}
