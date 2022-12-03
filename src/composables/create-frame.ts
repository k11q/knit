import { useCounterStore } from "../stores/counter";
import { useSquareStore } from "../stores/dataSquare";
import { useRulerSnapStore } from "../stores/rulerSnap";
import { useResizeStore } from "../stores/resizeStore";
import { useDocumentStore } from "../stores/document";

export function createFrame(e: MouseEvent) {
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
  let frameNode = {
    id: "",
    name: "",
    type: "div",
    hidden: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    blendMode: "passthrough",
    opacity: 1,
    effect: [],
    fill: [],
    stroke: [],
    strokeWidth: 1,
    strokeAlign: "Inside",
    rotation: 0,
    cornerRadius: 0,
    overflow: "scroll",
    attr: {
      style: {
        left: "",
        top: "",
        display: "flex",
        backgroundColor: "white",
        height: "1px",
        width: "1px",
        position: "absolute",
      },
    },
    children: [],
  };

  let rootData = selectToi.data;

  const prevX = Math.round(
    (e.clientX - squareStore.offsetLeft) / squareStore.scale
  );
  const prevY = Math.round(
    (e.clientY - squareStore.offsetTop) / squareStore.scale
  );

  frameNode.id = useGetRandomLetter() + uid();
  frameNode.x = prevX;
  frameNode.y = prevY;
  frameNode.attr.style.left = prevX + "px";
  frameNode.attr.style.top = prevY + "px";

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

    if (rootData.findIndex((i) => i.id === frameNode.id) === -1) {
      frameNode.name = "frame" + documentStore.frameCount;
      Promise.resolve()
        .then(() => {
          rootData.push(frameNode);
        })
        .then(() => {
          squareStore.turnOnNormalPointer();
        })
        .then(() => {
          selectToi.changeSelected(e, frameNode.id);
        });
    }
    if (rootData.findIndex((i) => i.id === frameNode.id) !== -1) {
      resizeStore.isResizing = true;
      resizeStore.isResizingBottomRight = true;
      if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
        rulerSnap.on = true;
        rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
        if (!rulerSnap.snapWidth) {
          selectToi.selectedBoxData.attr.style.width = positionX - prevX + "px";
          selectToi.selectedBoxData.width = positionX - prevX;
        }
        if (!rulerSnap.snapHeight) {
          selectToi.selectedBoxData.attr.style.height =
            positionY - prevY + "px";
          selectToi.selectedBoxData.height = positionY - prevY;
        }
      } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
        rulerSnap.on = false;
        selectToi.selectedBoxData.width = positionX - prevX;
        selectToi.selectedBoxData.height = positionY - prevY;
        selectToi.selectedBoxData.attr.style.width = positionX - prevX + "px";
        selectToi.selectedBoxData.attr.style.height = positionY - prevY + "px";
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
    documentStore.frameCount += 1;
    resizeStore.isResizing = false;
    resizeStore.isResizingBottomRight = false;
    rulerSnap.show = false;

    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}
