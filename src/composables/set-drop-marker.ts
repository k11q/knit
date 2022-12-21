import { useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasStore } from "@/stores/canvas";

export const markerHeight = () => useState("markerHeight", () => "");
export const markerWidth = () => useState("markerWidth", () => "");
export const markerLeft = () => useState("markerLeft", () => "");
export const markerTop = () => useState("markerTop", () => "");

export function setDropMarker(e: MouseEvent, currDragElement: HTMLElement) {
  const selectToi = useCounterStore();
  const squareStore = useSquareStore();
  const canvasStore = useCanvasStore();

  let drop = useGetClosestElement(e);
  let dropRect = drop.getBoundingClientRect();
  let currDragRect = currDragElement.getBoundingClientRect();
  let paddingLeft = parseInt(drop.style.paddingLeft) | 0;
  let paddingTop = parseInt(drop.style.paddingTop) | 0;

  if (drop.style.flexDirection === "column") {
    if (!drop.children.length) {
      markerLeft().value =
        (paddingLeft + dropRect.x - squareStore.offsetLeft) /
          squareStore.scale +
        "px";
      markerTop().value =
        (paddingTop + dropRect.y - squareStore.offsetTop) / squareStore.scale +
        "px";
    }
    if (drop.children.length) {
      let dropzoneChildren = [...drop.children];

      function getDragAfter(y) {
        return dropzoneChildren.reduce(
          (closest, child, index) => {
            const rect = child.getBoundingClientRect();
            const offset = y - rect.y - rect.height / 2;
            if (offset <= 0 && offset > closest.offset) {
              return {
                offset: offset,
                elementID: child.dataset.id,
                rect: rect,
                index: index,
              };
            } else {
              return closest;
            }
          },
          {
            offset: Number.NEGATIVE_INFINITY,
            elementID: "",
            rect: {} as DOMRect,
            index: 0,
          }
        );
      }
      getDragAfter(e.clientY);
      let markerPositionTop;
      let markerPositionLeft;
      let markerPositionRight;
      let gap;

      if (!getDragAfter(e.clientY).elementID) {
        let dropElement = dropzoneChildren[dropzoneChildren.length - 1];
        let dropPositionRect = dropElement.getBoundingClientRect();
        canvasStore.dropzone = drop.dataset.id;
        canvasStore.dragzone = "";
        markerPositionTop = dropPositionRect.y + dropPositionRect.height;
        markerPositionLeft = dropPositionRect.x;
        markerPositionRight = dropPositionRect.x + dropPositionRect.width;
        gap = parseFloat(drop.style.gap) || 0;
        markerTop().value =
          (markerPositionTop - squareStore.offsetTop + gap / 2 - 2) /
            squareStore.scale +
          "px";
      }
      if (getDragAfter(e.clientY).elementID) {
        canvasStore.dragzone = getDragAfter(e.clientY).elementID;
        canvasStore.dropzone = "";
        markerPositionTop = getDragAfter(e.clientY).rect?.y;
        markerPositionLeft = getDragAfter(e.clientY).rect?.x;
        console.log("index = " + getDragAfter(e.clientY).index);
        if (getDragAfter(e.clientY).index !== 0) {
          let nextElementRect =
            dropzoneChildren[
              getDragAfter(e.clientY).index - 1
            ].getBoundingClientRect();
          gap = markerPositionTop - nextElementRect.y - nextElementRect.height;
        }
        if (getDragAfter(e.clientY).index === 0) {
          gap = parseFloat(drop.style.gap) || 0;
        }
        markerTop().value =
          (markerPositionTop - squareStore.offsetTop - gap / 2 - 2) /
            squareStore.scale +
          "px";
      }

      if (drop.style.alignItems === "start" || !drop.style.alignItems) {
        markerLeft().value =
          (markerPositionLeft - squareStore.offsetLeft) / squareStore.scale +
          "px";
      }
      if (drop.style.alignItems === "center") {
        markerLeft().value =
          (dropRect.x +
            dropRect.width / 2 -
            currDragRect.width / 2 -
            squareStore.offsetLeft) /
            squareStore.scale +
          "px";
      }
      if (drop.style.alignItems === "end") {
        markerLeft().value =
          (markerPositionRight - currDragRect.width - squareStore.offsetLeft) /
            squareStore.scale +
          "px";
      }
    }
    markerHeight().value = 3 / squareStore.scale + "px";
    markerWidth().value = currDragRect.width / squareStore.scale + "px";
  }
  if (drop.style.flexDirection === "row" || !drop.style.flexDirection) {
    markerLeft().value = paddingLeft + selectToi.treeHoverHTMLX + "px";
    markerTop().value = paddingTop + selectToi.treeHoverHTMLY + "px";

    if (drop.children.length) {
      let dropzoneChildren = [...drop.children] as HTMLElement[];

      function getDragAfter(x: number) {
        return dropzoneChildren.reduce(
          (closest, child, index) => {
            const rect = child.getBoundingClientRect();
            const offset = x - rect.x - rect.width / 2;
            if (offset <= 0 && offset > closest.offset) {
              return {
                offset: offset,
                elementID: child.dataset.id as string,
                rect: rect,
                index: index,
              };
            } else {
              return closest;
            }
          },
          {
            offset: Number.NEGATIVE_INFINITY,
            elementID: "",
            rect: {} as DOMRect,
            index: 0,
          }
        );
      }
      getDragAfter(e.clientX);
      let markerPositionLeft;
      let markerPositionTop;
      let gap;

      if (!getDragAfter(e.clientX).elementID && canvasStore.dropzone) {
        let dropPositionRect =
          dropzoneChildren[dropzoneChildren.length - 1].getBoundingClientRect();
        canvasStore.dropzone = drop.dataset.id as string;
        canvasStore.dragzone = "";
        markerPositionLeft = dropPositionRect.x + dropPositionRect.width;
        markerPositionTop = dropPositionRect.y;
        gap = parseFloat(drop.style.gap) || 0;
        markerLeft().value =
          (markerPositionLeft - squareStore.offsetLeft + gap / 2 - 2) /
            squareStore.scale +
          "px";
      }
      if (getDragAfter(e.clientX).elementID) {
        canvasStore.dragzone = getDragAfter(e.clientX).elementID;
        canvasStore.dropzone = "";
        markerPositionLeft = getDragAfter(e.clientX).rect?.x;
        markerPositionTop = getDragAfter(e.clientX).rect?.y;
        console.log("index = " + getDragAfter(e.clientY).index);
        if (getDragAfter(e.clientX).index !== 0) {
          let nextElementRect =
            dropzoneChildren[
              getDragAfter(e.clientX).index - 1
            ].getBoundingClientRect();
          gap = markerPositionLeft - nextElementRect.x - nextElementRect.width;
        }
        if (getDragAfter(e.clientX).index === 0) {
          gap = parseFloat(drop.style.gap) || 0;
        }
        markerLeft().value =
          (markerPositionLeft - squareStore.offsetLeft - gap / 2 - 2) /
            squareStore.scale +
          "px";
      }

      if (drop.style.alignItems === "start" || !drop.style.alignItems) {
        markerTop().value =
          paddingTop +
          (markerPositionTop - squareStore.offsetTop) / squareStore.scale +
          "px";
      }
      if (drop.style.alignItems === "center") {
        markerTop().value =
          (dropRect.y +
            dropRect.height / 2 -
            currDragRect.height / 2 -
            squareStore.offsetTop) /
            squareStore.scale +
          "px";
      }
      if (drop.style.alignItems === "end") {
        markerTop().value =
          (dropRect.y +
            dropRect.height -
            currDragRect.height -
            squareStore.offsetTop) /
            squareStore.scale +
          "px";
      }
    }
    markerHeight().value = currDragRect.height / squareStore.scale + "px";
    markerWidth().value = 3 / squareStore.scale + "px";
  }
}
