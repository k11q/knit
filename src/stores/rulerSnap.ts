import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useSquareStore } from "./dataSquare";
import { useResizeStore } from "./resizeStore";
import { useCanvasStore } from "./canvas";
import { MeasuredLine } from "../composables/calculate-distance";

export type Point = {
  x: number;
  y: number;
};

type Points = Point[];

type RulerPosition = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type Line = {
  lineTop?: number;
  lineMiddleY?: number;
  lineBottom?: number;
  lineLeft?: number;
  lineMiddleX?: number;
  lineRight?: number;
  lineMiddle?: number;
};

type LineResize = {
  lineX: number;
  lineY: number;
};

//type for samedistance snap
type LineAndId = {
  line: number;
  id: string;
};
type OriginAndMeasuredId = {
  originId: string;
  measuredId: string;
};

export const useRulerSnapStore = defineStore({
  id: "rulerSnap",
  state: () => ({
    show: false,
    on: false,
    snapTop: false,
    snapLeft: false,
    snapHeight: false,
    snapWidth: false,
    currDragPoints: {},
    displayedPoints: {},
    lines: {},
    snapLines: {} as Line,
    rulerPosition: {} as RulerPosition,
    snapPoints: [] as Points,
    siblings: [] as HTMLElement[],
    selectedSiblings: [] as HTMLElement[],
    siblingsPoints: [],
    prevX: NaN,
    prevY: NaN,
  }),
  actions: {
    /*
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
    */
    setSiblingsPoints(id: string) {
      let siblingPointsCopy = [] as Points;
      const element = document.querySelector(`[data-id=${id}]`)!;
      const elementRect = element.getBoundingClientRect();

      //set element points
      if (this.snapLines.lineTop) {
        siblingPointsCopy.push(
          { x: elementRect.x, y: elementRect.y },
          { x: elementRect.x + elementRect.width, y: elementRect.y }
        );
      }
      if (this.snapLines.lineMiddleY) {
        siblingPointsCopy.push({
          x: elementRect.x + elementRect.width / 2,
          y: elementRect.y + elementRect.height / 2,
        });
      }
      if (this.snapLines.lineBottom) {
        siblingPointsCopy.push(
          { x: elementRect.x, y: elementRect.y + elementRect.height },
          {
            x: elementRect.x + elementRect.width,
            y: elementRect.y + elementRect.height,
          }
        );
      }
      if (this.snapLines.lineLeft) {
        siblingPointsCopy.push(
          { x: elementRect.x, y: elementRect.y },
          { x: elementRect.x, y: elementRect.y + elementRect.height }
        );
      }
      if (this.snapLines.lineMiddleX) {
        siblingPointsCopy.push({
          x: elementRect.x + elementRect.width / 2,
          y: elementRect.y + elementRect.height / 2,
        });
      }
      if (this.snapLines.lineRight) {
        siblingPointsCopy.push(
          { x: elementRect.x + elementRect.width, y: elementRect.y },
          {
            x: elementRect.x + elementRect.width,
            y: elementRect.y + elementRect.height,
          }
        );
      }
      this.selectedSiblings.forEach((i) => {
        let siblingRect = i.getBoundingClientRect();

        //set siblings points
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

      let rulerPositionCopy = {} as RulerPosition;
      this.snapPoints.forEach((i) => {
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
    /*
    setShowPointer(x, y) {
      if (
        (this.snapLines?.lineLeft < x + 5 &&
          this.snapLines?.lineLeft > y - 5) ||
        (this.snapLines?.lineMiddleX < x + 5 &&
          this.snapLines?.lineMiddleX > x - 5) ||
        (this.snapLines?.lineRight < x + 5 &&
          this.snapLines?.lineRight > x - 5) ||
        (this.snapLines?.lineTop < y + 5 && this.snapLines?.lineTop > y - 5) ||
        (this.snapLines?.lineMiddleY < y + 5 &&
          this.csnapLines?.lineMiddleY > y - 5) ||
        (this.snapLines?.lineBottom < y + 5 &&
          this.snapLines?.lineBottom > y - 5)
      ) {
        return true;
      } else return false;
    },
    */
    setRulerSnap(e: MouseEvent, id: string) {
      const squareStore = useSquareStore();

      const element = document.querySelector(`[data-id=${id}]`)!;
      const elementRect = element.getBoundingClientRect();

      const prevX = this.prevX;
      const prevY = this.prevY;

      const currDragTop = e.clientY - prevY;
      const currDragMiddleY = e.clientY - prevY + elementRect.height / 2;
      const currDragBottom = e.clientY - prevY + elementRect.height;
      const currDragLeft = e.clientX - prevX;
      const currDragMiddleX = e.clientX - prevX + elementRect.width / 2;
      const currDragRight = e.clientX - prevX + elementRect.width;

      const snapLinesCopy = {} as Line;

      const selectedSiblingsCopy = [] as HTMLElement[];

      const siblings = [
        ...document.querySelector(`[data-id=${id}]`)!.parentElement!.children,
      ] as HTMLElement[];
      this.siblings = siblings.filter((el) => el.dataset.id !== id);

      if (this.on) {
        let closestLeftLine = 0;
        let closestRightLine = 0;
        let closestTopLine = 0;
        let closestBottomLine = 0;

        let closestLeftId = "";
        let closestRightId = "";
        let closestTopId = "";
        let closestBottomId = "";

        let verticalSameDistLines = [] as MeasuredLine[];
        let horizontalSameDistLines = [] as MeasuredLine[];

        this.siblings.forEach((i) => {
          let siblingId = i.dataset.id as string;
          let siblingRect = i.getBoundingClientRect();
          let siblingTop = siblingRect.y;
          let siblingMiddleY = siblingRect.y + siblingRect.height / 2;
          let siblingBottom = siblingRect.y + siblingRect.height;
          let siblingLeft = siblingRect.x;
          let siblingMiddleX = siblingRect.x + siblingRect.width / 2;
          let siblingRight = siblingRect.x + siblingRect.width;

          //if any add to selected siblings
          if (
            (currDragTop < siblingTop + 5 && currDragTop > siblingTop - 5) ||
            (currDragTop < siblingMiddleY + 5 &&
              currDragTop > siblingMiddleY - 5) ||
            (currDragTop < siblingBottom + 5 &&
              currDragTop > siblingBottom - 5) ||
            (currDragMiddleY < siblingTop + 5 &&
              currDragMiddleY > siblingTop - 5) ||
            (currDragMiddleY < siblingMiddleY + 5 &&
              currDragMiddleY > siblingMiddleY - 5) ||
            (currDragMiddleY < siblingBottom + 5 &&
              currDragMiddleY > siblingBottom - 5) ||
            (currDragBottom < siblingTop + 5 &&
              currDragBottom > siblingTop - 5) ||
            (currDragBottom < siblingMiddleY + 5 &&
              currDragBottom > siblingMiddleY - 5) ||
            (currDragBottom < siblingBottom + 5 &&
              currDragBottom > siblingBottom - 5) ||
            (currDragLeft < siblingLeft + 5 &&
              currDragLeft > siblingLeft - 5) ||
            (currDragLeft < siblingMiddleX + 5 &&
              currDragLeft > siblingMiddleX - 5) ||
            (currDragLeft < siblingRight + 5 &&
              currDragLeft > siblingRight - 5) ||
            (currDragMiddleX < siblingLeft + 5 &&
              currDragMiddleX > siblingLeft - 5) ||
            (currDragMiddleX < siblingMiddleX + 5 &&
              currDragMiddleX > siblingMiddleX - 5) ||
            (currDragMiddleX < siblingRight + 5 &&
              currDragMiddleX > siblingRight - 5) ||
            (currDragRight < siblingLeft + 5 &&
              currDragRight > siblingLeft - 5) ||
            (currDragRight < siblingMiddleX + 5 &&
              currDragRight > siblingMiddleX - 5) ||
            (currDragRight < siblingRight + 5 &&
              currDragRight > siblingRight - 5)
          ) {
            //find distance between moving element and all other elements
            //top to top
            if (currDragTop < siblingTop + 5 && currDragTop > siblingTop - 5) {
              if (
                !snapLinesCopy.lineTop ||
                (snapLinesCopy.lineTop &&
                  currDragTop - snapLinesCopy.lineTop >
                    currDragTop - siblingTop)
              ) {
                snapLinesCopy.lineTop = siblingTop;
              }
            }
            //top to middleY
            if (
              currDragTop < siblingMiddleY + 5 &&
              currDragTop > siblingMiddleY - 5
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
              currDragTop < siblingBottom + 5 &&
              currDragTop > siblingBottom - 5
            ) {
              if (
                !snapLinesCopy.lineTop ||
                (snapLinesCopy.lineTop &&
                  currDragTop - snapLinesCopy.lineTop >
                    currDragTop - siblingBottom)
              ) {
                snapLinesCopy.lineTop = siblingBottom;
              }
            }

            //middleY to top
            if (
              currDragMiddleY < siblingTop + 5 &&
              currDragMiddleY > siblingTop - 5
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
              currDragMiddleY < siblingMiddleY + 5 &&
              currDragMiddleY > siblingMiddleY - 5
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
              currDragMiddleY < siblingBottom + 5 &&
              currDragMiddleY > siblingBottom - 5
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
              currDragBottom < siblingTop + 5 &&
              currDragBottom > siblingTop - 5
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
              currDragBottom < siblingMiddleY + 5 &&
              currDragBottom > siblingMiddleY - 5
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
              currDragBottom < siblingBottom + 5 &&
              currDragBottom > siblingBottom - 5
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
            if (
              currDragLeft < siblingLeft + 5 &&
              currDragLeft > siblingLeft - 5
            ) {
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
              currDragLeft < siblingMiddleX + 5 &&
              currDragLeft > siblingMiddleX - 5
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
              currDragLeft < siblingRight + 5 &&
              currDragLeft > siblingRight - 5
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
              currDragMiddleX < siblingLeft + 5 &&
              currDragMiddleX > siblingLeft - 5
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
              currDragMiddleX < siblingMiddleX + 5 &&
              currDragMiddleX > siblingMiddleX - 5
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
              currDragMiddleX < siblingRight + 5 &&
              currDragMiddleX > siblingRight - 5
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
              currDragRight < siblingLeft + 5 &&
              currDragRight > siblingLeft - 5
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
              currDragRight < siblingMiddleX + 5 &&
              currDragRight > siblingMiddleX - 5
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
              currDragRight < siblingRight + 5 &&
              currDragRight > siblingRight - 5
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
            selectedSiblingsCopy.push(i);
          }
          //check same distance
          //set closest left,right,top, bottom
          if (
            ((!closestLeftLine && siblingRight < currDragLeft) ||
              (closestLeftLine &&
                siblingRight > closestLeftLine &&
                siblingRight < currDragLeft)) &&
            ((siblingBottom > currDragTop && siblingBottom < currDragBottom) ||
              (siblingTop < currDragBottom && siblingTop > currDragTop) ||
              (siblingTop < currDragTop && siblingBottom > currDragBottom))
          ) {
            closestLeftLine = siblingRight;
            closestLeftId = siblingId;
          }
          if (
            ((!closestRightLine && siblingLeft > currDragRight) ||
              (closestRightLine &&
                siblingLeft < closestRightLine &&
                siblingLeft > currDragRight)) &&
            ((siblingBottom > currDragTop && siblingBottom < currDragBottom) ||
              (siblingTop < currDragBottom && siblingTop > currDragTop) ||
              (siblingTop < currDragTop && siblingBottom > currDragBottom))
          ) {
            closestRightLine = siblingLeft;
            closestRightId = siblingId;
          }
          if (
            ((!closestTopLine && siblingBottom < currDragTop) ||
              (closestTopLine &&
                siblingBottom > closestTopLine &&
                siblingBottom < currDragTop)) &&
            ((siblingRight > currDragLeft && siblingRight < currDragRight) ||
              (siblingLeft < currDragRight && siblingLeft > currDragLeft) ||
              (siblingLeft < currDragLeft && siblingRight > currDragRight))
          ) {
            closestTopLine = siblingBottom;
            closestTopId = siblingId;
          }
          if (
            ((!closestBottomLine && siblingTop > currDragBottom) ||
              (closestBottomLine &&
                siblingTop < closestBottomLine &&
                siblingTop > currDragBottom)) &&
            ((siblingRight > currDragLeft && siblingRight < currDragRight) ||
              (siblingLeft < currDragRight && siblingLeft > currDragLeft) ||
              (siblingLeft < currDragLeft && siblingRight > currDragRight))
          ) {
            closestBottomLine = siblingTop;
            closestBottomId = siblingId;
          } else return;
        });
        //snap for horizontal same ditance
        if (closestLeftId || closestRightId) {
          let closestLeftRect: DOMRect;
          let closestRightRect: DOMRect;

          let distanceToLeft = 0;
          let distanceToRight = 0;

          let snapBetweenHorizontal = false;

          //set distance to closest
          if (closestLeftId) {
            closestLeftRect = useGetElementRect(closestLeftId) as DOMRect;
            distanceToLeft = currDragLeft - closestLeftRect.right;
          }
          if (closestRightId) {
            closestRightRect = useGetElementRect(closestRightId) as DOMRect;
            distanceToRight = closestRightRect.left - currDragRight;
          }

          let snapDistanceHorizontal = 0;
          let arrayLineLeft: LineAndId[] = [];
          let arrayIdHorizontal: OriginAndMeasuredId[] = [];
          let otherLinesHorizontal: MeasuredLine[] = [];
          let filteredSiblingsHorizontal: HTMLElement[];

          Promise.resolve()
            .then(() => {
              if (closestLeftId) {
                filteredSiblingsHorizontal = siblings.filter(
                  (el) => el.dataset.id !== closestLeftId
                );
              } else {
                filteredSiblingsHorizontal = siblings.filter(
                  (el) => el.dataset.id !== id
                );
              }
              //set all siblings rightline
              filteredSiblingsHorizontal.forEach((i) => {
                let siblingId = i.dataset.id as string;
                let siblingRect = i.getBoundingClientRect();
                let siblingTop = siblingRect.top;
                let siblingBottom = siblingRect.top + siblingRect.height;
                let siblingRight = siblingRect.left + siblingRect.width;
                if (
                  (siblingBottom > currDragTop &&
                    siblingBottom < currDragBottom) ||
                  (siblingTop < currDragBottom && siblingTop > currDragTop) ||
                  (siblingTop <= currDragTop && siblingBottom >= currDragBottom)
                ) {
                  arrayLineLeft.push({ line: siblingRight, id: siblingId });
                }
              });
              //measure every siblings leftline to every rightline
              siblings.forEach((i) => {
                let siblingId = i.dataset.id as string;
                let siblingRect = i.getBoundingClientRect();
                let siblingTop = siblingRect.top;
                let siblingBottom = siblingRect.top + siblingRect.height;
                let siblingLeft = siblingRect.left;

                if (
                  (siblingBottom > currDragTop &&
                    siblingBottom < currDragBottom) ||
                  (siblingTop < currDragBottom && siblingTop > currDragTop) ||
                  (siblingTop <= currDragTop && siblingBottom >= currDragBottom)
                ) {
                  arrayLineLeft.forEach((i) => {
                    if (
                      !arrayIdHorizontal.find((obj) => obj.originId === i.id) ||
                      !arrayIdHorizontal.find((obj) => obj.measuredId === i.id)
                    ) {
                      //snap if same distance, sensitivity 5
                      //snap between
                      if (
                        closestLeftId &&
                        closestRightId &&
                        siblingLeft - i.line <= distanceToLeft + 5 &&
                        siblingLeft - i.line >= distanceToLeft - 5 &&
                        siblingLeft - i.line <= distanceToRight + 5 &&
                        siblingLeft - i.line >= distanceToRight - 5
                      ) {
                        snapDistanceHorizontal = Math.round(
                          siblingLeft - i.line
                        );
                        snapBetweenHorizontal = true;
                        console.log("horizontalbetween");

                        this.snapLeft = true;

                        changeLeft(
                          Math.round(
                            (closestLeftRect.right +
                              (closestRightRect.left - closestLeftRect.right) /
                                2 -
                              elementRect.width / 2 -
                              squareStore.offsetLeft) /
                              squareStore.scale
                          )
                        );
                        arrayIdHorizontal.push({
                          originId: i.id,
                          measuredId: siblingId,
                        });
                      }
                      //snap left
                      else if (
                        closestLeftId &&
                        siblingLeft - i.line <= distanceToLeft + 5 &&
                        siblingLeft - i.line >= distanceToLeft - 5 &&
                        siblingId !== id
                      ) {
                        snapDistanceHorizontal = Math.round(
                          siblingLeft - i.line
                        );
                        console.log("horizontalleft");

                        this.snapLeft = true;

                        changeLeft(
                          Math.round(
                            (closestLeftRect.right +
                              snapDistanceHorizontal -
                              squareStore.offsetLeft) /
                              squareStore.scale
                          )
                        );
                        arrayIdHorizontal.push({
                          originId: i.id,
                          measuredId: siblingId,
                        });
                      }
                      //snap right
                      else if (
                        !closestLeftId &&
                        siblingLeft - i.line <= distanceToRight + 5 &&
                        siblingLeft - i.line >= distanceToRight - 5 &&
                        i.id !== id
                      ) {
                        snapDistanceHorizontal = Math.round(
                          siblingLeft - i.line
                        );
                        console.log("horizontalright");

                        this.snapLeft = true;

                        changeLeft(
                          Math.round(
                            (closestRightRect.left -
                              elementRect.width -
                              snapDistanceHorizontal -
                              squareStore.offsetLeft) /
                              squareStore.scale
                          )
                        );
                        arrayIdHorizontal.push({
                          originId: i.id,
                          measuredId: siblingId,
                        });
                      }
                    }
                  });
                }
              });
            })
            .then(() => {
              //set lines position, dimensions and labels
              if (arrayIdHorizontal.length) {
                arrayIdHorizontal.forEach((i) => {
                  let originRect = useGetElementRect(i.originId) as DOMRect;
                  let measuredRect = useGetElementRect(i.measuredId) as DOMRect;

                  let line = {
                    top: 0,
                    left: originRect.right,
                    width: 0,
                    type: "solid",
                  } as MeasuredLine;

                  if (closestLeftId) {
                    line.width =
                      snapDistanceHorizontal > 0
                        ? snapDistanceHorizontal
                        : distanceToLeft;
                  } else {
                    line.width =
                      snapDistanceHorizontal > 0
                        ? snapDistanceHorizontal
                        : distanceToRight;
                  }

                  if (
                    originRect.bottom >= measuredRect.bottom &&
                    originRect.top <= measuredRect.top
                  ) {
                    line.top = measuredRect.top + measuredRect.height / 2;
                  } else if (
                    originRect.bottom > measuredRect.top &&
                    originRect.bottom < measuredRect.bottom
                  ) {
                    line.top =
                      (originRect.bottom - measuredRect.top) / 2 +
                      measuredRect.top;
                  } else if (
                    originRect.top < measuredRect.bottom &&
                    originRect.top > measuredRect.top
                  ) {
                    line.top =
                      (measuredRect.bottom - originRect.top) / 2 +
                      originRect.top;
                  }
                  if (snapBetweenHorizontal && i.originId === id) {
                    line.top = closestLeftRect.top + closestLeftRect.height / 2;
                  }

                  otherLinesHorizontal.push(line);
                });
                setLinesAndLabels();
                function setLinesAndLabels() {
                  if (
                    otherLinesHorizontal.length &&
                    useRulerSnapStore().snapLeft
                  ) {
                    let lineX = {
                      top: 0,
                      left: 0,
                      width: 0,
                      type: "solid",
                    } as MeasuredLine;

                    if (closestLeftId) {
                      lineX.top =
                        closestLeftRect.top + closestLeftRect.height / 2;
                      lineX.left = closestLeftRect.right;
                      lineX.width =
                        snapDistanceHorizontal > 0
                          ? snapDistanceHorizontal
                          : distanceToLeft;
                    } else {
                      lineX.top =
                        closestRightRect.top + closestRightRect.height / 2;
                      lineX.left = elementRect.right;
                      lineX.width =
                        snapDistanceHorizontal > 0
                          ? snapDistanceHorizontal
                          : distanceToRight;
                    }

                    horizontalSameDistLines = [lineX, ...otherLinesHorizontal];
                    measuredLines().value = [
                      ...horizontalSameDistLines,
                      ...verticalSameDistLines,
                    ];
                  }
                }
              } else {
                this.snapLeft = false;
                measuredLines().value = [...verticalSameDistLines];
              }
            });
        }
        //snap for vertical same ditance
        if (closestTopId || closestBottomId) {
          let closestTopRect: DOMRect;
          let closestBottomRect: DOMRect;

          let distanceToTop = 0;
          let distanceToBottom = 0;

          let snapBetween = false;

          //set distance to closest
          if (closestTopId) {
            closestTopRect = useGetElementRect(closestTopId) as DOMRect;
            distanceToTop = currDragTop - closestTopRect.bottom;
          }
          if (closestBottomId) {
            closestBottomRect = useGetElementRect(closestBottomId) as DOMRect;
            distanceToBottom = closestBottomRect.top - currDragBottom;
          }

          let snapDistance = 0;
          let arrayLineTop: LineAndId[] = [];
          let arrayId: OriginAndMeasuredId[] = [];
          let otherLines: MeasuredLine[] = [];
          let filteredSiblings: HTMLElement[];

          Promise.resolve()
            .then(() => {
              if (closestTopId) {
                filteredSiblings = siblings.filter(
                  (el) => el.dataset.id !== closestTopId
                );
              } else {
                filteredSiblings = siblings.filter(
                  (el) => el.dataset.id !== id
                );
              }
              //set all siblings bottomline
              filteredSiblings.forEach((i) => {
                let siblingId = i.dataset.id as string;
                let siblingRect = i.getBoundingClientRect();
                let siblingLeft2 = siblingRect.left;
                let siblingRight2 = siblingRect.left + siblingRect.width;
                let siblingBottom = siblingRect.top + siblingRect.height;

                if (
                  (siblingRight2 > currDragLeft &&
                    siblingRight2 < currDragRight) ||
                  (siblingLeft2 < currDragRight &&
                    siblingLeft2 > currDragLeft) ||
                  (siblingLeft2 <= currDragLeft &&
                    siblingRight2 >= currDragRight)
                ) {
                  arrayLineTop.push({ line: siblingBottom, id: siblingId });
                }
              });
              //measure every siblings topline to every bottomline
              siblings.forEach((i) => {
                let siblingId = i.dataset.id as string;
                let siblingRect = i.getBoundingClientRect();
                let siblingLeft2 = siblingRect.left;
                let siblingRight2 = siblingRect.left + siblingRect.width;
                let siblingTop = siblingRect.top;

                if (
                  (siblingRight2 > currDragLeft &&
                    siblingRight2 < currDragRight) ||
                  (siblingLeft2 < currDragRight &&
                    siblingLeft2 > currDragLeft) ||
                  (siblingLeft2 <= currDragLeft &&
                    siblingRight2 >= currDragRight)
                ) {
                  arrayLineTop.forEach((i) => {
                    if (
                      !arrayId.find((obj) => obj.originId === i.id) ||
                      !arrayId.find((obj) => obj.measuredId === i.id)
                    ) {
                      //snap if same distance, sensitivity 5
                      //snap between
                      if (
                        closestTopId &&
                        closestBottomId &&
                        siblingTop - i.line <= distanceToTop + 5 &&
                        siblingTop - i.line >= distanceToTop - 5 &&
                        siblingTop - i.line <= distanceToBottom + 5 &&
                        siblingTop - i.line >= distanceToBottom - 5
                      ) {
                        snapDistance = Math.round(siblingTop - i.line);
                        snapBetween = true;
                        console.log("between");

                        this.snapTop = true;

                        changeTop(
                          Math.round(
                            (closestTopRect.bottom +
                              (closestBottomRect.top - closestTopRect.bottom) /
                                2 -
                              elementRect.height / 2 -
                              squareStore.offsetTop) /
                              squareStore.scale
                          )
                        );
                        arrayId.push({ originId: i.id, measuredId: siblingId });
                      }
                      //snap top
                      else if (
                        closestTopId &&
                        siblingTop - i.line <= distanceToTop + 5 &&
                        siblingTop - i.line >= distanceToTop - 5 &&
                        siblingId !== id
                      ) {
                        snapDistance = Math.round(siblingTop - i.line);
                        console.log("top");

                        this.snapTop = true;

                        changeTop(
                          Math.round(
                            (closestTopRect.bottom +
                              snapDistance -
                              squareStore.offsetTop) /
                              squareStore.scale
                          )
                        );
                        arrayId.push({ originId: i.id, measuredId: siblingId });
                      }
                      //snap bottom
                      else if (
                        !closestTopId &&
                        siblingTop - i.line <= distanceToBottom + 5 &&
                        siblingTop - i.line >= distanceToBottom - 5 &&
                        i.id !== id
                      ) {
                        snapDistance = Math.round(siblingTop - i.line);
                        console.log("bottom");

                        this.snapTop = true;

                        changeTop(
                          Math.round(
                            (closestBottomRect.top -
                              elementRect.height -
                              snapDistance -
                              squareStore.offsetTop) /
                              squareStore.scale
                          )
                        );
                        arrayId.push({ originId: i.id, measuredId: siblingId });
                      }
                    }
                  });
                }
              });
            })
            .then(() => {
              //set lines position, dimensions and labels
              if (arrayId.length) {
                arrayId.forEach((i) => {
                  let originRect = useGetElementRect(i.originId) as DOMRect;
                  let measuredRect = useGetElementRect(i.measuredId) as DOMRect;

                  let line = {
                    left: 0,
                    top: originRect.bottom,
                    height: 0,
                    type: "solid",
                  } as MeasuredLine;

                  if (closestTopId) {
                    line.height =
                      snapDistance > 0 ? snapDistance : distanceToTop;
                  } else {
                    line.height =
                      snapDistance > 0 ? snapDistance : distanceToBottom;
                  }

                  if (
                    originRect.right >= measuredRect.right &&
                    originRect.left <= measuredRect.left
                  ) {
                    line.left = measuredRect.left + measuredRect.width / 2;
                  } else if (
                    originRect.right > measuredRect.left &&
                    originRect.right < measuredRect.right
                  ) {
                    line.left =
                      (originRect.right - measuredRect.left) / 2 +
                      measuredRect.left;
                  } else if (
                    originRect.left < measuredRect.right &&
                    originRect.left > measuredRect.left
                  ) {
                    line.left =
                      (measuredRect.right - originRect.left) / 2 +
                      originRect.left;
                  }
                  if (snapBetween && i.originId === id) {
                    line.left = closestTopRect.left + closestTopRect.width / 2;
                  }

                  otherLines.push(line);
                });
                setLinesAndLabels();

                function setLinesAndLabels() {
                  if (otherLines.length && useRulerSnapStore().snapTop) {
                    let lineX = {
                      top: 0,
                      left: 0,
                      height: 0,
                      type: "solid",
                    } as MeasuredLine;

                    if (closestTopId) {
                      lineX.left =
                        closestTopRect.left + closestTopRect.width / 2;
                      lineX.top = closestTopRect.bottom;
                      lineX.height =
                        snapDistance > 0 ? snapDistance : distanceToTop;
                    } else {
                      lineX.left =
                        closestBottomRect.left + closestBottomRect.width / 2;
                      lineX.top = elementRect.bottom;
                      lineX.height =
                        snapDistance > 0 ? snapDistance : distanceToBottom;
                    }

                    verticalSameDistLines = [lineX, ...otherLines];
                    measuredLines().value = [
                      ...verticalSameDistLines,
                      ...horizontalSameDistLines,
                    ];
                  }
                }
              } else {
                this.snapTop = false;
                measuredLines().value = [...horizontalSameDistLines];
              }
            });
        }

        if (
          snapLinesCopy.lineTop ||
          snapLinesCopy.lineMiddleY ||
          snapLinesCopy.lineBottom ||
          snapLinesCopy.lineLeft ||
          snapLinesCopy.lineMiddleX ||
          snapLinesCopy.lineRight
        ) {
          //calculate the distance if theres 2 lines for each position
          if (snapLinesCopy.lineTop && snapLinesCopy.lineBottom) {
            if (
              Math.abs(snapLinesCopy.lineTop - currDragTop) >
              Math.abs(snapLinesCopy.lineBottom - currDragBottom)
            ) {
              snapLinesCopy.lineTop = undefined;
            } else if (
              Math.abs(snapLinesCopy.lineTop - currDragTop) <
              Math.abs(snapLinesCopy.lineBottom - currDragBottom)
            ) {
              snapLinesCopy.lineBottom = undefined;
            }
          }
          if (snapLinesCopy.lineTop && snapLinesCopy.lineMiddleY) {
            if (
              Math.abs(snapLinesCopy.lineTop - currDragTop) >
              Math.abs(snapLinesCopy.lineMiddleY - currDragMiddleY)
            ) {
              snapLinesCopy.lineTop = undefined;
            } else if (
              Math.abs(snapLinesCopy.lineTop - currDragTop) <
              Math.abs(snapLinesCopy.lineMiddleY - currDragMiddleY)
            ) {
              snapLinesCopy.lineMiddleY = undefined;
            }
          }
          if (snapLinesCopy.lineBottom && snapLinesCopy.lineMiddleY) {
            if (
              Math.abs(snapLinesCopy.lineBottom - currDragBottom) >
              Math.abs(snapLinesCopy.lineMiddleY - currDragMiddleY)
            ) {
              snapLinesCopy.lineBottom = undefined;
            } else if (
              Math.abs(snapLinesCopy.lineBottom - currDragBottom) <
              Math.abs(snapLinesCopy.lineMiddleY - currDragMiddleY)
            ) {
              snapLinesCopy.lineMiddleY = undefined;
            }
          }

          if (snapLinesCopy.lineLeft && snapLinesCopy.lineRight) {
            if (
              Math.abs(snapLinesCopy.lineLeft - currDragLeft) >
              Math.abs(snapLinesCopy.lineRight - currDragRight)
            ) {
              snapLinesCopy.lineLeft = undefined;
            } else if (
              Math.abs(snapLinesCopy.lineLeft - currDragLeft) <
              Math.abs(snapLinesCopy.lineRight - currDragRight)
            ) {
              snapLinesCopy.lineRight = undefined;
            }
          }
          if (snapLinesCopy.lineLeft && snapLinesCopy.lineMiddleX) {
            if (
              Math.abs(snapLinesCopy.lineLeft - currDragLeft) >
              Math.abs(snapLinesCopy.lineMiddleX - currDragMiddleX)
            ) {
              snapLinesCopy.lineLeft = undefined;
            } else if (
              Math.abs(snapLinesCopy.lineLeft - currDragLeft) <
              Math.abs(snapLinesCopy.lineMiddleX - currDragMiddleX)
            ) {
              snapLinesCopy.lineMiddleX = undefined;
            }
          }
          if (snapLinesCopy.lineRight && snapLinesCopy.lineMiddleX) {
            if (
              Math.abs(snapLinesCopy.lineRight - currDragRight) >
              Math.abs(snapLinesCopy.lineMiddleX - currDragMiddleX)
            ) {
              snapLinesCopy.lineRight = undefined;
            } else if (
              Math.abs(snapLinesCopy.lineRight - currDragRight) <
              Math.abs(snapLinesCopy.lineMiddleX - currDragMiddleX)
            ) {
              snapLinesCopy.lineMiddleX = undefined;
            }
          }
          //snap /notsnap where there is/isnt line

          if (
            snapLinesCopy.lineTop ||
            snapLinesCopy.lineMiddleY ||
            snapLinesCopy.lineBottom
          ) {
            this.snapTop = true;

            if (snapLinesCopy.lineTop) {
              changeTop(
                Math.round(
                  (snapLinesCopy.lineTop - squareStore.offsetTop) /
                    squareStore.scale
                )
              );
            } else if (snapLinesCopy.lineMiddleY) {
              changeTop(
                Math.round(
                  (snapLinesCopy.lineMiddleY -
                    elementRect.height / 2 -
                    squareStore.offsetTop) /
                    squareStore.scale
                )
              );
            } else if (snapLinesCopy.lineBottom) {
              changeTop(
                Math.round(
                  (snapLinesCopy.lineBottom -
                    elementRect.height -
                    squareStore.offsetTop) /
                    squareStore.scale
                )
              );
            }

            if (
              !snapLinesCopy.lineLeft &&
              !snapLinesCopy.lineMiddleX &&
              !snapLinesCopy.lineRight
            ) {
              this.snapLeft = false;
            }
          }

          if (
            snapLinesCopy.lineLeft ||
            snapLinesCopy.lineMiddleX ||
            snapLinesCopy.lineRight
          ) {
            this.snapLeft = true;

            if (snapLinesCopy.lineLeft) {
              changeLeft(
                Math.round(
                  (snapLinesCopy.lineLeft - squareStore.offsetLeft) /
                    squareStore.scale
                )
              );
            } else if (snapLinesCopy.lineMiddleX) {
              changeLeft(
                Math.round(
                  (snapLinesCopy.lineMiddleX -
                    elementRect.width / 2 -
                    squareStore.offsetLeft) /
                    squareStore.scale
                )
              );
            } else if (snapLinesCopy.lineRight) {
              changeLeft(
                Math.round(
                  (snapLinesCopy.lineRight -
                    elementRect.width -
                    squareStore.offsetLeft) /
                    squareStore.scale
                )
              );
            }

            if (
              !snapLinesCopy.lineTop &&
              !snapLinesCopy.lineMiddleY &&
              !snapLinesCopy.lineBottom
            ) {
              this.snapTop = false;
            }
          }
          this.show = true;
          this.selectedSiblings = [...selectedSiblingsCopy];
          this.snapLines = { ...snapLinesCopy };
          this.setSiblingsPoints(id);
        } else {
          this.show = false;
          this.snapTop = false;
          this.snapLeft = false;
        }
      } else if (!this.on) {
        this.snapTop = false;
        this.snapLeft = false;
      }
    },
    setResizeSnap(e: MouseEvent, id: string) {
      const squareStore = useSquareStore();
      const resizeStore = useResizeStore();
      const selectToi = useCounterStore();
      const clientX = e.clientX;
      const clientY = e.clientY;

      let unit = "px";

      let snapLinesCopy = {} as LineResize;

      if (!useCheckParent(id)) {
        if (this.on) {
          let selectedSiblingsCopy = [] as HTMLElement[];
          let siblings = [
            ...document.querySelector(`[data-id=${id}]`)!.parentElement!
              .children,
          ] as HTMLElement[];
          this.siblings = siblings.filter(
            (el) => el.dataset.id !== id
          ) as HTMLElement[];

          this.siblings.forEach((i) => {
            let siblingRect = i.getBoundingClientRect();
            let siblingTop = siblingRect.y;
            let siblingMiddleY = siblingRect.y + siblingRect.height / 2;
            let siblingBottom = siblingRect.y + siblingRect.height;
            let siblingLeft = siblingRect.x;
            let siblingMiddleX = siblingRect.x + siblingRect.width / 2;
            let siblingRight = siblingRect.x + siblingRect.width;

            if (
              (clientY < siblingTop + 5 && clientY > siblingTop - 5) ||
              (clientY < siblingBottom + 5 && clientY > siblingBottom - 5) ||
              (clientY < siblingBottom + 5 && clientY > siblingBottom - 5) ||
              (clientX < siblingLeft + 5 && clientX > siblingLeft - 5) ||
              (clientX < siblingMiddleX + 5 && clientX > siblingMiddleX - 5) ||
              (clientX < siblingRight + 5 && clientX > siblingRight - 5)
            ) {
              if (!resizeStore.isResizingLeft || !resizeStore.isResizingRight) {
                //clientY to top
                if (clientY < siblingTop + 5 && clientY > siblingTop - 5) {
                  if (
                    !snapLinesCopy.lineY ||
                    (snapLinesCopy.lineY &&
                      clientY - snapLinesCopy.lineY > clientY - siblingTop)
                  ) {
                    snapLinesCopy.lineY = siblingTop;
                  }
                }
                //clientY to middleY
                if (
                  clientY < siblingMiddleY + 5 &&
                  clientY > siblingMiddleY - 5
                ) {
                  if (
                    !snapLinesCopy.lineY ||
                    (snapLinesCopy.lineY &&
                      clientY - snapLinesCopy.lineY > clientY - siblingMiddleY)
                  ) {
                    snapLinesCopy.lineY = siblingMiddleY;
                  }
                }
                //clientY to bottom
                if (
                  clientY < siblingBottom + 5 &&
                  clientY > siblingBottom - 5
                ) {
                  if (
                    !snapLinesCopy.lineY ||
                    (snapLinesCopy.lineY &&
                      clientY - snapLinesCopy.lineY > clientY - siblingBottom)
                  ) {
                    snapLinesCopy.lineY = siblingBottom;
                  }
                }
              }

              if (!resizeStore.isResizingTop || !resizeStore.isResizingBottom) {
                //clientX to left
                if (clientX < siblingLeft + 5 && clientX > siblingLeft - 5) {
                  if (
                    !snapLinesCopy.lineX ||
                    (snapLinesCopy.lineX &&
                      clientX - snapLinesCopy.lineX > clientX - siblingLeft)
                  ) {
                    snapLinesCopy.lineX = siblingLeft;
                  }
                }
                //clientX to middleX
                if (
                  clientX < siblingMiddleX + 5 &&
                  clientX > siblingMiddleX - 5
                ) {
                  if (
                    !snapLinesCopy.lineX ||
                    (snapLinesCopy.lineX &&
                      clientX - snapLinesCopy.lineX > clientX - siblingMiddleX)
                  ) {
                    snapLinesCopy.lineX = siblingMiddleX;
                  }
                }
                //clientX to right
                if (clientX < siblingRight + 5 && clientX > siblingRight - 5) {
                  if (
                    !snapLinesCopy.lineX ||
                    (snapLinesCopy.lineX &&
                      clientX - snapLinesCopy.lineX > clientX - siblingRight)
                  ) {
                    snapLinesCopy.lineX = siblingRight;
                  }
                }
              }
              selectedSiblingsCopy.push(i);
            } else return;
          });

          if (snapLinesCopy.lineX || snapLinesCopy.lineY) {
            this.show = true;
            //resize top
            if (resizeStore.isResizingTop) {
              this.snapTop = true;
              this.snapHeight = true;
              this.snapWidth = false;
              this.snapLeft = false;

              changeTop(
                Math.round(
                  (snapLinesCopy.lineY - squareStore.offsetTop) /
                    squareStore.scale
                )
              );

              changeHeight(
                Math.round(
                  resizeStore.prevTop +
                    resizeStore.prevHeight -
                    (snapLinesCopy.lineY - squareStore.offsetTop) /
                      squareStore.scale
                )
              );
              let snapLinesCopy2 = {
                lineTop: snapLinesCopy.lineY,
              };
              this.snapLines = { ...snapLinesCopy2 };
            }
            //resize bottom
            else if (resizeStore.isResizingBottom) {
              this.snapTop = false;
              this.snapHeight = true;
              this.snapWidth = false;
              this.snapLeft = false;

              changeHeight(
                Math.round(
                  (snapLinesCopy.lineY - squareStore.offsetTop) /
                    squareStore.scale -
                    resizeStore.prevTop
                )
              );

              let snapLinesCopy2 = {
                lineBottom: snapLinesCopy.lineY,
              };
              this.snapLines = { ...snapLinesCopy2 };
            }
            //resize left
            else if (resizeStore.isResizingLeft) {
              this.snapTop = false;
              this.snapHeight = false;
              this.snapWidth = true;
              this.snapLeft = true;

              changeLeft(
                Math.round(
                  (snapLinesCopy.lineX - squareStore.offsetLeft) /
                    squareStore.scale
                ),
                unit
              );

              changeWidth(
                Math.round(
                  resizeStore.prevLeft +
                    resizeStore.prevWidth -
                    (snapLinesCopy.lineX - squareStore.offsetLeft) /
                      squareStore.scale
                ),
                unit
              );

              let snapLinesCopy2 = {
                lineLeft: snapLinesCopy.lineX,
              };
              this.snapLines = { ...snapLinesCopy2 };
            }
            //resize right
            else if (resizeStore.isResizingRight) {
              this.snapTop = false;
              this.snapHeight = false;
              this.snapWidth = true;
              this.snapLeft = false;

              changeWidth(
                Math.round(
                  (snapLinesCopy.lineX - squareStore.offsetLeft) /
                    squareStore.scale -
                    resizeStore.prevLeft
                ),
                unit
              );

              let snapLinesCopy2 = {
                lineRight: snapLinesCopy.lineX,
              };
              this.snapLines = { ...snapLinesCopy2 };
            }
            //resize top left
            else if (resizeStore.isResizingTopLeft) {
              if (snapLinesCopy.lineX) {
                this.snapWidth = true;
                this.snapLeft = true;

                changeLeft(
                  Math.round(
                    (snapLinesCopy.lineX - squareStore.offsetLeft) /
                      squareStore.scale
                  ),
                  unit
                );

                changeWidth(
                  Math.round(
                    resizeStore.prevLeft +
                      resizeStore.prevWidth -
                      (snapLinesCopy.lineX - squareStore.offsetLeft) /
                        squareStore.scale
                  )
                );

                if (!snapLinesCopy.lineY) {
                  this.snapHeight = false;
                  this.snapTop = false;
                }
              }
              if (snapLinesCopy.lineY) {
                this.snapHeight = true;
                this.snapTop = true;

                changeTop(
                  Math.round(
                    (snapLinesCopy.lineY - squareStore.offsetTop) /
                      squareStore.scale
                  ),
                  unit
                );

                changeHeight(
                  Math.round(
                    resizeStore.prevTop +
                      resizeStore.prevHeight -
                      (snapLinesCopy.lineY - squareStore.offsetTop) /
                        squareStore.scale
                  ),
                  unit
                );

                if (!snapLinesCopy.lineX) {
                  this.snapWidth = false;
                  this.snapLeft = false;
                }
              }
              let snapLinesCopy2 = {
                lineTop: snapLinesCopy.lineY,
                lineLeft: snapLinesCopy.lineX,
              };
              this.snapLines = { ...snapLinesCopy2 };
            }
            //resize top right
            else if (resizeStore.isResizingTopRight) {
              this.snapLeft = false;
              if (snapLinesCopy.lineX) {
                this.snapWidth = true;

                changeWidth(
                  Math.round(
                    (snapLinesCopy.lineX - squareStore.offsetLeft) /
                      squareStore.scale -
                      resizeStore.prevLeft
                  )
                );

                if (!snapLinesCopy.lineY) {
                  this.snapHeight = false;
                  this.snapTop = false;
                }
              }
              if (snapLinesCopy.lineY) {
                this.snapHeight = true;
                this.snapTop = true;

                changeTop(
                  Math.round(
                    (snapLinesCopy.lineY - squareStore.offsetTop) /
                      squareStore.scale
                  ),
                  unit
                );

                changeHeight(
                  Math.round(
                    resizeStore.prevTop +
                      resizeStore.prevHeight -
                      (snapLinesCopy.lineY - squareStore.offsetTop) /
                        squareStore.scale
                  ),
                  unit
                );

                if (!snapLinesCopy.lineX) {
                  this.snapWidth = false;
                }
              }
              let snapLinesCopy2 = {
                lineTop: snapLinesCopy.lineY,
                lineRight: snapLinesCopy.lineX,
              };
              this.snapLines = { ...snapLinesCopy2 };
            }
            //resize bottom left
            else if (resizeStore.isResizingBottomLeft) {
              this.snapTop = false;
              if (snapLinesCopy.lineX) {
                this.snapWidth = true;
                this.snapLeft = true;

                changeLeft(
                  Math.round(
                    (snapLinesCopy.lineX - squareStore.offsetLeft) /
                      squareStore.scale
                  )
                );

                changeWidth(
                  Math.round(
                    resizeStore.prevLeft +
                      resizeStore.prevWidth -
                      (snapLinesCopy.lineX - squareStore.offsetLeft) /
                        squareStore.scale
                  )
                );

                if (!snapLinesCopy.lineY) {
                  this.snapHeight = false;
                }
              }
              if (snapLinesCopy.lineY) {
                this.snapHeight = true;

                changeHeight(
                  Math.round(
                    (snapLinesCopy.lineY - squareStore.offsetTop) /
                      squareStore.scale -
                      resizeStore.prevTop
                  )
                );

                if (!snapLinesCopy.lineX) {
                  this.snapWidth = false;
                  this.snapLeft = false;
                }
              }
              let snapLinesCopy2 = {
                lineBottom: snapLinesCopy.lineY,
                lineLeft: snapLinesCopy.lineX,
              };
              this.snapLines = { ...snapLinesCopy2 };
            }
            //resize bottom right
            else if (resizeStore.isResizingBottomRight) {
              this.snapLeft = false;
              this.snapTop = false;
              if (snapLinesCopy.lineX) {
                this.snapWidth = true;

                changeWidth(
                  Math.round(
                    (snapLinesCopy.lineX - squareStore.offsetLeft) /
                      squareStore.scale -
                      resizeStore.prevLeft
                  )
                );

                if (!snapLinesCopy.lineY) {
                  this.snapHeight = false;
                }
              }
              if (snapLinesCopy.lineY) {
                this.snapHeight = true;

                changeHeight(
                  Math.round(
                    (snapLinesCopy.lineY - squareStore.offsetTop) /
                      squareStore.scale -
                      resizeStore.prevTop
                  )
                );

                if (!snapLinesCopy.lineX) {
                  this.snapWidth = false;
                }
              }
              let snapLinesCopy2 = {
                lineBottom: snapLinesCopy.lineY,
                lineRight: snapLinesCopy.lineX,
              };
              this.snapLines = { ...snapLinesCopy2 };
            }
            this.selectedSiblings = [...selectedSiblingsCopy];
            this.setSiblingsPoints(id);
          }
          if (!snapLinesCopy.lineX && !snapLinesCopy.lineY) {
            this.show = false;
            this.snapHeight = false;
            this.snapWidth = false;
            this.snapTop = false;
            this.snapLeft = false;
          }
        }
        if (!this.on) {
          this.snapTop = false;
          this.snapLeft = false;
          this.snapHeight = false;
          this.snapWidth = false;
        }
      }
      if (useCheckParent(id)) {
        this.snapTop = false;
        this.snapLeft = false;
        this.snapHeight = false;
        this.snapWidth = false;
      }
    },
  },
});
