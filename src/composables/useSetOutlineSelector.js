import { useSquareStore } from "@/stores/dataSquare";
import { useCounterStore } from "@/stores/counter";

export default function (id) {
  const squareStore = useSquareStore();
  const selectToi = useCounterStore();

  let target = document.querySelector(`[data-id=${id}]`);
  let selectedTarget = target.getBoundingClientRect();

  selectToi.selectedBoxHTMLX = Math.round(
    (selectedTarget.x - squareStore.offsetLeft) / squareStore.scale
  );
  selectToi.selectedBoxHTMLY = Math.round(
    (selectedTarget.y - squareStore.offsetTop) / squareStore.scale
  );

  selectToi.selectedBoxHTMLWidth = Math.round(
    selectedTarget.width / squareStore.scale
  );
  selectToi.selectedBoxHTMLHeight = Math.round(
    selectedTarget.height / squareStore.scale
  );
}
