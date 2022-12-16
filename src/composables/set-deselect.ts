import { useCanvasStore } from "../stores/canvas";
import { useCounterStore } from "../stores/counter";
import { Node } from "../stores/counter";

export function useSetDeselect() {
  const canvasStore = useCanvasStore();
  const selectToi = useCounterStore();

  if (selectToi.selectedTextEditor) {
    useSetOutlineSelector(selectToi.selectedTextEditor);
    selectToi.selectedTextEditor = "";
  } else {
    selectToi.selectedBox = "";
    selectToi.selectedBoxData = {} as Node;
    canvasStore.selection = [];
    canvasStore.showColorMenu = false;
    canvasStore.multiSelectResizerRect = {
      left: "",
      top: "",
      height: "",
      width: "",
    };
  }
}
