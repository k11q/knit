import { Node, useCounterStore } from "@/stores/counter";
import { useSquareStore } from "@/stores/dataSquare";
import * as PIXI from "pixi.js";
import { pixiContainer, pixiScale } from "./render-pixi";

export function renderSelector(
  left: number,
  top: number,
  width: number,
  height: number,
  parent: PIXI.Container
) {
  const selectorColor = PIXI.utils.string2hex("0191FA");
  const colorWhite = PIXI.utils.string2hex("FFFFFF");

  const selectorTop = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTop.tint = selectorColor;
  selectorTop.name = "selectorTop";
  selectorTop.interactive = true;
  selectorTop.hitArea = new PIXI.Rectangle(0, -50, width, 100);
  selectorTop.cursor = "ns-resize";
  selectorTop.on("mousedown", resizeTop);

  const selectorLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorLeft.tint = selectorColor;
  selectorLeft.name = "selectorLeft";
  selectorLeft.interactive = true;
  selectorLeft.hitArea = new PIXI.Rectangle(-50, 0, 100, height);
  selectorLeft.cursor = "ew-resize";
  selectorLeft.on("mousedown", resizeLeft);

  const selectorRight = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorRight.tint = selectorColor;
  selectorRight.name = "selectorRight";
  selectorRight.interactive = true;
  selectorRight.hitArea = new PIXI.Rectangle(-50, 0, 100, height);
  selectorRight.cursor = "ew-resize";
  selectorRight.on("mousedown", resizeRight);

  const selectorBottom = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottom.tint = selectorColor;
  selectorBottom.name = "selectorBottom";
  selectorBottom.interactive = true;
  selectorBottom.hitArea = new PIXI.Rectangle(0, -50, width, 100);
  selectorBottom.cursor = "ns-resize";
  selectorBottom.on("mousedown", resizeBottom);

  const selectorTopLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTopLeft.tint = selectorColor;
  selectorTopLeft.name = "selectorTopLeft";
  selectorTopLeft.interactive = true;
  selectorTopLeft.hitArea = new PIXI.Rectangle(-25, -25, 100, 100);
  selectorTopLeft.cursor = "nwse-resize";
  selectorTopLeft.on("mousedown", resizeTopLeft);

  const selectorTopLeftInner = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTopLeftInner.tint = colorWhite;
  selectorTopLeftInner.name = "selectorTopLeftInner";
  selectorTopLeftInner.position.set(
    (selectorTopLeft.x + selectorTopLeft.width) / 2,
    (selectorTopLeft.y + selectorTopLeft.height) / 2
  );
  selectorTopLeftInner.width = (selectorTopLeft.width * 3) / 4;
  selectorTopLeftInner.height = (selectorTopLeft.height * 3) / 4;
  selectorTopLeftInner.anchor.set(0.5, 0.5);
  selectorTopLeft.addChild(selectorTopLeftInner);

  const selectorTopRight = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTopRight.tint = selectorColor;
  selectorTopRight.name = "selectorTopRight";
  selectorTopRight.interactive = true;
  selectorTopRight.hitArea = new PIXI.Rectangle(-25, -25, 100, 100);
  selectorTopRight.cursor = "nesw-resize";
  selectorTopRight.on("mousedown", resizeTopRight);

  const selectorTopRightInner = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorTopRightInner.tint = colorWhite;
  selectorTopRightInner.name = "selectorTopRightInner";
  selectorTopRightInner.position.set(
    (selectorTopRight.x + selectorTopRight.width) / 2,
    (selectorTopRight.y + selectorTopRight.height) / 2
  );
  selectorTopRightInner.width = (selectorTopRight.width * 3) / 4;
  selectorTopRightInner.height = (selectorTopRight.height * 3) / 4;
  selectorTopRightInner.anchor.set(0.5, 0.5);
  selectorTopRight.addChild(selectorTopRightInner);

  const selectorBottomLeft = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottomLeft.tint = selectorColor;
  selectorBottomLeft.name = "selectorBottomLeft";
  selectorBottomLeft.interactive = true;
  selectorBottomLeft.hitArea = new PIXI.Rectangle(-25, -25, 100, 100);
  selectorBottomLeft.cursor = "nesw-resize";
  selectorBottomLeft.on("mousedown", resizeBottomLeft);

  const selectorBottomLeftInner = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottomLeftInner.tint = colorWhite;
  selectorBottomLeftInner.name = "selectorBottomLeftInner";
  selectorBottomLeftInner.position.set(
    (selectorBottomLeft.x + selectorBottomLeft.width) / 2,
    (selectorBottomLeft.y + selectorBottomLeft.height) / 2
  );
  selectorBottomLeftInner.width = (selectorBottomLeft.width * 3) / 4;
  selectorBottomLeftInner.height = (selectorBottomLeft.height * 3) / 4;
  selectorBottomLeftInner.anchor.set(0.5, 0.5);
  selectorBottomLeft.addChild(selectorBottomLeftInner);

  const selectorBottomRight = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottomRight.tint = selectorColor;
  selectorBottomRight.name = "selectorBottomRight";
  selectorBottomRight.interactive = true;
  selectorBottomRight.hitArea = new PIXI.Rectangle(-25, -25, 100, 100);
  selectorBottomRight.cursor = "nwse-resize";
  selectorBottomRight.on("mousedown", resizeBottomRight);

  const selectorBottomRightInner = new PIXI.Sprite(PIXI.Texture.WHITE);
  selectorBottomRightInner.tint = colorWhite;
  selectorBottomRightInner.name = "selectorBottomRightInner";
  selectorBottomRightInner.position.set(
    (selectorBottomRight.x + selectorBottomRight.width) / 2,
    (selectorBottomRight.y + selectorBottomRight.height) / 2
  );
  selectorBottomRightInner.width = (selectorBottomRight.width * 3) / 4;
  selectorBottomRightInner.height = (selectorBottomRight.height * 3) / 4;
  selectorBottomRightInner.anchor.set(0.5, 0.5);
  selectorBottomRight.addChild(selectorBottomRightInner);

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
  const cornerSelectorSize = 8 / pixiScale().value;
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

function changeWidthForward(node: PIXI.Sprite, value: number) {
  const prevTop = pixiNodesSelection().value[0].y;
  const prevLeft = pixiNodesSelection().value[0].x;
  const prevHeight = pixiNodesSelection().value[0].height;

  updateSelector(prevLeft, prevTop, value, prevHeight);

  node.width = value;
}

function changeHeightForward(node: PIXI.Sprite, value: number) {
  const prevTop = pixiNodesSelection().value[0].y;
  const prevLeft = pixiNodesSelection().value[0].x;
  const prevWidth = pixiNodesSelection().value[0].width;

  updateSelector(prevLeft, prevTop, prevWidth, value);

  node.height = value;
}

function changeTop(node: PIXI.Sprite, valueTop: number, valueHeight: number) {
  const prevLeft = pixiNodesSelection().value[0].x;
  const prevWidth = pixiNodesSelection().value[0].width;

  updateSelector(prevLeft, valueTop, prevWidth, valueHeight);
  node.y = valueTop;
  node.height = valueHeight;
}

function changeLeft(node: PIXI.Sprite, valueLeft: number, valueWidth: number) {
  const prevTop = pixiNodesSelection().value[0].y;
  const prevHeight = pixiNodesSelection().value[0].height;

  updateSelector(valueLeft, prevTop, valueWidth, prevHeight);
  node.x = valueLeft;
  node.width = valueWidth;
}

function resizeRight(event: MouseEvent) {
  if (pixiSelection().value.length) {
    event.stopPropagation();

    const prevWidth = pixiNodesSelection().value[0].width;
    const prevX = (event.clientX - 296) / pixiScale().value;
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();

      const width = Math.round(
        (event.clientX - 296) / pixiScale().value - prevX + prevWidth
      );
      changeWidthForward(pixiNodesSelection().value[0], width);
    }
    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

function resizeBottom(event: MouseEvent) {
  if (pixiSelection().value.length) {
    event.stopPropagation();

    const prevHeight = pixiNodesSelection().value[0].height;
    const prevY = (event.clientY - 56) / pixiScale().value;
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();

      const height = Math.round(
        (event.clientY - 56) / pixiScale().value - prevY + prevHeight
      );
      changeHeightForward(pixiNodesSelection().value[0], height);
    }
    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

function resizeTop(event: MouseEvent) {
  if (pixiSelection().value.length) {
    event.stopPropagation();

    const prevTop = pixiNodesSelection().value[0].y;
    const prevHeight = pixiNodesSelection().value[0].height;
    const prevY = (event.clientY - 56) / pixiScale().value;
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();

      const top = Math.round(
        (event.clientY - 56) / pixiScale().value - prevY + prevTop
      );
      const height = Math.round(
        prevY - (event.clientY - 56) / pixiScale().value + prevHeight
      );

      changeTop(pixiNodesSelection().value[0], top, height);
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

function resizeLeft(event: MouseEvent) {
  if (pixiSelection().value.length) {
    event.stopPropagation();

    const prevLeft = pixiNodesSelection().value[0].x;
    const prevWidth = pixiNodesSelection().value[0].width;
    const prevX = (event.clientX - 296) / pixiScale().value;
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();

      const left = Math.round(
        (event.clientX - 296) / pixiScale().value - prevX + prevLeft
      );
      const width = Math.round(
        prevX - (event.clientX - 296) / pixiScale().value + prevWidth
      );

      changeLeft(pixiNodesSelection().value[0], left, width);
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

export function resizeBottomRight(event: MouseEvent) {
  if (pixiSelection().value.length) {
    event.stopPropagation();

    const prevLeft = pixiNodesSelection().value[0].x;
    const prevTop = pixiNodesSelection().value[0].y;
    const prevHeight = pixiNodesSelection().value[0].height;
    const prevY = (event.clientY - 56) / pixiScale().value;
    const prevWidth = pixiNodesSelection().value[0].width;
    const prevX = (event.clientX - 296) / pixiScale().value;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();

      if (event.clientY > prevHeight && event.clientX > prevWidth) {
        const height = Math.round(
          (event.clientY - 56) / pixiScale().value - prevY + prevHeight
        );
        const width = Math.round(
          (event.clientX - 296) / pixiScale().value - prevX + prevWidth
        );

        updateSelector(prevLeft, prevTop, width, height);
        pixiNodesSelection().value[0].width = width;
        pixiNodesSelection().value[0].height = height;
      }
    }
    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

function resizeBottomLeft(event: MouseEvent) {
  if (pixiSelection().value.length) {
    event.stopPropagation();

    const prevLeft = pixiNodesSelection().value[0].x;
    const prevTop = pixiNodesSelection().value[0].y;
    const prevHeight = pixiNodesSelection().value[0].height;
    const prevY = (event.clientY - 56) / pixiScale().value;
    const prevWidth = pixiNodesSelection().value[0].width;
    const prevX = (event.clientX - 296) / pixiScale().value;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();

      const left = Math.round(
        (event.clientX - 296) / pixiScale().value - prevX + prevLeft
      );
      const height = Math.round(
        (event.clientY - 56) / pixiScale().value - prevY + prevHeight
      );
      const width = Math.round(
        prevX - (event.clientX - 296) / pixiScale().value + prevWidth
      );

      updateSelector(left, prevTop, width, height);
      pixiNodesSelection().value[0].width = width;
      pixiNodesSelection().value[0].height = height;
      pixiNodesSelection().value[0].x = left;
    }
    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

function resizeTopLeft(event: MouseEvent) {
  if (pixiSelection().value.length) {
    event.stopPropagation();

    const prevLeft = pixiNodesSelection().value[0].x;
    const prevTop = pixiNodesSelection().value[0].y;
    const prevHeight = pixiNodesSelection().value[0].height;
    const prevY = (event.clientY - 56) / pixiScale().value;
    const prevWidth = pixiNodesSelection().value[0].width;
    const prevX = (event.clientX - 296) / pixiScale().value;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();

      const left = Math.round(
        (event.clientX - 296) / pixiScale().value - prevX + prevLeft
      );
      const top = Math.round(
        (event.clientY - 56) / pixiScale().value - prevY + prevTop
      );
      const height = Math.round(
        prevY - (event.clientY - 56) / pixiScale().value + prevHeight
      );
      const width = Math.round(
        prevX - (event.clientX - 296) / pixiScale().value + prevWidth
      );

      updateSelector(left, top, width, height);
      pixiNodesSelection().value[0].width = width;
      pixiNodesSelection().value[0].height = height;
      pixiNodesSelection().value[0].x = left;
      pixiNodesSelection().value[0].y = top;
    }
    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

function resizeTopRight(event: MouseEvent) {
  if (pixiSelection().value.length) {
    event.stopPropagation();

    const prevLeft = pixiNodesSelection().value[0].x;
    const prevTop = pixiNodesSelection().value[0].y;
    const prevHeight = pixiNodesSelection().value[0].height;
    const prevY = (event.clientY - 56) / pixiScale().value;
    const prevWidth = pixiNodesSelection().value[0].width;
    const prevX = (event.clientX - 296) / pixiScale().value;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(event: MouseEvent) {
      event.stopPropagation();
      event.preventDefault();

      const top = Math.round(
        (event.clientY - 56) / pixiScale().value - prevY + prevTop
      );
      const height = Math.round(
        prevY - (event.clientY - 56) / pixiScale().value + prevHeight
      );
      const width = Math.round(
        (event.clientX - 296) / pixiScale().value - prevX + prevWidth
      );

      updateSelector(prevLeft, top, width, height);
      pixiNodesSelection().value[0].width = width;
      pixiNodesSelection().value[0].height = height;
      pixiNodesSelection().value[0].y = top;
    }
    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}
