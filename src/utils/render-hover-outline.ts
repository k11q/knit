import * as PIXI from "pixi.js";

export class HoverOutline extends PIXI.Graphics {
  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.lineStyle(2, PIXI.utils.string2hex("0191FA"));
    this.drawRect(0, 0, width, height);
  }

  setDimensions(x: number, y: number, width: number, height: number) {
    this.clear();
    this.x = x;
    this.y = y;
    this.lineStyle(2, PIXI.utils.string2hex("0191FA"));
    this.drawRect(0, 0, width, height);
  }
}
