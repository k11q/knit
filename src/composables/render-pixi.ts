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

  app.stage.hitArea = app.screen;

  let canvasWrapper = document.querySelector("#canvas-wrapper") as HTMLElement;

  canvasWrapper.appendChild(app.view);

  app.stage.x = squareStore.offsetLeft;
  app.stage.y = squareStore.offsetTop;
  app.stage.scale.x = squareStore.scale;
  app.stage.scale.y = squareStore.scale;

  renderNodes(nodes, app.stage);

  function renderNodes(nodes: Node[], parent) {
    nodes.forEach((i, index) => {
      const node = new PIXI.Sprite(PIXI.Texture.WHITE);

      parent.addChild(node);

      watchEffect(() => {
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
      });

      node.interactive = true;
      node.cursor = "pointer";
      node.on("mousedown", onDragStart, node);

      if (i.children && i.children.length) {
        renderNodes(i.children, node);
      }
    });
  }

  let dragTarget: PIXI.Sprite | null = null;

  function onDragMove(event: MouseEvent) {
    if (dragTarget) {
      dragTarget.x = event.clientX - 300 - 20;
      dragTarget.y = event.clientY - 60 - 50;
    }
  }

  function onDragStart(event: MouseEvent) {
    event.stopPropagation();

    this.alpha = 0.5;
    dragTarget = this;

    app.stage.interactive = true;

    app.stage.addEventListener("mousemove", onDragMove);
    app.stage.addEventListener("mouseup", onDragEnd);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.interactive = false;
      dragTarget.alpha = 1;
      dragTarget = null;

      app.stage.removeEventListener("mousemove", onDragMove);
      app.stage.removeEventListener("mouseup", onDragEnd);
    }
  }
}
