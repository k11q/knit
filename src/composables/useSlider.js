import { useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import { useCanvasStore } from "@/stores/canvas";

export const useSlider = (e, change, currElement, currType) => {
  const selectToi = useCounterStore();
  const squareStore = useSquareStore();
  const canvasStore = useCanvasStore();

  const left = () => {
    const prevX = e.clientX;
    const prevLeft = selectToi.selectedBoxData.cssRules[0].style.left.value;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasStore.isDragging = true;

      selectToi.selectedBoxData.cssRules[0].style.left.value =
        prevLeft + ((e.clientX - prevX) / squareStore.scale) * change;
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

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };

  const top = () => {
    const prevX = e.clientX;
    const prevTop = selectToi.selectedBoxData.cssRules[0].style.top.value;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasStore.isDragging = true;

      selectToi.selectedBoxData.cssRules[0].style.top.value =
        prevTop + ((e.clientX - prevX) / squareStore.scale) * change;
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

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const width = () => {
    const prevX = e.clientX;
    const prevWidth = selectToi.selectedBoxData.cssRules[0].style.width.value;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasStore.isDragging = true;

      selectToi.selectedBoxData.cssRules[0].style.width.value =
        prevWidth + ((e.clientX - prevX) / squareStore.scale) * change;
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

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const height = () => {
    const prevX = e.clientX;
    const prevHeight = selectToi.selectedBoxData.cssRules[0].style.height.value;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasStore.isDragging = true;

      selectToi.selectedBoxData.cssRules[0].style.height.value =
        prevHeight + ((e.clientX - prevX) / squareStore.scale) * change;
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

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  const gap = () => {
    const prevX = e.clientX;
    let prevGap;
    if (selectToi.selectedBoxData.attr.style.gap) {
      prevGap = parseInt(selectToi.selectedBoxData.attr.style.gap);
    } else if (!selectToi.selectedBoxData.attr.style.gap) {
      prevGap = 0;
    }

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      canvasStore.isDragging = true;

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

      canvasStore.isDragging = false;
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
      canvasStore.isDragging = true;

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

      canvasStore.isDragging = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  };
  return { left, top, width, height, gap, borderRadius };
};
