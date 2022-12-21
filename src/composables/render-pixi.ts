import { Node, useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import * as PIXI from "pixi.js";

export function renderPixi() {
  const squareStore = useSquareStore();
  const selectToi = useCounterStore();
  const nodes = selectToi.data;

  let app = new PIXI.Application({
    width: window.innerWidth - 240,
    height: 1796,
    backgroundColor: "#1E1E1E",
  });

  const container = app.stage;

  app.stage.hitArea = app.screen;
  app.stage.interactive = true;

  let canvasWrapper = document.querySelector("#canvas-wrapper") as HTMLElement;

  canvasWrapper.appendChild(app.view);
  canvasWrapper.addEventListener("wheel", pinchZoom);

  app.stage.x = squareStore.offsetLeft;
  app.stage.y = squareStore.offsetTop;
  app.stage.scale.x = squareStore.scale;
  app.stage.scale.y = squareStore.scale;

  renderNodes(nodes, app.stage);

  function renderNodes(nodes: Node[], parent) {
    nodes.forEach((i, index) => {
      const node = new PIXI.Sprite(PIXI.Texture.WHITE);

      parent.addChild(node);

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
        i.cssRules[0].style.width?.value &&
        typeof i.cssRules[0].style.width?.value === "number"
      ) {
        node.width = i.cssRules[0].style.width?.value;
      } else {
        node.width = 0;
      }
      if (
        i.cssRules[0].style.height?.value &&
        typeof i.cssRules[0].style.height?.value === "number"
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
      node.cursor = "pointer";
      node.on("mousedown", onDragStart, node);

      if (i.children && i.children.length) {
        renderNodes(i.children, node);
      }
    });
  }

  let dragTarget: PIXI.Sprite | null = null;
  let prevX: number = 0;
  let prevY: number = 0;

  function onDragMove(event: MouseEvent) {
    if (dragTarget) {
      dragTarget.x = (event.clientX - 296) / container.scale.x - prevX;
      dragTarget.y = (event.clientY - 56) / container.scale.x - prevY;
    }
  }

  function onDragStart(event: MouseEvent) {
    event.stopPropagation();

    console.log(this);
    dragTarget = this;

    if (dragTarget) {
      prevX =
        event.clientX / container.scale.x -
        (dragTarget.x + 296 / container.scale.x);
      prevY =
        event.clientY / container.scale.x -
        (dragTarget.y + 56 / container.scale.x);
    }

    canvasWrapper.addEventListener("mousemove", onDragMove);
    canvasWrapper.addEventListener("mouseup", onDragEnd);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.interactive = false;
      dragTarget = null;

      canvasWrapper.removeEventListener("mousemove", onDragMove);
      canvasWrapper.removeEventListener("mouseup", onDragEnd);
    }
  }

  function pinchZoom(event) {
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
  }
}
