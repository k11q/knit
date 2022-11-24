import { defineStore } from "pinia";
import { useSquareStore } from "@/stores/dataSquare";
import { useCounterStore } from "@/stores/counter";

export const useNewSquareStore = defineStore({
  id: "newSquareStore",
  state: () => ({
    countBox: 1,
    show: false,
    X: NaN,
    Y: NaN,
    width: NaN,
    height: NaN,
    dataSquare: {
      id: "rectangle" + Math.random() * 100,
      type: "box",
      attr: {
        style: {
          display: "flex",
          backgroundColor: "#D9D9D9",
          height: "",
          width: "",
          position: "absolute",
        },
      },
      children: [],
    },
  }),
  actions: {
    setNewSquare(e, dataPushed) {
      const counter = useCounterStore();
      const newSquareStore = useNewSquareStore();
      const squareStore = useSquareStore();
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

      newSquareStore.X = prevX;
      newSquareStore.Y = prevY;

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        newSquareStore.show = true;

        let positionX = Math.round(
          (e.clientX - squareStore.offsetLeft) / squareStore.scale
        );
        let positionY = Math.round(
          (e.clientY - squareStore.offsetTop) / squareStore.scale
        );

        let positiveWidth = positionX - prevX;
        let positiveHeight = positionY - prevY;

        if (positiveWidth == 0 && positiveHeight == 0) {
          newSquareStore.width = 0;
          newSquareStore.height = 0;
          newSquareStore.X = prevX;
          newSquareStore.Y = prevY;
        }

        if (positiveWidth > 0 && positiveHeight > 0) {
          newSquareStore.X = prevX;
          newSquareStore.Y = prevY;

          newSquareStore.width = positionX - prevX;
          newSquareStore.height = positionY - prevY;
        }

        if (positiveWidth < 0 && positiveHeight > 0) {
          newSquareStore.Y = prevY;
          newSquareStore.height = positionY - prevY;

          newSquareStore.X = positionX;
          newSquareStore.width = prevX - positionX;
        }

        if (positiveWidth > 0 && positiveHeight < 0) {
          newSquareStore.X = prevX;
          newSquareStore.width = positionX - prevX;

          newSquareStore.height = prevY - positionY;
          newSquareStore.Y = positionY;
        }

        if (positiveWidth < 0 && positiveHeight < 0) {
          newSquareStore.height = prevY - positionY;
          newSquareStore.width = prevX - positionX;
          newSquareStore.X = positionX;
          newSquareStore.Y = positionY;
        }
      }
      function mouseup(e) {
        if (newSquareStore.show) {
          newSquareStore.dataSquare.name = "box" + newSquareStore.countBox;
          newSquareStore.dataSquare.id = useGetRandomLetter() + uid();
          newSquareStore.dataSquare.attr.style.left = newSquareStore.X + "px";
          newSquareStore.dataSquare.attr.style.top = newSquareStore.Y + "px";
          newSquareStore.dataSquare.attr.style.width =
            newSquareStore.width + "px";
          newSquareStore.dataSquare.attr.style.height =
            newSquareStore.height + "px";
          newSquareStore.dataSquare.children = [];
          let clonedDataSquare = { ...newSquareStore.dataSquare };
          clonedDataSquare.attr = { ...newSquareStore.dataSquare.attr };
          clonedDataSquare.attr.style = {
            ...newSquareStore.dataSquare.attr.style,
          };

          Promise.resolve()
            .then(() => {
              dataPushed.push({ ...clonedDataSquare });
              counter.changeSelectedNewlyAdded(event, clonedDataSquare);
            })
            .then(() => {
              useSetOutlineSelector(clonedDataSquare.id);
            });
          squareStore.turnOnNormalPointer();
          newSquareStore.countBox = newSquareStore.countBox + 1;
        }
        newSquareStore.X = NaN;
        newSquareStore.Y = NaN;
        newSquareStore.width = 0;
        newSquareStore.height = 0;
        newSquareStore.show = false;

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    },
  },
});
