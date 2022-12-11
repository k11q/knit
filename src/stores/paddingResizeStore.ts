import { defineStore } from "pinia";
import { useSquareStore } from "./dataSquare";
import { useCounterStore } from "./counter";

export type GapPosition = {
  top?: number;
  height?: number;
  left?: number;
  width?: number;
};

type PaddingResize = {
  showPaddingResizer: boolean;
  isResizing: boolean;
  currentResizing: string;
  topResizerHeight: number;
  bottomResizerHeight: number;
  leftResizerWidth: number;
  rightResizerWidth: number;
  gap: GapPosition[];
};

export const usePaddingResizeStore = defineStore({
  id: "paddingResize",
  state: () =>
    ({
      showPaddingResizer: false,
      isResizing: false,
      currentResizing: "",
      gap: [] as GapPosition[],
    } as PaddingResize),
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
      const squareStore = useSquareStore();

      let element = useGetElement(id) as HTMLElement;
      let elementRect = element.getBoundingClientRect();
      if (element?.children) {
        let children = [...element.children] as HTMLElement[];
        let staticChildren = children.filter(
          (i) => i.style.position === "static"
        );

        let paddingLeft: number;
        let paddingRight: number;
        let paddingTop: number;
        let paddingBottom: number;
        let gap: number;

        if (element.style.paddingLeft) {
          paddingLeft = parseInt(element.style.paddingLeft);
        } else paddingLeft = 0;
        if (element.style.paddingRight) {
          paddingRight = parseInt(element.style.paddingRight);
        } else paddingRight = 0;
        if (element.style.paddingTop) {
          paddingTop = parseInt(element.style.paddingTop);
        } else paddingTop = 0;
        if (element.style.paddingBottom) {
          paddingBottom = parseInt(element.style.paddingBottom);
        } else paddingBottom = 0;

        if (getGap()) {
          gap = getGap() as number;
        } else gap = 0;

        let gapsClone = [] as GapPosition[];
        this.gap = [] as GapPosition[];

        if (staticChildren.length) {
          if (element.style.flexDirection === "column") {
            staticChildren.forEach((i, index) => {
              if (index !== staticChildren.length - 1) {
                let rect = i.getBoundingClientRect();
                let bottom = i.offsetTop + i.offsetHeight;

                gapsClone.push({
                  top: bottom,
                  left: paddingLeft,
                  width:
                    elementRect.width / squareStore.scale -
                    paddingLeft -
                    paddingRight,
                  height: gap,
                });
              }
            });
            this.gap = [...gapsClone];
          } else if (
            !element.style.flexDirection ||
            element.style.flexDirection === "row"
          ) {
            staticChildren.forEach((i, index) => {
              if (index !== staticChildren.length - 1) {
                let rect = i.getBoundingClientRect();
                let right = i.offsetLeft + i.offsetWidth;

                gapsClone.push({
                  top: paddingTop,
                  left: right,
                  width: gap,
                  height:
                    elementRect.height / squareStore.scale -
                    paddingTop -
                    paddingBottom,
                });
              }
            });
            this.gap = [...gapsClone];
          }
        }
      }
    },
  },
});
