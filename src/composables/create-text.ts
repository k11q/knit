import { Node, useCounterStore } from "../stores/counter";
import { useSquareStore } from "../stores/dataSquare";
import { useRulerSnapStore } from "../stores/rulerSnap";
import { useResizeStore } from "../stores/resizeStore";
import { useDocumentStore } from "../stores/document";

export function createText(e: MouseEvent) {
  const selectToi = useCounterStore();
  const squareStore = useSquareStore();
  const rulerSnap = useRulerSnapStore();
  const resizeStore = useResizeStore();
  const documentStore = useDocumentStore();
  const uid = () =>
    String(Date.now().toString(32) + Math.random().toString(16)).replace(
      /\./g,
      ""
    );
  let textNode: Node = {
    id: "",
    name: "",
    type: "text",
    textContent: "text here",
    cssRules: [
      {
        id: 1,
        style: {
          color: { type: "keyword", value: "black" },
          position: { type: "keyword", value: "absolute" },
          left: { type: "unit", value: 0, unit: "px" },
          top: { type: "unit", value: 0, unit: "px" },
          height: { type: "keyword", value: "auto" },
          width: { type: "keyword", value: "auto" },
        },
      },
    ],
    children: [],
  };

  let rootData = selectToi.data;
  let startDragging = false;

  const prevX = Math.round(
    (e.clientX - squareStore.offsetLeft) / squareStore.scale
  );
  const prevY = Math.round(
    (e.clientY - squareStore.offsetTop) / squareStore.scale
  );

  textNode.id = useCreateId();
  textNode.name = "text" + documentStore.textCount;
  textNode.cssRules[0].style.left.value = prevX;
  textNode.cssRules[0].style.top.value = prevY;

  resizeStore.prevLeft = prevX;
  resizeStore.prevTop = prevY;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e: MouseEvent) {
    startDragging = true;
    let positionX = Math.round(
      (e.clientX - squareStore.offsetLeft) / squareStore.scale
    );
    let positionY = Math.round(
      (e.clientY - squareStore.offsetTop) / squareStore.scale
    );

    if (rootData.findIndex((i) => i.id === textNode.id) === -1) {
      textNode.name = "text" + documentStore.textCount;
      textNode.cssRules[0].style.width.type = "unit";
      textNode.cssRules[0].style.width.unit = "px";
      textNode.cssRules[0].style.height.type = "unit";
      textNode.cssRules[0].style.height.unit = "px";

      Promise.resolve()
        .then(() => {
          rootData.push(textNode);
        })
        .then(() => {
          useSetSelectSingle(e, textNode.id);
        });
    }
    if (rootData.findIndex((i) => i.id === textNode.id) !== -1) {
      resizeStore.isResizing = true;
      resizeStore.isResizingBottomRight = true;
      if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
        rulerSnap.on = true;
        rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
        if (!rulerSnap.snapWidth) {
          let width = selectToi.selectedBoxData.cssRules[0].style.width;
          width.value = positionX - prevX;
        }
        if (!rulerSnap.snapHeight) {
          let height = selectToi.selectedBoxData.cssRules[0].style.height;
          height.value = positionY - prevY;
        }
      } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
        rulerSnap.on = false;
        let width = selectToi.selectedBoxData.cssRules[0].style.width;
        let height = selectToi.selectedBoxData.cssRules[0].style.height;
        width.value = positionX - prevX;
        height.value = positionY - prevY;
      }
    }
    /*
          let positionX = Math.round(
            (e.clientX - squareStore.offsetLeft) / squareStore.scale
          );
          let positionY = Math.round(
            (e.clientY - squareStore.offsetTop) / squareStore.scale
          );
  
          let positiveWidth = positionX - prevX;
          let positiveHeight = positionY - prevY;
  
          if (positiveWidth == 0 && positiveHeight == 0) {
            width = 0;
            height = 0;
            x = prevX;
            y = prevY;
          }
  
          if (positiveWidth > 0 && positiveHeight > 0) {
            x = prevX;
            y = prevY;
  
            width = positionX - prevX;
            height = positionY - prevY;
          }
  
          if (positiveWidth < 0 && positiveHeight > 0) {
            y = prevY;
            height = positionY - prevY;
  
            x = positionX;
            width = prevX - positionX;
          }
  
          if (positiveWidth > 0 && positiveHeight < 0) {
            x = prevX;
            width = positionX - prevX;
  
            height = prevY - positionY;
            y = positionY;
          }
  
          if (positiveWidth < 0 && positiveHeight < 0) {
            height = prevY - positionY;
            width = prevX - positionX;
            x = positionX;
            y = positionY;
          }
          */
  }
  function mouseup(e: MouseEvent) {
    if (startDragging) {
      startDragging = false;
    } else if (!startDragging) {
      Promise.resolve()
        .then(() => {
          selectToi.data.push(textNode);
        })
        .then(() => {
          useSetSelectSingle(e, textNode.id);
          selectToi.selectedTextEditor = textNode.id;
          useSetOutlineSelector("");
        });
    }
    squareStore.turnOnNormalPointer();
    documentStore.textCount += 1;
    resizeStore.isResizing = false;
    resizeStore.isResizingBottomRight = false;
    rulerSnap.show = false;

    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}
