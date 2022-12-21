import * as PIXI from "pixi.js";

export function getPixiNode(arr: PIXI.Sprite[], id: string) {
  return arr.forEach((node) => {
    if (node.name === id) {
      return node;
    } else if (node.children) {
      getPixiNode(node.children, id);
    } else return null;
  });
}
