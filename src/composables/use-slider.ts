import { useCounterStore } from "~~/src/stores/counter";
import { useSquareStore } from "~~/src/stores/dataSquare";
import { useCanvasStore } from "@/stores/canvas";

export const useSlider = (
  e: MouseEvent,
  currElement: string,
  change: number = 1
) => {
  const selectToi = useCounterStore();
  const squareStore = useSquareStore();
  const canvasStore = useCanvasStore();

  const left = () => {
    const prevX = e.clientX;
    const prevLeft = getLeft()!;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      canvasStore.isDragging = true;

      changeLeft(
        Math.round(
          prevLeft + ((e.clientX - prevX) / squareStore.scale) * change
        )
      );
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const top = () => {
    const prevX = e.clientX;
    const prevTop = getTop()!;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      canvasStore.isDragging = true;

      changeTop(
        Math.round(prevTop + ((e.clientX - prevX) / squareStore.scale) * change)
      );
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const width = () => {
    const prevX = e.clientX;
    const prevWidth = getWidth()!;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      canvasStore.isDragging = true;

      changeWidth(
        Math.round(
          prevWidth + ((e.clientX - prevX) / squareStore.scale) * change
        )
      );
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const height = () => {
    const prevX = e.clientX;
    const prevHeight = getHeight()!;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      canvasStore.isDragging = true;

      changeHeight(
        Math.round(
          prevHeight + ((e.clientX - prevX) / squareStore.scale) * change
        )
      );
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const borderRadius = () => {
    const prevX = e.clientX;
    let prevBorderRadius = getBorderRadius()!;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      canvasStore.isDragging = true;

      changeBorderRadius(
        Math.round(
          prevBorderRadius + ((e.clientX - prevX) / squareStore.scale) * change
        )
      );
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const gap = () => {
    const prevX = e.clientX;
    let prevGap = getGap()!;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      canvasStore.isDragging = true;

      changeGap(
        Math.round(prevGap + ((e.clientX - prevX) / squareStore.scale) * change)
      );
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  return { left, top, width, height, borderRadius, gap };
};
