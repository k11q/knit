import * as PIXI from "pixi.js";
import { createElement, getElementById } from "../utils/get-element-by-id";
import { Sprite } from "pixi.js";

type Line = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Point = {
  x: number;
  y: number;
};

type LinePosition = {
  lineTop?: number;
  lineMiddleY?: number;
  lineBottom?: number;
  lineLeft?: number;
  lineMiddleX?: number;
  lineRight?: number;
  lineMiddle?: number;
};

type OriginLinePosition = {
  lineTop: number;
  lineMiddleY: number;
  lineBottom: number;
  lineLeft: number;
  lineMiddleX: number;
  lineRight: number;
};

type Position = "left" | "middleX" | "right" | "top" | "middleY" | "bottom";

type Axis = "horizontal" | "vertical";

const intersectionSensitivity = 5;
let snapLines: LinePosition = {};
let renderedLinesId: string[] = [];

export function setDragSnap(
  event: MouseEvent,
  id: string,
  prevX: number,
  prevY: number
) {
  const origin = getElementById(id) as PIXI.Sprite;
  const originNode = setOriginPosition(event, origin, prevX, prevY);
  const originSiblings = setOriginSiblings(origin);

  let snapLinesPlaceholder = {} as LinePosition;

  if (originSiblings.length) {
    originSiblings.forEach((sibling) => {
      const lineHorizontal: number[] = [
        sibling.x,
        sibling.x + sibling.width / 2,
        sibling.x + sibling.width,
      ];
      const lineVertical: number[] = [
        sibling.y,
        sibling.y + sibling.height / 2,
        sibling.y + sibling.height,
      ];

      lineHorizontal.forEach((x) => {
        if (checkIntersection(originNode.lineLeft, x)) {
          if (
            !snapLinesPlaceholder.lineLeft ||
            (snapLinesPlaceholder.lineLeft &&
              originNode.lineLeft - x <
                originNode.lineLeft - snapLinesPlaceholder.lineLeft)
          ) {
            snapLinesPlaceholder.lineLeft = x;
          }
        }
        if (checkIntersection(originNode.lineMiddleX, x)) {
          if (
            !snapLinesPlaceholder.lineMiddleX ||
            (snapLinesPlaceholder.lineMiddleX &&
              originNode.lineMiddleX - x <
                originNode.lineMiddleX - snapLinesPlaceholder.lineMiddleX)
          ) {
            snapLinesPlaceholder.lineMiddleX = x;
          }
        }
        if (checkIntersection(originNode.lineRight, x)) {
          if (
            !snapLinesPlaceholder.lineRight ||
            (snapLinesPlaceholder.lineRight &&
              originNode.lineRight - x <
                originNode.lineRight - snapLinesPlaceholder.lineRight)
          ) {
            snapLinesPlaceholder.lineRight = x;
          }
        }
      });

      lineVertical.forEach((y) => {
        if (checkIntersection(originNode.lineTop, y)) {
          if (
            !snapLinesPlaceholder.lineTop ||
            (snapLinesPlaceholder.lineTop &&
              originNode.lineTop - y <
                originNode.lineTop - snapLinesPlaceholder.lineTop)
          ) {
            snapLinesPlaceholder.lineTop = y;
          }
        }
        if (checkIntersection(originNode.lineMiddleY, y)) {
          if (
            !snapLinesPlaceholder.lineMiddleY ||
            (snapLinesPlaceholder.lineMiddleY &&
              originNode.lineMiddleY - y <
                originNode.lineMiddleY - snapLinesPlaceholder.lineMiddleY)
          ) {
            snapLinesPlaceholder.lineMiddleY = y;
          }
        }
        if (checkIntersection(originNode.lineBottom, y)) {
          if (
            !snapLinesPlaceholder.lineBottom ||
            (snapLinesPlaceholder.lineBottom &&
              originNode.lineBottom - y <
                originNode.lineBottom - snapLinesPlaceholder.lineBottom)
          ) {
            snapLinesPlaceholder.lineBottom = y;
          }
        }
      });
    });

    //check if theres 2 lines on same axis: cancel out farther
    snapLines = findClosestIntersection(originNode, snapLinesPlaceholder);

    if (
      (snapLines.lineLeft ||
        snapLines.lineMiddleX ||
        snapLines.lineRight ||
        snapLines.lineTop ||
        snapLines.lineMiddleY ||
        snapLines.lineBottom) &&
      renderedLinesId
    ) {
      if (snapLines.lineLeft) {
        renderLine("vertical", snapLines.lineLeft);
      }
      if (snapLines.lineMiddleX) {
        renderLine("vertical", snapLines.lineMiddleX);
      }
      if (snapLines.lineRight) {
        renderLine("vertical", snapLines.lineRight);
      }
      if (snapLines.lineTop) {
        renderLine("horizontal", snapLines.lineTop);
      }
      if (snapLines.lineMiddleY) {
        renderLine("horizontal", snapLines.lineMiddleY);
      }
      if (snapLines.lineBottom) {
        renderLine("horizontal", snapLines.lineBottom);
      }
    } else if (renderedLinesId) {
      destroyLines(renderedLinesId);
    }
  }
}

function setOriginPosition(
  event: MouseEvent,
  origin: PIXI.Sprite,
  prevX: number,
  prevY: number
): OriginLinePosition {
  const container = getElementById("root-container")!;
  return {
    lineTop: (event.clientY - 56) / container.scale.x - prevY,
    lineMiddleY:
      (event.clientY - 56) / container.scale.x - prevY + origin.height / 2,
    lineBottom:
      (event.clientY - 56) / container.scale.x - prevY + origin.height,
    lineLeft: (event.clientX - 296) / container.scale.x - prevX,
    lineMiddleX:
      (event.clientX - 296) / container.scale.x - prevX + origin.width / 2,
    lineRight: (event.clientX - 296) / container.scale.x - prevX + origin.width,
  };
}

function setOriginSiblings(origin: PIXI.Sprite): PIXI.Sprite[] {
  if (origin.parent.children.length) {
    const filteredSiblings = [
      ...origin.parent.children.filter(
        (i) =>
          i.name !== origin.name &&
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
    return filteredSiblings as PIXI.Sprite[];
  } else return [];
}

function checkIntersection(origin: number, measured: number) {
  if (
    origin < measured + intersectionSensitivity &&
    origin > measured - intersectionSensitivity
  ) {
    return true;
  } else return false;
}

function findClosestIntersection(
  originNode: OriginLinePosition,
  snapLinesPlaceholder: LinePosition
) {
  if (
    snapLinesPlaceholder.lineLeft ||
    snapLinesPlaceholder.lineMiddleX ||
    snapLinesPlaceholder.lineRight ||
    snapLinesPlaceholder.lineTop ||
    snapLinesPlaceholder.lineMiddleY ||
    snapLinesPlaceholder.lineBottom
  ) {
    if (snapLinesPlaceholder.lineLeft && snapLinesPlaceholder.lineMiddleX) {
      snapLinesPlaceholder.lineLeft - originNode.lineLeft >
      snapLinesPlaceholder.lineMiddleX - originNode.lineMiddleX
        ? (snapLinesPlaceholder.lineMiddleX = undefined)
        : (snapLinesPlaceholder.lineLeft = undefined);
    }
    if (snapLinesPlaceholder.lineLeft && snapLinesPlaceholder.lineRight) {
      snapLinesPlaceholder.lineLeft - originNode.lineLeft >
      snapLinesPlaceholder.lineRight - originNode.lineRight
        ? (snapLinesPlaceholder.lineRight = undefined)
        : (snapLinesPlaceholder.lineLeft = undefined);
    }
    if (snapLinesPlaceholder.lineMiddleX && snapLinesPlaceholder.lineRight) {
      snapLinesPlaceholder.lineMiddleX - originNode.lineMiddleX >
      snapLinesPlaceholder.lineRight - originNode.lineRight
        ? (snapLinesPlaceholder.lineRight = undefined)
        : (snapLinesPlaceholder.lineMiddleX = undefined);
    }

    if (snapLinesPlaceholder.lineTop && snapLinesPlaceholder.lineMiddleY) {
      snapLinesPlaceholder.lineTop - originNode.lineTop >
      snapLinesPlaceholder.lineMiddleY - originNode.lineMiddleY
        ? (snapLinesPlaceholder.lineMiddleY = undefined)
        : (snapLinesPlaceholder.lineTop = undefined);
    }
    if (snapLinesPlaceholder.lineTop && snapLinesPlaceholder.lineBottom) {
      snapLinesPlaceholder.lineTop - originNode.lineTop >
      snapLinesPlaceholder.lineBottom - originNode.lineBottom
        ? (snapLinesPlaceholder.lineBottom = undefined)
        : (snapLinesPlaceholder.lineTop = undefined);
    }
    if (snapLinesPlaceholder.lineMiddleY && snapLinesPlaceholder.lineBottom) {
      snapLinesPlaceholder.lineMiddleY - originNode.lineMiddleY >
      snapLinesPlaceholder.lineBottom - originNode.lineBottom
        ? (snapLinesPlaceholder.lineBottom = undefined)
        : (snapLinesPlaceholder.lineMiddleY = undefined);
    }
  }
  return snapLinesPlaceholder;
}

function renderLine(axis: Axis, position: number) {
  const randomId = useCreateId();
  const line = createElement(Sprite, randomId, PIXI.Texture.WHITE);
  const container = getElementById("root-container")!;
  renderedLinesId.push(randomId);

  if (axis === "vertical") {
    line.x = position * container.scale.x + container.x;
    line.y = 0;
    line.width = 1;
    line.height = window.innerHeight - 56;
  } else {
    line.x = 0;
    line.y = position * container.scale.x + container.y;
    line.width = window.innerWidth - 240;
    line.height = 1;
  }
  line.tint = 0x2f4fff;

  pixiApp().value.stage.addChild(line);
}

function destroyLines(ids: string[]) {
  ids.forEach((id) => {
    const element = getElementById(id)!;
    element.parent.removeChild(element);
    const index = ids.indexOf(id);
    if (index > -1) {
      ids.splice(index, 1);
    }
  });
}

function setLines(lines: Line[]) {}

function setPoints(points: Point[]) {}
