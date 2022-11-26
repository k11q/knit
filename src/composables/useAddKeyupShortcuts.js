import { useCanvasDndStore } from "@/stores/canvasDnd";
import { useCounterStore } from "@/stores/counter";

export default function () {
  const selectToi = useCounterStore();
  const canvasDnd = useCanvasDndStore();

  document.removeEventListener("keyup", keyup);
  document.addEventListener("keyup", keyup);

  function keyup() {
    if (
      event.key == "Backspace" ||
      (event.key == "Delete" && selectToi.selectedBox)
    ) {
      canvasDnd.dndRemove(selectToi.data);
      selectToi.clearSelected();
    }
  }
}
