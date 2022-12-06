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
      changeGap(prevGap + (e.clientY - prevY));
      paddingResize.setGap(selectToi.selectedBoxData.id);
    }

    function mouseup() {
      canvasStore.isResizingGap = false;
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    }
  }
}
