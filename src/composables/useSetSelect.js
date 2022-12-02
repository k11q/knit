import { useSelectStore } from "@/stores/selectStore";
import { useSquareStore } from "@/stores/dataSquare";
import { useCounterStore } from "@/stores/counter";
import { storeCanvas } from "@/stores/storeCanvas";

export default function (e) {
  const selectStore = useSelectStore();
  const squareStore = useSquareStore();
  const selectToi = useCounterStore();
  const canvasStore = storeCanvas();

  const prevX = (e.clientX - squareStore.offsetLeft) / squareStore.scale;
  const prevY = (e.clientY - squareStore.offsetTop) / squareStore.scale;

  selectStore.X = prevX;
  selectStore.Y = prevY;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e) {
    selectStore.showSelect = true;

    let positionX = (e.clientX - squareStore.offsetLeft) / squareStore.scale;
    let positionY = (e.clientY - squareStore.offsetTop) / squareStore.scale;

    let positiveWidth = positionX - prevX;
    let positiveHeight = positionY - prevY;

    if (positiveWidth == 0 && positiveHeight == 0) {
      selectStore.width = 0;
      selectStore.height = 0;
      selectStore.X = prevX;
      selectStore.Y = prevY;
    }

    if (positiveWidth > 0 && positiveHeight > 0) {
      selectStore.X = prevX;
      selectStore.Y = prevY;

      selectStore.width = positionX - prevX;
      selectStore.height = positionY - prevY;
    }

    if (positiveWidth < 0 && positiveHeight > 0) {
      selectStore.Y = prevY;
      selectStore.height = positionY - prevY;

      selectStore.X = positionX;
      selectStore.width = prevX - positionX;
    }

    if (positiveWidth > 0 && positiveHeight < 0) {
      selectStore.X = prevX;
      selectStore.width = positionX - prevX;

      selectStore.height = prevY - positionY;
      selectStore.Y = positionY;
    }

    if (positiveWidth < 0 && positiveHeight < 0) {
      selectStore.height = prevY - positionY;
      selectStore.width = prevX - positionX;
      selectStore.X = positionX;
      selectStore.Y = positionY;
    }

    let surfaceElements = [
      ...document.querySelector(`[data-id="canvas"]`).children,
    ];

    surfaceElements.forEach((i) => {
      let id = i.dataset.id;
      let rect = i.getBoundingClientRect();
      let topLeft = {
        x: (rect.x - squareStore.offsetLeft) / squareStore.scale,
        y: (rect.y - squareStore.offsetTop) / squareStore.scale,
      };
      let topRight = {
        x: (rect.x + rect.width - squareStore.offsetLeft) / squareStore.scale,
        y: (rect.y - squareStore.offsetTop) / squareStore.scale,
      };
      let bottomLeft = {
        x: (rect.x - squareStore.offsetLeft) / squareStore.scale,
        y: (rect.y + rect.height - squareStore.offsetTop) / squareStore.scale,
      };
      let bottomRight = {
        x: (rect.x + rect.width - squareStore.offsetLeft) / squareStore.scale,
        y: (rect.y + rect.height - squareStore.offsetTop) / squareStore.scale,
      };

      if (
        //lineleft
        (topLeft.x > selectStore.X &&
          topLeft.x < selectStore.X + selectStore.width &&
          (topLeft.y > selectStore.Y || bottomLeft.y > selectStore.Y) &&
          (topLeft.y < selectStore.Y + selectStore.height ||
            bottomLeft.y < selectStore.Y + selectStore.height)) ||
        //linetop
        ((topRight.x > selectStore.X || topLeft.x > selectStore.X) &&
          (topRight.x < selectStore.X + selectStore.width ||
            topLeft.x < selectStore.X + selectStore.width) &&
          topRight.y > selectStore.Y &&
          topRight.y < selectStore.Y + selectStore.height) ||
        //lineright
        (topRight.x > selectStore.X &&
          topRight.x < selectStore.X + selectStore.width &&
          (topRight.y > selectStore.Y || bottomRight.y > selectStore.Y) &&
          (topRight.y < selectStore.Y + selectStore.height ||
            bottomRight.y < selectStore.Y + selectStore.height)) ||
        //linebottom
        ((bottomRight.x > selectStore.X || bottomLeft.x > selectStore.X) &&
          (bottomRight.x < selectStore.X + selectStore.width ||
            bottomLeft.x < selectStore.X + selectStore.width) &&
          bottomRight.y > selectStore.Y &&
          bottomRight.y < selectStore.Y + selectStore.height)
      ) {
        let data = useGetElementData(selectToi.data, id);

        let index = canvasStore.multiSelectedElements.findIndex(
          (i) => i.id === id
        );
        if (index === -1) {
          canvasStore.multiSelectedElements.push(data);
        }
      } else {
        let index = canvasStore.multiSelectedElements.findIndex(
          (i) => i.id === id
        );

        if (index !== -1) {
          canvasStore.multiSelectedElements.splice(index, 1);
          canvasStore.multiSelectResizerRect = {
            left: "",
            top: "",
            height: "",
            width: "",
          };
        }
      }
    });

    useSetMultiElementsResizer();
  }
  function mouseup(e) {
    selectStore.X = NaN;
    selectStore.Y = NaN;
    selectStore.width = 0;
    selectStore.height = 0;
    selectStore.showSelect = false;

    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}
