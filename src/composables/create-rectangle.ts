import { Node, useCounterStore } from "../stores/counter";
import { useSquareStore } from "../stores/dataSquare";
import { useRulerSnapStore } from "../stores/rulerSnap";
import { useResizeStore } from "../stores/resizeStore";
import { useDocumentStore } from "../stores/document";

export function createRectangle(e: MouseEvent) {
  const selectToi = useCounterStore();
  const squareStore = useSquareStore();
  const rulerSnap = useRulerSnapStore();
  const resizeStore = useResizeStore();
  const documentStore = useDocumentStore();
  let rectangleNode = {
    id: "",
    name: "",
    type: "box",
    cssRules: [
      {
        breakpoint: 1,
        style: {
          display: { type: "keyword", value: "flex" },
          backgroundColor: { type: "keyword", value: "#D9D9D9" },
          position: { type: "keyword", value: "absolute" },
          left: { type: "unit", value: 0, unit: "px" },
          top: { type: "unit", value: 0, unit: "px" },
          height: { type: "unit", value: 1, unit: "px" },
          width: { type: "unit", value: 1, unit: "px" },
        },
      },
    ],
    children: [] as Node[],
  };

  let rootData = selectToi.data;

  const prevX = Math.round(
    (e.clientX - squareStore.offsetLeft) / squareStore.scale
  );
  const prevY = Math.round(
    (e.clientY - squareStore.offsetTop) / squareStore.scale
  );

  rectangleNode.id = useCreateId();
  rectangleNode.cssRules[0].style.left.value = prevX;
  rectangleNode.cssRules[0].style.top.value = prevY;

  resizeStore.prevLeft = prevX;
  resizeStore.prevTop = prevY;

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e: MouseEvent) {
    let positionX = Math.round(
      (e.clientX - squareStore.offsetLeft) / squareStore.scale
    );
    let positionY = Math.round(
      (e.clientY - squareStore.offsetTop) / squareStore.scale
    );

    if (rootData.findIndex((i) => i.id === rectangleNode.id) === -1) {
      rectangleNode.name = "rectangle" + documentStore.rectangleCount;
      Promise.resolve()
        .then(() => {
          rootData.push(rectangleNode);
        })
        .then(() => {
          selectToi.changeSelected(e, rectangleNode.id);
        });
    }
    if (rootData.findIndex((i) => i.id === rectangleNode.id) !== -1) {
      resizeStore.isResizing = true;
      resizeStore.isResizingBottomRight = true;
      if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
        rulerSnap.on = true;
        rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
        if (!rulerSnap.snapWidth) {
          changeWidth(positionX - prevX);
        }
        if (!rulerSnap.snapHeight) {
          changeHeight(positionY - prevY);
        }
      } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
        rulerSnap.on = false;
        changeWidth(positionX - prevX);
        changeHeight(positionY - prevY);
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
    squareStore.turnOnNormalPointer();
    documentStore.rectangleCount += 1;
    resizeStore.isResizing = false;
    resizeStore.isResizingBottomRight = false;
    rulerSnap.show = false;

    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}
