import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCounterStore } from "./counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useDropMarker } from "@/stores/dropMarker";
import { usePaddingResizeStore } from "@/stores/paddingResizeStore";
import { useRulerSnapStore } from "@/stores/rulerSnap";
import useTransferData from "../composables/useTransferData";

export const storeCanvas = defineStore({
  id: "storeCanvas",
  state: () => ({
    isPinchZoom: false,
    currDrag: "",
    prevX: NaN,
    prevY: NaN,
    textHover: false,
    showSolidOutline: false,
    showGhostOutline: false,
    ghostOutlineLeft: NaN,
    ghostOutlineTop: NaN,
  }),
  actions: {
    setLeftPosition(e) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      selectToi.selectedBoxData.attr.style.left =
        Math.round(
          (e.clientX - this.prevX - squareStore.offsetLeft) / squareStore.scale
        ) + "px";
    },
    setTopPosition(e) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      selectToi.selectedBoxData.attr.style.top =
        Math.round(
          (e.clientY - this.prevY - squareStore.offsetTop) / squareStore.scale
        ) + "px";
    },
    dndWithoutParent(e, currDrag, currType) {
      const selectToi = useCounterStore();
      const canvasDnd = useCanvasDndStore();
      const canvasFF = useCanvasFF();
      const showMarker = useShowMarker();
      const dropMarker = useDropMarker();
      const textIsDragging = ref(false);
      const paddingResize = usePaddingResizeStore();
      const rulerSnap = useRulerSnapStore();
      const canvasStore = storeCanvas();

      canvasDnd.isDragging = true;
      canvasDnd.currDrag = currDrag;
      let isDragging = false;
      let currDragElement = document.querySelector(`[data-id=${currDrag}]`);
      let currDragElementRect = currDragElement?.getBoundingClientRect();
      let prevOpacity = currDragElement.style.opacity;
      let closest = null;
      let closestTarget = "";
      let prevX = e.clientX - currDragElementRect.x;
      let prevY = e.clientY - currDragElementRect.y;
      this.prevX = prevX;
      this.prevY = prevY;

      rulerSnap.prevX = e.clientX - currDragElementRect.x;
      rulerSnap.prevY = e.clientY - currDragElementRect.y;

      if (
        selectToi.selectedTextEditor &&
        selectToi.selectedTextEditor !== currDrag
      ) {
        useSetOutlineSelector(selectToi.selectedTextEditor);
        selectToi.selectedTextEditor = "";
      } else if (
        !selectToi.selectedTextEditor ||
        selectToi.selectedTextEditor === currDrag
      ) {
        selectToi.changeSelected(e, currDrag, currType);
        useSetOutlineSelector(currDrag);
      }
      useSetOutlineSelector(currDrag);

      setTimeout(() => {
        paddingResize.setResizerSize(currDrag);
      }, 0);

      if (canvasDnd.isDragging == true) {
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          e.preventDefault();
          e.stopPropagation();

          if (currType === "text") {
            textIsDragging.value = true;
          }
          rulerSnap.on = true;
          rulerSnap.setRulerSnap(e, currDrag);
          Promise.resolve().then(() => {
            rulerSnap.setSiblingsPoints(currDrag);
          });
          canvasFF.isDragging = true;
          isDragging = true;

          let target = useGetElementFromPoint(e);
          closest = useGetClosestElement(e);

          if (closest) {
            closestTarget = useGetClosestDroppableId(e);
          }

          if (!closest) {
            showMarker.value = false;
            currDragElement.style.opacity = prevOpacity;
            selectToi.treeHoverSize = 1;
          } else if (target && closest) {
            if (
              selectToi.selectedBox === closestTarget ||
              currDragElement.parentElement === closest
            ) {
              rulerSnap.on = true;
              selectToi.treeHover = false;
              currDragElement.style.opacity = prevOpacity;
            } else {
              rulerSnap.on = false;
              showMarker.value = true;
              dropMarker.setMarker(e, currDragElement);
              currDragElement.style.opacity = 0;

              useSetOutlineHover(closestTarget);
            }
            selectToi.treeHoverSize = 0.5;
          }
        }
        function mouseup() {
          if (isDragging) {
            Promise.resolve()
              .then(function () {
                if (
                  closest &&
                  selectToi.selectedBox !== closestTarget &&
                  canvasDnd.dragzone &&
                  !canvasDnd.dropzone
                ) {
                  //append after

                  delete selectToi.selectedBoxData.attr.style.left;
                  delete selectToi.selectedBoxData.attr.style.top;
                  useTransferData(
                    selectToi.data,
                    canvasDnd.dropzone,
                    selectToi.selectedBoxData,
                    currDrag,
                    closestTarget
                  ).removeChild();
                  selectToi.selectedBoxData.attr.style.position = "static";
                  useTransferData(
                    selectToi.data,
                    canvasDnd.dragzone,
                    selectToi.selectedBoxData,
                    currDrag,
                    closestTarget
                  ).appendBefore();
                  showMarker.value = false;
                  currDragElement.style.opacity = prevOpacity;
                  canvasDnd.dragzone = "";
                }
                if (
                  (closest &&
                    selectToi.selectedBox !== closestTarget &&
                    !canvasDnd.dragzone &&
                    canvasDnd.dropzone) ||
                  !closest.children?.length
                ) {
                  //append bottom/push
                  delete selectToi.selectedBoxData.attr.style.left;
                  delete selectToi.selectedBoxData.attr.style.top;
                  useTransferData(
                    selectToi.data,
                    canvasDnd.dropzone,
                    selectToi.selectedBoxData,
                    currDrag,
                    closestTarget
                  ).removeChild();
                  selectToi.selectedBoxData.attr.style.position = "static";
                  useTransferData(
                    selectToi.data,
                    canvasDnd.dropzone,
                    selectToi.selectedBoxData,
                    currDrag,
                    closestTarget
                  ).appendChild();
                  showMarker.value = false;
                  currDragElement.style.opacity = prevOpacity;
                }
              })
              .then(function () {
                useSetOutlineSelector(currDrag);
                paddingResize.setResizerSize(currDrag);
              });
            useSetOutlineSelector(currDrag);
            paddingResize.setResizerSize(currDrag);
          }
          selectToi.treeHoverSize = 1;
          if (currType === "text") {
            textIsDragging.value = false;
          }
          isDragging = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          //reselect
          setTimeout(() => {
            canvasFF.isDragging = false;
          }, 0);

          rulerSnap.show = false;
          canvasDnd.isDragging = false;
        }
      }
    },
    dndWithParent(e, currDrag) {
      const selectToi = useCounterStore();
      const canvasStore = storeCanvas();
      const canvasFF = useCanvasFF();
      const rulerSnap = useRulerSnapStore();

      selectToi.changeSelected(e, currDrag);
      this.currDrag = currDrag;
      let currDragElement = document.querySelector(`[data-id=${currDrag}]`);
      let currDragElementRect = currDragElement.getBoundingClientRect();
      let closestElement;
      let prevX = e.clientX - currDragElementRect.x;
      let prevY = e.clientY - currDragElementRect.y;
      this.prevX = prevX;
      this.prevY = prevY;
      let parentElement = currDragElement.parentElement;
      let parentId = currDragElement.parentElement.dataset.id;

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        e.preventDefault();

        canvasFF.isDragging = true;

        let closest = useGetClosestElement(e);
        let closestTarget;
        //kalau closest same id chg position
        if (closest && closest.dataset.id === parentId) {
          closestTarget = useGetClosestDroppableId(e);

          if (
            [...parentElement.children].findIndex(
              (i) => i.dataset.id === currDrag
            ) === -1
          ) {
            useTransferData(
              selectToi.data,
              "",
              selectToi.selectedBoxData,
              currDrag,
              closestTarget
            ).removeChild();
            useTransferData(
              selectToi.data,
              "",
              selectToi.selectedBoxData,
              currDrag,
              closestTarget
            ).appendChild();

            selectToi.selectedBoxData.attr.style.position = "static";
            delete selectToi.selectedBoxData.attr.style.top;
            delete selectToi.selectedBoxData.attr.style.left;
          }

          if (
            [...parentElement.children].findIndex(
              (i) => i.dataset.id === currDrag
            ) !== -1
          ) {
            canvasStore.showSolidOutline = true;
            canvasStore.showGhostOutline = true;
            canvasStore.ghostOutlineLeft = e.clientX - prevX;
            canvasStore.ghostOutlineTop = e.clientY - prevY;
            let prevSibling = currDragElement.previousElementSibling;
            let prevSiblingId;
            let nextSibling = currDragElement.nextElementSibling;
            let nextSiblingId;

            if (prevSibling) {
              prevSiblingId = prevSibling.dataset.id;
            }
            if (nextSibling) {
              nextSiblingId = nextSibling.dataset.id;
            }

            function getPreviousSiblingMiddlePoint() {
              let middlePoint =
                prevSibling.getBoundingClientRect().y +
                prevSibling.getBoundingClientRect().height / 2;
              return middlePoint;
            }

            function getNextSiblingMiddlePoint() {
              let middlePoint =
                nextSibling.getBoundingClientRect().y +
                nextSibling.getBoundingClientRect().height / 2;
              return middlePoint;
            }

            if (
              prevSibling &&
              e.clientY - prevY < getPreviousSiblingMiddlePoint()
            ) {
              useTransferData(
                selectToi.data,
                prevSiblingId,
                selectToi.selectedBoxData,
                currDrag,
                closestTarget
              ).removeChild();
              useTransferData(
                selectToi.data,
                prevSiblingId,
                selectToi.selectedBoxData,
                currDrag,
                closestTarget
              ).appendBefore();
            }

            if (
              nextSibling &&
              e.clientY - prevY + currDragElementRect.height >
                getNextSiblingMiddlePoint()
            ) {
              useTransferData(
                selectToi.data,
                nextSiblingId,
                selectToi.selectedBoxData,
                currDrag,
                closestTarget
              ).removeChild();
              useTransferData(
                selectToi.data,
                nextSiblingId,
                selectToi.selectedBoxData,
                currDrag,
                closestTarget
              ).appendAfter();
            }
          }
        }

        //kalau keluar and no closest append slice atas currdropzone

        if (!closest || !useGetElementIdFromPoint(e)) {
          let appendPosition = useGetRootId(parentId);

          useTransferData(
            selectToi.data,
            "",
            selectToi.selectedBoxData,
            currDrag,
            closestTarget
          ).removeChild();
          useTransferData(
            selectToi.data,
            appendPosition,
            selectToi.selectedBoxData,
            currDrag,
            closestTarget
          ).appendCanvasAbove();

          canvasStore.showSolidOutline = false;
          canvasStore.showGhostOutline = false;

          selectToi.selectedBoxData.attr.style.position = "absolute";
          canvasStore.setLeftPosition(e);
          canvasStore.setTopPosition(e);
          rulerSnap.prevX = prevX;
          rulerSnap.prevY = prevY;
          rulerSnap.on = true;
          rulerSnap.setRulerSnap(e, currDrag);
          Promise.resolve().then(() => {
            rulerSnap.setSiblingsPoints(currDrag);
          });
        }

        //if atas dropzone lain append atas sekali dulu

        if (
          closest &&
          closest.dataset.id !== parentId &&
          closest.dataset.id !== currDrag
        ) {
          useTransferData(
            selectToi.data,
            "",
            selectToi.selectedBoxData,
            currDrag,
            closestTarget
          ).removeChild();
          useTransferData(
            selectToi.data,
            "",
            selectToi.selectedBoxData,
            currDrag,
            closestTarget
          ).appendToCanvas();
        }
      }

      function mouseup() {
        canvasFF.isDragging = false;
        canvasStore.showSolidOutline = false;
        canvasStore.showGhostOutline = false;
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    },
  },
});
