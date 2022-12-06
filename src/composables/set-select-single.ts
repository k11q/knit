import { MouseEventExtra } from "../stores/counter";
import { useCounterStore } from "../stores/counter";
import { useSquareStore } from "../stores/dataSquare";
import { usePaddingResizeStore } from "../stores/paddingResizeStore";

export function useSetSelectSingle(e: MouseEventExtra, id: string) {
  const squareStore = useSquareStore();
  const paddingResize = usePaddingResizeStore();
  const selectToi = useCounterStore();

  if (squareStore.dragPointer || squareStore.draggingPointer) {
  } else {
    paddingResize.setResizerSize(id);
    selectToi.selectedBox = id;
    selectToi.selectedBoxData = useGetElementData(selectToi.data, id);
    paddingResize.setGap(id);

    selectToi.prevX = e.layerX as number;
    selectToi.prevY = e.layerY as number;
  }
}
