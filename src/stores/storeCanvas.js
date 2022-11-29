import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCounterStore } from "./counter";
import { useCanvasDndStore } from "@/stores/canvasDnd";
import { useCanvasFF } from "@/stores/canvasFreeForm";
import { useDropMarker } from "@/stores/dropMarker";
import { usePaddingResizeStore } from "@/stores/paddingResizeStore";
import { useRulerSnapStore } from "@/stores/rulerSnap";

export const storeCanvas = defineStore({
  id: "storeCanvas",
  state: () => ({
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
                  function dndAppend(arr, dragZone) {
                    arr.every((i) => {
                      if (i.id === closestTarget) {
                        i.children.splice(
                          i.children.findIndex(({ id }) => id == dragZone),
                          0,
                          selectToi.selectedBoxData
                        );
                        return false;
                      } else {
                        dndAppend(i.children, dragZone);
                        return true;
                      }
                    });
                  }
                  function dndRemove(arr, currDrag) {
                    arr.every((i) => {
                      if (i.id === currDrag) {
                        arr.splice(
                          arr.findIndex(({ id }) => id == currDrag),
                          1
                        );
                        return false;
                      } else {
                        dndRemove(i.children, currDrag);
                        return true;
                      }
                    });
                  }
                  delete selectToi.selectedBoxData.attr.style.left;
                  delete selectToi.selectedBoxData.attr.style.top;
                  dndRemove(selectToi.data, currDrag);
                  selectToi.selectedBoxData.attr.style.position = "static";
                  dndAppend(selectToi.data, canvasDnd.dragzone);
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
                  function dndAppendBottom(arr, dropzone) {
                    arr.every((i) => {
                      if (i.id === closestTarget) {
                        i.children.push(selectToi.selectedBoxData);
                        return false;
                      } else {
                        dndAppendBottom(i.children, dropzone);
                        return true;
                      }
                    });
                  }
                  function dndRemove(arr, currDrag) {
                    arr.every((i) => {
                      if (i.id === currDrag) {
                        arr.splice(
                          arr.findIndex(({ id }) => id == currDrag),
                          1
                        );
                        return false;
                      } else {
                        dndRemove(i.children, currDrag);
                        return true;
                      }
                    });
                  }
                  delete selectToi.selectedBoxData.attr.style.left;
                  delete selectToi.selectedBoxData.attr.style.top;
                  dndRemove(selectToi.data, currDrag);
                  selectToi.selectedBoxData.attr.style.position = "static";
                  dndAppendBottom(selectToi.data, canvasDnd.dropzone);
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

      selectToi.changeSelected(e, currDrag);
      this.currDrag = currDrag;
      let currDragElement = document.querySelector(`[data-id=${currDrag}]`);
      let currDragElementRect = currDragElement.getBoundingClientRect();
      let closestElement;
      let prevX = e.clientX - currDragElementRect.x;
      let prevY = e.clientY - currDragElementRect.y;

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        e.preventDefault();

        canvasFF.isDragging = true;
        canvasStore.showSolidOutline = true;
        canvasStore.showGhostOutline = true;
        canvasStore.ghostOutlineLeft = e.clientX - prevX;
        canvasStore.ghostOutlineTop = e.clientY - prevY;

        //kalau closest same id chg position
        closestElement = document
          .elementFromPoint(e.clientX, e.clientY)
          .closest("[data-droppable='true']");
        let dropzoneChildren = [...closestElement.children];

        function getDragAfter(y) {
          return dropzoneChildren.reduce(
            (closest, child, index) => {
              const rect = child.getBoundingClientRect();
              const offset = y - rect.y - rect.height;
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
        console.log(getDragAfter(e.clientY).index);
        console.log(
          getDragAfter(e.clientY).elementID === currDrag ? false : true
        );

        //kalau keluar and no closest append slice atas currdropzone

        //if atas dropzone lain append atas sekali dulu
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
