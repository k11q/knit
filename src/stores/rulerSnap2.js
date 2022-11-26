import { defineStore } from "pinia";

export const useRulerSnap2Store = defineStore({
  id: "rulerSnap2",
  state: () => ({
    show: false,
    currDragPoints: {},
    displayedPoints: {},
    siblings: [],
    siblingsPoints: [],
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

        rulerSnap.siblingsPoints.every((sibling) => {
          if (
            (topLeft.x < sibling.topLeft?.x + 4 &&
              topLeft.x > sibling.topLeft?.x - 4) ||
            (topLeft.x < sibling.topMiddle?.x + 4 &&
              topLeft.x > sibling.topMiddle?.x - 4) ||
            (topLeft.x < sibling.topRight?.x + 4 &&
              topLeft.x > sibling.topRight?.x - 4) ||
            (topLeft.y < sibling.topLeft?.y + 4 &&
              topLeft.y > sibling.topLeft?.y - 4) ||
            (topLeft.y < sibling.middleLeft?.y + 4 &&
              topLeft.y > sibling.middleLeft?.y - 4) ||
            (topLeft.y < sibling.bottomLeft?.y + 4 &&
              topLeft.y > sibling.bottomLeft?.y - 4)
          ) {
            topLeft.display = true;
            return false;
          } else {
            topLeft.display = false;
            return true;
          }
        });
        rulerSnap.siblingsPoints.every((sibling) => {
          if (
            (topMiddle.x < sibling.topLeft?.x + 4 &&
              topMiddle.x > sibling.topLeft?.x - 4) ||
            (topMiddle.x < sibling.topMiddle?.x + 4 &&
              topMiddle.x > sibling.topMiddle?.x - 4) ||
            (topMiddle.x < sibling.topRight?.x + 4 &&
              topMiddle.x > sibling.topRight?.x - 4) ||
            (topMiddle.y < sibling.topLeft?.y + 4 &&
              topMiddle.y > sibling.topLeft?.y - 4) ||
            (topMiddle.y < sibling.middleLeft?.y + 4 &&
              topMiddle.y > sibling.middleLeft?.y - 4) ||
            (topMiddle.y < sibling.bottomLeft?.y + 4 &&
              topMiddle.y > sibling.bottomLeft?.y - 4)
          ) {
            topMiddle.display = true;
            return false;
          } else {
            topMiddle.display = false;
            return true;
          }
        });
        rulerSnap.siblingsPoints.every((sibling) => {
          if (
            (topRight.x < sibling.topLeft?.x + 4 &&
              topRight.x > sibling.topLeft?.x - 4) ||
            (topRight.x < sibling.topMiddle?.x + 4 &&
              topRight.x > sibling.topMiddle?.x - 4) ||
            (topRight.x < sibling.topRight?.x + 4 &&
              topRight.x > sibling.topRight?.x - 4) ||
            (topRight.y < sibling.topLeft?.y + 4 &&
              topRight.y > sibling.topLeft?.y - 4) ||
            (topRight.y < sibling.middleLeft?.y + 4 &&
              topRight.y > sibling.middleLeft?.y - 4) ||
            (topRight.y < sibling.bottomLeft?.y + 4 &&
              topRight.y > sibling.bottomLeft?.y - 4)
          ) {
            topRight.display = true;
            return false;
          } else {
            topRight.display = false;
            return true;
          }
        });
        rulerSnap.siblingsPoints.every((sibling) => {
          if (
            (middleLeft.x < sibling.topLeft?.x + 4 &&
              middleLeft.x > sibling.topLeft?.x - 4) ||
            (middleLeft.x < sibling.topMiddle?.x + 4 &&
              middleLeft.x > sibling.topMiddle?.x - 4) ||
            (middleLeft.x < sibling.topRight?.x + 4 &&
              middleLeft.x > sibling.topRight?.x - 4) ||
            (middleLeft.y < sibling.topLeft?.y + 4 &&
              middleLeft.y > sibling.topLeft?.y - 4) ||
            (middleLeft.y < sibling.middleLeft?.y + 4 &&
              middleLeft.y > sibling.middleLeft?.y - 4) ||
            (middleLeft.y < sibling.bottomLeft?.y + 4 &&
              middleLeft.y > sibling.bottomLeft?.y - 4)
          ) {
            middleLeft.display = true;
            return false;
          } else {
            middleLeft.display = false;
            return true;
          }
        });
        rulerSnap.siblingsPoints.every((sibling) => {
          if (
            (middle.x < sibling.topLeft?.x + 4 &&
              middle.x > sibling.topLeft?.x - 4) ||
            (middle.x < sibling.topMiddle?.x + 4 &&
              middle.x > sibling.topMiddle?.x - 4) ||
            (middle.x < sibling.topRight?.x + 4 &&
              middle.x > sibling.topRight?.x - 4) ||
            (middle.y < sibling.topLeft?.y + 4 &&
              middle.y > sibling.topLeft?.y - 4) ||
            (middle.y < sibling.middleLeft?.y + 4 &&
              middle.y > sibling.middleLeft?.y - 4) ||
            (middle.y < sibling.bottomLeft?.y + 4 &&
              middle.y > sibling.bottomLeft?.y - 4)
          ) {
            middle.display = true;
            return false;
          } else {
            middle.display = false;
            return true;
          }
        });
        rulerSnap.siblingsPoints.every((sibling) => {
          if (
            (middleRight.x < sibling.topLeft?.x + 4 &&
              middleRight.x > sibling.topLeft?.x - 4) ||
            (middleRight.x < sibling.topMiddle?.x + 4 &&
              middleRight.x > sibling.topMiddle?.x - 4) ||
            (middleRight.x < sibling.topRight?.x + 4 &&
              middleRight.x > sibling.topRight?.x - 4) ||
            (middleRight.y < sibling.topLeft?.y + 4 &&
              middleRight.y > sibling.topLeft?.y - 4) ||
            (middleRight.y < sibling.middleLeft?.y + 4 &&
              middleRight.y > sibling.middleLeft?.y - 4) ||
            (middleRight.y < sibling.bottomLeft?.y + 4 &&
              middleRight.y > sibling.bottomLeft?.y - 4)
          ) {
            middleRight.display = true;
            return false;
          } else {
            middleRight.display = false;
            return true;
          }
        });
        rulerSnap.siblingsPoints.every((sibling) => {
          if (
            (bottomLeft.x < sibling.topLeft?.x + 4 &&
              bottomLeft.x > sibling.topLeft?.x - 4) ||
            (bottomLeft.x < sibling.topMiddle?.x + 4 &&
              bottomLeft.x > sibling.topMiddle?.x - 4) ||
            (bottomLeft.x < sibling.topRight?.x + 4 &&
              bottomLeft.x > sibling.topRight?.x - 4) ||
            (bottomLeft.y < sibling.topLeft?.y + 4 &&
              bottomLeft.y > sibling.topLeft?.y - 4) ||
            (bottomLeft.y < sibling.middleLeft?.y + 4 &&
              bottomLeft.y > sibling.middleLeft?.y - 4) ||
            (bottomLeft.y < sibling.bottomLeft?.y + 4 &&
              bottomLeft.y > sibling.bottomLeft?.y - 4)
          ) {
            bottomLeft.display = true;
            return false;
          } else {
            bottomLeft.display = false;
            return true;
          }
        });
        rulerSnap.siblingsPoints.every((sibling) => {
          if (
            (bottomMiddle.x < sibling.topLeft?.x + 4 &&
              bottomMiddle.x > sibling.topLeft?.x - 4) ||
            (bottomMiddle.x < sibling.topMiddle?.x + 4 &&
              bottomMiddle.x > sibling.topMiddle?.x - 4) ||
            (bottomMiddle.x < sibling.topRight?.x + 4 &&
              bottomMiddle.x > sibling.topRight?.x - 4) ||
            (bottomMiddle.y < sibling.topLeft?.y + 4 &&
              bottomMiddle.y > sibling.topLeft?.y - 4) ||
            (bottomMiddle.y < sibling.middleLeft?.y + 4 &&
              bottomMiddle.y > sibling.middleLeft?.y - 4) ||
            (bottomMiddle.y < sibling.bottomLeft?.y + 4 &&
              bottomMiddle.y > sibling.bottomLeft?.y - 4)
          ) {
            bottomMiddle.display = true;
            return false;
          } else {
            bottomMiddle.display = false;
            return true;
          }
        });
        rulerSnap.siblingsPoints.every((sibling) => {
          if (
            (bottomRight.x < sibling.topLeft?.x + 4 &&
              bottomRight.x > sibling.topLeft?.x - 4) ||
            (bottomRight.x < sibling.topMiddle?.x + 4 &&
              bottomRight.x > sibling.topMiddle?.x - 4) ||
            (bottomRight.x < sibling.topRight?.x + 4 &&
              bottomRight.x > sibling.topRight?.x - 4) ||
            (bottomRight.y < sibling.topLeft?.y + 4 &&
              bottomRight.y > sibling.topLeft?.y - 4) ||
            (bottomRight.y < sibling.middleLeft?.y + 4 &&
              bottomRight.y > sibling.middleLeft?.y - 4) ||
            (bottomRight.y < sibling.bottomLeft?.y + 4 &&
              bottomRight.y > sibling.bottomLeft?.y - 4)
          ) {
            bottomRight.display = true;
            return false;
          } else {
            bottomRight.display = false;
            return true;
          }
        });

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
    getSiblingsPoints(id) {
      this.siblings = [
        ...document.querySelector(`[data-id=${id}]`).parentElement.children,
      ].filter((el) => el.dataset.id !== id);
      console.log("siblings" + this.siblings);
    },
    setSiblingsPoints(id) {
      let siblingPointsCopy = [];

      this.siblings = [
        ...document.querySelector(`[data-id=${id}]`).parentElement.children,
      ].filter((el) => el.dataset.id !== id);

      this.siblings.forEach((i) => {
        let siblingRect = i.getBoundingClientRect();
        let topLeft = { x: siblingRect.x, y: siblingRect.y };
        let topMiddle = {
          x: siblingRect.x + siblingRect.width / 2,
          y: siblingRect.y,
        };
        let topRight = {
          x: siblingRect.x + siblingRect.width,
          y: siblingRect.y,
        };
        let middleLeft = {
          x: siblingRect.x,
          y: siblingRect.y + siblingRect.height / 2,
        };
        let middle = {
          x: siblingRect.x + siblingRect.width / 2,
          y: siblingRect.y + siblingRect.height / 2,
        };
        let middleRight = {
          x: siblingRect.x + siblingRect.width,
          y: siblingRect.y + siblingRect.height / 2,
        };
        let bottomLeft = {
          x: siblingRect.x,
          y: siblingRect.y + siblingRect.height,
        };
        let bottomMiddle = {
          x: siblingRect.x + siblingRect.width / 2,
          y: siblingRect.y + siblingRect.height,
        };
        let bottomRight = {
          x: siblingRect.x + siblingRect.width,
          y: siblingRect.y + siblingRect.height,
        };

        siblingPointsCopy.push({
          topLeft: topLeft,
          topMiddle: topMiddle,
          topRight: topRight,
          middleLeft: middleLeft,
          middle: middle,
          middleRight: middleRight,
          bottomLeft: bottomLeft,
          bottomMiddle: bottomMiddle,
          bottomRight: bottomRight,
        });
      });
      this.siblingsPoints = [...siblingPointsCopy];
      console.log("sbpoints =" + this.siblingsPoints);
    },
    setShowPointer(x, y) {
      if (
        (this.currDragPoints?.topLeft?.x < x + 4 &&
          this.currDragPoints?.topLeft?.x > x - 4) ||
        (this.currDragPoints?.topMiddle?.x < x + 4 &&
          this.currDragPoints?.topMiddle?.x > x - 4) ||
        (this.currDragPoints?.topRight?.x < x + 4 &&
          this.currDragPoints?.topRight?.x > x - 4) ||
        (this.currDragPoints?.topLeft?.y < y + 4 &&
          this.currDragPoints?.topLeft?.y > y - 4) ||
        (this.currDragPoints?.middleLeft?.y < y + 4 &&
          this.currDragPoints?.middleLeft?.y > y - 4) ||
        (this.currDragPoints?.bottomLeft?.y < y + 4 &&
          this.currDragPoints?.bottomLeft?.y > y - 4)
      ) {
        return true;
      } else return false;
    },
  },
});
