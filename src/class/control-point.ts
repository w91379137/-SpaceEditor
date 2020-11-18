
import * as PIXI from 'pixi.js';

export class ControlPoint {

  static texture(
    app: PIXI.Application,
    radius: number = 10,
    color: number = 0xFFFFFF,
  ): PIXI.RenderTexture {

    const graphic = new PIXI.Graphics();
    graphic.beginFill(color);
    graphic.lineStyle(0);
    graphic.drawCircle(0, 0, radius);
    graphic.endFill();

    return app.renderer.generateTexture(graphic, PIXI.SCALE_MODES.LINEAR, 5);
  }

  // 拖曳教學
  // http://scottmcdonnell.github.io/pixi-examples/index.html?s=demos&f=dragging.js&title=Dragging
  static create(
    app: PIXI.Application,
    x: number = 0,
    y: number = 0,
    radius: number = 5,
    color: number = 0xFFFFFF,
  ) {

    const texture = ControlPoint.texture(app, radius, color);
    const circle = new PIXI.Sprite(texture);

    circle.interactive = true;
    circle.buttonMode = true;
    circle.anchor.set(0.5);
    circle.scale.set(1);

    circle
      // events for drag start
      .on('mousedown', onDragStart)
      .on('touchstart', onDragStart)
      // events for drag end
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', onDragEnd)
      .on('touchend', onDragEnd)
      .on('touchendoutside', onDragEnd)
      // events for drag move
      .on('mousemove', onDragMove)
      .on('touchmove', onDragMove);

    app.stage.addChild(circle);
    circle.x = x;
    circle.y = y;

    return circle;
  }

}

function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;

  this.dragging = false;

  // set the interaction data to null
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;
  }
}
