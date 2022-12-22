import { Node, useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import * as PIXI from "pixi.js";
import { createElement, getElementById } from "../utils/get-element-by-id";
import { Sprite } from "pixi.js";

export const pixiScale = () => useState("pixiScale", () => 1);
export const pixiSelection = () =>
  useState<string[]>("pixiSelection", () => []);
export const pixiNodesSelection = () =>
  useState<PIXI.Sprite[]>("pixiNodesSelection", () => []);
export const pixiContainer = () =>
  useState<PIXI.Container | null>("pixiContainer", () => null);
export const pixiApp = () =>
  useState<PIXI.Application | null>("pixiApp", () => null);

export function renderPixi() {
  const squareStore = useSquareStore();
  const selectToi = useCounterStore();
  const nodes = selectToi.data;
  const canvasWrapper = document.querySelector(
    "#canvas-wrapper"
  ) as HTMLElement;

  const app = new PIXI.Application({
    width: window.innerWidth - 240,
    height: 1796,
    backgroundColor: "#1E1E1E",
  });

  pixiApp().value = app;
  const appStage = app.stage;
  appStage.hitArea = app.screen;
  appStage.interactive = true;
  canvasWrapper.appendChild(app.view);
  canvasWrapper.addEventListener("wheel", pinchZoom);
  appStage.addEventListener("mousedown", canvasMouseDown);

  const container = createElement(PIXI.Container, "root-container");
  container.width = window.innerWidth - 240;
  container.height = 1796;
  pixiContainer().value = container;

  appStage.addChild(container);

  renderNodes(nodes, container);

  function renderNodes(nodes: Node[], parent: PIXI.Container) {
    nodes.forEach((i, index) => {
      const node = createElement(Sprite, i.id, PIXI.Texture.WHITE);

      parent.addChild(node);

      node.name = i.id;
      if (
        i.cssRules[0].style.left?.value &&
        typeof i.cssRules[0].style.left?.value === "number"
      ) {
        node.x = i.cssRules[0].style.left?.value;
      } else {
        node.x = 0;
      }
      if (
        i.cssRules[0].style.top?.value &&
        typeof i.cssRules[0].style.top?.value === "number"
      ) {
        node.y = i.cssRules[0].style.top?.value;
      } else {
        node.y = 0;
      }
      if (
        i.cssRules[0].style.width &&
        i.cssRules[0].style.width.value &&
        typeof i.cssRules[0].style.width.value === "number"
      ) {
        node.width = i.cssRules[0].style.width?.value;
      } else {
        node.width = 0;
      }
      if (
        i.cssRules[0].style.height &&
        i.cssRules[0].style.height.value &&
        typeof i.cssRules[0].style.height.value === "number"
      ) {
        node.height = i.cssRules[0].style.height?.value;
      } else {
        node.height = 0;
      }

      if (
        i.cssRules[0].style.backgroundColor?.value &&
        typeof i.cssRules[0].style.backgroundColor?.value === "string"
      ) {
        node.tint = PIXI.utils.string2hex(
          i.cssRules[0].style.backgroundColor?.value
        );
      }

      node.interactive = true;
      node.on("mousedown", onDragStart, node);

      if (i.children && i.children.length) {
        renderNodes(i.children, node);
      }
    });
  }

  let dragTarget: PIXI.Sprite | null = null;
  let prevX: number = 0;
  let prevY: number = 0;
  let line = createElement(Sprite, "line", PIXI.Texture.WHITE);
  line.name = "line";
  line.width = 1;
  line.height = 1000;
  line.y = 0;
  line.tint = 0x2f4fff;
  let filteredArray = [];

  function onDragMove(event: MouseEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();

    if (dragTarget) {
      const currentDragX = (event.clientX - 296) / container.scale.x - prevX;
      const currentDragY = (event.clientY - 56) / container.scale.x - prevY;
      let showLine = false;
      let x = 0;

      if (filteredArray.length) {
        filteredArray.forEach((i) => {
          if (
            currentDragX < i.x + 5 / container.scale.x &&
            currentDragX > i.x - 5 / container.scale.x
          ) {
            showLine = true;
            x = i.x * container.scale.x + container.x;
            dragTarget.x = i.x;
            return;
          }
        });

        if (showLine) {
          if (!appStage.children.includes(getElementById("line"))) {
            appStage.addChild(line);
          }
          getElementById("line").x = x;
        } else {
          appStage.removeChild(getElementById("line"));
          dragTarget.x = currentDragX;
        }
      }

      dragTarget.y = (event.clientY - 56) / container.scale.x - prevY;

      setDragSnap(event, dragTarget.name, prevX, prevY);

      updateSelector(
        pixiNodesSelection().value[0].x,
        pixiNodesSelection().value[0].y,
        pixiNodesSelection().value[0].width,
        pixiNodesSelection().value[0].height
      );
    }
  }

  function onDragStart(event: MouseEvent) {
    event.stopPropagation();

    dragTarget = this;

    if (
      !pixiSelection().value.find(
        (id) => id === dragTarget.name && pixiSelection().value.length
      )
    ) {
      if (pixiSelection().value.length || pixiNodesSelection().value.length) {
        pixiSelection().value = [];
        pixiNodesSelection().value = [];
        removeSelector();
      }
      pixiSelection().value.push(dragTarget.name);
      pixiNodesSelection().value.push(dragTarget);
      renderSelector(
        dragTarget.x,
        dragTarget.y,
        dragTarget.width,
        dragTarget.height,
        container
      );
    }

    filteredArray = [
      ...dragTarget.parent.children.filter(
        (i) =>
          i.name !== dragTarget.name &&
          i.name !== "selectorLeft" &&
          i.name !== "selectorTop" &&
          i.name !== "selectorRight" &&
          i.name !== "selectorBottom" &&
          i.name !== "selectorTopLeft" &&
          i.name !== "selectorLeft" &&
          i.name !== "selectorTopRight" &&
          i.name !== "selectorBottomLeft" &&
          i.name !== "selectorBottomRight"
      ),
    ];

    console.log(dragTarget.name);
    console.log(pixiNodesSelection().value);
    console.log(dragTarget.x);
    console.log(dragTarget.y);
    console.log(dragTarget.width);
    console.log(dragTarget.height);

    prevX =
      event.clientX / container.scale.x -
      (dragTarget.x + 296 / container.scale.x);
    prevY =
      event.clientY / container.scale.x -
      (dragTarget.y + 56 / container.scale.x);

    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", onDragEnd);
  }

  function onDragEnd() {
    if (appStage.children.includes(getElementById("line"))) {
      appStage.removeChild(getElementById("line"));
    }
    dragTarget = null;

    window.removeEventListener("mousemove", onDragMove);
    window.removeEventListener("mouseup", onDragEnd);
  }

  function pinchZoom(event: WheelEvent) {
    event.stopPropagation();
    event.preventDefault();

    const mouseX = event.clientX - 296;
    const mouseY = event.clientY - 56;

    if (
      event.deltaX === 0 &&
      event.ctrlKey &&
      container.scale.x >= 0.02 &&
      container.scale.x <= 256
    ) {
      const xs = (mouseX - container.x) / container.scale.x;
      const ys = (mouseY - container.y) / container.scale.x;
      container.scale.x += event.deltaY * -0.008 * container.scale.x;
      container.scale.x = Math.max(0.02, Math.min(256, container.scale.x));
      container.scale.y += event.deltaY * -0.008 * container.scale.x;
      container.scale.y = Math.max(0.02, Math.min(256, container.scale.x));
      container.x = mouseX - xs * container.scale.x;
      container.y = mouseY - ys * container.scale.x;
    } else {
      container.x += -event.deltaX * 0.5;
      container.y += -event.deltaY * 0.5;
    }

    pixiScale().value = container.scale.x;
    if (pixiSelection().value.length || pixiNodesSelection().value.length) {
      updateSelector(
        pixiNodesSelection().value[0].x,
        pixiNodesSelection().value[0].y,
        pixiNodesSelection().value[0].width,
        pixiNodesSelection().value[0].height
      );
    }
  }

  function canvasMouseDown(event: MouseEvent) {
    if (pixiSelection().value.length) {
      pixiSelection().value = [];
      pixiNodesSelection().value = [];
      removeSelector();
    }
  }

  function removeSelector() {
    const selectorTop = container.getChildByName("selectorTop");
    const selectorLeft = container.getChildByName("selectorLeft");
    const selectorRight = container.getChildByName("selectorRight");
    const selectorBottom = container.getChildByName("selectorBottom");
    const selectorTopLeft = container.getChildByName("selectorTopLeft");
    const selectorTopRight = container.getChildByName("selectorTopRight");
    const selectorBottomLeft = container.getChildByName("selectorBottomLeft");
    const selectorBottomRight = container.getChildByName("selectorBottomRight");

    selectorTop.parent.removeChild(selectorTop);
    selectorLeft.parent.removeChild(selectorLeft);
    selectorRight.parent.removeChild(selectorRight);
    selectorBottom.parent.removeChild(selectorBottom);
    selectorTopLeft.parent.removeChild(selectorTopLeft);
    selectorTopRight.parent.removeChild(selectorTopRight);
    selectorBottomLeft.parent.removeChild(selectorBottomLeft);
    selectorBottomRight.parent.removeChild(selectorBottomRight);
  }
}
