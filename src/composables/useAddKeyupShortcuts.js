import { useCounterStore } from "@/stores/counter";

export default function () {
  const selectToi = useCounterStore();

  document.removeEventListener("keyup", keyup);
  document.addEventListener("keyup", keyup);

  function keyup(e) {
    if (e.key == "Backspace" || (e.key == "Delete" && selectToi.selectedBox)) {
      useTransferData().removeChild(
        selectToi.data,
        selectToi.selectedBoxData.id
      );
      selectToi.clearSelected();
    }
  }
}
