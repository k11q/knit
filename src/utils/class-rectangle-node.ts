import * as PIXI from "pixi.js";

export function createRectangle() {}

export class RectangleNode extends PIXI.Sprite {
  constructor(left: number, top: number, id?: string) {
    super();
    this.texture = PIXI.Texture.WHITE;
    this.x = left;
    this.y = top;
    this.width = 0;
    this.height = 0;
    this.tint = PIXI.utils.string2hex("D9D9D9");
    this.name = id ? id : useCreateId();
    this.interactive = true;
  }

  setLeft(left: number) {
    this.x = left;
  }

  setTop(top: number) {
    this.y = top;
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }
}
