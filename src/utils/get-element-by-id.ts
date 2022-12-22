import * as PIXI from "pixi.js";

const elementMap = new Map();

export function createElement(ClassType, id: string, arg?) {
  const obj: PIXI.Sprite = new ClassType(arg);
  obj.once("destroyed", () => elementMap.delete(id));
  elementMap.set(id, obj);
  return obj;
}

export function getElementById(id: string) {
  return elementMap.get(id) ?? null;
}
