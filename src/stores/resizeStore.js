import { defineStore } from "pinia";
import { useCounterStore } from "./counter";
import { useSquareStore } from "./dataSquare";

export const useResizeStore = defineStore({
  id: "resize",

  state: () => ({
    isResizing: false,
  }),
  actions: {
    resizeBottomRight(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        let prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);
        let prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);

        let prevX = e.clientX;
        let prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.width =
            Math.round(
              prevWidth + ((e.clientX - prevX) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxData.attr.style.height =
            Math.round(
              prevHeight + ((e.clientY - prevY) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxHTMLWidth = Math.round(
            prevWidth + ((e.clientX - prevX) * 1) / squareStore.scale
          );
          selectToi.selectedBoxHTMLHeight = Math.round(
            prevHeight + ((e.clientY - prevY) * 1) / squareStore.scale
          );
          console.log("mousemove!");
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          console.log("mouseup!");
        }
      }
    },
    resizeBottomLeft(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        let prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);
        let prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);
        let prevWidth2 = parseInt(selectToi.selectedBoxData.attr.style.left);
        let prevWidthX = selectToi.selectedBoxHTMLX;

        let prevX = e.clientX;
        let prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.width =
            Math.round(
              prevWidth + ((prevX - e.clientX) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxData.attr.style.height =
            Math.round(
              prevHeight + ((e.clientY - prevY) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxHTMLWidth = Math.round(
            prevWidth + ((prevX - e.clientX) * 1) / squareStore.scale
          );
          selectToi.selectedBoxHTMLHeight = Math.round(
            prevHeight + ((e.clientY - prevY) * 1) / squareStore.scale
          );
          selectToi.selectedBoxHTMLX = Math.round(
            prevWidthX + ((e.clientX - prevX) * 1) / squareStore.scale
          );
          selectToi.selectedBoxData.attr.style.left =
            Math.round(
              prevWidth2 + ((e.clientX - prevX) * 1) / squareStore.scale
            ) + "px";
          console.log("mousemove!");
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          console.log("mouseup!");
        }
      }
    },
    resizeTopLeft(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        let prevWidth = parseInt(selectToi.selectedBoxData.attr.style.left);
        let prevHeight = parseInt(selectToi.selectedBoxData.attr.style.top);
        let prevWidthX = selectToi.selectedBoxHTMLX;
        let prevHeightY = selectToi.selectedBoxHTMLY;
        let prevWidth2 = parseInt(selectToi.selectedBoxData.attr.style.width);
        let prevHeight2 = parseInt(selectToi.selectedBoxData.attr.style.height);

        let prevX = e.clientX;
        let prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.left =
            Math.round(
              prevWidth + ((e.clientX - prevX) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxData.attr.style.top =
            Math.round(
              prevHeight + ((e.clientY - prevY) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxData.attr.style.width =
            Math.round(
              prevWidth2 + ((prevX - e.clientX) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxData.attr.style.height =
            Math.round(
              prevHeight2 + ((prevY - e.clientY) * 1) / squareStore.scale
            ) + "px";

          selectToi.selectedBoxHTMLWidth = Math.round(
            prevWidth2 + ((prevX - e.clientX) * 1) / squareStore.scale
          );
          selectToi.selectedBoxHTMLHeight = Math.round(
            prevHeight2 + ((prevY - e.clientY) * 1) / squareStore.scale
          );
          selectToi.selectedBoxHTMLX = Math.round(
            prevWidthX + ((e.clientX - prevX) * 1) / squareStore.scale
          );
          selectToi.selectedBoxHTMLY = Math.round(
            prevHeightY + ((e.clientY - prevY) * 1) / squareStore.scale
          );
          console.log("mousemove!");
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          console.log("mouseup!");
        }
      }
    },
    resizeTopRight(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        let prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);
        let prevHeight = parseInt(selectToi.selectedBoxData.attr.style.top);
        let prevHeight2 = parseInt(selectToi.selectedBoxData.attr.style.height);
        let prevHeightY = selectToi.selectedBoxHTMLY;

        let prevX = e.clientX;
        let prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.width =
            Math.round(
              prevWidth + ((e.clientX - prevX) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxData.attr.style.top =
            Math.round(
              prevHeight + ((e.clientY - prevY) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxData.attr.style.height =
            Math.round(
              prevHeight2 + ((prevY - e.clientY) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxHTMLWidth = Math.round(
            prevWidth + ((e.clientX - prevX) * 1) / squareStore.scale
          );
          selectToi.selectedBoxHTMLHeight = Math.round(
            prevHeight2 + ((prevY - e.clientY) * 1) / squareStore.scale
          );

          selectToi.selectedBoxHTMLY = Math.round(
            prevHeightY + ((e.clientY - prevY) * 1) / squareStore.scale
          );

          console.log("mousemove!");
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          console.log("mouseup!");
        }
      }
    },
    resizeRight(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        let prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);

        let prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.width =
            Math.round(
              prevWidth + ((e.clientX - prevX) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxHTMLWidth = Math.round(
            prevWidth + ((e.clientX - prevX) * 1) / squareStore.scale
          );
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          console.log("mouseup!");
        }
      }
    },
    resizeLeft(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        let prevWidth = parseInt(selectToi.selectedBoxData.attr.style.width);
        let prevWidth2 = parseInt(selectToi.selectedBoxData.attr.style.left);
        let prevWidthX = selectToi.selectedBoxHTMLX;

        let prevX = e.clientX;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.width =
            Math.round(
              prevWidth + ((prevX - e.clientX) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxData.attr.style.left =
            Math.round(
              prevWidth2 + ((e.clientX - prevX) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxHTMLWidth = Math.round(
            prevWidth + ((prevX - e.clientX) * 1) / squareStore.scale
          );
          selectToi.selectedBoxHTMLX = Math.round(
            prevWidthX + ((e.clientX - prevX) * 1) / squareStore.scale
          );
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          console.log("mouseup!");
        }
      }
    },
    resizeTop(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        let prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);
        let prevHeight2 = parseInt(selectToi.selectedBoxData.attr.style.top);
        let prevHeightY = selectToi.selectedBoxHTMLY;

        let prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.height =
            Math.round(
              prevHeight + ((prevY - e.clientY) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxData.attr.style.top =
            Math.round(
              prevHeight2 + ((e.clientY - prevY) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxHTMLHeight = Math.round(
            prevHeight + ((prevY - e.clientY) * 1) / squareStore.scale
          );
          selectToi.selectedBoxHTMLY = Math.round(
            prevHeightY + ((e.clientY - prevY) * 1) / squareStore.scale
          );
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          console.log("mouseup!");
        }
      }
    },
    resizeBottom(e) {
      const resizeStore = useResizeStore();
      const squareStore = useSquareStore();
      if (!squareStore.dragPointer && !squareStore.draggingPointer) {
        const selectToi = useCounterStore();

        let prevHeight = parseInt(selectToi.selectedBoxData.attr.style.height);

        let prevY = e.clientY;

        this.isResizing = true;

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        function mousemove(e) {
          selectToi.selectedBoxData.attr.style.height =
            Math.round(
              prevHeight + ((e.clientY - prevY) * 1) / squareStore.scale
            ) + "px";
          selectToi.selectedBoxHTMLHeight = Math.round(
            prevHeight + ((e.clientY - prevY) * 1) / squareStore.scale
          );
        }

        function mouseup() {
          resizeStore.isResizing = false;
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
          console.log("mouseup!");
        }
      }
    },
  },
});
