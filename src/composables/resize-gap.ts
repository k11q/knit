import { useCounterStore } from "../stores/counter";
import { usePaddingResizeStore } from "../stores/paddingResizeStore";
import { useCanvasStore } from "../stores/canvas";

export function useResizeGap(e: MouseEvent) {
  const selectToi = useCounterStore();
  if (selectToi.selectedBoxData) {
    const paddingResize = usePaddingResizeStore();
    const canvasStore = useCanvasStore();
    canvasStore.isResizingGap = true;

    let prevY = e.clientY;
    let prevGap: number;
    if (getGap()) {
      prevGap = getGap() as number;
    } else prevGap = 0;

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      if (getGap()) {
        canvasStore.cursorLabel = getGap() as string;
      } else canvasStore.cursorLabel = "";

      function update() {
        changeGap(prevGap + (e.clientY - prevY));
        paddingResize.setGap(selectToi.selectedBoxData.id);
      }
      window.requestAnimationFrame(update);
    }

    function mouseup() {
      canvasStore.isResizingGap = false;
      canvasStore.cursorLabel = "";
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    }
  }
}
