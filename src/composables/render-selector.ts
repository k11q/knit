import { Node, useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import * as PIXI from "pixi.js";
import { OutlineFilter } from "@pixi/filter-outline";
import { pixiContainer, pixiScale } from "./render-pixi";

export function renderSelector(
  left: number,
  top: number,
  width: number,
  height: number,
  parent: PIXI.Container
) {
  const cornerSelectorSize = 6 / pixiScale().value;
  const selectorColor = PIXI.utils.string2hex("0191FA");
  const outlineSelector = new OutlineFilter(1, selectorColor, 1);

  const selectorTop = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTop.tint = selectorColor;
  selectorTop.name = "selectorTop";

  const selectorLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorLeft.tint = selectorColor;
  selectorLeft.name = "selectorLeft";

  const selectorRight = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorRight.tint = selectorColor;
  selectorRight.name = "selectorRight";

  selectorRight.interactive = true;
  selectorRight.cursor = "crosshair";
  selectorRight.on("mousedown", resizeRight);

  const selectorBottom = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottom.tint = selectorColor;
  selectorBottom.name = "selectorBottom";

  const selectorTopLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTopLeft.tint = PIXI.utils.string2hex("FFFFFF");
  selectorTopLeft.name = "selectorTopLeft";
  selectorTopLeft.filters = [outlineSelector];

  const selectorTopRight = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTopRight.tint = PIXI.utils.string2hex("FFFFFF");
  selectorTopRight.name = "selectorTopRight";
  selectorTopRight.filters = [outlineSelector];

  const selectorBottomLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottomLeft.tint = PIXI.utils.string2hex("FFFFFF");
  selectorBottomLeft.name = "selectorBottomLeft";
  selectorBottomLeft.filters = [outlineSelector];

  const selectorBottomRight = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottomRight.tint = PIXI.utils.string2hex("FFFFFF");
  selectorBottomRight.name = "selectorBottomRight";
  selectorBottomRight.filters = [outlineSelector];

  parent.addChild(selectorTop);
  parent.addChild(selectorLeft);
  parent.addChild(selectorRight);
  parent.addChild(selectorBottom);
  parent.addChild(selectorTopLeft);
  parent.addChild(selectorTopRight);
  parent.addChild(selectorBottomLeft);
  parent.addChild(selectorBottomRight);

  updateSelector(left, top, width, height);
}

export function updateSelector(
  left: number,
  top: number,
  width: number,
  height: number
) {
  const container = pixiContainer().value as PIXI.Container;
  const right = left + width;
  const bottom = top + height;

  const selectorLineThickness = 1 / pixiScale().value;
  const selectorLineHalfThickness = 0.5 / pixiScale().value;
  const cornerSelectorSize = 6 / pixiScale().value;
  const cornerSelectorHalfSize = cornerSelectorSize / 2;

  const selectorLeft = container.getChildByName("selectorLeft") as PIXI.Sprite;
  const selectorTop = container.getChildByName("selectorTop") as PIXI.Sprite;
  const selectorRight = container.getChildByName(
    "selectorRight"
  ) as PIXI.Sprite;
  const selectorBottom = container.getChildByName(
    "selectorBottom"
  ) as PIXI.Sprite;

  const selectorTopLeft = container.getChildByName(
    "selectorTopLeft"
  ) as PIXI.Sprite;
  const selectorTopRight = container.getChildByName(
    "selectorTopRight"
  ) as PIXI.Sprite;
  const selectorBottomLeft = container.getChildByName(
    "selectorBottomLeft"
  ) as PIXI.Sprite;
  const selectorBottomRight = container.getChildByName(
    "selectorBottomRight"
  ) as PIXI.Sprite;

  selectorLeft.x = left - selectorLineHalfThickness;
  selectorLeft.y = top;
  selectorLeft.width = selectorLineThickness;
  selectorLeft.height = height;

  selectorTop.x = left;
  selectorTop.y = top - selectorLineHalfThickness;
  selectorTop.width = width;
  selectorTop.height = selectorLineThickness;

  selectorRight.x = right - selectorLineHalfThickness;
  selectorRight.y = top;
  selectorRight.width = selectorLineThickness;
  selectorRight.height = height;

  selectorBottom.x = left;
  selectorBottom.y = bottom - selectorLineHalfThickness;
  selectorBottom.width = width;
  selectorBottom.height = selectorLineThickness;

  selectorTopLeft.x = left - cornerSelectorHalfSize;
  selectorTopLeft.y = top - cornerSelectorHalfSize;
  selectorTopLeft.width = cornerSelectorSize;
  selectorTopLeft.height = cornerSelectorSize;

  selectorTopRight.x = right - cornerSelectorHalfSize;
  selectorTopRight.y = top - cornerSelectorHalfSize;
  selectorTopRight.width = cornerSelectorSize;
  selectorTopRight.height = cornerSelectorSize;

  selectorBottomLeft.x = left - cornerSelectorHalfSize;
  selectorBottomLeft.y = bottom - cornerSelectorHalfSize;
  selectorBottomLeft.width = cornerSelectorSize;
  selectorBottomLeft.height = cornerSelectorSize;

  selectorBottomRight.x = right - cornerSelectorHalfSize;
  selectorBottomRight.y = bottom - cornerSelectorHalfSize;
  selectorBottomRight.width = cornerSelectorSize;
  selectorBottomRight.height = cornerSelectorSize;
}

function changeWidth(node: PIXI.Sprite, value: number) {
  const prevTop = pixiNodesSelection().value[0].y;
  const prevLeft = pixiNodesSelection().value[0].x;
  const prevHeight = pixiNodesSelection().value[0].height;

  updateSelector(prevLeft, prevTop, value, prevHeight);

  node.width = value;
}

function resizeRight(event: MouseEvent) {
  if (pixiSelection().value.length) {
    pixiSelection().value = [];

    const prevWidth = pixiNodesSelection().value[0].width;
    const prevX = (event.clientX - 296) / pixiScale().value;
    const selector = window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(event) {
      const width =
        (event.clientX - 296) / pixiScale().value - prevX + prevWidth;
      changeWidth(pixiNodesSelection().value[0], width);
    }
    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}
