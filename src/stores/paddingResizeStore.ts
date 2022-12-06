import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCounterStore } from "./counter";

export type GapPosition = {
  top: number;
  bottom?: number;
  height?: number;
  left: number;
  right: number;
  width?: number;
};

export const usePaddingResizeStore = defineStore({
  id: "paddingResize",
  state: () => ({
    showPaddingResizer: false,
    isResizing: false,
    currentResizing: "",
    topResizerHeight: NaN,
    bottomResizerHeight: NaN,
    leftResizerWidth: NaN,
    rightResizerWidth: NaN,
    gap: [] as GapPosition[],
  }),
  actions: {
    setShowPaddingResizer() {
      this.showPaddingResizer = true;
    },
    setResizerSize(id: string) {
      const selectToi = useCounterStore();

      this.topResizerHeight = parseInt(
        useGetElement(selectToi.selectedBoxData.id)?.style?.paddingTop
      );
      this.bottomResizerHeight = parseInt(
        useGetElement(selectToi.selectedBoxData.id)?.style?.paddingBottom
      );
      this.leftResizerWidth = parseInt(
        useGetElement(selectToi.selectedBoxData.id)?.style?.paddingLeft
      );
      this.rightResizerWidth = parseInt(
        useGetElement(selectToi.selectedBoxData.id)?.style?.paddingRight
      );
    },
    setGap(id: string) {
      let element = useGetElement(id) as HTMLElement;
      if (element.children) {
        let children = [...element.children] as HTMLElement[];
        let staticChildren = children.filter(
          (i) => i.style.position === "static"
        );

        let paddingLeft: number;
        let paddingRight: number;
        let gap: number;

        if (element.style.paddingLeft) {
          paddingLeft = parseInt(element.style.paddingLeft);
        } else paddingLeft = 0;
        if (element.style.paddingRight) {
          paddingRight = parseInt(element.style.paddingRight);
        } else paddingRight = 0;
        if (getGap()) {
          gap = getGap() as number;
        } else gap = 0;

        let gapsClone = [] as GapPosition[];
        this.gap = [] as GapPosition[];

        if (staticChildren.length) {
          staticChildren.forEach((i, index) => {
            if (index !== staticChildren.length - 1) {
              let rect = i.getBoundingClientRect();
              let bottom = i.offsetTop + i.offsetHeight;

              gapsClone.push({
                top: bottom,
                left: paddingLeft,
                right: paddingRight,
                height: gap,
              });
            }
          });
          this.gap = [...gapsClone];
        }
      }
    },
    resizePaddingRight(e: MouseEvent) {
      const paddingResize = usePaddingResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();
        this.currentResizing = "right";

        let prevPaddingRight =
          parseInt(
            useGetElement(selectToi.selectedBoxData.id)!.style?.paddingRight
          ) || 0;

        let prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          if (
            !selectToi.selectedBoxData.attr.style.paddingRight ||
            parseInt(
              useGetElement(selectToi.selectedBoxData.id)!.style?.paddingRight
            ) >= 0
          ) {
            paddingResize.rightResizerWidth = Math.round(
              prevPaddingRight / 2 +
                (prevPaddingRight / 2 + (prevX - e.clientX) / squareStore.scale)
            );
            selectToi.selectedBoxData.attr.style.paddingRight =
              paddingResize.rightResizerWidth + "px";
          }
          if (
            parseInt(selectToi.selectedBoxData.attr.style.paddingRight) <= 0
          ) {
            paddingResize.rightResizerWidth = 0;
            selectToi.selectedBoxData.attr.style.paddingRight = "0px";
          }
        }

        function mouseup() {
          paddingResize.isResizing = false;
          paddingResize.currentResizing = "";
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizePaddingLeft(e: MouseEvent) {
      const paddingResize = usePaddingResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();
        this.currentResizing = "left";

        let prevPaddingLeft =
          parseInt(selectToi.selectedBoxData.attr.style.paddingLeft) || 0;

        let prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          if (
            !selectToi.selectedBoxData.attr.style.paddingLeft ||
            parseInt(selectToi.selectedBoxData.attr.style.paddingLeft) >= 0
          ) {
            paddingResize.leftResizerWidth = Math.round(
              prevPaddingLeft / 2 +
                (prevPaddingLeft / 2 + (e.clientX - prevX) / squareStore.scale)
            );
            selectToi.selectedBoxData.attr.style.paddingLeft =
              paddingResize.leftResizerWidth + "px";
          }
          if (parseInt(selectToi.selectedBoxData.attr.style.paddingLeft) <= 0) {
            paddingResize.leftResizerWidth = 0;
            selectToi.selectedBoxData.attr.style.paddingLeft = "0px";
          }
        }

        function mouseup() {
          paddingResize.isResizing = false;
          paddingResize.currentResizing = "";
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizePaddingTop(e: MouseEvent) {
      const paddingResize = usePaddingResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();
        this.currentResizing = "top";

        let prevPaddingTop =
          parseInt(selectToi.selectedBoxData.attr.style.paddingTop) || 0;

        let prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          if (
            !selectToi.selectedBoxData.attr.style.paddingTop ||
            parseInt(selectToi.selectedBoxData.attr.style.paddingTop) >= 0
          ) {
            paddingResize.topResizerHeight = Math.round(
              prevPaddingTop / 2 +
                (prevPaddingTop / 2 + (e.clientY - prevY) / squareStore.scale)
            );
            selectToi.selectedBoxData.attr.style.paddingTop =
              paddingResize.topResizerHeight + "px";
          }
          if (parseInt(selectToi.selectedBoxData.attr.style.paddingTop) <= 0) {
            paddingResize.topResizerHeight = 0;
            selectToi.selectedBoxData.attr.style.paddingTop = "0px";
          }
        }
        function mouseup() {
          paddingResize.isResizing = false;
          paddingResize.currentResizing = "";
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
    resizePaddingBottom(e: MouseEvent) {
      const paddingResize = usePaddingResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();
        this.currentResizing = "bottom";

        let prevPaddingBottom =
          parseInt(selectToi.selectedBoxData.attr.style.paddingBottom) || 0;

        let prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          if (
            !selectToi.selectedBoxData.attr.style.paddingBottom ||
            parseInt(selectToi.selectedBoxData.attr.style.paddingBottom) >= 0
          ) {
            paddingResize.bottomResizerHeight = Math.round(
              prevPaddingBottom / 2 +
                (prevPaddingBottom / 2 +
                  (prevY - e.clientY) / squareStore.scale)
            );
            selectToi.selectedBoxData.attr.style.paddingBottom =
              paddingResize.bottomResizerHeight + "px";
          }
          if (
            parseInt(selectToi.selectedBoxData.attr.style.paddingBottom) <= 0
          ) {
            paddingResize.bottomResizerHeight = 0;
            selectToi.selectedBoxData.attr.style.paddingBottom = "0px";
          }
        }

        function mouseup() {
          paddingResize.isResizing = false;
          paddingResize.currentResizing = "";
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    },
  },
});
