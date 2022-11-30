import { defineStore } from "pinia";
import { useSquareStore } from "@/stores/dataSquare";
import { useCounterStore } from "@/stores/counter";
import { usePaddingResizeStore } from "./paddingResizeStore";

export const useNewFrameStore = defineStore({
  id: "newFrameStore",
  state: () => ({
    countBox: 1,
    show: false,
    X: NaN,
    Y: NaN,
    width: NaN,
    height: NaN,
    dataFrame: {
      id: "",
      name: "",
      type: "div",
      attr: {
        style: {
          left: "",
          top: "",
          display: "flex",
          backgroundColor: "white",
          height: "",
          width: "",
          position: "absolute",
        },
      },
      children: [],
    },
  }),
  actions: {
    setNewFrame(e: MouseEvent, dataPushed: any) {
      const selectToi = useCounterStore();
      const newFrameStore = useNewFrameStore();
      const squareStore = useSquareStore();
      const paddingResize = usePaddingResizeStore();
      const uid = () =>
        String(Date.now().toString(32) + Math.random().toString(16)).replace(
          /\./g,
          ""
        );

      const prevX = Math.round(
        (e.clientX - squareStore.offsetLeft) / squareStore.scale
      );
      const prevY = Math.round(
        (e.clientY - squareStore.offsetTop) / squareStore.scale
      );

      newFrameStore.X = prevX;
      newFrameStore.Y = prevY;

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e: MouseEvent) {
        newFrameStore.show = true;

        let positionX = Math.round(
          (e.clientX - squareStore.offsetLeft) / squareStore.scale
        );
        let positionY = Math.round(
          (e.clientY - squareStore.offsetTop) / squareStore.scale
        );

        let positiveWidth = positionX - prevX;
        let positiveHeight = positionY - prevY;

        if (positiveWidth == 0 && positiveHeight == 0) {
          newFrameStore.width = 0;
          newFrameStore.height = 0;
          newFrameStore.X = prevX;
          newFrameStore.Y = prevY;
        }

        if (positiveWidth > 0 && positiveHeight > 0) {
          newFrameStore.X = prevX;
          newFrameStore.Y = prevY;

          newFrameStore.width = positionX - prevX;
          newFrameStore.height = positionY - prevY;
        }

        if (positiveWidth < 0 && positiveHeight > 0) {
          newFrameStore.Y = prevY;
          newFrameStore.height = positionY - prevY;

          newFrameStore.X = positionX;
          newFrameStore.width = prevX - positionX;
        }

        if (positiveWidth > 0 && positiveHeight < 0) {
          newFrameStore.X = prevX;
          newFrameStore.width = positionX - prevX;

          newFrameStore.height = prevY - positionY;
          newFrameStore.Y = positionY;
        }

        if (positiveWidth < 0 && positiveHeight < 0) {
          newFrameStore.height = prevY - positionY;
          newFrameStore.width = prevX - positionX;
          newFrameStore.X = positionX;
          newFrameStore.Y = positionY;
        }
      }
      function mouseup(e: MouseEvent) {
        if (newFrameStore.show) {
          newFrameStore.dataFrame.name = "frame" + newFrameStore.countBox;
          newFrameStore.dataFrame.id = useGetRandomLetter() + uid();
          newFrameStore.dataFrame.attr.style.left = newFrameStore.X + "px";
          newFrameStore.dataFrame.attr.style.top = newFrameStore.Y + "px";
          newFrameStore.dataFrame.attr.style.width = newFrameStore.width + "px";
          newFrameStore.dataFrame.attr.style.height =
            newFrameStore.height + "px";
          newFrameStore.dataFrame.children = [];
          let clonedDataFrame = { ...newFrameStore.dataFrame };
          clonedDataFrame.attr = { ...newFrameStore.dataFrame.attr };
          clonedDataFrame.attr.style = {
            ...newFrameStore.dataFrame.attr.style,
          };

          Promise.resolve()
            .then(() => {
              dataPushed.push({ ...clonedDataFrame });
              selectToi.changeSelectedNewlyAdded(event, clonedDataFrame);
            })
            .then(() => {
              useSetOutlineSelector(clonedDataFrame.id);
              paddingResize.setResizerSize(clonedDataFrame.id);
            });
          squareStore.turnOnNormalPointer();
          newFrameStore.countBox = newFrameStore.countBox + 1;
        }
        newFrameStore.X = NaN;
        newFrameStore.Y = NaN;
        newFrameStore.width = 0;
        newFrameStore.height = 0;
        newFrameStore.show = false;

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    },
  },
});
