import { useCounterStore } from "@/stores/counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";

export default function (e: KeyboardEvent) {
  const canvasDnd = useCanvasDndStore();
  const selectToi = useCounterStore();

  if (e.key == "Backspace" || (e.key == "Delete" && selectToi.selectedBox)) {
    canvasDnd.dndRemove(selectToi.data);
    selectToi.clearSelected();
  }
}
