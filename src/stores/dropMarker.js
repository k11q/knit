import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useSquareStore } from "./dataSquare";
import { useCanvasDndStore } from "./canvasDnd";

export const useDropMarker = defineStore({
  id: "dropMarker",
  state: () => ({
    isDragging: false,
    markerHeight: "",
    markerWidth: "",
    markerLeft: "",
    markerTop: "",
  }),
  actions: {
    setMarker(e, currDragElement) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      const canvasDnd = useCanvasDndStore();
      let drop = useGetClosestElement(e);
      let dropRect = drop.getBoundingClientRect();
      let currDragRect = currDragElement.getBoundingClientRect();
      let paddingLeft = parseInt(drop.style.paddingLeft) | 0;
      let paddingTop = parseInt(drop.style.paddingTop) | 0;

      if (drop.style.flexDirection === "column") {
        if (!drop.children.length) {
          this.markerLeft =
            (paddingLeft + dropRect.x - squareStore.offsetLeft) /
              squareStore.scale +
            "px";
          this.markerTop =
            (paddingTop + dropRect.y - squareStore.offsetTop) /
              squareStore.scale +
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
              { offset: Number.NEGATIVE_INFINITY }
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
            canvasDnd.dropzone = drop.dataset.id;
            canvasDnd.dragzone = "";
            markerPositionTop = dropPositionRect.y + dropPositionRect.height;
            markerPositionLeft = dropPositionRect.x;
            markerPositionRight = dropPositionRect.x + dropPositionRect.width;
            gap = parseFloat(drop.style.gap) || 0;
            this.markerTop =
              (markerPositionTop - squareStore.offsetTop + gap / 2 - 2) /
                squareStore.scale +
              "px";
          }
          if (getDragAfter(e.clientY).elementID) {
            canvasDnd.dragzone = getDragAfter(e.clientY).elementID;
            canvasDnd.dropzone = "";
            markerPositionTop = getDragAfter(e.clientY).rect?.y;
            markerPositionLeft = getDragAfter(e.clientY).rect?.x;
            console.log("index = " + getDragAfter(e.clientY).index);
            if (getDragAfter(e.clientY).index !== 0) {
              let nextElementRect =
                dropzoneChildren[
                  getDragAfter(e.clientY).index - 1
                ].getBoundingClientRect();
              gap =
                markerPositionTop - nextElementRect.y - nextElementRect.height;
            }
            if (getDragAfter(e.clientY).index === 0) {
              gap = parseFloat(drop.style.gap) || 0;
            }
            this.markerTop =
              (markerPositionTop - squareStore.offsetTop - gap / 2 - 2) /
                squareStore.scale +
              "px";
          }

          if (drop.style.alignItems === "start" || !drop.style.alignItems) {
            this.markerLeft =
              (markerPositionLeft - squareStore.offsetLeft) /
                squareStore.scale +
              "px";
          }
          if (drop.style.alignItems === "center") {
            this.markerLeft =
              (dropRect.x +
                dropRect.width / 2 -
                currDragRect.width / 2 -
                squareStore.offsetLeft) /
                squareStore.scale +
              "px";
          }
          if (drop.style.alignItems === "end") {
            this.markerLeft =
              (markerPositionRight -
                currDragRect.width -
                squareStore.offsetLeft) /
                squareStore.scale +
              "px";
          }
        }
        this.markerHeight = 4 / squareStore.scale + "px";
        this.markerWidth = currDragRect.width / squareStore.scale + "px";
      }
      if (drop.style.flexDirection === "row" || !drop.style.flexDirection) {
        this.markerLeft = paddingLeft + selectToi.treeHoverHTMLX + "px";
        this.markerTop = paddingTop + selectToi.treeHoverHTMLY + "px";

        if (drop.children.length) {
          let dropzoneChildren = [...drop.children];

          function getDragAfter(x) {
            return dropzoneChildren.reduce(
              (closest, child, index) => {
                const rect = child.getBoundingClientRect();
                const offset = x - rect.x - rect.width / 2;
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
              { offset: Number.NEGATIVE_INFINITY }
            );
          }
          getDragAfter(e.clientX);
          let markerPositionLeft;
          let markerPositionTop;
          let gap;

          if (!getDragAfter(e.clientX).elementID) {
            let dropPositionRect =
              dropzoneChildren[
                dropzoneChildren.length - 1
              ].getBoundingClientRect();
            canvasDnd.dropzone = drop.dataset.id;
            canvasDnd.dragzone = "";
            markerPositionLeft = dropPositionRect.x + dropPositionRect.width;
            markerPositionTop = dropPositionRect.y;
            gap = parseFloat(drop.style.gap) || 0;
            this.markerLeft =
              (markerPositionLeft - squareStore.offsetLeft + gap / 2 - 2) /
                squareStore.scale +
              "px";
          }
          if (getDragAfter(e.clientX).elementID) {
            canvasDnd.dragzone = getDragAfter(e.clientX).elementID;
            canvasDnd.dropzone = "";
            markerPositionLeft = getDragAfter(e.clientX).rect?.x;
            markerPositionTop = getDragAfter(e.clientX).rect?.y;
            console.log("index = " + getDragAfter(e.clientY).index);
            if (getDragAfter(e.clientX).index !== 0) {
              let nextElementRect =
                dropzoneChildren[
                  getDragAfter(e.clientX).index - 1
                ].getBoundingClientRect();
              gap =
                markerPositionLeft - nextElementRect.x - nextElementRect.width;
            }
            if (getDragAfter(e.clientX).index === 0) {
              gap = parseFloat(drop.style.gap) || 0;
            }
            this.markerLeft =
              (markerPositionLeft - squareStore.offsetLeft - gap / 2 - 2) /
                squareStore.scale +
              "px";
          }

          if (drop.style.alignItems === "start" || !drop.style.alignItems) {
            this.markerTop =
              paddingTop +
              (markerPositionTop - squareStore.offsetTop) / squareStore.scale +
              "px";
          }
          if (drop.style.alignItems === "center") {
            this.markerTop =
              (dropRect.y +
                dropRect.height / 2 -
                currDragRect.height / 2 -
                squareStore.offsetTop) /
                squareStore.scale +
              "px";
          }
          if (drop.style.alignItems === "end") {
            this.markerTop =
              (dropRect.y +
                dropRect.height -
                currDragRect.height -
                squareStore.offsetTop) /
                squareStore.scale +
              "px";
          }
        }
        this.markerHeight = currDragRect.height / squareStore.scale + "px";
        this.markerWidth = 4 / squareStore.scale + "px";
      }
    },
  },
});
