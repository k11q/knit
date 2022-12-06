import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCounterStore } from "~~/src/stores/counter";

export default function (id: string) {
  const squareStore = useSquareStore();
  const selectToi = useCounterStore();

  if (id) {
    let target = document.querySelector(`[data-id=${id}]`) as HTMLElement;
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
}
