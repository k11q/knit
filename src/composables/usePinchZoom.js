import { useSquareStore } from "@/stores/dataSquare";
import { storeCanvas } from "@/stores/storeCanvas";

export default function (event) {
  const addaSquare = useSquareStore();
  const canvasStore = storeCanvas();

  event.preventDefault();
  canvasStore.isPinchZoom = true;

  if (
    event.deltaX === 0 &&
    event.ctrlKey &&
    addaSquare.scale >= 0.02 &&
    addaSquare.scale <= 25.6
  ) {
    clearTimeout(endPinchZoom);
    let xs = (event.clientX - addaSquare.offsetLeft) / addaSquare.scale;
    let ys = (event.clientY - addaSquare.offsetTop) / addaSquare.scale;
    addaSquare.scale += event.deltaY * -0.009 * addaSquare.scale;
    addaSquare.scale = Math.max(0.02, Math.min(25.6, addaSquare.scale));
    addaSquare.offsetLeft = event.clientX - xs * addaSquare.scale;
    addaSquare.offsetTop = event.clientY - ys * addaSquare.scale;
  } else {
    clearTimeout(endPinchZoom);
    addaSquare.offsetLeft += -event.deltaX;
    addaSquare.offsetTop += -event.deltaY;
  }

  function endPinchZoom() {
    setTimeout(() => {
      canvasStore.isPinchZoom = false;
    }, "0");
  }
  endPinchZoom();
}
