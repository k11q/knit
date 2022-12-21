import { Node, useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import * as PIXI from "pixi.js";
import { OutlineFilter } from "@pixi/filter-outline";
import { pixiScale } from "./render-pixi";

export function renderSelector(
  left: number,
  top: number,
  width: number,
  height: number,
  parent: PIXI.Container
) {
  const selectorLineThickness = 1 / pixiScale().value;
  const selectorLineHalfThickness = 0.5 / pixiScale().value;
  const cornerSelectorSize = 6 / pixiScale().value;
  const cornerSelectorHalfSize = cornerSelectorSize / 2;
  const right = left + width;
  const bottom = top + height;
  const selectorColor = PIXI.utils.string2hex("0191FA");
  const outlineSelector = new OutlineFilter(1, selectorColor, 1);

  const selectorTop = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTop.x = left;
  selectorTop.y = top - selectorLineHalfThickness;
  selectorTop.width = width;
  selectorTop.height = selectorLineThickness;
  selectorTop.tint = selectorColor;
  selectorTop.name = "selectorTop";

  const selectorLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorLeft.x = left - selectorLineHalfThickness;
  selectorLeft.y = top;
  selectorLeft.width = selectorLineThickness;
  selectorLeft.height = height;
  selectorLeft.tint = selectorColor;
  selectorLeft.name = "selectorLeft";

  const selectorRight = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorRight.x = right - selectorLineHalfThickness;
  selectorRight.y = top;
  selectorRight.width = selectorLineThickness;
  selectorRight.height = height + selectorLineThickness;
  selectorRight.tint = selectorColor;
  selectorRight.name = "selectorRight";

  const selectorBottom = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottom.x = left;
  selectorBottom.y = bottom - selectorLineHalfThickness;
  selectorBottom.width = width + selectorLineThickness;
  selectorBottom.height = selectorLineThickness;
  selectorBottom.tint = selectorColor;
  selectorBottom.name = "selectorBottom";

  const selectorTopLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTopLeft.x = left - cornerSelectorHalfSize;
  selectorTopLeft.y = top - cornerSelectorHalfSize;
  selectorTopLeft.width = cornerSelectorSize;
  selectorTopLeft.height = cornerSelectorSize;
  selectorTopLeft.tint = PIXI.utils.string2hex("FFFFFF");
  selectorTopLeft.name = "selectorTopLeft";
  selectorTopLeft.filters = [outlineSelector];

  const selectorTopRight = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTopRight.x = right - cornerSelectorHalfSize;
  selectorTopRight.y = top - cornerSelectorHalfSize;
  selectorTopRight.width = cornerSelectorSize;
  selectorTopRight.height = cornerSelectorSize;
  selectorTopRight.tint = PIXI.utils.string2hex("FFFFFF");
  selectorTopRight.name = "selectorTopRight";
  selectorTopRight.filters = [outlineSelector];

  const selectorBottomLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottomLeft.x = left - cornerSelectorHalfSize;
  selectorBottomLeft.y = bottom - cornerSelectorHalfSize;
  selectorBottomLeft.width = cornerSelectorSize;
  selectorBottomLeft.height = cornerSelectorSize;
  selectorBottomLeft.tint = PIXI.utils.string2hex("FFFFFF");
  selectorBottomLeft.name = "selectorBottomLeft";
  selectorBottomLeft.filters = [outlineSelector];

  const selectorBottomRight = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottomRight.x = right - cornerSelectorHalfSize;
  selectorBottomRight.y = bottom - cornerSelectorHalfSize;
  selectorBottomRight.width = cornerSelectorSize;
  selectorBottomRight.height = cornerSelectorSize;
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
}
