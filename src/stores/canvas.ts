import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCounterStore } from "./counter";
import { useCanvasDndStore } from "~~/src/stores/canvasDnd";
import { useDropMarker } from "~~/src/stores/dropMarker";
import { usePaddingResizeStore } from "~~/src/stores/paddingResizeStore";
import { useRulerSnapStore } from "~~/src/stores/rulerSnap";
import { changeLeft, changeTop } from "../composables/node";
import { Node } from "./counter";

interface Positions {
  id: string;
  prevX: number;
  prevY: number;
}

export const useCanvasStore = defineStore({
  id: "canvasStore",
  state: () => ({
    selection: [] as Node[],
    isPinchZoom: false,
    isDragging: false,
    hoverId: "",
    currDrag: "",
    prevX: NaN,
    prevY: NaN,
    textHover: false,
    showSolidOutline: false,
    showGhostOutline: false,
    showMarker: false,
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
    setLeftPosition(e: MouseEvent) {
      const squareStore = useSquareStore();

      changeLeft(
        Math.round(
          (e.clientX - this.prevX - squareStore.offsetLeft) / squareStore.scale
        )
      );
    },
    setPositionMultiElement(e: MouseEvent) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      const canvasStore = useCanvasStore();
      let prevPositions = [] as Positions[];

      canvasStore.selection.forEach((i) => {
        let prevX = e.clientX - useGetElementRect(i.id)!.x;
        let prevY = e.clientY - useGetElementRect(i.id)!.y;

        prevPositions.push({ id: i.id, prevX: prevX, prevY: prevY });
      });

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        canvasStore.isDragging = true;

        canvasStore.selection.forEach((i, index) => {
          i.cssRules[0].style.left!.value = Math.round(
            (e.clientX - prevPositions[index].prevX - squareStore.offsetLeft) /
              squareStore.scale
          );

          i.cssRules[0].style.top!.value = Math.round(
            (e.clientY - prevPositions[index].prevY - squareStore.offsetTop) /
              squareStore.scale
          );
        });
      }

      function mouseup(e: MouseEvent) {
        canvasStore.multiSelectResizerRect.left = "";
        canvasStore.multiSelectResizerRect.top = "";
        useSetMultiElementsResizer();
        canvasStore.isDragging = false;

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    },
    setLeftPositionWithParent(e: MouseEvent) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      const element = useGetElement(selectToi.selectedBoxData.id);

      changeLeft(
        Math.round(
          (e.clientX - this.prevX - squareStore.offsetLeft) /
            squareStore.scale -
            element!.parentElement!.offsetLeft
        )
      );
    },
    setTopPosition(e: MouseEvent) {
      const squareStore = useSquareStore();

      changeTop(
        Math.round(
          (e.clientY - this.prevY - squareStore.offsetTop) / squareStore.scale
        )
      );
    },
    setTopPositionWithParent(e: MouseEvent) {
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      const element = useGetElement(selectToi.selectedBoxData.id)!;

      changeTop(
        Math.round(
          (e.clientY - this.prevY - squareStore.offsetTop) / squareStore.scale -
            element.parentElement!.offsetTop
        )
      );
    },
    dndWithoutParent(e: MouseEvent, currDrag: string) {
      const selectToi = useCounterStore();
      const canvasDnd = useCanvasDndStore();
      const dropMarker = useDropMarker();
      const paddingResize = usePaddingResizeStore();
      const rulerSnap = useRulerSnapStore();
      const canvasStore = useCanvasStore();

      canvasDnd.isDragging = true;
      canvasDnd.currDrag = currDrag;
      let isDragging = false;
      let currDragElement = document.querySelector(
        `[data-id=${currDrag}]`
      )! as HTMLElement;
      let currDragElementRect = currDragElement?.getBoundingClientRect();
      let currDragData = findOne(selectToi.data, currDrag);
      let prevOpacity = currDragElement.style.opacity;
      let closest = {} as HTMLElement;
      let closestTarget = "";
      let prevX = e.clientX - currDragElementRect.x;
      let prevY = e.clientY - currDragElementRect.y;
      let cloneId = useCreateId();
      let clonedData = JSON.parse(JSON.stringify(currDragData)) as Node;
      function changeId(id: string, node: Node) {
        node.id = id;
        if (node.children) {
          node.children.forEach((i) => changeId(useCreateId(), i));
        }
      }
      changeId(cloneId, clonedData);
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
        useSetSelectSingle(e, currDrag);
        useSetOutlineSelector(currDrag);
      }
      useSetOutlineSelector(currDrag);

      setTimeout(() => {
        paddingResize.setResizerSize(currDrag);
      }, 0);

      if (canvasDnd.isDragging == true) {
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e: MouseEvent) {
          e.preventDefault();
          e.stopPropagation();

          useGetElement(currDrag)!.style.willChange =
            "left, top, height, width";
          function update() {
            if (e.altKey) {
              if (!findOne(selectToi.data, cloneId)) {
                appendBefore(selectToi.data, currDrag, clonedData);
              }
            }
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
              closestTarget = useGetClosestDroppableId(e)!;
            }

            if (!closest) {
              canvasStore.showMarker = false;
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
                canvasStore.showMarker = true;
                dropMarker.setMarker(e, currDragElement);
                currDragElement.style.opacity = "0";

                useSetOutlineHover(closestTarget);
              }
              selectToi.treeHoverSize = 0.5;
            }
          }

          requestAnimationFrame(update);
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

                  delete selectToi.selectedBoxData.cssRules[0].style.left;
                  delete selectToi.selectedBoxData.cssRules[0].style.top;
                  useTransferData().removeChild(selectToi.data, currDrag);
                  selectToi.selectedBoxData.cssRules[0].style.position.value =
                    "static";
                  useTransferData().appendBefore(
                    selectToi.data,
                    canvasDnd.dragzone,
                    selectToi.selectedBoxData,
                    closestTarget
                  );
                  canvasStore.showMarker = false;
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
                  delete selectToi.selectedBoxData.cssRules[0].style.left;
                  delete selectToi.selectedBoxData.cssRules[0].style.top;
                  useTransferData().removeChild(selectToi.data, currDrag);
                  selectToi.selectedBoxData.cssRules[0].style.position.value =
                    "static";
                  useTransferData().appendChild(
                    selectToi.data,
                    selectToi.selectedBoxData,
                    closestTarget
                  );
                  canvasStore.showMarker = false;
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
          useGetElement(currDrag)!.style.willChange = "";
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
    dndWithParent(e: MouseEvent, currDrag: string) {
      const selectToi = useCounterStore();
      const canvasStore = useCanvasStore();
      const rulerSnap = useRulerSnapStore();
      const dropMarker = useDropMarker();
      const canvasDnd = useCanvasDndStore();
      const paddingResize = usePaddingResizeStore();
      const squareStore = useSquareStore();
      let isDragging = false;

      useSetSelectSingle(e, currDrag);
      this.currDrag = currDrag;
      let currDragElement = document.querySelector(
        `[data-id=${currDrag}]`
      ) as HTMLElement;
      let currDragElementRect = currDragElement.getBoundingClientRect();
      let closestElement;
      let closest = {} as HTMLElement;
      let closestTarget = "";
      let prevX = e.clientX - currDragElementRect.x;
      let prevY = e.clientY - currDragElementRect.y;
      this.prevX = prevX;
      this.prevY = prevY;
      let parentElement = currDragElement.parentElement;
      let parentId = currDragElement.parentElement!.dataset.id!;
      let prevOpacity = currDragElement.style.opacity;
      let appendPosition = useGetRootId(parentId);

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e: MouseEvent) {
        e.preventDefault();

        useGetElement(currDrag)!.style.willChange = "left, top, height, width";
        isDragging = true;
        canvasStore.isDragging = true;

        closest = useGetClosestElement(e);

        function moveElement() {
          //kalau closest same id chg position
          if (closest && closest.dataset.id === parentId) {
            closestTarget = useGetClosestDroppableId(e)!;
            rulerSnap.show = false;
            currDragElement.style.opacity = prevOpacity;
            canvasStore.showMarker = false;
            selectToi.treeHoverSize = 1;

            let children = [...parentElement!.children] as HTMLElement[];

            if (children.findIndex((i) => i.dataset.id === currDrag) === -1) {
              useTransferData().removeChild(selectToi.data, currDrag);
              useTransferData().appendChild(
                selectToi.data,
                selectToi.selectedBoxData,
                closestTarget
              );

              selectToi.selectedBoxData.cssRules[0].style.position.value =
                "static";
              delete selectToi.selectedBoxData.cssRules[0].style.top;
              delete selectToi.selectedBoxData.cssRules[0].style.left;
            }

            if (children.findIndex((i) => i.dataset.id === currDrag) !== -1) {
              if (
                selectToi.selectedBoxData.cssRules[0].style.position.value ===
                "static"
              ) {
                currDragElement = document.querySelector(
                  `[data-id=${currDrag}]`
                )!;
                canvasStore.showSolidOutline = true;
                canvasStore.showGhostOutline = true;
                canvasStore.ghostOutlineLeft = e.clientX - prevX;
                canvasStore.ghostOutlineTop = e.clientY - prevY;

                //kalau prev/next sibling 'absolute' cari sampai jumpa static
                let prevSibling =
                  currDragElement.previousElementSibling as HTMLElement;
                let prevSiblingId;
                let nextSibling =
                  currDragElement.nextElementSibling as HTMLElement;
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
                      prevSibling!.getBoundingClientRect().y +
                      prevSibling!.getBoundingClientRect().height / 2;
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
              if (
                selectToi.selectedBoxData.cssRules[0].style.position.value ===
                "absolute"
              ) {
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
            canvasStore.showMarker = false;
            selectToi.treeHoverSize = 1;

            useTransferData().removeChild(selectToi.data, currDrag);
            selectToi.selectedBoxData.cssRules[0].style.left = {
              type: "unit",
              value: Math.round(
                (e.clientX - canvasStore.prevX - squareStore.offsetLeft) /
                  squareStore.scale
              ),
              unit: "px",
            };
            selectToi.selectedBoxData.cssRules[0].style.top = {
              type: "unit",
              value: Math.round(
                (e.clientY - canvasStore.prevY - squareStore.offsetTop) /
                  squareStore.scale
              ),
              unit: "px",
            };
            useTransferData().appendCanvasAbove(
              selectToi.data,
              appendPosition,
              selectToi.selectedBoxData
            );

            canvasStore.showSolidOutline = false;
            canvasStore.showGhostOutline = false;

            selectToi.selectedBoxData.cssRules[0].style.position.value =
              "absolute";
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
            closestTarget = useGetClosestDroppableId(e)!;
            currDragElement = document.querySelector(`[data-id=${currDrag}]`)!;

            useTransferData().removeChild(selectToi.data, currDrag);
            selectToi.selectedBoxData.cssRules[0].style.left = {
              type: "unit",
              value: Math.round(
                (e.clientX - canvasStore.prevX - squareStore.offsetLeft) /
                  squareStore.scale
              ),
              unit: "px",
            };
            selectToi.selectedBoxData.cssRules[0].style.top = {
              type: "unit",
              value: Math.round(
                (e.clientY - canvasStore.prevY - squareStore.offsetTop) /
                  squareStore.scale
              ),
              unit: "px",
            };
            useTransferData().appendToCanvas(
              selectToi.data,
              selectToi.selectedBoxData
            );

            selectToi.selectedBoxData.cssRules[0].style.position.value =
              "absolute";
            canvasStore.setLeftPosition(e);
            canvasStore.setTopPosition(e);

            rulerSnap.on = false;
            canvasStore.showMarker = true;
            dropMarker.setMarker(e, currDragElement);
            currDragElement.style.opacity = "0";

            useSetOutlineHover(closestTarget);

            selectToi.treeHoverSize = 0.5;
          }
        }

        window.requestAnimationFrame(moveElement);
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

                delete selectToi.selectedBoxData.cssRules[0].style.left;
                delete selectToi.selectedBoxData.cssRules[0].style.top;
                useTransferData().removeChild(selectToi.data, currDrag);
                selectToi.selectedBoxData.cssRules[0].style.position.value =
                  "static";
                useTransferData().appendBefore(
                  selectToi.data,
                  canvasDnd.dragzone,
                  selectToi.selectedBoxData,
                  closestTarget
                );
                canvasStore.showMarker = false;
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
                delete selectToi.selectedBoxData.cssRules[0].style.left;
                delete selectToi.selectedBoxData.cssRules[0].style.top;
                useTransferData().removeChild(selectToi.data, currDrag);

                selectToi.selectedBoxData.cssRules[0].style.position.value =
                  "static";
                useTransferData().appendChild(
                  selectToi.data,
                  selectToi.selectedBoxData,
                  closestTarget
                );
                canvasStore.showMarker = false;
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
        currDragElement.style.willChange = "";
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);

        setTimeout(() => {
          canvasStore.isDragging = false;
        }, 0);
      }
    },
  },
});
