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

          useGetElement(currDrag).style.willChange = "left, top";
          console.log("movementX = " + e.movementX);
          console.log("movementY = " + e.movementY);
          if (Math.abs(e.movementX) < 10 && Math.abs(e.movementX) < 10) {
            rulerSnap.on = true;
          } else if (Math.abs(e.movementX) > 10 || Math.abs(e.movementX) > 10) {
            rulerSnap.on = false;
          }

          rulerSnap.setRulerSnap(e, currDrag);
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
              if (Math.abs(e.movementX) < 10 && Math.abs(e.movementX) < 10) {
                rulerSnap.on = true;
              }
              selectToi.treeHover = false;
              currDragElement.style.opacity = prevOpacity;
            } else {
              if (Math.abs(e.movementX) > 10 || Math.abs(e.movementX) > 10) {
                rulerSnap.on = false;
              }
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
          isDragging = false;
          useGetElement(currDrag).style.willChange = null;
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
      const showMarker = useShowMarker();
      const dropMarker = useDropMarker();
      const canvasDnd = useCanvasDndStore();
      const paddingResize = usePaddingResizeStore();
      let isDragging = false;

      selectToi.changeSelected(e, currDrag);
      this.currDrag = currDrag;
      let currDragElement = document.querySelector(`[data-id=${currDrag}]`);
      let currDragElementRect = currDragElement.getBoundingClientRect();
      let closestElement;
      let closest = null;
      let closestTarget = "";
      let prevX = e.clientX - currDragElementRect.x;
      let prevY = e.clientY - currDragElementRect.y;
      this.prevX = prevX;
      this.prevY = prevY;
      let parentElement = currDragElement.parentElement;
      let parentId = currDragElement.parentElement.dataset.id;
      let prevOpacity = currDragElement.style.opacity;
      let appendPosition = useGetRootId(parentId);

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        e.preventDefault();

        useGetElement(currDrag).style.willChange = "left, top";
        isDragging = true;
        canvasFF.isDragging = true;

        closest = useGetClosestElement(e);
        //kalau closest same id chg position
        if (closest && closest.dataset.id === parentId) {
          closestTarget = useGetClosestDroppableId(e);
          rulerSnap.show = false;
          currDragElement.style.opacity = prevOpacity;
          showMarker.value = false;
          selectToi.treeHoverSize = 1;

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
            currDragElement = document.querySelector(`[data-id=${currDrag}]`);
            canvasStore.showSolidOutline = true;
            canvasStore.showGhostOutline = true;
            canvasStore.ghostOutlineLeft = e.clientX - prevX;
            canvasStore.ghostOutlineTop = e.clientY - prevY;

            //kalau prev/next sibling 'absolute' cari sampai jumpa static
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

            if (
              closest.style?.flexDirection &&
              closest.style.flexDirection === "column"
            ) {
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
            if (
              !closest.style?.flexDirection ||
              closest.style.flexDirection === "row"
            ) {
              function getPreviousSiblingMiddlePoint() {
                let middlePoint =
                  prevSibling.getBoundingClientRect().x +
                  prevSibling.getBoundingClientRect().width / 2;
                return middlePoint;
              }

              function getNextSiblingMiddlePoint() {
                let middlePoint =
                  nextSibling.getBoundingClientRect().x +
                  nextSibling.getBoundingClientRect().width / 2;
                return middlePoint;
              }

              if (
                prevSibling &&
                e.clientX - prevX < getPreviousSiblingMiddlePoint()
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
                e.clientX - prevX + currDragElementRect.width >
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
        }

        //kalau keluar and no closest append slice atas currdropzone

        if (!closest) {
          canvasStore.showSolidOutline = false;
          canvasStore.showGhostOutline = false;
          currDragElement.style.opacity = prevOpacity;
          showMarker.value = false;
          selectToi.treeHoverSize = 1;

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
          rulerSnap.prevX = prevX;
          rulerSnap.prevY = prevY;
          if (Math.abs(e.movementX) < 10 && Math.abs(e.movementX) < 10) {
            rulerSnap.on = true;
          } else if (Math.abs(e.movementX) > 10 || Math.abs(e.movementX) > 10) {
            rulerSnap.on = false;
          }
          rulerSnap.setRulerSnap(e, currDrag);
        }

        //if atas dropzone lain append atas sekali dulu

        if (
          closest &&
          closest.dataset.id !== parentId &&
          closest.dataset.id !== currDrag
        ) {
          canvasStore.showSolidOutline = false;
          canvasStore.showGhostOutline = false;
          closestTarget = useGetClosestDroppableId(e);
          currDragElement = document.querySelector(`[data-id=${currDrag}]`);

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

          selectToi.selectedBoxData.attr.style.position = "absolute";
          canvasStore.setLeftPosition(e);
          canvasStore.setTopPosition(e);

          rulerSnap.on = false;
          showMarker.value = true;
          dropMarker.setMarker(e, currDragElement);
          currDragElement.style.opacity = 0;

          useSetOutlineHover(closestTarget);

          selectToi.treeHoverSize = 0.5;
        }
      }

      function mouseup() {
        if (
          isDragging &&
          closest &&
          closest.dataset.id !== parentId &&
          closest.dataset.id !== currDrag
        ) {
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

        isDragging = false;

        canvasStore.showGhostOutline = false;
        canvasStore.showSolidOutline = false;
        rulerSnap.show = false;
        useGetElement(currDrag).style.willChange = null;
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);

        setTimeout(() => {
          canvasFF.isDragging = false;
        }, 0);
      }
    },
  },
});
