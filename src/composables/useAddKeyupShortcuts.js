import { useCounterStore } from "@/stores/counter";

export default function () {
  const selectToi = useCounterStore();

  document.removeEventListener("keyup", keyup);
  document.addEventListener("keyup", keyup);

  function keyup(e) {
    if (e.key == "Backspace" || (e.key == "Delete" && selectToi.selectedBox)) {
      useTransferData(
        selectToi.data,
        "",
        selectToi.selectedBoxData,
        selectToi.selectedBoxData.id,
        ""
      ).removeChild();
      selectToi.clearSelected();
    }
  }
}
