import { useCanvasStore } from "@/stores/canvas";
import { useSquareStore } from "~~/src/stores/dataSquare";

export function useSetMultiElementsResizer() {
  const canvasStore = useCanvasStore();
  const squareStore = useSquareStore();

  canvasStore.selection.forEach((i) => {
    let left = i.cssRules[0].style?.left?.value as number;
    let top = i.cssRules[0].style?.top?.value as number;
    let width = i.cssRules[0].style?.width?.value
      ? (i.cssRules[0].style?.width.value as number)
      : ((useGetElementRect(i.id)!.width / squareStore.scale) as number);
    let height = i.cssRules[0].style?.height
      ? (i.cssRules[0].style.height.value as number)
      : ((useGetElementRect(i.id)!.height / squareStore.scale) as number);

    if (
      !parseInt(canvasStore.multiSelectResizerRect.left) ||
      left < parseInt(canvasStore.multiSelectResizerRect.left)
    ) {
      canvasStore.multiSelectResizerRect.left =
        i.cssRules[0].style.left?.value + "px";
    }
    if (
      !parseInt(canvasStore.multiSelectResizerRect.top) ||
      top < parseInt(canvasStore.multiSelectResizerRect.top)
    ) {
      canvasStore.multiSelectResizerRect.top =
        i.cssRules[0].style.top?.value + "px";
    }
    if (
      !parseInt(canvasStore.multiSelectResizerRect.width) ||
      left + width >
        parseInt(canvasStore.multiSelectResizerRect.left) +
          parseInt(canvasStore.multiSelectResizerRect.width)
    ) {
      canvasStore.multiSelectResizerRect.width =
        left + width - parseInt(canvasStore.multiSelectResizerRect.left) + "px";
    }
    if (
      !parseInt(canvasStore.multiSelectResizerRect.height) ||
      top + height >
        parseInt(canvasStore.multiSelectResizerRect.top) +
          parseInt(canvasStore.multiSelectResizerRect.height)
    ) {
      canvasStore.multiSelectResizerRect.height =
        top + height - parseInt(canvasStore.multiSelectResizerRect.top) + "px";
    }
  });
}
