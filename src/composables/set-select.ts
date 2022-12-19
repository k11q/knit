import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCounterStore } from "~~/src/stores/counter";
import { useCanvasStore } from "@/stores/canvas";

export const isShowSelect = () => useState("isShowSelect", () => false);
export const selectorLeft = () => useState("selectorLeft", () => NaN);
export const selectorTop = () => useState("selectorTop", () => NaN);
export const selectorWidth = () => useState("selectorWidth", () => NaN);
export const selectorHeight = () => useState("selectorHeight", () => NaN);

export function useSetSelect(e: MouseEvent) {
  const squareStore = useSquareStore();
  const selectToi = useCounterStore();
  const canvasStore = useCanvasStore();

  const prevX = e.clientX;
  const prevY = e.clientY;

  selectorLeft().value = prevX;
  selectorTop().value = prevY;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e: MouseEvent) {
    isShowSelect().value = true;

    let positionX = e.clientX;
    let positionY = e.clientY;

    let positiveWidth = positionX - prevX;
    let positiveHeight = positionY - prevY;

    if (positiveWidth == 0 && positiveHeight == 0) {
      selectorWidth().value = 0;
      selectorHeight().value = 0;
      selectorLeft().value = prevX;
      selectorTop().value = prevY;
    }

    if (positiveWidth > 0 && positiveHeight > 0) {
      selectorLeft().value = prevX;
      selectorTop().value = prevY;

      selectorWidth().value = positionX - prevX;
      selectorHeight().value = positionY - prevY;
    }

    if (positiveWidth < 0 && positiveHeight > 0) {
      selectorTop().value = prevY;
      selectorHeight().value = positionY - prevY;

      selectorLeft().value = positionX;
      selectorWidth().value = prevX - positionX;
    }

    if (positiveWidth > 0 && positiveHeight < 0) {
      selectorLeft().value = prevX;
      selectorWidth().value = positionX - prevX;

      selectorHeight().value = prevY - positionY;
      selectorTop().value = positionY;
    }

    if (positiveWidth < 0 && positiveHeight < 0) {
      selectorHeight().value = prevY - positionY;
      selectorWidth().value = prevX - positionX;
      selectorLeft().value = positionX;
      selectorTop().value = positionY;
    }

    let surfaceElements = [
      ...document.querySelector(`[data-id="canvas"]`)!.children,
    ]!;

    surfaceElements.forEach((i) => {
      const element = i as HTMLElement;
      let id = element.dataset.id!;
      let rect = element.getBoundingClientRect();
      let topLeft = {
        x: rect.x,
        y: rect.y,
      };
      let topRight = {
        x: rect.x + rect.width,
        y: rect.y,
      };
      let bottomLeft = {
        x: rect.x,
        y: rect.y + rect.height,
      };
      let bottomRight = {
        x: rect.x + rect.width,
        y: rect.y + rect.height,
      };

      if (
        //lineleft
        (topLeft.x > selectorLeft().value &&
          topLeft.x < selectorLeft().value + selectorWidth().value &&
          (topLeft.y > selectorTop().value ||
            bottomLeft.y > selectorTop().value) &&
          (topLeft.y < selectorTop().value + selectorHeight().value ||
            bottomLeft.y < selectorTop().value + selectorHeight().value)) ||
        //linetop
        ((topRight.x > selectorLeft().value ||
          topLeft.x > selectorLeft().value) &&
          (topRight.x < selectorLeft().value + selectorWidth().value ||
            topLeft.x < selectorLeft().value + selectorWidth().value) &&
          topRight.y > selectorTop().value &&
          topRight.y < selectorTop().value + selectorHeight().value) ||
        //lineright
        (topRight.x > selectorLeft().value &&
          topRight.x < selectorLeft().value + selectorWidth().value &&
          (topRight.y > selectorTop().value ||
            bottomRight.y > selectorTop().value) &&
          (topRight.y < selectorTop().value + selectorHeight().value ||
            bottomRight.y < selectorTop().value + selectorHeight().value)) ||
        //linebottom
        ((bottomRight.x > selectorLeft().value ||
          bottomLeft.x > selectorLeft().value) &&
          (bottomRight.x < selectorLeft().value + selectorWidth().value ||
            bottomLeft.x < selectorLeft().value + selectorWidth().value) &&
          bottomRight.y > selectorTop().value &&
          bottomRight.y < selectorTop().value + selectorHeight().value)
      ) {
        let data = useGetElementData(selectToi.data, id);

        let index = canvasStore.selection.findIndex((i) => i.id === id);
        if (index === -1) {
          canvasStore.selection.push(data);
        }
      } else {
        let index = canvasStore.selection.findIndex((i) => i.id === id);

        if (index !== -1) {
          canvasStore.selection.splice(index, 1);
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
  function mouseup(e: MouseEvent) {
    selectorLeft().value = NaN;
    selectorTop().value = NaN;
    selectorWidth().value = 0;
    selectorHeight().value = 0;
    isShowSelect().value = false;

    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}
