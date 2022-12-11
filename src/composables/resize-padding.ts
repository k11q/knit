import { useCounterStore } from "../stores/counter";
import { usePaddingResizeStore } from "../stores/paddingResizeStore";
import { useCanvasStore } from "../stores/canvas";
import { useSquareStore } from "../stores/dataSquare";

export function useResizePaddingLeft(e: MouseEvent) {
  const paddingResize = usePaddingResizeStore();
  const canvasStore = useCanvasStore();
  const squareStore = useSquareStore();

  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    const selectToi = useCounterStore();
    paddingResize.currentResizing = "left";
    canvasStore.isResizingPadding = true;
    canvasStore.cursorType = "col-resize";

    let prevPaddingLeft: number;
    if (getPaddingLeft()) {
      prevPaddingLeft = getPaddingLeft() as number;
    } else prevPaddingLeft = 0;

    let prevX = e.clientX;

    paddingResize.isResizing = true;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      if (getPaddingLeft()) {
        canvasStore.cursorLabel = getPaddingLeft() as string;
      } else canvasStore.cursorLabel = "0";
      if (!getPaddingLeft() || getPaddingLeft()! >= 0) {
        paddingResize.leftResizerWidth = Math.round(
          prevPaddingLeft / 2 +
            (prevPaddingLeft / 2 + (e.clientX - prevX) / squareStore.scale)
        );
        changePaddingLeft(paddingResize.leftResizerWidth);
      }
      if (getPaddingLeft() && getPaddingLeft()! <= 0) {
        paddingResize.leftResizerWidth = 0;
        changePaddingLeft(0);
      }
    }

    function mouseup() {
      paddingResize.isResizing = false;
      canvasStore.isResizingPadding = false;
      canvasStore.cursorType = "";
      canvasStore.cursorLabel = "";
      paddingResize.currentResizing = "";
      paddingResize.setGap(selectToi.selectedBoxData.id);

      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

export function useResizePaddingRight(e: MouseEvent) {
  const paddingResize = usePaddingResizeStore();
  const canvasStore = useCanvasStore();
  const squareStore = useSquareStore();

  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    const selectToi = useCounterStore();
    paddingResize.currentResizing = "right";
    canvasStore.isResizingPadding = true;
    canvasStore.cursorType = "col-resize";

    let prevPaddingRight: number;
    if (getPaddingRight()) {
      prevPaddingRight = getPaddingRight() as number;
    } else prevPaddingRight = 0;

    let prevX = e.clientX;

    paddingResize.isResizing = true;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      if (getPaddingRight()) {
        canvasStore.cursorLabel = getPaddingRight() as string;
      } else canvasStore.cursorLabel = "0";
      if (!getPaddingRight() || getPaddingRight()! >= 0) {
        paddingResize.rightResizerWidth = Math.round(
          prevPaddingRight / 2 +
            (prevPaddingRight / 2 + (e.clientX - prevX) / squareStore.scale)
        );
        changePaddingRight(paddingResize.rightResizerWidth);
      }
      if (getPaddingRight() && getPaddingRight()! <= 0) {
        paddingResize.rightResizerWidth = 0;
        changePaddingRight(0);
      }
    }

    function mouseup() {
      paddingResize.isResizing = false;
      canvasStore.isResizingPadding = false;
      canvasStore.cursorType = "";
      canvasStore.cursorLabel = "";
      paddingResize.currentResizing = "";
      paddingResize.setGap(selectToi.selectedBoxData.id);

      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

export function useResizePaddingTop(e: MouseEvent) {
  const paddingResize = usePaddingResizeStore();
  const canvasStore = useCanvasStore();
  const squareStore = useSquareStore();

  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    const selectToi = useCounterStore();
    paddingResize.currentResizing = "top";
    canvasStore.isResizingPadding = true;
    canvasStore.cursorType = "row-resize";

    let prevPaddingTop: number;
    if (getPaddingTop()) {
      prevPaddingTop = getPaddingTop() as number;
    } else prevPaddingTop = 0;

    let prevY = e.clientY;

    paddingResize.isResizing = true;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      if (getPaddingTop()) {
        canvasStore.cursorLabel = getPaddingTop() as string;
      } else canvasStore.cursorLabel = "0";

      if (!getPaddingTop() || getPaddingTop()! >= 0) {
        paddingResize.topResizerHeight = Math.round(
          prevPaddingTop / 2 +
            (prevPaddingTop / 2 + (e.clientY - prevY) / squareStore.scale)
        );
        changePaddingTop(paddingResize.topResizerHeight);
      }
      if (getPaddingTop() && getPaddingTop()! <= 0) {
        paddingResize.leftResizerWidth = 0;
        changePaddingTop(0);
      }
    }

    function mouseup() {
      paddingResize.isResizing = false;
      canvasStore.isResizingPadding = false;
      canvasStore.cursorType = "";
      canvasStore.cursorLabel = "";
      paddingResize.currentResizing = "";
      paddingResize.setGap(selectToi.selectedBoxData.id);

      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

export function useResizePaddingBottom(e: MouseEvent) {
  const paddingResize = usePaddingResizeStore();
  const canvasStore = useCanvasStore();
  const squareStore = useSquareStore();

  if (!squareStore.dragPointer && !squareStore.draggingPointer) {
    const selectToi = useCounterStore();
    paddingResize.currentResizing = "bottom";
    canvasStore.isResizingPadding = true;
    canvasStore.cursorType = "row-resize";

    let prevPaddingBottom: number;
    if (getPaddingBottom()) {
      prevPaddingBottom = getPaddingBottom() as number;
    } else prevPaddingBottom = 0;

    let prevY = e.clientY;

    paddingResize.isResizing = true;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: MouseEvent) {
      if (getPaddingBottom()) {
        canvasStore.cursorLabel = getPaddingBottom() as string;
      } else canvasStore.cursorLabel = "0";
      if (!getPaddingBottom() || getPaddingBottom()! >= 0) {
        paddingResize.bottomResizerHeight = Math.round(
          prevPaddingBottom / 2 +
            (prevPaddingBottom / 2 + (e.clientY - prevY) / squareStore.scale)
        );
        changePaddingBottom(paddingResize.bottomResizerHeight);
      }
      if (getPaddingBottom() && getPaddingBottom()! <= 0) {
        paddingResize.bottomResizerHeight = 0;
        changePaddingBottom(0);
      }
    }

    function mouseup() {
      paddingResize.isResizing = false;
      canvasStore.isResizingPadding = false;
      canvasStore.cursorType = "";
      canvasStore.cursorLabel = "";
      paddingResize.currentResizing = "";
      paddingResize.setGap(selectToi.selectedBoxData.id);

      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}
