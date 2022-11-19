import { useCounterStore } from "@/stores/counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";

export default function (e) {
  if (
    event.key == "Backspace" ||
    (event.key == "Delete" && selectToi.selectedBox)
  ) {
    canvasDnd.dndRemove(selectToi.data);
    selectToi.clearSelected();
  }
}
