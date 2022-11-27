import { useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import { useStoreTree } from "@/stores/storeTree";

export default function (id) {
  const selectToi = useCounterStore();
  const squareStore = useSquareStore();
  const storeTree = useStoreTree();

  selectToi.treeHover = true;
  selectToi.treeHoverId = id;
  storeTree.hoverId = id;
  let target = document.querySelector(`[data-id=${id}]`);
  let selectedTarget = target.getBoundingClientRect();

  selectToi.treeHoverHTMLX = Math.round(
    (selectedTarget.x - squareStore.offsetLeft) / squareStore.scale
  );
  selectToi.treeHoverHTMLY = Math.round(
    (selectedTarget.y - squareStore.offsetTop) / squareStore.scale
  );

  selectToi.treeHoverHTMLWidth = Math.round(
    selectedTarget.width / squareStore.scale
  );
  selectToi.treeHoverHTMLHeight = Math.round(
    selectedTarget.height / squareStore.scale
  );
}
