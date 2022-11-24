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

      (distanceTopToLineTop < 4 && distanceTopToLineTop > -4) ||
      (distanceBottomToLineTop < 4 && distanceBottomToLineTop > -4)
        ? (newlineTop = i.getBoundingClientRect().y)
        : (lineTop = undefined);
      (distanceTopToLineBottom < 4 && distanceTopToLineBottom > -4) ||
      (distanceBottomToLineBottom < 4 && distanceBottomToLineBottom > -4)
        ? (newlineBottom =
            i.getBoundingClientRect().y + i.getBoundingClientRect().height)
        : (newlineBottom = undefined);
      (distanceLeftToLineLeft < 4 && distanceLeftToLineLeft > -4) ||
      (distanceRightToLineLeft < 4 && distanceRightToLineLeft > -4)
        ? (newlineLeft = i.getBoundingClientRect().x)
        : (newlineLeft = undefined);
      (distanceLeftToLineRight < 4 && distanceLeftToLineRight > -4) ||
      (distanceRightToLineRight < 4 && distanceRightToLineRight > -4)
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
