import { useCounterStore } from "@/stores/counter";
import { useCanvasMarkerStore } from "@/stores/canvasMarker";
import { useSquareStore } from "@/stores/dataSquare";
import { useDndStore } from "@/stores/dndStore";

export default function (e, id) {
  const selectToi = useCounterStore();
  const canvasMarker = useCanvasMarkerStore();
  const squareStore = useSquareStore();
  const dndStore = useDndStore();
  const element = document.querySelector(`[data-id=${id}]`);
  const elementRect = document
    .querySelector(`[data-id=${id}]`)
    .getBoundingClientRect();

  const prevY = dndStore.prevY;
  const prevX = dndStore.prevX;
  let newDistanceY =
    e.clientY -
    elementRect.y +
    (squareStore.offsetTop / squareStore.scale) * squareStore.scale;
  let newDistanceX =
    e.clientX -
    elementRect.x +
    (squareStore.offsetLeft / squareStore.scale) * squareStore.scale;

  let targetChildren = [
    ...document.querySelector(`[data-id=${id}]`).parentElement.children,
  ];
  let targetChildrenData = [];

  targetChildren.forEach((i) => {
    if (i.dataset.id !== selectToi.selectedBox) {
      let childRect = i.getBoundingClientRect();
      let lineLeft = childRect.x;
      let lineTop = childRect.y;
      let lineRight = childRect.x + childRect.width;
      let lineBottom = childRect.y + childRect.height;
      let newlineBottom;
      let newlineTop;
      let newlineLeft;
      let newlineRight;

      let distanceTopToLineTop = elementRect.y + prevY - newDistanceY - lineTop;
      let distanceTopToLineBottom =
        elementRect.y + prevY - newDistanceY - lineBottom;
      let distanceBottomToLineTop =
        elementRect.y + prevY - newDistanceY + elementRect.height - lineTop;
      let distanceBottomToLineBottom =
        elementRect.y + prevY - newDistanceY + elementRect.height - lineBottom;
      let distanceLeftToLineLeft =
        elementRect.x + prevX - newDistanceX - lineLeft;
      let distanceLeftToLineRight =
        elementRect.x + prevX - newDistanceX - lineRight;
      let distanceRightToLineLeft =
        elementRect.x + prevX - newDistanceX + elementRect.width - lineLeft;
      let distanceRightToLineRight =
        elementRect.x + prevX - newDistanceX + elementRect.width - lineRight;

      if (distanceTopToLineTop < 4 && distanceTopToLineTop > -4) {
        newlineTop = childRect.y;
        dndStore.snapPositionTop = true;
        dndStore.snapPointTop = childRect.y;
      }
      if (distanceBottomToLineTop < 4 && distanceBottomToLineTop > -4) {
        newlineTop = childRect.y;
        dndStore.snapPositionBottom = true;
        dndStore.snapPointBottom = childRect.y;
      }
      if (
        distanceTopToLineTop >= 4 ||
        (distanceTopToLineTop <= -4 && distanceBottomToLineTop >= 4) ||
        distanceBottomToLineTop <= -4
      ) {
        newlineTop = undefined;
      }

      if (distanceTopToLineBottom < 4 && distanceTopToLineBottom > -4) {
        newlineBottom = childRect.y + childRect.height;
        dndStore.snapPositionTop = true;
        dndStore.snapPointTop = newlineBottom;
      }
      if (distanceBottomToLineBottom < 4 && distanceBottomToLineBottom > -4) {
        newlineBottom = childRect.y + childRect.height;
        dndStore.snapPositionBottom = true;
        dndStore.snapPointBottom = newlineBottom;
      }
      if (
        distanceTopToLineBottom >= 4 ||
        (distanceTopToLineBottom <= -4 && distanceBottomToLineBottom >= 4) ||
        distanceBottomToLineBottom <= -4
      ) {
        newlineBottom = undefined;
      }

      if (distanceLeftToLineLeft < 4 && distanceLeftToLineLeft > -4) {
        newlineLeft = childRect.x;
        dndStore.snapPositionLeft = true;
        dndStore.snapPointLeft = newlineLeft;
      }
      if (distanceRightToLineLeft < 4 && distanceRightToLineLeft > -4) {
        newlineLeft = childRect.x;
        dndStore.snapPositionRight = true;
        dndStore.snapPointRight = newlineLeft;
      }
      if (
        distanceLeftToLineLeft >= 4 ||
        (distanceLeftToLineLeft <= -4 && distanceRightToLineLeft >= 4) ||
        distanceRightToLineLeft <= -4
      ) {
        newlineLeft = undefined;
      }

      if (distanceLeftToLineRight < 4 && distanceLeftToLineRight > -4) {
        newlineRight = childRect.x + childRect.width;
        dndStore.snapPositionLeft = true;
        dndStore.snapPointLeft = newlineRight;
      }
      if (distanceRightToLineRight < 4 && distanceRightToLineRight > -4) {
        newlineRight = childRect.x + childRect.width;
        dndStore.snapPositionRight = true;
        dndStore.snapPointRight = newlineRight;
      }
      if (
        distanceLeftToLineRight >= 4 ||
        (distanceLeftToLineRight <= -4 && distanceRightToLineRight >= 4) ||
        distanceRightToLineRight <= -4
      ) {
        newlineRight = undefined;
        dndStore.setLeftPosition(e);
      }

      targetChildrenData.push({
        lineTop: newlineTop,
        lineLeft: newlineLeft,
        lineRight: newlineRight,
        lineBottom: newlineBottom,
      });
    }
  });

  let snapTop = false;
  let snapBottom = false;
  let snapLeft = false;
  let snapRight = false;

  let pointTop = NaN;
  let pointBottom = NaN;
  let pointLeft = NaN;
  let pointRight = NaN;

  console.log("pointtop = " + pointTop);

  targetChildrenData.every((i) => {
    if (i.lineTop || i.lineBottom) {
      snapTop = true;
      snapBottom = true;
      return false;
    } else {
      snapTop = false;
      snapBottom = false;
      return true;
    }
  });
  targetChildrenData.every((i) => {
    if (i.lineLeft || i.lineRight) {
      snapLeft = true;
      snapRight = true;
      return false;
    } else {
      snapLeft = false;
      snapRight = false;
      return true;
    }
  });

  if (!snapTop) {
    dndStore.snapPositionTop = false;
  }
  if (!snapBottom) {
    dndStore.snapPositionBottom = false;
  }
  if (!snapLeft) {
    dndStore.snapPositionLeft = false;
  }
  if (!snapRight) {
    dndStore.snapPositionRight = false;
  }

  if (
    dndStore.snapPositionTop &&
    dndStore.snapPointTop &&
    !dndStore.snapPositionBottom
  ) {
    selectToi.selectedBoxData.attr.style.top =
      Math.round(
        (dndStore.snapPointTop - squareStore.offsetTop) / squareStore.scale
      ) + "px";
  }
  if (
    dndStore.snapPositionBottom &&
    dndStore.snapPointBottom &&
    !dndStore.snapPositionTop
  ) {
    selectToi.selectedBoxData.attr.style.top =
      Math.round(
        (dndStore.snapPointBottom -
          elementRect.height -
          squareStore.offsetTop) /
          squareStore.scale
      ) + "px";
  }
  if (
    dndStore.snapPositionLeft &&
    dndStore.snapPointLeft &&
    !dndStore.snapPositionRight
  ) {
    selectToi.selectedBoxData.attr.style.left =
      Math.round(
        (dndStore.snapPointLeft - squareStore.offsetLeft) / squareStore.scale
      ) + "px";
  }
  if (
    dndStore.snapPositionRight &&
    dndStore.snapPointRight &&
    !dndStore.snapPositionLeft
  ) {
    selectToi.selectedBoxData.attr.style.left =
      Math.round(
        (dndStore.snapPointRight - elementRect.width - squareStore.offsetLeft) /
          squareStore.scale
      ) + "px";
  }

  if (
    dndStore.snapPositionTop &&
    dndStore.snapPointTop &&
    dndStore.snapPositionBottom &&
    dndStore.snapPointBottom
  ) {
    if (
      elementRect.y + prevY - newDistanceY - dndStore.snapPositionTop >=
      elementRect.y +
        prevY -
        newDistanceY +
        elementRect.height -
        dndStore.snapPositionBottom
    ) {
      selectToi.selectedBoxData.attr.style.top =
        Math.round(
          (dndStore.snapPointTop - squareStore.offsetTop) / squareStore.scale
        ) + "px";
    } else {
      selectToi.selectedBoxData.attr.style.top =
        Math.round(
          (dndStore.snapPointBottom -
            elementRect.height -
            squareStore.offsetTop) /
            squareStore.scale
        ) + "px";
    }
  }

  if (
    dndStore.snapPositionLeft &&
    dndStore.snapPointLeft &&
    dndStore.snapPositionRight &&
    dndStore.snapPointRight
  ) {
    if (
      elementRect.x + prevX - newDistanceX - dndStore.snapPositionLeft >=
      elementRect.x +
        prevX -
        newDistanceX +
        elementRect.width -
        dndStore.snapPositionRight
    ) {
      selectToi.selectedBoxData.attr.style.left =
        Math.round(
          (dndStore.snapPointLeft - squareStore.offsetLeft) / squareStore.scale
        ) + "px";
    } else {
      selectToi.selectedBoxData.attr.style.left =
        Math.round(
          (dndStore.snapPointRight -
            elementRect.width -
            squareStore.offsetLeft) /
            squareStore.scale
        ) + "px";
    }
  }

  if (!dndStore.snapPositionTop && !dndStore.snapPositionBottom) {
    dndStore.setTopPosition(e);
  }
  if (!dndStore.snapPositionRight && !dndStore.snapPositionLeft) {
    dndStore.setLeftPosition(e);
  }

  console.log("snpos = " + dndStore.snapPosition);
  canvasMarker.lines = targetChildrenData;
}
