import * as PIXI from "pixi.js";
import { RectangleNode } from "./class-rectangle-node";

const elementMap = new Map();

export function createElement(ClassType, id: string, arg?) {
  const obj: PIXI.Sprite | RectangleNode = new ClassType(arg);
  obj.once("destroyed", () => elementMap.delete(id));
  elementMap.set(id, obj);
  return obj;
}

export function getElementById(
  id: string
): PIXI.DisplayObject | PIXI.Sprite | RectangleNode | null {
  return elementMap.get(id) ?? null;
}
