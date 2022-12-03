import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCounterStore } from "./counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";
import { useDropMarker } from "@/stores/dropMarker";
import { usePaddingResizeStore } from "@/stores/paddingResizeStore";
import { useRulerSnapStore } from "@/stores/rulerSnap";

export const useCanvasStore = defineStore({
  id: "canvasStore",
  state: () => ({
    selection: [],
    isPinchZoom: false,
    isDragging: false,
    hoverId: "",
    currDrag: "",
    prevX: NaN,
    prevY: NaN,
    textHover: false,
    showSolidOutline: false,
    showGhostOutline: false,
    ghostOutlineLeft: NaN,
    ghostOutlineTop: NaN,
    multiSelect: false,
    multiSelectResizerRect: {
      left: "",
      top: "",
      height: "",
      width: "",
    },
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
    setPositionMultiElement(e) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      const canvasStore = useCanvasStore();
      let prevPositions = [];

      canvasStore.selection.forEach((i) => {
        let prevX = e.clientX - useGetElementRect(i.id).x;
        let prevY = e.clientY - useGetElementRect(i.id).y;

        prevPositions.push({ id: i.id, prevX: prevX, prevY: prevY });
      });

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        e.preventDefault();
        e.stopPropagation();
        canvasStore.isDragging = true;

        canvasStore.selection.forEach((i, index) => {
          i.attr.style.left =
            Math.round(
              (e.clientX -
                prevPositions[index].prevX -
                squareStore.offsetLeft) /
                squareStore.scale
            ) + "px";

          i.attr.style.top =
            Math.round(
              (e.clientY - prevPositions[index].prevY - squareStore.offsetTop) /
                squareStore.scale
            ) + "px";
        });
      }

      function mouseup(e) {
        canvasStore.multiSelectResizerRect.left = "";
        canvasStore.multiSelectResizerRect.top = "";
        useSetMultiElementsResizer();
        canvasStore.isDragging = false;

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    },
    setLeftPositionWithParent(e) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      const element = useGetElement(selectToi.selectedBoxData.id);

      selectToi.selectedBoxData.attr.style.left =
        Math.round(
          (e.clientX - this.prevX - squareStore.offsetLeft) /
            squareStore.scale -
            element.parentElement.offsetLeft
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
    setTopPositionWithParent(e) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      const element = useGetElement(selectToi.selectedBoxData.id);

      selectToi.selectedBoxData.attr.style.top =
        Math.round(
          (e.clientY - this.prevY - squareStore.offsetTop) / squareStore.scale -
            element.parentElement.offsetTop
        ) + "px";
    },
    dndWithoutParent(e, currDrag) {
      const selectToi = useCounterStore();
      const canvasDnd = useCanvasDndStore();
      const showMarker = useShowMarker();
      const dropMarker = useDropMarker();
      const paddingResize = usePaddingResizeStore();
      const rulerSnap = useRulerSnapStore();
      const canvasStore = useCanvasStore();

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
        selectToi.changeSelected(e, currDrag);
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
          if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setRulerSnap(e, currDrag);
            if (!rulerSnap.snapLeft) {
              canvasStore.setLeftPosition(e);
            }
            if (!rulerSnap.snapTop) {
              canvasStore.setTopPosition(e);
            }
          } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
            rulerSnap.on = false;
            canvasStore.setLeftPosition(e);
            canvasStore.setTopPosition(e);
          }
          canvasStore.isDragging = true;
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
              if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
                rulerSnap.on = true;
              }
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
                  useTransferData().removeChild(selectToi.data, currDrag);
                  selectToi.selectedBoxData.attr.style.position = "static";
                  useTransferData().appendBefore(
                    selectToi.data,
                    canvasDnd.dragzone,
                    selectToi.selectedBoxData,
                    closestTarget
                  );
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
                  useTransferData().removeChild(selectToi.data, currDrag);
                  selectToi.selectedBoxData.attr.style.position = "static";
                  useTransferData().appendChild(
                    selectToi.data,
                    selectToi.selectedBoxData,
                    closestTarget
                  );
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
            canvasStore.isDragging = false;
          }, 0);

          rulerSnap.show = false;
          canvasDnd.isDragging = false;
        }
      }
    },
    dndWithParent(e, currDrag) {
      const selectToi = useCounterStore();
      const canvasStore = useCanvasStore();
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
        canvasStore.isDragging = true;

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
            useTransferData().removeChild(selectToi.data, currDrag);
            useTransferData().appendChild(
              selectToi.data,
              selectToi.selectedBoxData,
              closestTarget
            );

            selectToi.selectedBoxData.attr.style.position = "static";
            delete selectToi.selectedBoxData.attr.style.top;
            delete selectToi.selectedBoxData.attr.style.left;
          }

          if (
            [...parentElement.children].findIndex(
              (i) => i.dataset.id === currDrag
            ) !== -1
          ) {
            if (selectToi.selectedBoxData.attr.style.position === "static") {
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
                  useTransferData().removeChild(selectToi.data, currDrag);
                  useTransferData().appendBefore(
                    selectToi.data,
                    prevSiblingId,
                    selectToi.selectedBoxData,
                    closestTarget
                  );
                }

                if (
                  nextSibling &&
                  e.clientY - prevY + currDragElementRect.height >
                    getNextSiblingMiddlePoint()
                ) {
                  useTransferData().removeChild(selectToi.data, currDrag);
                  useTransferData().appendAfter(
                    selectToi.data,
                    nextSiblingId,
                    selectToi.selectedBoxData,
                    closestTarget
                  );
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
                  useTransferData().removeChild(selectToi.data, currDrag);
                  useTransferData().appendBefore(
                    selectToi.data,
                    prevSiblingId,
                    selectToi.selectedBoxData,
                    closestTarget
                  );
                }

                if (
                  nextSibling &&
                  e.clientX - prevX + currDragElementRect.width >
                    getNextSiblingMiddlePoint()
                ) {
                  useTransferData().removeChild(selectToi.data, currDrag);
                  useTransferData().appendAfter(
                    selectToi.data,
                    nextSiblingId,
                    selectToi.selectedBoxData,
                    closestTarget
                  );
                }
              }
            }
            if (selectToi.selectedBoxData.attr.style.position === "absolute") {
              canvasStore.setLeftPositionWithParent(e);
              canvasStore.setTopPositionWithParent(e);
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

          useTransferData().removeChild(selectToi.data, currDrag);
          useTransferData().appendCanvasAbove(
            selectToi.data,
            appendPosition,
            selectToi.selectedBoxData
          );

          canvasStore.showSolidOutline = false;
          canvasStore.showGhostOutline = false;

          selectToi.selectedBoxData.attr.style.position = "absolute";
          rulerSnap.prevX = prevX;
          rulerSnap.prevY = prevY;
          if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
            rulerSnap.on = true;
            rulerSnap.setRulerSnap(e, currDrag);
            if (!rulerSnap.snapLeft) {
              canvasStore.setLeftPosition(e);
            }
            if (!rulerSnap.snapTop) {
              canvasStore.setTopPosition(e);
            }
          } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
            rulerSnap.on = false;
            canvasStore.setLeftPosition(e);
            canvasStore.setTopPosition(e);
          }
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

          useTransferData().removeChild(selectToi.data, currDrag);
          useTransferData().appendToCanvas(
            selectToi.data,
            selectToi.selectedBoxData
          );

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
                useTransferData().removeChild(selectToi.data, currDrag);
                selectToi.selectedBoxData.attr.style.position = "static";
                useTransferData().appendBefore(
                  selectToi.data,
                  canvasDnd.dragzone,
                  selectToi.selectedBoxData,
                  closestTarget
                );
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
                useTransferData().removeChild(selectToi.data, currDrag);

                selectToi.selectedBoxData.attr.style.position = "static";
                useTransferData().appendChild(
                  selectToi.data,
                  selectToi.selectedBoxData,
                  closestTarget
                );
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
          canvasStore.isDragging = false;
        }, 0);
      }
    },
    changeX(id, value) {
      useGetElementData();
    },
  },
});
