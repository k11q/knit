import { useCounterStore } from "../stores/counter";
import { useNewFrameStore } from "../stores/newFrameStore";
import { useSquareStore } from "../stores/dataSquare";
import { usePaddingResizeStore } from "../stores/paddingResizeStore";
import { useResizeStore } from "../stores/resizeStore";
import { useRulerSnapStore } from "../stores/rulerSnap";

export function createFrame(e: MouseEvent) {
  const selectToi = useCounterStore();
  const newFrameStore = useNewFrameStore();
  const squareStore = useSquareStore();
  const paddingResize = usePaddingResizeStore();
  const resizeStore = useResizeStore();
  const rulerSnap = useRulerSnapStore();
  const uid = () =>
    String(Date.now().toString(32) + Math.random().toString(16)).replace(
      /\./g,
      ""
    );

  const rootData = selectToi.data;

  const prevX = Math.round(
    (e.clientX - squareStore.offsetLeft) / squareStore.scale
  );
  const prevY = Math.round(
    (e.clientY - squareStore.offsetTop) / squareStore.scale
  );

  let frameNode = {
    id: "",
    name: "",
    type: "div",
    attr: {
      style: {
        left: "",
        top: "",
        display: "flex",
        backgroundColor: "white",
        height: "10px",
        width: "10px",
        position: "absolute",
      },
    },
    children: [],
  };

  frameNode.id = useGetRandomLetter() + uid();
  frameNode.attr.style.left = prevX + "px";
  frameNode.attr.style.top = prevY + "px";

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
      frameNode.name = "frame" + newFrameStore.countBox;
      rootData.push(frameNode);
      squareStore.turnOnNormalPointer();
      selectToi.changeSelected(e, frameNode.id);
    } else {
      useSetOutlineSelector(frameNode.id);
      paddingResize.setResizerSize(frameNode.id);
      if (Math.abs(e.movementX) <= 5 && Math.abs(e.movementX) <= 5) {
        rulerSnap.on = true;
        rulerSnap.setResizeSnap(e, selectToi.selectedBoxData?.id);
        if (!rulerSnap.snapWidth) {
          selectToi.selectedBoxData.attr.style.width = positionX - prevX + "px";
        }
        if (!rulerSnap.snapHeight) {
          selectToi.selectedBoxData.attr.style.height =
            positionY - prevY + "px";
        }
      } else if (Math.abs(e.movementX) > 5 || Math.abs(e.movementX) > 5) {
        rulerSnap.on = false;
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
    newFrameStore.countBox = newFrameStore.countBox + 1;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}
