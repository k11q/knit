import { storeCanvas } from "@/stores/storeCanvas";

export default function () {
  const canvasStore = storeCanvas();

  canvasStore.multiSelectedElements.forEach((i) => {
    let left = parseInt(i.attr?.style?.left);
    let top = parseInt(i.attr?.style?.top);
    let width = parseInt(i.attr?.style?.width);
    let height = parseInt(i.attr?.style?.height);

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
