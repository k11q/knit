import * as PIXI from "pixi.js";
import { OutlineFilter } from "@pixi/filter-outline";
import { AlphaFilter } from "@pixi/filter-alpha";

export class Selector extends PIXI.Graphics {
  constructor(left: number, top: number) {
    super();
    this.x = left;
    this.y = top;
    this.width = 0;
    this.height = 0;
    this.beginFill(PIXI.utils.string2hex("0191FA"), 0.15);
    this.lineStyle(1, PIXI.utils.string2hex("0191FA"), 1);
    this.drawRect(0, 0, 1, 1);
  }

  setLeft(left: number) {
    this.x = left;
  }

  setTop(top: number) {
    this.y = top;
  }

  setDimensions(width: number, height: number) {
    this.clear();
    this.beginFill(PIXI.utils.string2hex("0191FA"), 0.15);
    this.lineStyle(1, PIXI.utils.string2hex("0191FA"), 1);
    this.drawRect(0, 0, width, height);
  }
}
