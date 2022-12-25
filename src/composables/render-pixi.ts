import { Node, useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import * as PIXI from "pixi.js";
import { createElement, getElementById } from "../utils/get-element-by-id";
import { Sprite } from "pixi.js";
import { Selector } from "../utils/class-selector";
import { HoverOutline } from "../utils/render-hover-outline";
import { RectangleNode } from "../utils/class-rectangle-node";
import { usePixiStore } from "../stores/pixi";
import { resizeBottomRight } from "./render-selector";

export const pixiScale = () => useState("pixiScale", () => 1);
export const pixiSelection = () =>
  useState<string[]>("pixiSelection", () => []);
export const pixiNodesSelection = () =>
  useState<PIXI.Sprite[]>("pixiNodesSelection", () => []);
export const pixiContainer = () =>
  useState<PIXI.Container | null>("pixiContainer", () => null);
export const pixiApp = () =>
  useState<PIXI.Application | null>("pixiApp", () => null);

let hoverOutline: HoverOutline | null = null;

export function renderPixi() {
  const squareStore = useSquareStore();
  const selectToi = useCounterStore();
  const pixiStore = usePixiStore();
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
  canvasWrapper.addEventListener("wheel", pixiPinchZoom);
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
      node.on("mouseover", setHoverOutline, node);
      node.on("mouseout", destroyHoverOutline);

      if (i.children && i.children.length) {
        renderNodes(i.children, node);
      }
    });
  }

  let dragTarget: PIXI.Sprite | null = null;
  let prevX: number = 0;
  let prevY: number = 0;

  function onDragMove(event: MouseEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();

    if (dragTarget) {
      setDragSnap(event, dragTarget, prevX, prevY);

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

    dragTarget = this as PIXI.Sprite | RectangleNode;

    if (hoverOutline) {
      destroyHoverOutline();
    }
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
    destroyLines();

    dragTarget = null;

    window.removeEventListener("mousemove", onDragMove);
    window.removeEventListener("mouseup", onDragEnd);
  }

  let selector: Selector | null;
  let newRectangle: RectangleNode | null;
  let selectorPointX: number | null = 0;
  let selectorPointY: number | null = 0;

  function canvasMouseDown(event: MouseEvent) {
    if (pixiSelection().value.length) {
      pixiSelection().value = [];
      pixiNodesSelection().value = [];
      removeSelector();
    }

    if (pixiStore.canvasEvent === "default") {
      selector = new Selector(event.clientX - 296, event.clientY - 56);

      selectorPointX = Math.round(event.clientX - 296);
      selectorPointY = Math.round(event.clientY - 56);

      appStage.addChild(selector);

      window.addEventListener("mousemove", selectorDrag);
      window.addEventListener("mouseup", selectorDragEnd);
    } else if (pixiStore.canvasEvent === "createRectangle") {
      selectorPointX =
        Math.round(event.clientX - 296 - container.x) / container.scale.x;
      selectorPointY =
        Math.round(event.clientY - 56 - container.y) / container.scale.x;

      const id = useCreateId();
      newRectangle = createElement(
        Sprite,
        id,
        PIXI.Texture.WHITE
      ) as RectangleNode;
      newRectangle.name = id;
      newRectangle.x = selectorPointX as number;
      newRectangle.y = selectorPointY as number;
      newRectangle.width = 0;
      newRectangle.height = 0;
      newRectangle.tint = PIXI.utils.string2hex("D9D9D9");
      newRectangle.interactive = true;

      container.addChild(newRectangle);
      newRectangle.on("mousedown", onDragStart, newRectangle);
      newRectangle.on("mouseover", setHoverOutline, newRectangle);
      newRectangle.on("mouseout", destroyHoverOutline);

      if (
        !pixiSelection().value.find(
          (id) => id === newRectangle.name && pixiSelection().value.length
        )
      ) {
        if (pixiSelection().value.length || pixiNodesSelection().value.length) {
          pixiSelection().value = [];
          pixiNodesSelection().value = [];
          removeSelector();
        }
        pixiSelection().value.push(newRectangle.name);
        pixiNodesSelection().value.push(newRectangle);
        renderSelector(
          newRectangle.x,
          newRectangle.y,
          newRectangle.width,
          newRectangle.height,
          container
        );
      }
      resizeBottomRight(event);
    }
  }

  function selectorDrag(event: MouseEvent) {
    const initialPointX = selectorPointX as number;
    const initialPointY = selectorPointY as number;

    if (pixiStore.canvasEvent === "default" && selector !== null) {
      const currX = Math.round(event.clientX - 296);
      const currY = Math.round(event.clientY - 56);
      if (currX == initialPointX && !(currY == initialPointY)) {
        selector.setLeft(initialPointX);

        if (currY > initialPointY) {
          selector.setTop(initialPointY);
          selector.setDimensions(0, currY - initialPointY);
        } else {
          selector.setTop(currY);
          selector.setDimensions(0, initialPointY - currY);
        }
      }
      if (!(currX == initialPointX) && currY == initialPointY) {
        selector.setTop(initialPointY);

        if (currX > initialPointX) {
          selector.setLeft(initialPointX);
          selector.setDimensions(currX - initialPointX, 0);
        } else {
          selector.setLeft(currX);
          selector.setDimensions(initialPointX - currX, 0);
        }
      }
      if (currX == initialPointX && currY == initialPointY) {
        selector.setLeft(initialPointX);
        selector.setTop(initialPointY);
        selector.setDimensions(0, 0);
      }
      if (currX > initialPointX && currY > initialPointY) {
        selector.setLeft(initialPointX);
        selector.setTop(initialPointY);
        selector.setDimensions(currX - initialPointX, currY - initialPointY);
      }
      if (currX < initialPointX && currY > initialPointY) {
        selector.setLeft(currX);
        selector.setTop(initialPointY);
        selector.setDimensions(initialPointX - currX, currY - initialPointY);
      }
      if (currX > initialPointX && currY < initialPointY) {
        selector.setLeft(initialPointX);
        selector.setTop(currY);
        selector.setDimensions(currX - initialPointX, initialPointY - currY);
      }
      if (currX < initialPointX && currY < initialPointY) {
        selector.setLeft(currX);
        selector.setTop(currY);
        selector.setDimensions(initialPointX - currX, initialPointY - currY);
      }
    } else if (
      pixiStore.canvasEvent === "createRectangle" &&
      newRectangle !== null
    ) {
      const currX =
        Math.round(event.clientX - 296 - container.x) / container.scale.x;
      const currY =
        Math.round(event.clientY - 56 - container.y) / container.scale.x;

      if (currX > initialPointX && currY > initialPointY) {
        newRectangle.x = initialPointX;
        newRectangle.y = initialPointY;
        newRectangle.width = currX - initialPointX;
        newRectangle.height = currY - initialPointY;
      }
    }
  }

  function selectorDragEnd(event: MouseEvent) {
    if (pixiStore.canvasEvent === "default" && selector !== null) {
      selector.destroy({ texture: true });
      selector = null;
    }
    if (pixiStore.canvasEvent === "createRectangle" && newRectangle !== null) {
      newRectangle = null;
    }
    selectorPointX = null;
    selectorPointY = null;

    window.removeEventListener("mousemove", selectorDrag);
    window.removeEventListener("mouseup", selectorDragEnd);
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

  function setHoverOutline() {
    if (
      !pixiNodesSelection().value.length ||
      (pixiNodesSelection().value.length &&
        this.name !== pixiNodesSelection().value[0].name)
    ) {
      const currX = Math.round(this.x * container.scale.x + container.x);
      const currY = Math.round(this.y * container.scale.x + container.y);
      const currWidth = Math.round(this.width * container.scale.x);
      const currHeight = Math.round(this.height * container.scale.x);

      if (!hoverOutline) {
        hoverOutline = new HoverOutline(currX, currY, currWidth, currHeight);
        appStage.addChild(hoverOutline);
      }
      hoverOutline.setDimensions(currX, currY, currWidth, currHeight);
    } else if (hoverOutline) {
      destroyHoverOutline();
    }
  }

  function destroyHoverOutline() {
    if (hoverOutline !== null) {
      hoverOutline.clear();
      hoverOutline.destroy();
      appStage.removeChild(hoverOutline);
      hoverOutline = null;
    }
  }
}
