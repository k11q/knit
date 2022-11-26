import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useSquareStore } from "./dataSquare";
import { useDndStore } from "./dndStore";

export const useRulerSnapStore = defineStore({
  id: "rulerSnap",
  state: () => ({
    show: false,
    currDragPoints: {},
    displayedPoints: {},
    lines: {},
    snapLines: {
      lineTop: NaN,
      lineMiddleY: NaN,
      lineBottom: NaN,
      lineLeft: NaN,
      lineMiddleX: NaN,
      lineRight: NaN,
      lineMiddle: NaN,
    },
    rulerPosition: {
      top: NaN,
      bottom: NaN,
      left: NaN,
      right: NaN,
    },
    snapPoints: [],
    siblings: [],
    siblingsPoints: [],
    prevX: NaN,
    prevY: NaN,
  }),
  actions: {
    setRuler(e, id) {
      const rulerSnap = useRulerSnapStore();

      const element = document.querySelector(`[data-id=${id}]`);
      const elementRect = element.getBoundingClientRect();

      let prevX = e.clientX - elementRect.x;
      let prevY = e.clientY - elementRect.y;
      let currDragPointsCopy = {};
      console.log("thpx" + this.siblingsPointsX);

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        rulerSnap.show = true;

        let topLeft = {
          x: e.clientX - prevX,
          y: e.clientY - prevY,
          display: false,
        };
        let topMiddle = {
          x: e.clientX - prevX + elementRect.width / 2,
          y: e.clientY - prevY,
          display: false,
        };
        let topRight = {
          x: e.clientX - prevX + elementRect.width,
          y: e.clientY - prevY,
          display: false,
        };
        let middleLeft = {
          x: e.clientX - prevX,
          y: e.clientY - prevY + elementRect.height / 2,
          display: false,
        };
        let middle = {
          x: e.clientX - prevX + elementRect.width / 2,
          y: e.clientY - prevY + elementRect.height / 2,
          display: false,
        };
        let middleRight = {
          x: e.clientX - prevX + elementRect.width,
          y: e.clientY - prevY + elementRect.height / 2,
          display: false,
        };
        let bottomLeft = {
          x: e.clientX - prevX,
          y: e.clientY - prevY + elementRect.height,
          display: false,
        };
        let bottomMiddle = {
          x: e.clientX - prevX + elementRect.width / 2,
          y: e.clientY - prevY + elementRect.height,
          display: false,
        };
        let bottomRight = {
          x: e.clientX - prevX + elementRect.width,
          y: e.clientY - prevY + elementRect.height,
          display: false,
        };

        currDragPointsCopy = {
          topLeft: topLeft,
          topMiddle: topMiddle,
          topRight: topRight,
          middleLeft: middleLeft,
          middle: middle,
          middleRight: middleRight,
          bottomLeft: bottomLeft,
          bottomMiddle: bottomMiddle,
          bottomRight: bottomRight,
        };

        console.log("cccopy = " + currDragPointsCopy);
        rulerSnap.currDragPoints = { ...currDragPointsCopy };
      }

      function mouseup(e) {
        rulerSnap.show = false;

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    },
    setSiblingsPoints(id) {
      let siblingPointsCopy = [];

      this.siblings = [
        ...document.querySelector(`[data-id=${id}]`).parentElement.children,
      ];

      this.siblings.forEach((i) => {
        let siblingRect = i.getBoundingClientRect();

        if (
          this.snapLines.lineTop === siblingRect.y ||
          this.snapLines.lineMiddleY === siblingRect.y ||
          this.snapLines.lineBottom === siblingRect.y
        ) {
          siblingPointsCopy.push(
            { x: siblingRect.x, y: siblingRect.y },
            { x: siblingRect.x + siblingRect.width / 2, y: siblingRect.y },
            { x: siblingRect.x + siblingRect.width, y: siblingRect.y }
          );
        }
        if (
          this.snapLines.lineTop === siblingRect.y + siblingRect.height / 2 ||
          this.snapLines.lineMiddleY ===
            siblingRect.y + siblingRect.height / 2 ||
          this.snapLines.lineBottom === siblingRect.y + siblingRect.height / 2
        ) {
          siblingPointsCopy.push(
            { x: siblingRect.x, y: siblingRect.y + siblingRect.height / 2 },
            {
              x: siblingRect.x + siblingRect.width / 2,
              y: siblingRect.y + siblingRect.height / 2,
            },
            {
              x: siblingRect.x + siblingRect.width,
              y: siblingRect.y + siblingRect.height / 2,
            }
          );
        }
        if (
          this.snapLines.lineTop === siblingRect.y + siblingRect.height ||
          this.snapLines.lineMiddleY === siblingRect.y + siblingRect.height ||
          this.snapLines.lineBottom === siblingRect.y + siblingRect.height
        ) {
          siblingPointsCopy.push(
            { x: siblingRect.x, y: siblingRect.y + siblingRect.height },
            {
              x: siblingRect.x + siblingRect.width / 2,
              y: siblingRect.y + siblingRect.height,
            },
            {
              x: siblingRect.x + siblingRect.width,
              y: siblingRect.y + siblingRect.height,
            }
          );
        }
        if (
          this.snapLines.lineLeft === siblingRect.x ||
          this.snapLines.lineMiddleX === siblingRect.x ||
          this.snapLines.lineRight === siblingRect.x
        ) {
          siblingPointsCopy.push(
            { x: siblingRect.x, y: siblingRect.y },
            { x: siblingRect.x, y: siblingRect.y + siblingRect.height / 2 },
            { x: siblingRect.x, y: siblingRect.y + siblingRect.height }
          );
        }
        if (
          this.snapLines.lineLeft === siblingRect.x + siblingRect.width / 2 ||
          this.snapLines.lineMiddleX ===
            siblingRect.x + siblingRect.width / 2 ||
          this.snapLines.lineRight === siblingRect.x + siblingRect.width / 2
        ) {
          siblingPointsCopy.push(
            { x: siblingRect.x + siblingRect.width / 2, y: siblingRect.y },
            {
              x: siblingRect.x + siblingRect.width / 2,
              y: siblingRect.y + siblingRect.height / 2,
            },
            {
              x: siblingRect.x + siblingRect.width / 2,
              y: siblingRect.y + siblingRect.height,
            }
          );
        }
        if (
          this.snapLines.lineLeft === siblingRect.x + siblingRect.width ||
          this.snapLines.lineMiddleX === siblingRect.x + siblingRect.width ||
          this.snapLines.lineRight === siblingRect.x + siblingRect.width
        ) {
          siblingPointsCopy.push(
            { x: siblingRect.x + siblingRect.width, y: siblingRect.y },
            {
              x: siblingRect.x + siblingRect.width,
              y: siblingRect.y + siblingRect.height / 2,
            },
            {
              x: siblingRect.x + siblingRect.width,
              y: siblingRect.y + siblingRect.height,
            }
          );
        }
      });
      this.snapPoints = [...siblingPointsCopy];

      let rulerPositionCopy = {};
      this.snapPoints.map((i) => {
        if (
          !rulerPositionCopy.top ||
          (rulerPositionCopy.top && i.y < rulerPositionCopy.top)
        ) {
          rulerPositionCopy.top = i.y;
        }
        if (
          !rulerPositionCopy.bottom ||
          (rulerPositionCopy.bottom && i.y > rulerPositionCopy.bottom)
        ) {
          rulerPositionCopy.bottom = i.y;
        }
        if (
          !rulerPositionCopy.left ||
          (rulerPositionCopy.left && i.x < rulerPositionCopy.left)
        ) {
          rulerPositionCopy.left = i.x;
        }
        if (
          !rulerPositionCopy.right ||
          (rulerPositionCopy.right && i.x > rulerPositionCopy.right)
        ) {
          rulerPositionCopy.right = i.x;
        }
      });
      this.rulerPosition = { ...rulerPositionCopy };
    },
    setShowPointer(x, y) {
      if (
        (this.snapLines?.lineLeft < x + 4 &&
          this.snapLines?.lineLeft > y - 4) ||
        (this.snapLines?.lineMiddleX < x + 4 &&
          this.snapLines?.lineMiddleX > x - 4) ||
        (this.snapLines?.lineRight < x + 4 &&
          this.snapLines?.lineRight > x - 4) ||
        (this.snapLines?.lineTop < y + 4 && this.snapLines?.lineTop > y - 4) ||
        (this.snapLines?.lineMiddleY < y + 4 &&
          this.csnapLines?.lineMiddleY > y - 4) ||
        (this.snapLines?.lineBottom < y + 4 &&
          this.snapLines?.lineBottom > y - 4)
      ) {
        return true;
      } else return false;
    },
    setRulerSnap(e, id) {
      const dndStore = useDndStore();
      const selectToi = useCounterStore();
      const squareStore = useSquareStore();
      const rulerSnap = useRulerSnapStore();

      const element = document.querySelector(`[data-id=${id}]`);
      const elementRect = element.getBoundingClientRect();

      const prevX = this.prevX;
      const prevY = this.prevY;
      const currDragPointsCopy = {};

      const currDragTop = e.clientY - prevY;
      const currDragMiddleY = e.clientY - prevY + elementRect.height / 2;
      const currDragBottom = e.clientY - prevY + elementRect.height;
      const currDragLeft = e.clientX - prevX;
      const currDragMiddleX = e.clientX - prevX + elementRect.width / 2;
      const currDragRight = e.clientX - prevX + elementRect.width;
      const currDragMiddle = {
        x: e.clientX - prevX + elementRect.width / 2,
        y: e.clientY - prevY + elementRect.height / 2,
      };

      let siblingPointsCopy = [];
      let snapLinesCopy = {
        lineTop: NaN,
        lineMiddleY: NaN,
        lineBottom: NaN,
        lineLeft: NaN,
        lineMiddleX: NaN,
        lineRight: NaN,
        lineMiddle: NaN,
      };

      this.siblings = [
        ...document.querySelector(`[data-id=${id}]`).parentElement.children,
      ].filter((el) => el.dataset.id !== id);

      this.siblings.forEach((i) => {
        let siblingRect = i.getBoundingClientRect();
        let siblingTop = siblingRect.y;
        let siblingMiddleY = siblingRect.y + siblingRect.height / 2;
        let siblingBottom = siblingRect.y + siblingRect.height;
        let siblingLeft = siblingRect.x;
        let siblingMiddleX = siblingRect.x + siblingRect.width / 2;
        let siblingRight = siblingRect.x + siblingRect.width;
        let siblingMiddle = {
          x: siblingRect.x + siblingRect.width / 2,
          y: siblingRect.y + siblingRect.height / 2,
        };

        //top to top
        if (currDragTop < siblingTop + 4 && currDragTop > siblingTop - 4) {
          if (
            !snapLinesCopy.lineTop ||
            (snapLinesCopy.lineTop &&
              currDragTop - snapLinesCopy.lineTop > currDragTop - siblingTop)
          ) {
            snapLinesCopy.lineTop = siblingTop;
          }
        }
        //top to middleY
        if (
          currDragTop < siblingMiddleY + 4 &&
          currDragTop > siblingMiddleY - 4
        ) {
          if (
            !snapLinesCopy.lineTop ||
            (snapLinesCopy.lineTop &&
              currDragTop - snapLinesCopy.lineTop >
                currDragTop - siblingMiddleY)
          ) {
            snapLinesCopy.lineTop = siblingMiddleY;
          }
        }
        //top to bottom
        if (
          currDragTop < siblingBottom + 4 &&
          currDragTop > siblingBottom - 4
        ) {
          if (
            !snapLinesCopy.lineTop ||
            (snapLinesCopy.lineTop &&
              currDragTop - snapLinesCopy.lineTop > currDragTop - siblingBottom)
          ) {
            snapLinesCopy.lineTop = siblingBottom;
          }
        }

        //middleY to top
        if (
          currDragMiddleY < siblingTop + 4 &&
          currDragMiddleY > siblingTop - 4
        ) {
          if (
            !snapLinesCopy.lineMiddleY ||
            (snapLinesCopy.lineMiddleY &&
              currDragMiddleY - snapLinesCopy.lineMiddleY >
                currDragMiddleY - siblingTop)
          ) {
            snapLinesCopy.lineMiddleY = siblingTop;
          }
        }
        //middleY to middleY
        if (
          currDragMiddleY < siblingMiddleY + 4 &&
          currDragMiddleY > siblingMiddleY - 4
        ) {
          if (
            !snapLinesCopy.lineMiddleY ||
            (snapLinesCopy.lineMiddleY &&
              currDragMiddleY - snapLinesCopy.lineMiddleY >
                currDragMiddleY - siblingMiddleY)
          ) {
            snapLinesCopy.lineMiddleY = siblingMiddleY;
          }
        }
        //middleY to bottom
        if (
          currDragMiddleY < siblingBottom + 4 &&
          currDragMiddleY > siblingBottom - 4
        ) {
          if (
            !snapLinesCopy.lineMiddleY ||
            (snapLinesCopy.lineMiddleY &&
              currDragMiddleY - snapLinesCopy.lineMiddleY >
                currDragMiddleY - siblingBottom)
          ) {
            snapLinesCopy.lineMiddleY = siblingBottom;
          }
        }

        //bottom to top
        if (
          currDragBottom < siblingTop + 4 &&
          currDragBottom > siblingTop - 4
        ) {
          if (
            !snapLinesCopy.lineBottom ||
            (snapLinesCopy.lineBottom &&
              currDragBottom - snapLinesCopy.lineBottom >
                currDragBottom - siblingTop)
          ) {
            snapLinesCopy.lineBottom = siblingTop;
          }
        }
        //bottom to middleY
        if (
          currDragBottom < siblingMiddleY + 4 &&
          currDragBottom > siblingMiddleY - 4
        ) {
          if (
            !snapLinesCopy.lineBottom ||
            (snapLinesCopy.lineBottom &&
              currDragBottom - snapLinesCopy.lineBottom >
                currDragBottom - siblingMiddleY)
          ) {
            snapLinesCopy.lineBottom = siblingMiddleY;
          }
        }
        //bottom to bottom
        if (
          currDragBottom < siblingBottom + 4 &&
          currDragBottom > siblingBottom - 4
        ) {
          if (
            !snapLinesCopy.lineBottom ||
            (snapLinesCopy.lineBottom &&
              currDragBottom - snapLinesCopy.lineBottom >
                currDragBottom - siblingBottom)
          ) {
            snapLinesCopy.lineBottom = siblingBottom;
          }
        }

        //left to left
        if (currDragLeft < siblingLeft + 4 && currDragLeft > siblingLeft - 4) {
          if (
            !snapLinesCopy.lineLeft ||
            (snapLinesCopy.lineLeft &&
              currDragLeft - snapLinesCopy.lineLeft >
                currDragLeft - siblingLeft)
          ) {
            snapLinesCopy.lineLeft = siblingLeft;
          }
        }
        //left to middleX
        if (
          currDragLeft < siblingMiddleX + 4 &&
          currDragLeft > siblingMiddleX - 4
        ) {
          if (
            !snapLinesCopy.lineLeft ||
            (snapLinesCopy.lineLeft &&
              currDragLeft - snapLinesCopy.lineLeft >
                currDragLeft - siblingMiddleX)
          ) {
            snapLinesCopy.lineLeft = siblingMiddleX;
          }
        }
        //left to right
        if (
          currDragLeft < siblingRight + 4 &&
          currDragLeft > siblingRight - 4
        ) {
          if (
            !snapLinesCopy.lineLeft ||
            (snapLinesCopy.lineLeft &&
              currDragLeft - snapLinesCopy.lineLeft >
                currDragLeft - siblingRight)
          ) {
            snapLinesCopy.lineLeft = siblingRight;
          }
        }

        //middleX to left
        if (
          currDragMiddleX < siblingLeft + 4 &&
          currDragMiddleX > siblingLeft - 4
        ) {
          if (
            !snapLinesCopy.lineMiddleX ||
            (snapLinesCopy.lineMiddleX &&
              currDragMiddleX - snapLinesCopy.lineMiddleX >
                currDragMiddleX - siblingLeft)
          ) {
            snapLinesCopy.lineMiddleX = siblingLeft;
          }
        }
        //middleX to middleX
        if (
          currDragMiddleX < siblingMiddleX + 4 &&
          currDragMiddleX > siblingMiddleX - 4
        ) {
          if (
            !snapLinesCopy.lineMiddleX ||
            (snapLinesCopy.lineMiddleX &&
              currDragMiddleX - snapLinesCopy.lineMiddleX >
                currDragMiddleX - siblingMiddleX)
          ) {
            snapLinesCopy.lineMiddleX = siblingMiddleX;
          }
        }
        //middleX to right
        if (
          currDragMiddleX < siblingRight + 4 &&
          currDragMiddleX > siblingRight - 4
        ) {
          if (
            !snapLinesCopy.lineMiddleX ||
            (snapLinesCopy.lineMiddleX &&
              currDragMiddleX - snapLinesCopy.lineMiddleX >
                currDragMiddleX - siblingRight)
          ) {
            snapLinesCopy.lineMiddleX = siblingRight;
          }
        }

        //right to left
        if (
          currDragRight < siblingLeft + 4 &&
          currDragRight > siblingLeft - 4
        ) {
          if (
            !snapLinesCopy.lineRight ||
            (snapLinesCopy.lineRight &&
              currDragRight - snapLinesCopy.lineRight >
                currDragRight - siblingLeft)
          ) {
            snapLinesCopy.lineRight = siblingLeft;
          }
        }
        //right to middleX
        if (
          currDragRight < siblingMiddleX + 4 &&
          currDragRight > siblingMiddleX - 4
        ) {
          if (
            !snapLinesCopy.lineRight ||
            (snapLinesCopy.lineRight &&
              currDragRight - snapLinesCopy.lineRight >
                currDragRight - siblingMiddleX)
          ) {
            snapLinesCopy.lineRight = siblingMiddleX;
          }
        }
        //right to right
        if (
          currDragRight < siblingRight + 4 &&
          currDragRight > siblingRight - 4
        ) {
          if (
            !snapLinesCopy.lineRight ||
            (snapLinesCopy.lineRight &&
              currDragRight - snapLinesCopy.lineRight >
                currDragRight - siblingRight)
          ) {
            snapLinesCopy.lineRight = siblingRight;
          }
          e;
        }
      });
      if (snapLinesCopy.lineTop && snapLinesCopy.lineBottom) {
        if (
          Math.abs(snapLinesCopy.lineTop - currDragTop) >
          Math.abs(snapLinesCopy.lineBottom - currDragBottom)
        ) {
          snapLinesCopy.lineTop = NaN;
        }
        if (
          Math.abs(snapLinesCopy.lineTop - currDragTop) <
          Math.abs(snapLinesCopy.lineBottom - currDragBottom)
        ) {
          snapLinesCopy.lineBottom = NaN;
        }
      }
      if (snapLinesCopy.lineTop && snapLinesCopy.lineMiddleY) {
        if (
          Math.abs(snapLinesCopy.lineTop - currDragTop) >
          Math.abs(snapLinesCopy.lineMiddleY - currDragMiddleY)
        ) {
          snapLinesCopy.lineTop = NaN;
        }
        if (
          Math.abs(snapLinesCopy.lineTop - currDragTop) <
          Math.abs(snapLinesCopy.lineMiddleY - currDragMiddleY)
        ) {
          snapLinesCopy.lineMiddleY = NaN;
        }
      }
      if (snapLinesCopy.lineBottom && snapLinesCopy.lineMiddleY) {
        if (
          Math.abs(snapLinesCopy.lineBottom - currDragBottom) >
          Math.abs(snapLinesCopy.lineMiddleY - currDragMiddleY)
        ) {
          snapLinesCopy.lineBottom = NaN;
        }
        if (
          Math.abs(snapLinesCopy.lineBottom - currDragBottom) <
          Math.abs(snapLinesCopy.lineMiddleY - currDragMiddleY)
        ) {
          snapLinesCopy.lineMiddleY = NaN;
        }
      }

      if (snapLinesCopy.lineLeft && snapLinesCopy.lineRight) {
        if (
          Math.abs(snapLinesCopy.lineLeft - currDragLeft) >
          Math.abs(snapLinesCopy.lineRight - currDragRight)
        ) {
          snapLinesCopy.lineLeft = NaN;
        }
        if (
          Math.abs(snapLinesCopy.lineLeft - currDragLeft) <
          Math.abs(snapLinesCopy.lineRight - currDragRight)
        ) {
          snapLinesCopy.lineRight = NaN;
        }
      }
      if (snapLinesCopy.lineLeft && snapLinesCopy.lineMiddleX) {
        if (
          Math.abs(snapLinesCopy.lineLeft - currDragLeft) >
          Math.abs(snapLinesCopy.lineMiddleX - currDragMiddleX)
        ) {
          snapLinesCopy.lineLeft = NaN;
        }
        if (
          Math.abs(snapLinesCopy.lineLeft - currDragLeft) <
          Math.abs(snapLinesCopy.lineMiddleX - currDragMiddleX)
        ) {
          snapLinesCopy.lineMiddleX = NaN;
        }
      }
      if (snapLinesCopy.lineRight && snapLinesCopy.lineMiddleX) {
        if (
          Math.abs(snapLinesCopy.lineRight - currDragRight) >
          Math.abs(snapLinesCopy.lineMiddleX - currDragMiddleX)
        ) {
          snapLinesCopy.lineRight = NaN;
        }
        if (
          Math.abs(snapLinesCopy.lineRight - currDragRight) <
          Math.abs(snapLinesCopy.lineMiddleX - currDragMiddleX)
        ) {
          snapLinesCopy.lineMiddleX = NaN;
        }
      }
      this.snapLines = { ...snapLinesCopy };
      if (
        snapLinesCopy.lineTop ||
        snapLinesCopy.lineMiddleY ||
        snapLinesCopy.lineBottom ||
        snapLinesCopy.lineLeft ||
        snapLinesCopy.lineMiddleX ||
        snapLinesCopy.lineRight
      ) {
        this.show = true;
        if (snapLinesCopy.lineTop) {
          selectToi.selectedBoxData.attr.style.top =
            Math.round(
              (snapLinesCopy.lineTop - squareStore.offsetTop) /
                squareStore.scale
            ) + "px";
          if (
            !snapLinesCopy.lineMiddleY &&
            !snapLinesCopy.lineBottom &&
            !snapLinesCopy.lineLeft &&
            !snapLinesCopy.lineMiddleX &&
            !snapLinesCopy.lineRight
          ) {
            dndStore.setLeftPosition(e);
          }
        }
        if (snapLinesCopy.lineMiddleY) {
          selectToi.selectedBoxData.attr.style.top =
            Math.round(
              (snapLinesCopy.lineMiddleY -
                elementRect.height / 2 -
                squareStore.offsetTop) /
                squareStore.scale
            ) + "px";
          if (
            !snapLinesCopy.lineTop &&
            !snapLinesCopy.lineBottom &&
            !snapLinesCopy.lineLeft &&
            !snapLinesCopy.lineMiddleX &&
            !snapLinesCopy.lineRight
          ) {
            dndStore.setLeftPosition(e);
          }
        }
        if (snapLinesCopy.lineBottom) {
          selectToi.selectedBoxData.attr.style.top =
            Math.round(
              (snapLinesCopy.lineBottom -
                elementRect.height -
                squareStore.offsetTop) /
                squareStore.scale
            ) + "px";
          if (
            !snapLinesCopy.lineTop &&
            !snapLinesCopy.lineMiddleY &&
            !snapLinesCopy.lineLeft &&
            !snapLinesCopy.lineMiddleX &&
            !snapLinesCopy.lineRight
          ) {
            dndStore.setLeftPosition(e);
          }
        }
        if (snapLinesCopy.lineLeft) {
          selectToi.selectedBoxData.attr.style.left =
            Math.round(
              (snapLinesCopy.lineLeft - squareStore.offsetLeft) /
                squareStore.scale
            ) + "px";
          if (
            !snapLinesCopy.lineTop &&
            !snapLinesCopy.lineMiddleY &&
            !snapLinesCopy.lineBottom &&
            !snapLinesCopy.lineMiddleX &&
            !snapLinesCopy.lineRight
          ) {
            dndStore.setTopPosition(e);
          }
        }
        if (snapLinesCopy.lineMiddleX) {
          selectToi.selectedBoxData.attr.style.left =
            Math.round(
              (snapLinesCopy.lineMiddleX -
                elementRect.width / 2 -
                squareStore.offsetLeft) /
                squareStore.scale
            ) + "px";
          if (
            !snapLinesCopy.lineTop &&
            !snapLinesCopy.lineMiddleY &&
            !snapLinesCopy.lineBottom &&
            !snapLinesCopy.lineLeft &&
            !snapLinesCopy.lineRight
          ) {
            dndStore.setTopPosition(e);
          }
        }
        if (snapLinesCopy.lineRight) {
          selectToi.selectedBoxData.attr.style.left =
            Math.round(
              (snapLinesCopy.lineRight -
                elementRect.width -
                squareStore.offsetLeft) /
                squareStore.scale
            ) + "px";
          if (
            !snapLinesCopy.lineTop &&
            !snapLinesCopy.lineMiddleY &&
            !snapLinesCopy.lineBottom &&
            !snapLinesCopy.lineLeft &&
            !snapLinesCopy.lineMiddleX
          ) {
            dndStore.setTopPosition(e);
          }
        }
      }

      if (
        !snapLinesCopy.lineTop &&
        !snapLinesCopy.lineMiddleY &&
        !snapLinesCopy.lineBottom &&
        !snapLinesCopy.lineLeft &&
        !snapLinesCopy.lineMiddleX &&
        !snapLinesCopy.lineRight
      ) {
        this.show = false;
        dndStore.setTopPosition(e);
        dndStore.setLeftPosition(e);
      }
      this.snapLines = { ...snapLinesCopy };
    },
  },
});
