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
    setResizerSize(id: string) {
      const selectToi = useCounterStore();

      if (selectToi.selectedBoxData) {
        let element = useGetElement(
          selectToi.selectedBoxData.id
        ) as HTMLElement;

        this.topResizerHeight = parseInt(element?.style?.paddingTop);
        this.bottomResizerHeight = parseInt(element?.style?.paddingBottom);
        this.leftResizerWidth = parseInt(element?.style?.paddingLeft);
        this.rightResizerWidth = parseInt(element?.style?.paddingRight);
      }
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
  },
});
