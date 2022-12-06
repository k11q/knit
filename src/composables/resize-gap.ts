import { useCounterStore } from "../stores/counter";
import { usePaddingResizeStore } from "../stores/paddingResizeStore";
import { useCanvasStore } from "../stores/canvas";

export function useResizeGap(e: MouseEvent) {
  const selectToi = useCounterStore();
  if (selectToi.selectedBoxData) {
    const paddingResize = usePaddingResizeStore();
    const canvasStore = useCanvasStore();
    canvasStore.isResizingGap = true;
    canvasStore.cursorType = "row-resize";

    let prevY = e.clientY;
    let prevGap: number;
    if (getGap()) {
      prevGap = getGap() as number;
    } else prevGap = 0;

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      function update() {
        if (getGap()) {
          canvasStore.cursorLabel = getGap() as string;
        } else canvasStore.cursorLabel = "";
        changeGap(prevGap + (e.clientY - prevY));
        paddingResize.setGap(selectToi.selectedBoxData.id);
      }
      window.requestAnimationFrame(update);
    }

    function mouseup() {
      canvasStore.isResizingGap = false;
      canvasStore.cursorLabel = "";
      canvasStore.cursorType = "";
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    }
  }
}
