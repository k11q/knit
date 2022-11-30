import { useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasFF } from "~~/src/stores/canvasFreeForm";

export const useSlider = (e, change, currElement, currType) => {
  const selectToi = useCounterStore();
  const squareStore = useSquareStore();
  const canvasFF = useCanvasFF();

  const left = () => {
    const prevX = e.clientX;
    const prevLeft = parseInt(selectToi.selectedBoxData.attr.style.left);

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasFF.isDragging = true;

      selectToi.selectedBoxData.attr.style.left =
        prevLeft + ((e.clientX - prevX) / squareStore.scale) * change + "px";
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement, currType);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasFF.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };

  const top = () => {
    const prevX = e.clientX;
    const prevTop = parseInt(selectToi.selectedBoxData.attr.style.top);

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasFF.isDragging = true;

      selectToi.selectedBoxData.attr.style.top =
        prevTop + ((e.clientX - prevX) / squareStore.scale) * change + "px";
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement, currType);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasFF.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const width = () => {
    const prevX = e.clientX;
    const prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasFF.isDragging = true;

      selectToi.selectedBoxData.attr.style.width =
        prevWidth + ((e.clientX - prevX) / squareStore.scale) * change + "px";
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement, currType);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasFF.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const height = () => {
    const prevX = e.clientX;
    const prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasFF.isDragging = true;

      selectToi.selectedBoxData.attr.style.height =
        prevHeight + ((e.clientX - prevX) / squareStore.scale) * change + "px";
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement, currType);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasFF.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const gap = () => {
    const prevX = e.clientX;
    let prevGap;
    if (selectToi.selectedBoxData.attr.style.borderRadius) {
      prevGap = parseInt(selectToi.selectedBoxData.attr.style.borderRadius);
    } else if (!selectToi.selectedBoxData.attr.style.borderRadius) {
      prevGap = 0;
    }

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasFF.isDragging = true;

      selectToi.selectedBoxData.attr.style.gap =
        prevGap + ((e.clientX - prevX) / squareStore.scale) * change + "px";
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement, currType);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasFF.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const borderRadius = () => {
    const prevX = e.clientX;
    let prevGap;
    if (selectToi.selectedBoxData.attr.style.borderRadius) {
      prevGap = parseInt(selectToi.selectedBoxData.attr.style.borderRadius);
    } else if (!selectToi.selectedBoxData.attr.style.borderRadius) {
      prevGap = 0;
    }

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasFF.isDragging = true;

      selectToi.selectedBoxData.attr.style.borderRadius =
        prevGap + ((e.clientX - prevX) / squareStore.scale) * change + "px";
    }

    function mouseup() {
      Promise.resolve()
        .then(() => {
          selectToi.changeSelected(e, currElement, currType);
        })
        .then(() => {
          useSetOutlineSelector(currElement);
        });
      useSetOutlineSelector(currElement);

      canvasFF.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  return { left, top, width, height, gap, borderRadius };
};
