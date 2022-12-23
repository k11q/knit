import * as PIXI from "pixi.js";
export class RectangleNode extends PIXI.Sprite {
  createRectangle() {
    new PIXI.Sprite();
  }
  id: string = "haha";
  changeId(id: string) {
    this.id = id;
  }
}
