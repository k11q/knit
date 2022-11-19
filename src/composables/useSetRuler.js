import { useCounterStore } from "@/stores/counter";
import { useCanvasMarkerStore } from "@/stores/canvasMarker";
import { useSquareStore } from "@/stores/dataSquare";

export default function (e, id) {
  const selectToi = useCounterStore();
  const canvasMarker = useCanvasMarkerStore();
  const squareStore = useSquareStore();

  let targetChildren = [
    ...document.querySelector(`[data-id=${id}]`).parentElement.children,
  ];
  let targetChildrenData = [];

  targetChildren.forEach((i) => {
    if (i.dataset.id !== selectToi.selectedBox) {
      let lineLeft = i.getBoundingClientRect().x;
      let lineTop = i.getBoundingClientRect().y;
      let lineRight =
        i.getBoundingClientRect().x + i.getBoundingClientRect().width;
      let lineBottom =
        i.getBoundingClientRect().y + i.getBoundingClientRect().height;
      let newlineBottom;
      let newlineTop;
      let newlineLeft;
      let newlineRight;

      let distanceTopToLineTop =
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect().y -
        lineTop;
      let distanceTopToLineBottom =
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect().y -
        lineBottom;
      let distanceBottomToLineTop =
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect().y +
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect()
          .height -
        lineTop;
      let distanceBottomToLineBottom =
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect().y +
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect()
          .height -
        lineBottom;
      let distanceLeftToLineLeft =
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect().x -
        lineLeft;
      let distanceLeftToLineRight =
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect().x -
        lineRight;
      let distanceRightToLineLeft =
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect().x +
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect()
          .width -
        lineLeft;
      let distanceRightToLineRight =
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect().x +
        document.querySelector(`[data-id=${id}]`).getBoundingClientRect()
          .width -
        lineRight;

      (distanceTopToLineTop < 4 / squareStore.scale &&
        distanceTopToLineTop > -4 / squareStore.scale) ||
      (distanceBottomToLineTop < 4 / squareStore.scale &&
        distanceBottomToLineTop > -4 / squareStore.scale)
        ? (newlineTop = i.getBoundingClientRect().y)
        : (lineTop = undefined);
      (distanceTopToLineBottom < 4 / squareStore.scale &&
        distanceTopToLineBottom > -4 / squareStore.scale) ||
      (distanceBottomToLineBottom < 4 / squareStore.scale &&
        distanceBottomToLineBottom > -4 / squareStore.scale)
        ? (newlineBottom =
            i.getBoundingClientRect().y + i.getBoundingClientRect().height)
        : (newlineBottom = undefined);
      (distanceLeftToLineLeft < 4 / squareStore.scale &&
        distanceLeftToLineLeft > -4 / squareStore.scale) ||
      (distanceRightToLineLeft < 4 / squareStore.scale &&
        distanceRightToLineLeft > -4 / squareStore.scale)
        ? (newlineLeft = i.getBoundingClientRect().x)
        : (newlineLeft = undefined);
      (distanceLeftToLineRight < 4 / squareStore.scale &&
        distanceLeftToLineRight > -4 / squareStore.scale) ||
      (distanceRightToLineRight < 4 / squareStore.scale &&
        distanceRightToLineRight > -4 / squareStore.scale)
        ? (newlineRight =
            i.getBoundingClientRect().x + i.getBoundingClientRect().width)
        : (newlineRight = undefined);

      targetChildrenData.push({
        lineTop: newlineTop,
        lineLeft: newlineLeft,
        lineRight: newlineRight,
        lineBottom: newlineBottom,
      });
    }
  });
  canvasMarker.lines = targetChildrenData;
}
