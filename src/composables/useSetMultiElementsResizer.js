import { useCanvasStore } from "@/stores/canvas";
import { useSquareStore } from "@/stores/dataSquare";

export default function () {
  const canvasStore = useCanvasStore();
  const squareStore = useSquareStore();

  canvasStore.selection.forEach((i) => {
    let left = parseInt(i.attr?.style?.left);
    let top = parseInt(i.attr?.style?.top);
    let width = parseInt(i.attr?.style?.width)
      ? parseInt(i.attr?.style?.width)
      : useGetElementRect(i.id).width / squareStore.scale;
    let height = parseInt(i.attr?.style?.height)
      ? parseInt(i.attr?.style?.height)
      : useGetElementRect(i.id).height / squareStore.scale;

    if (
      !parseInt(canvasStore.multiSelectResizerRect.left) ||
      left < parseInt(canvasStore.multiSelectResizerRect.left)
    ) {
      canvasStore.multiSelectResizerRect.left = i.attr?.style?.left;
    }
    if (
      !parseInt(canvasStore.multiSelectResizerRect.top) ||
      top < parseInt(canvasStore.multiSelectResizerRect.top)
    ) {
      canvasStore.multiSelectResizerRect.top = i.attr?.style?.top;
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
