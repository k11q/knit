import { useSelectStore } from "@/stores/selectStore";
import { useSquareStore } from "@/stores/dataSquare";

export default function (e: MouseEvent) {
  const selectStore = useSelectStore();
  const squareStore = useSquareStore();

  const prevX = (e.clientX - squareStore.offsetLeft) / squareStore.scale;
  const prevY = (e.clientY - squareStore.offsetTop) / squareStore.scale;

  selectStore.X = prevX;
  selectStore.Y = prevY;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e: MouseEvent) {
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
  }
  function mouseup(e: MouseEvent) {
    selectStore.X = NaN;
    selectStore.Y = NaN;
    selectStore.width = 0;
    selectStore.height = 0;
    selectStore.showSelect = false;

    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}
